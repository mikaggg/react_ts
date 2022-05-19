import React, { createContext } from "react";

export type imageDetail = {
  image: string;
  imageUrl: string;
  imageName: string;
  beforeImageName: string;
};

export type ContextType = {
  image: imageDetail;
  setImage: React.Dispatch<React.SetStateAction<imageDetail>>;
};

export const ImageContext = createContext({} as ContextType);

export const imageValue = {
  image: "",
  imageUrl: "",
  imageName: "",
  beforeImageName: "",
};
