export enum ImageType {
  PROFILE = "PROFILE",
  LICENSE = "LICENSE",
}

export interface ImageInfo {
  id: number;
  name: string;
  contentType: string;
  size: number;
  path: string;
}
