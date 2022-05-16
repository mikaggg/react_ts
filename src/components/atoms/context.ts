import React, { createContext } from "react";

export type siteDetail = {
  id: string;
  siteName: string;
  url: string;
  siteIntroduction: string;
  imageName: string;
  category: string;
  categoryName: string;
};

export type ContextType = {
  detail: siteDetail;
  setDetail: React.Dispatch<React.SetStateAction<siteDetail>>;
};

export const SiteContext = createContext({} as ContextType);

export const initialValue = {
  id: "id",
  siteName: "サイト名",
  url: "URL",
  siteIntroduction: "サイト説明文",
  imageName: "imageName",
  category: "カテゴリーNo",
  categoryName: "カテゴリー名",
};
