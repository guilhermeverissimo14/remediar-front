import moment from "moment";

/**
 * Máscara de CPF
 */
export const cpfMask = (value: string | undefined): string => {
  if (!value) return "";

  value = value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  return value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

/**
 * Máscara de telefone
 */
export const phoneMask = (value: string | undefined): string => {
  if (!value) return "";

  value = value.replace(/\D/g, "");

  if (value.length > 11) {
    value = value.slice(0, 11);
  }

  return value
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

/**
 * Formata gênero ("M" -> "Masculino", "F" -> "Feminino")
 */
export const genderMask = (value: string | undefined): string => {
  if (!value) return "";

  return value === "M" ? "Masculino" : value === "F" ? "Feminino" : value;
};

/**
 * Máscara para datas (DD/MM/AAAA)
 */
export const dateMask = (value: string | undefined): string => {
  if (!value) return "";

  value = value.replace(/\D/g, "");

  if (value.length > 8) {
    value = value.slice(0, 8);
  }

  return value.replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2");
};

/**
 * Remove acentos e caracteres especiais, deixando apenas letras
 */
export const onlyLetters = (value: string | undefined): string => {
  if (!value) return "";

  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z\s]/g, "");
};

/**
 * Normaliza uma data para formato DD/MM/YYYY
 */
export const normalize = (value: string | null | undefined): string => {
  if (!value) return "";
  return moment(value).format("DD/MM/YYYY");
};

/**
 * Formata um valor, removendo caracteres indesejados
 */
export const formatValue = (value: string | undefined): string => {
  if (!value) return "";
  return value.replace(/[^\d/]/g, "");
};

/**
 * Formata um CEP no padrão XXXXX-XXX
 */
export const formatCEP = (value: string | undefined): string => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{5})(\d{0,3})$/, "$1-$2")
    .replace(/-$/, "");
};
