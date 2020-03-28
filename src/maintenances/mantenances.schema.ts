import * as mongoose from 'mongoose';

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/camelcase
const mongoo_paginate = require('mongoose-paginate-v2');

export const maintenancesSchema = new mongoose.Schema(
  {
    dtemissao: { type: Date, required: true },
    status: { type: String, required: true },
    total: { type: Number, required: false },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
    produtos: [
      {
        idProduto: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        descricao: { type: String, required: true },
        preco: { type: Number, required: true },
        quantidade: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    servicos: [
      {
        idServico: { type: mongoose.Schema.Types.ObjectId, ref: 'service' },
        descricao: { type: String, require: true },
        preco: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

maintenancesSchema.plugin(mongoo_paginate);
