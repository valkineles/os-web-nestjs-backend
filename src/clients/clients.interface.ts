import { Document } from 'mongoose';

export interface IClient extends Document {
  nome: string;
  email: string;
  telefone: string;
  apelido: string;
}
