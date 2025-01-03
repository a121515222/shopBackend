import { Schema, model, type Types } from "mongoose";
interface ArticleSchema {
  userId: Types.ObjectId;
  title: string;
  description: string;
  content: string;
  tag: string[];
  imageUrl: string;
  author: string;
  articleDate: Date;
  isPublic: boolean;
}
const articleSchema = new Schema<ArticleSchema>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    content: { type: String, default: "" },
    tag: { type: [String], default: [] },
    imageUrl: { type: String, default: "" },
    author: { type: String, default: "" },
    articleDate: { type: Date, default: Date.now },
    isPublic: { type: Boolean, default: false }
  },
  { versionKey: false, timestamps: true }
);
const Article = model<ArticleSchema>("Article", articleSchema);
export { Article, ArticleSchema };
