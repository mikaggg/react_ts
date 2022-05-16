import React, { useState } from "react";
import clsx from "clsx";
import theme from "../atoms/theme";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ThemeProvider, Typography, Box } from "@material-ui/core";
import { CssBaseline, Drawer } from "@material-ui/core";
import { Divider, Container, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import SideBar from "../pages/SideBar";

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "ftex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    pageTitle: {
      position: "absolute",
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
    appSpacer: {
      display: "flex",
      [theme.breakpoints.up("sm")]: {
        height: 250,
      },
      [theme.breakpoints.down("sm")]: {
        height: 180,
      },
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingButtom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    },
  })
);

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©︎ "}
      <Link color="inherit" to="/">
        収集サイト.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

interface GenericTemplateProps {
  children: React.ReactNode;
  title: React.ReactNode;
}

const GenericTemplate = ({ children, title }: GenericTemplateProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawer = () => {
    setOpen(!open);
  };

  console.log(title);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawer}>
              <ChevronLeftIcon />
              収集サイト.com
            </IconButton>
          </div>
          <Divider />
          <SideBar />
          <div>
            <Link to="/admin/home" className={classes.link}>
              管理者画面
            </Link>
          </div>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appSpacer}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.pageTitle}
            ></Typography>
            {title}
          </div>
          <Divider />
          <Container maxWidth="lg" className={classes.container}>
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};
export default GenericTemplate;
