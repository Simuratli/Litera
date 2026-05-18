export type AuthorData = {
  id: string;
  name: string;
  avatar?: any;
};

export const AUTHOR_DATA: AuthorData[] = [
  { id: "1", name: "Tijan Sila", avatar: require("@/assets/images/tijan.jpg") },
  {
    id: "2",
    name: "J.R.R. Tolkien",
    avatar: require("@/assets/images/tolkien.png"),
  },
  {
    id: "3",
    name: "Antoine de Saint-Exupéry",
    avatar:
      "https://www.onthisday.com/images/people/antoine-de-saint-exupery.jpg?w=720",
  },
  {
    id: "4",
    name: "F. Scott Fitzgerald",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/F_Scott_Fitzgerald_1921.jpg/250px-F_Scott_Fitzgerald_1921.jpg",
  },
];

export type BookData = {
  id: string;
  title: string;
  author: string;
  cover?: any;
};

export const BOOK_DATA: BookData[] = [
  {
    id: "1",
    title: "Saraybosna Radyosu",
    author: "Tijan Sila",
    cover: "https://1k-cdn.com/resimler/kitaplar/267621_1765284541_KwFN3.jpeg",
  },
  {
    id: "2",
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    cover: require("@/assets/images/tolkienbook.jpg"),
  },
  {
    id: "3",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    cover:
      "https://m.media-amazon.com/images/I/81YgzWyiUfL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover:
      "https://m.media-amazon.com/images/I/81T4dS6IkaL._AC_UF1000,1000_QL80_.jpg",
  },
];

export type CardData = {
  id: string;
  quote: string;
  source: string;
  author: string;
  page?: string;
  username: string;
  likes: string;
};

export const FEED_DATA: CardData[] = [
  {
    id: "1",
    quote: "People disappear when they die. Even those you love.",
    source: "Saraybosna Radyosu",
    author: "Tijan Sila",
    page: "41",
    username: "@yagmur",
    likes: "1.8k",
  },
  {
    id: "2",
    quote: "Not all those who wander are lost.",
    source: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    page: "182",
    username: "@tolkienfan",
    likes: "4.2k",
  },
  {
    id: "3",
    quote:
      "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    source: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    page: "63",
    username: "@lepetitprince",
    likes: "6.7k",
  },
  {
    id: "4",
    quote:
      "So we beat on, boats against the current, borne back ceaselessly into the past.",
    source: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    page: "189",
    username: "@gatsby",
    likes: "3.1k",
  },
  {
    id: "5",
    quote:
      "The world is a book, and those who do not travel read only one page.",
    source: "Confessions",
    author: "Saint Augustine",
    username: "@augustine",
    likes: "2.5k",
  },
  {
    id: "6",
    quote:
      "She was a girl who knew how to be happy even when she was sad. And that's important.",
    source: "Marilyn",
    author: "Norman Mailer",
    page: "12",
    username: "@normanm",
    likes: "5.0k",
  },
];
