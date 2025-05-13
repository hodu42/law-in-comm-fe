export interface Answer {
  answerId: number;
  author: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
  reportCount: number;
  authorName: string;
  authorId: number;
  profileImage: {
    id: number;
    name: string;
    contentType: string;
    size: number;
    path: string;
  };
}

export type WrittenAnswer = Omit<
  Answer,
  "author" | "authorName" | "profileImage" | "authorId"
> & {
  questionId: number;
  questionLegalSpeciality: string;
  questionTitle: string;
};
