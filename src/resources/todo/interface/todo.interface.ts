import mongoose from 'mongoose';

export interface ITodo {
  _id: mongoose.Schema.Types.ObjectId;
  task: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  __v: number;
}
