import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export interface IMaintenances extends Document {
  dtemissao: Date;
  status: string;
  total: number;
  cliente: mongoose.Schema.Types.ObjectId;
  produtos: mongoose.Schema.Types.ObjectId;
  servicos: mongoose.Schema.Types.ObjectId;
}
