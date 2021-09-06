import React, { Fragment, useState, useEffect, useContext　} from "react";
import { AuthUserContext } from "../molecules/AuthUserContext";
import {　Button,　Container,　FormControl,　Grid,　TextField, Typography, Link　} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { auth } from "../atoms/firebase";
import { makeStyles } from "@material-ui/core";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textPrimary" align="center">
            {'Copyright ©︎'}
            <Link color="inherit" href="/">
                サイト収集.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marign: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const Login = (props: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { userCredential }= useContext(AuthUserContext);
    const classes = useStyles();

    useEffect(() => {
        userCredential && props.history.push("/admin");
        }, [userCredential, props.history]);

    const userLogin = async() => {
            try {
                await auth.signInWithEmailAndPassword(email, password);
                props.history.push("/admin");
            } catch (error) {
                alert("ログイン:" + error.message);
            }
    };

    return (
        <Fragment>
            <Container>
                <CssBaseline />
                <div className={classes.paper}>
                <Grid item md={4}></Grid>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Grid item md={4}>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                            name="email"
                            label="E-mail"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            style={{ marginTop: "0.5", marginBottom: "0.5em" }}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <Button
                            fullWidth
                            onClick={userLogin}
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
                        >
                            Login
                        </Button>
                    </FormControl>
                </Grid>
                
                </div>
                <Grid item md={4}></Grid>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </Fragment>
    );
};

export default Login;