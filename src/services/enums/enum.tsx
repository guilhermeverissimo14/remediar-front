// enums.ts

// Enum de Escolaridade: chave = valor interno, label = português
export enum Escolaridade {
  ENSINO_FUNDAMENTAL = "Ensino Fundamental",
  ENSINO_MEDIO        = "Ensino Médio",
  SUPERIOR_COMPLETO   = "Superior Completo",
  POS_GRADUACAO       = "Pós-graduação",
}

// Enum de Gênero
export enum Genero {
  FEMININO  = "Feminino",
  MASCULINO = "Masculino",
  OUTRO     = "Outro",
}

// Para usar no seu SelectWithIcon, você pode criar arrays de opções assim:
export const escolaridadeOptions = Object.entries(Escolaridade).map(
  ([value, label]) => ({ value, label })
);

export const generoOptions = Object.entries(Genero).map(
  ([value, label]) => ({ value, label })
);
