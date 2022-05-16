import React from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Drawer, Divider } from "@material-ui/core";
import { List, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { auth } from "../atoms/firebase";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    },
  })
);

const AdminSideBar = React.memo(() => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => handleDrawer()}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/admin/home" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="トップページ" />
            </ListItem>
          </Link>
          <Link to="/admin/adminSiteAdd" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="サイト追加ページ" />
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="サイト.com" />
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button onClick={() => handleLogout()}>
              <ListItemText primary="ログアウト" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  );
});
export default AdminSideBar;
