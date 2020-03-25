import { Document } from 'mongoose';

export interface IProducts extends Document {
  descricao: string;
  preco: number;
}
