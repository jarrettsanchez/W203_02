import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  // submission properties
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

  // moderation properties
  @Prop()
  se_relevancy: boolean;

  @Prop()
  peer_reviewed: boolean;

  @Prop()
  moderation_flag: boolean;

  // analysis properties
  @Prop()
  claims: boolean;

  @Prop()
  evidence: string;

  @Prop()
  evidence_result: boolean;

  @Prop()
  analysis_flag: boolean;

  // article status - pending, accepted, or rejected
  @Prop()
  status: string;

  // submission or updated date
  @Prop({type: Date, default: Date.now})
  updated_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
