import React from "react";
import clsx from "clsx";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Typography, CssBaseline } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      paddingRight: 24,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
  })
);

const AdminHead = React.memo(() => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer()}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            管理画面
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default AdminHead;
