import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: false },
    apelido: { type: String },
  },
  {
    timestamps: true,
  },
);
