import { Schema, model, type Types } from "mongoose";
interface ICommentSchema {
  sellerId: Types.ObjectId;
  userId: Types.ObjectId;
  orderId: Types.ObjectId;
  comment: string;
  score: number;
}

const CommentSchema = new Schema<ICommentSchema>(
  {
    sellerId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    orderId: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    score: { type: Number, required: true }
  },
  { versionKey: false, timestamps: true }
);

const Comment = model<ICommentSchema>("Comment", CommentSchema);

export { Comment, type ICommentSchema };
