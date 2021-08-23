import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Container,
    Grid,
    CircularProgress,
    Alert,
} from "@material-ui/core";
import AccountProfile from "src/components/account/AccountProfile";
import AccountProfileDetails from "src/components/account/AccountProfileDetails";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const useStyles = makeStyles((theme) => ({
    top: {
        color: "#1a90ff",
        animationDuration: "550ms",
        position: "absolute",
    },
    circle: {
        strokeLinecap: "round",
    },
}));

const Account = () => {
    const classes = useStyles();
    const [profile, setProfile] = useState({
        state: "success",
        message: "",
        data: null,
    });
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (authState.status && authState.uid) {
            axios
                .get(
                    authState.role === "student"
                        ? `http://localhost:3001/student/${authState.uid}`
                        : `http://localhost:3001/tutor/${authState.uid}`
                )
                .then((response) => {
                    if (response.data.state === "success") {
                        setProfile({
                            state: "success",
                            message: response.data.message,
                            data: response.data.data,
                        });
                    } else {
                        setProfile({
                            state: "error",
                            message: response.data.message,
                            data: null,
                        });
                    }
                })
                .catch((error) => {
                    setProfile({
                        state: "error",
                        message: error.message,
                        data: null,
                    });
                });
        } else {
            setProfile({
                state: "error",
                message: "You are not signed in.",
                data: null,
            });
        }
    }, [authState]);

    return profile.data ? (
        <>
            <Helmet>
                <title>Account | Material Kit</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    minHeight: "100%",
                    py: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={6} xs={12}>
                            <AccountProfile profile={profile.data} />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <AccountProfileDetails
                                profile={profile.data}
                                setProfile={setProfile}
                                role={authState.role}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    ) : profile.message && profile.message !== "" ? (
        <div
            style={{
                width: "100%",
                display: "flex",
                height: "100%",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Alert severity="error" variant="outlined">
                {profile.message}
            </Alert>
        </div>
    ) : (
        <div
            style={{
                width: "100%",
                display: "flex",
                height: "100%",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
            />
        </div>
    );
};

export default Account;
