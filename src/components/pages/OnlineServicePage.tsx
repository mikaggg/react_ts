import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import ImgMediaCard from "./ImgMediaCard";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import { Typography } from "@material-ui/core";

const OnlineServicePage: React.FC = () => {
  const TitleImage = () => {
    return (
      <>
        <DesktopMacIcon />
        <Typography variant="h6" color="inherit" noWrap>
          オンラインサービス
        </Typography>
      </>
    );
  };

  return (
    <GenericTemplate title={<TitleImage />}>
      <ImgMediaCard param={"onlineService"} />
    </GenericTemplate>
  );
};

export default OnlineServicePage;
