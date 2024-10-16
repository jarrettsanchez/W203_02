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
  publication_year: string;

  @Prop()
  volume: string;

  @Prop()
  pages: string;

  @Prop({required: true})
  doi: string;

  // moderation properties
  @Prop()
  se_relevancy: boolean;

  @Prop()
  se_category: string;

  @Prop()
  peer_reviewed: boolean;

  @Prop()
  moderation_flag: boolean;

  // analysis properties
  @Prop()
  claims: string;

  @Prop()
  evidence: string;

  @Prop()
  evidence_result: boolean;

  @Prop()
  participant: string;

  @Prop()
  research_type: string;

  @Prop()
  analysis_flag: boolean;

  // rejection reason
  @Prop()
  rejection_reason: string;

  // article status - pending, accepted, or rejected
  @Prop()
  status: string;

  // submission or updated date
  @Prop({type: Date, default: Date.now})
  updated_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
