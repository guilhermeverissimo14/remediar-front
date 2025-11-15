"use client";
import { useEffect, useState, useRef } from "react";
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout";
import { SearchBarEstoque } from "@/components/Dashboard/searchbar/searchbar-estoque";
import { Boxes, Barcode } from "lucide-react";
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import { ListaMedicacoes } from "@/components/Dashboard/estoqueList";
import {
  Info,
  FlaskConical,
  Package,
  ScanBarcode,
  Factory,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import axios from "axios";
import { date } from "zod";
import { formatarDataParaBackend } from "@/utils/formatDate";
import { toast } from "sonner";

interface MedicacaoData {
  id: number;
  apresentacao: string;
  quantidade: number;
  dataValidade: string;
}

interface Estoque {
  id: number;
  nome: string;
}

interface MedicamentoDetalhes {
  id: number;
  nomeComercial: string;
  principioAtivo: string;
  apresentacao: string;
  codigoBarras: string;
  laboratorio: string;
  precoMaximo: number;
  statusProduto: string;
}

export default function GerenciarEstoque() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [filtro, setFiltro] = useState("");
  const [estoqueSelecionado, setEstoqueSelecionado] = useState<string>("");
  const [medicacoes, setMedicacoes] = useState<MedicacaoData[]>([]);
  const [isModalNovoEstoqueOpen, setIsModalNovoEstoqueOpen] = useState(false);
  const [isModalCodigoBarrasOpen, setIsModalCodigoBarrasOpen] = useState(false);
  const [novoEstoqueNome, setNovoEstoqueNome] = useState("");
  const [codigoBarrasInput, setCodigoBarrasInput] = useState("");
  const [medicamentoDetalhes, setMedicamentoDetalhes] = useState<MedicamentoDetalhes | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState("");

  const barcodeBuffer = useRef<string>("");
  const lastKeyTime = useRef<number>(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const ignoreEnterUntil = useRef<number>(0);

  const [formularioAdicao, setFormularioAdicao] = useState({
    medicamento: "",
    quantidade: "",
    dataValidade: "",
    estoque: ""
  });

  const buscarEstoques = async () => {
    try {
      const { data } = await api.get(`${ENDPOINTS.ESTOQUE.CRUD}?size=100`);
      setEstoques(data.content || []);
    } catch (error) {
      console.error("Erro ao buscar estoques:", error);
    }
  };
  
  const buscarMedicacoesEstoque = async (estoqueId: string) => {
    try {
      const { data } = await api.get(`${ENDPOINTS.ESTOQUE.CRUD}/${estoqueId}`);
      const medicacoesMapeadas: MedicacaoData[] = (data.itens || []).map((item: any) => ({
        id: item.id,
        apresentacao: item.apresentacao,
        quantidade: item.quantidade,
        dataValidade: formatarData(item.dataValidade),
      }));
      setMedicacoes(medicacoesMapeadas);
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    }
  };

  const criarNovoEstoque = async () => {
    try {
      await api.post(ENDPOINTS.ESTOQUE.CRUD, { nome: novoEstoqueNome });
      await buscarEstoques();
      setIsModalNovoEstoqueOpen(false);
      setNovoEstoqueNome("");
    } catch (error) {
      console.error("Erro ao criar estoque:", error);
    }
  };

  const adicionarItemEstoque = async () => {
    try {
      await api.post(ENDPOINTS.ITENS_ESTOQUE.CRUD, {
        estoqueId: parseInt(formularioAdicao.estoque),
        produtoId: medicamentoDetalhes?.id ? Number(medicamentoDetalhes.id) : undefined,  
        quantidade: parseInt(formularioAdicao.quantidade),
        dataValidade: formatarDataParaBackend(formularioAdicao.dataValidade)
      });
      if (estoqueSelecionado) {
        buscarMedicacoesEstoque(estoqueSelecionado);
      }
      toast.success("Medicamento adicionado com sucesso!");
      setFormularioAdicao({ medicamento: "", quantidade: "1", dataValidade: "", estoque: "" });
      setMedicamentoDetalhes(null);
      setIsModalNovoEstoqueOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  useEffect(() => {
    if (!isModalCodigoBarrasOpen) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const now = Date.now();

      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      if (now < ignoreEnterUntil.current) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      if (now - lastKeyTime.current > 100) {
        barcodeBuffer.current = "";
      }

      if (event.key.match(/^\d$/)) {
        barcodeBuffer.current += event.key;
        setCodigoBarrasInput(barcodeBuffer.current);
      }

      lastKeyTime.current = now;

      if (timeoutId.current) clearTimeout(timeoutId.current);

      timeoutId.current = setTimeout(() => {
        if (barcodeBuffer.current.length === 13) {
          handleBarcodeScan(barcodeBuffer.current);
          barcodeBuffer.current = "";
        }
      }, 50);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    window.addEventListener('keydown', handleKeyPress, true);
    window.addEventListener('keyup', handleKeyUp, true);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [isModalCodigoBarrasOpen]);

  const handleBarcodeScan = async (code: string) => {
    try {
      setIsScanning(true);
      setScanError("");

      ignoreEnterUntil.current = Date.now() + 1000;

      const response = await axios.get(ENDPOINTS.MEDICAMENTOS.COD_BARRAS + `/${code}`);
      const dadosMedicamento = response.data;

      if (!dadosMedicamento?.id) {
        throw new Error('Medicamento não encontrado');
      }

      setMedicamentoDetalhes(dadosMedicamento);
      setFormularioAdicao(prev => ({
        ...prev,
        medicamento: dadosMedicamento.nomeComercial
      }));

      setTimeout(() => {
        setIsModalCodigoBarrasOpen(false);
      }, 1000);

    } catch (error) {
      setScanError(`Código não reconhecido: ${code}`);
      setCodigoBarrasInput(code);
      ignoreEnterUntil.current = Date.now() + 1000;
    } finally {
      setIsScanning(false);
      barcodeBuffer.current = "";
    }
  };

  useEffect(() => {
    buscarEstoques();
  }, []);

  useEffect(() => {
    if (estoqueSelecionado) {
      buscarMedicacoesEstoque(estoqueSelecionado);
    }
  }, [estoqueSelecionado]);

  const medicacoesFiltradas = medicacoes.filter((med) =>
    med.apresentacao?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .includes(filtro.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );

  return (
    <DashboardLayout
      title="Gerenciar Estoque"
      Icon={() => <Boxes />}
      menuPrincipalItems={menuPrincipalItems}
      configuracaoItems={ConfiguracaoItems}
    >
      <div className="w-full flex flex-col justify-center">
        <div className="w-full mb-4">
          <SearchBarEstoque
            setFiltro={setFiltro}
            setEstoqueSelecionado={setEstoqueSelecionado}
            estoques={estoques}
            onOpenModal={() => setIsModalNovoEstoqueOpen(true)}
          />
        </div>
        <ListaMedicacoes data={medicacoesFiltradas} />

        <Dialog open={isModalNovoEstoqueOpen} onOpenChange={setIsModalNovoEstoqueOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg justify-center">
                <Boxes size={20} className="text-[#3FAFC3]" />
                <span className="text-gray-700">Adicionar Medicamento</span>
              </DialogTitle>
            </DialogHeader>
            <hr className="my-4 border-t border-gray-200" />
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Nome do Medicamento"
                  value={formularioAdicao.medicamento}
                  className="flex-1 bg-gray-100"
                  readOnly
                />
                <Button
                  onClick={() => setIsModalCodigoBarrasOpen(true)}
                  variant="outline"
                  size="icon"
                >
                  <Barcode size={18} />
                </Button>
              </div>

              {medicamentoDetalhes && (
                <div className="bg-gray-50 rounded-lg border p-4 mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <Info size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Nome Comercial:</strong>
                    {medicamentoDetalhes.nomeComercial}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <FlaskConical size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Princípio Ativo:</strong>
                    {medicamentoDetalhes.principioAtivo}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <Package size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Apresentação:</strong>
                    {medicamentoDetalhes.apresentacao}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <ScanBarcode size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Código de Barras:</strong>
                    {medicamentoDetalhes.codigoBarras}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <Factory size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Laboratório:</strong>
                    {medicamentoDetalhes.laboratorio}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <DollarSign size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Preço Máximo:</strong>
                    R$ {medicamentoDetalhes.precoMaximo.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-800">
                    <ShieldCheck size={18} className="text-cyan-700" />
                    <strong className="min-w-[140px]">Status:</strong>
                    {medicamentoDetalhes.statusProduto}
                  </div>
                </div>
              )}

              <div className="flex gap-4 justify-between">
                <Input
                  type="number"
                  placeholder="Qtd. (Unidade)"
                  value={formularioAdicao.quantidade}
                  onChange={(e) => setFormularioAdicao({ ...formularioAdicao, quantidade: e.target.value })}
                  min="1"
                />  

                <Input
                  type="date"
                  placeholder="Data de Validade"
                  value={formularioAdicao.dataValidade}
                  onChange={(e) => setFormularioAdicao({ ...formularioAdicao, dataValidade: e.target.value })}
                  className="text-gray-500 text-end text-base"
                  min="1"
                />  

                <Select
                  value={formularioAdicao.estoque}
                  onValueChange={(value) => setFormularioAdicao({ ...formularioAdicao, estoque: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar Estoque" />
                  </SelectTrigger>
                  <SelectContent>
                    {estoques.map((estoque) => (
                      <SelectItem key={estoque.id} value={String(estoque.id)}>
                        {estoque.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsModalNovoEstoqueOpen(false);
                    setFormularioAdicao({ medicamento: "", quantidade: "1", dataValidade: "", estoque: "" });
                    setMedicamentoDetalhes(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[#3FAFC3] hover:bg-cyan-800"
                  onClick={adicionarItemEstoque}
                  disabled={!formularioAdicao.estoque || !medicamentoDetalhes}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isModalCodigoBarrasOpen} onOpenChange={setIsModalCodigoBarrasOpen}>
          <DialogContent 
            className="sm:max-w-[425px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 justify-center">
                <Barcode size={20} className="text-[#3FAFC3]" />
                <span className="text-gray-700">Leitor de Código de Barras</span>
              </DialogTitle>
              <DialogDescription className="text-center">
                {isScanning ? "Processando código..." : "Aponte a pistola para esta janela"}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center gap-6">
              <div className={`w-full h-40 flex flex-col items-center justify-center gap-2 
                bg-gray-50 rounded-lg border-2 border-dashed transition-all relative overflow-hidden
                ${isScanning ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
                
                {!isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse opacity-60"></div>
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-ping"></div>
                  </div>
                )}

                <div className={`flex items-center justify-center text-4xl transition-all duration-300 ${
                  isScanning ? 'animate-pulse scale-110' : 'animate-bounce'
                }`}>
                  {isScanning ? (
                    <div className="flex items-center gap-2">
                      <Barcode size={32} className="text-blue-600 animate-pulse" />
                      <span>⏳</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Barcode size={32} className="text-gray-600" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-500 text-center px-4 z-10">
                  {isScanning
                    ? `Lendo código: ${codigoBarrasInput}`
                    : "Aguardando leitura da pistola..."}
                </p>

                {!isScanning && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-ping opacity-40"></div>
                )}
                {!isScanning && (
                  <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse opacity-40"></div>
                )}
              </div>

              {scanError && (
                <div className="w-full p-3 text-center text-red-600 bg-red-50 rounded-lg border border-red-200">
                  {scanError}
                </div>
              )}

              {medicamentoDetalhes && (
                <div className="w-full p-3 text-center text-green-600 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-medium">✅ Medicamento encontrado!</p>
                  <p className="text-sm">{medicamentoDetalhes.nomeComercial}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

function formatarData(data: string | [number, number, number]): string {
  if (!data) return "";
  if (typeof data === "string") {
    // Se já está no formato dd/MM/yyyy, retorna direto
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return data;
    // Se está no formato yyyy-MM-dd, converte
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      const [ano, mes, dia] = data.split("-");
      return `${dia}/${mes}/${ano}`;
    }
    // Se está no formato yyyy-MM-ddTHH:mm:ss, pega só a data
    if (/^\d{4}-\d{2}-\d{2}T/.test(data)) {
      const [dataParte] = data.split("T");
      const [ano, mes, dia] = dataParte.split("-");
      return `${dia}/${mes}/${ano}`;
    }
    return data;
  }
  // Array [ano, mes, dia]
  const [ano, mes, dia] = data;
  if (!ano || !mes || !dia) return "";
  return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}