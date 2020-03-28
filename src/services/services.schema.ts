import * as Mongoose from 'mongoose';

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/camelcase
const mongoo_paginate = require('mongoose-paginate-v2');

export const servicesSchema = new Mongoose.Schema(
  {
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
  },
  { timestamps: true },
);

servicesSchema.plugin(mongoo_paginate);
