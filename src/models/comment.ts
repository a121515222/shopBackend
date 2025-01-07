import { Schema, model, type Types } from "mongoose";
interface ICommonSchema {
  sellerId: Types.ObjectId;
  userId: Types.ObjectId;
  comment: string;
  score: number;
}

const CommentSchema = new Schema<ICommonSchema>(
  {
    sellerId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { versionKey: false, timestamps: true }
);

const Comment = model<ICommonSchema>("Common", CommentSchema);

export { Comment, type ICommonSchema };
