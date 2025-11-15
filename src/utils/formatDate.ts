
/**
 * Converte data do formato ISO (yyyy-mm-dd) para dd/mm/yyyy.
 * @param data - Data no formato "2025-05-27"
 * @returns Data no formato "27/05/2025"
 */
export function formatarDataParaBackend(data: string): string {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}