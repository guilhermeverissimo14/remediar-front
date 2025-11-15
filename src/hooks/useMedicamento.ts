import { useState, useEffect } from "react";
import { api } from "@/services/api/api";
import debounce from "lodash.debounce";


export const useMedicamentos = (query: string) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/medicamentos/pesquisar/principioAtivoOrNomeComercial/${query}`);
        setResults(res.data.content);
        setShowDropdown(true);
      } catch (err) {
        console.error("Erro ao buscar medicamentos:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounced = debounce(fetch, 500);
    debounced();

    return () => debounced.cancel();
  }, [query]);

  return { loading, results, showDropdown, setShowDropdown };
};
