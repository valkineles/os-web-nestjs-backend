import * as mongoose from 'mongoose';
import { mongoo_paginate } from 'mongoose-paginate-v2';

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

ClientSchema.plugin(mongoo_paginate);
