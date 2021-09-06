import React, { useState } from "react";
import clsx from "clsx";
import theme from "../atoms/theme";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ThemeProvider, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppImage from "../../images/email-4284157_1280.webp";
import CreateIcon from '@material-ui/icons/Create';
import MailIcon from '@material-ui/icons/Mail';
import DomainIcon from '@material-ui/icons/Domain';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';

const drawerWidth = 260;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        toolbar: {
            paddingRight: 24,
        },
        toolbarIcon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "ftex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar,
        },

        title: {
            flexGrow: 1,
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
            [theme.breakpoints.up('sm')]: {
                height: 350,
            },
            [theme.breakpoints.down('sm')]: {
                height: 220,
            }
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
        itemIcon: {
            width: 30,
            paddingLeft: 0,
            paddingTop: 0,
            PaddingButtom: 0,
        },
    })
);

const Image = () => {
    return <img src={AppImage} alt="オンラインサービス" />
};

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

export interface GenericTemplateProps {
    children: React.ReactNode;
    title: string;
}

const GenericTemplate: React.FC<GenericTemplateProps> = ({
    children,
    title,
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleDrawer = () => {
        setOpen(!open);
    };

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
                    <List>
                        <Link to="/onlineService" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon className={classes.itemIcon}>
                                    <DesktopMacIcon  />
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
                                    primary={<Typography variant="body2">企業・法人・コーポレートサイト</Typography>}
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
                        >
                            {title}
                        </Typography>
                        <Image />
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