import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes } from "react-router-dom";

import GlobalStyles from "src/components/GlobalStyles";
import "src/mixins/chartjs";
import theme from "src/theme";
import routes from "src/routes";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const App = () => {
    const classes = useStyles();
    const routing = useRoutes(routes);
    const [authState, setAuthState] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3001/auth/", {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if (response.data.state === 'error') {
                    if (authState) {
                        setAuthState({
                            ...authState,
                            status: false,
                        });
                    } else {
                        setAuthState({
                            role: null,
                            email: "",
                            uid: 0,
                            status: false,
                        });
                    }
                } else {
                    setAuthState({
                        role: response.data.role,
                        email: response.data.email,
                        uid: response.data.uid,
                        status: true,
                    });
                }
            });
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ role: null, email: "", uid: 0, status: false });
    };
console.log(authState)
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {!authState ? (
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
            ) : (
                <AuthContext.Provider value={{ authState, setAuthState }}>
                    {routing}
                </AuthContext.Provider>
            )}
        </ThemeProvider>
    );
};

export default App;
