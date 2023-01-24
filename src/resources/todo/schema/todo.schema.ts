import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, type: String })
  task: string;

  @Prop({ required: true, default: false, type: Boolean })
  done: boolean;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
