import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true, type: String })
  task: string;

  @Prop({ required: true, default: false, type: Boolean })
  done: boolean;

  @Prop({ required: true, default: false, type: Boolean })
  isDeleted: boolean;
}

export type TodoDocument = HydratedDocument<Todo> & SchemaTimestampsConfig;
export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.pre('find', function () {
  this.where({ isDeleted: false });
});
