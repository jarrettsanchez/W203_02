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

  @Prop(({required: true}))
  publication_year: number;

  @Prop()
  volume: number;

  @Prop()
  pages: number;

  @Prop({required: true})
  doi: string;

  @Prop()
  status: string;

  @Prop({type: Date, default: Date.now})
  updated_date: Date;

  @Prop ()
  moderation_flag: boolean;

  @Prop ()
  analysis_flag: boolean;

  @Prop ()
  claims: string;

  @Prop ()
  evidence: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
