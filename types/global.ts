export type AuthorType = {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  created_at?: string;
  slug: string;
};

export type BookType = {
  id: string;
  title: string;
  author_id: string;
  author?: { name: string }; // join sonucu
  cover_url?: string;
  description: string;
  published_year?: number;
  created_at?: string;
  slug: string;
};
