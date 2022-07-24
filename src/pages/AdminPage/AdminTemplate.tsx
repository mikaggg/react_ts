import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import theme from "../../constants/theme";
import { ThemeProvider } from "@material-ui/styles";
import { Typography, Box, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import AdminHead from "./AdminHead";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
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
    pageTitle: {
      marginBottom: theme.spacing(1),
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
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
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

const Copyright = React.memo(() => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/admin">
        管理画面
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
});
interface GenericTemplateProps {
  children: React.ReactNode;
  title: string;
}

const AdminTemplate = ({ children, title }: GenericTemplateProps) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AdminHead />
        <AdminSideBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.pageTitle}
            >
              {title}
            </Typography>
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
export default AdminTemplate;
