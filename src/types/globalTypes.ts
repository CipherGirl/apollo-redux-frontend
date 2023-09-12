export interface IBook {
  _id: number;
  id: number;
  title: string;
  author: string;
  genre: string;
  imageURL: string;
  publicationDate: string;
  reviews: Array<string>;
}
