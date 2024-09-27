import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  year: number;

  @Prop()
  volume: number;

  @Prop()
  doi: string;

  @Prop()
  status: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
