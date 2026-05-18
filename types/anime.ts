export type Anime = {
  mal_id: number;

  title: string;

  score: number;

  images: {
    jpg: {
      image_url: string;
    };
  };
};