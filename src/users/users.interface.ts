import { Document } from 'mongoose';

export interface IUsers extends Document {
  name: string;
  picture: string;
  email: string;
}
