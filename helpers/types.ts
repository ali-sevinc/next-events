export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export type CommentType = {
  email: string;
  name: string;
  text: string;
  eventId?: string;
  _id?: string;
};
