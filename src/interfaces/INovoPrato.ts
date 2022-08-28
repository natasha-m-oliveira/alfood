export interface INovoPrato {
  id: number | null;
  nome: string;
  tag: string;
  imagem: File | string | null;
  descricao: string;
  restaurante: number | string;
}
