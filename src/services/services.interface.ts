import { Document } from 'mongoose';

export interface IServices extends Document {
  descricao: string;
  price: number;
}
