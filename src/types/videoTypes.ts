export interface VideoContentsPropsType {
  video: {
    id: number;
    url: string;
    title: string;
    thumbnail: string;
    date: string;
    description: string;
  };
}

export interface VideoHeaderPropsType {
  value: boolean;
  setValue(): void;
}
