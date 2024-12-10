export interface ArticleType {
  userId: string;
  title: string;
  description: string;
  content: string;
  tag: string[];
  imageUrl: string;
  author: string;
  articleDate: Date;
  isPublic: boolean;
}
