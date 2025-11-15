export const safeGet = (
    obj: any,
    path: string,
    defaultValue: string = 'Não informado'
  ): string => {
    if (!obj) return defaultValue;
    return path.split('.').reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key] || defaultValue;
      }
      return defaultValue;
    }, obj);
  };
  
  export const translateStatus = (status?: string): string => {
    const statusMap: Record<string, string> = {
      'PENDENTE': 'Pendente',
      'EM_ANALISE': 'Em Análise',
      'APROVADA': 'Aprovada',
      'REJEITADA': 'Rejeitada',
      'CONCLUIDA': 'Concluída',
      'CANCELADA': 'Cancelada',
      'EM_SEPARACAO': 'Em Separação',
      'AGUARDANDO_RETIRADA': 'Aguardando Retirada'
    };
    return status ? statusMap[status] || status : 'Status Desconhecido';
  };