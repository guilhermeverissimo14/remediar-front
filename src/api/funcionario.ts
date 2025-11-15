import { api } from '@/services/api/api';
import { FuncionarioRequest, FuncionarioResponse } from '@/types/funcionario';

/**
 * Cria um novo funcionário.
 * Após a criação, extrai o ID do cabeçalho "Location" e retorna os dados do funcionário.
 */
export const createFuncionario = async (
  dados: FuncionarioRequest
): Promise<FuncionarioResponse> => {
  const response = await api.post('/funcionarios', dados);
  const locationHeader = response.headers['location'] || response.headers['Location'];
  
  if (!locationHeader) {
    throw new Error("Cabeçalho 'Location' não encontrado na resposta.");
  }

  const id = parseInt(locationHeader.split('/').pop() || '', 10);
  if (isNaN(id)) {
    throw new Error("ID inválido extraído do cabeçalho 'Location'.");
  }

  // Opcional: Você pode retornar o funcionário recém-criado chamando o GET por ID
  return await getFuncionario(id);
};


export const getFuncionario = async (
  id: number
): Promise<FuncionarioResponse> => {
  const response = await api.get<FuncionarioResponse>(`/funcionarios/${id}`);
  return response.data;
};


export const getFuncionarios = async (): Promise<FuncionarioResponse[]> => {
  const response = await api.get<FuncionarioResponse[]>('/funcionarios');
  return response.data;
};


export const updateFuncionario = async (
  id: number,
  dados: FuncionarioRequest
): Promise<FuncionarioResponse> => {
  const response = await api.put<FuncionarioResponse>(`/funcionarios/${id}`, dados);
  return response.data;
};


export const deleteFuncionario = async (id: number): Promise<void> => {
  await api.delete(`/funcionarios/${id}`);
};
