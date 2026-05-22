export type Anime = {

  mal_id: number;

  title: string;

  synopsis?: string;

  score: number;

  genres?: {
    mal_id: number;
    name: string;
  }[];

  images: {

    jpg: {

      image_url: string;

      large_image_url?: string;

    };

  };

};