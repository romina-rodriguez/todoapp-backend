import mongoose from 'mongoose';

export interface ITodo {
  _id: mongoose.Types.ObjectId;
  task: string;
  done: boolean;
  createdAt?: string | boolean;
  updatedAt?: string | boolean;
  isDeleted: boolean;
  __v?: number;
}
