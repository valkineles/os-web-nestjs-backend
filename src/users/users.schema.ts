import * as mongoose from 'mongoose';

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/camelcase
const mongoo_paginate = require('mongoose-paginate-v2');

export const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

usersSchema.plugin(mongoo_paginate);
