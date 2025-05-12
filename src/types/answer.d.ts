export interface Answer {
  answerId: number;
  author: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
  reportCount: number;
  authorName: string;
  authorId: number;
  profileImageInfo: {
    id: number;
    name: string;
    contentType: string;
    size: number;
    path: string;
  };
}

export type WrittenAnswer = Omit<
  Answer,
  "author" | "authorName" | "profileImageInfo" | "authorId"
> & { questionId: number };
