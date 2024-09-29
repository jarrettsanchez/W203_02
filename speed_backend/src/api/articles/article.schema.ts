import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  author: string;

  @Prop()
  journal_name: string;

  @Prop()
  publication_year: number;

  @Prop()
  volume: number;

  @Prop()
  pages: number;

  @Prop({required: true})
  doi: string;

  @Prop({required: true})
  status: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
