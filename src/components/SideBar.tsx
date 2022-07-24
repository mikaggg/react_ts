import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import MailIcon from "@material-ui/icons/Mail";
import DomainIcon from "@material-ui/icons/Domain";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import PhotoFilterIcon from "@material-ui/icons/PhotoFilter";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    },
    itemIcon: {
      width: 30,
      paddingLeft: 0,
      paddingTop: 0,
      PaddingButtom: 0,
    },
  })
);

const SideBar = React.memo(() => {
  const classes = useStyles();
  console.log("sidebar");
  return (
    <>
      <SearchBar />
      <List>
        <Link to="/onlineService" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <DesktopMacIcon />
            </ListItemIcon>
            <ListItemText primary="オンラインサービス" />
          </ListItem>
        </Link>
        <Link to="/design" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="デザイン・デザイン会社" />
          </ListItem>
        </Link>
        <Link to="/construction" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="建築・不動産" />
          </ListItem>
        </Link>
        <Link to="/fashion" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="ファッション" />
          </ListItem>
        </Link>
        <Link to="/beauty" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <PhotoFilterIcon />
            </ListItemIcon>
            <ListItemText primary="ビューティー" />
          </ListItem>
        </Link>
        <Link to="/life" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <DirectionsBusIcon />
            </ListItemIcon>
            <ListItemText primary="生活・旅行・交通・ホテル" />
          </ListItem>
        </Link>
        <Link to="/medical" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="医療" />
          </ListItem>
        </Link>
        <Link to="/food" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="飲食関連・食品" />
          </ListItem>
        </Link>
        <Link to="/portal" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <ImportantDevicesIcon />
            </ListItemIcon>
            <ListItemText primary="ポータル・ブログ" />
          </ListItem>
        </Link>
        <Link to="/game" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <MusicNoteIcon />
            </ListItemIcon>
            <ListItemText primary="ゲーム・音楽" />
          </ListItem>
        </Link>
        <Link to="/enterprise" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <DomainIcon />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2">
                  企業・法人・コーポレートサイト
                </Typography>
              }
            />
          </ListItem>
        </Link>
        <Link to="/contact" className={classes.link}>
          <ListItem button>
            <ListItemIcon className={classes.itemIcon}>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="お問い合わせ" />
          </ListItem>
        </Link>
      </List>
    </>
  );
});
export default SideBar;
