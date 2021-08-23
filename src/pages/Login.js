import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import {
    Box,
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
    Alert,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@material-ui/core";
import FacebookIcon from "src/icons/Facebook";
import GoogleIcon from "src/icons/Google";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const [signinError, setSigninError] = useState("");
    const { setAuthState } = useContext(AuthContext);
    const [role, setRole] = useState("student");

    const onSelectRole = (event) => {
        setRole(event.target.value);
    };

    const getLoginUrl = (roleVar) => {
        if (roleVar === "student") {
            return "http://localhost:3001/student/login";
        } else if (roleVar === "tutor") {
            return "http://localhost:3001/tutor/login";
        } else if (roleVar === "admin") {
            return "http://localhost:3001/student/login";
        } else {
        }
    };

    const onClickSignin = (values, setSubmitting) => {
        const data = {
            email: values.email,
            password: values.password,
        };

        setSigninError("");
        setSubmitting(true);
        axios
            .post(getLoginUrl(role), data)
            .then((response) => {
                setSubmitting(false);
                if (response.data.state === "success") {
                    localStorage.setItem(
                        "accessToken",
                        response.data.data.token
                    );
                    setAuthState({
                        email: response.data.data.email,
                        uid: response.data.data.uid,
                        role: response.data.data.role,
                        status: true,
                    });
                    console.log({ state: "success", result: response });
                    navigate("/app/dashboard", { replace: true });
                } else {
                    setSigninError(response.data.message);
                    console.log({ state: "error", result: response });
                }
            })
            .catch((error) => {
                setSubmitting(false);
                setSigninError(error.message);
                console.log({ state: "error", result: error });
            });
    };

    return (
        <>
            <Helmet>
                <title>Login | Material Kit</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="sm">
                    <Formik
                        initialValues={{
                            email: "demo@devias.io",
                            password: "Password123",
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email("Must be a valid email")
                                .max(255)
                                .required("Email is required"),
                            password: Yup.string()
                                .max(255)
                                .required("Password is required"),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            onClickSignin(values, setSubmitting);
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="h2"
                                    >
                                        Sign in
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Sign in on the internal platform
                                    </Typography>
                                </Box>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Button
                                            color="primary"
                                            fullWidth
                                            startIcon={<FacebookIcon />}
                                            onClick={handleSubmit}
                                            size="large"
                                            variant="contained"
                                        >
                                            Login with Facebook
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Button
                                            fullWidth
                                            startIcon={<GoogleIcon />}
                                            onClick={handleSubmit}
                                            size="large"
                                            variant="contained"
                                        >
                                            Login with Google
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                        pb: 1,
                                        pt: 3,
                                    }}
                                >
                                    <Typography
                                        align="center"
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        or login with email address
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        pb: 1,
                                        pt: 1,
                                    }}
                                >
                                    <FormControl
                                        component="fieldset"
                                        margin="dense"
                                    >
                                        <RadioGroup
                                            aria-label="gender"
                                            name="gender1"
                                            value={role}
                                            onChange={onSelectRole}
                                            row
                                        >
                                            <FormControlLabel
                                                value="student"
                                                control={<Radio />}
                                                label="Login as student"
                                            />
                                            <FormControlLabel
                                                value="tutor"
                                                control={<Radio />}
                                                label="Login as tutor"
                                            />
                                            <FormControlLabel
                                                value="admin"
                                                control={<Radio />}
                                                label="Login as admin"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <TextField
                                    error={Boolean(
                                        touched.email && errors.email
                                    )}
                                    fullWidth
                                    helperText={touched.email && errors.email}
                                    label="Email Address"
                                    margin="normal"
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="email"
                                    value={values.email}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(
                                        touched.password && errors.password
                                    )}
                                    fullWidth
                                    helperText={
                                        touched.password && errors.password
                                    }
                                    label="Password"
                                    margin="normal"
                                    name="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="password"
                                    value={values.password}
                                    variant="outlined"
                                />
                                {signinError && signinError !== "" && (
                                    <Alert severity="error" variant="outlined">
                                        {signinError}
                                    </Alert>
                                )}
                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign in now
                                    </Button>
                                </Box>
                                {role === "student" && (
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Don&apos;t have an account?{" "}
                                        <Link
                                            component={RouterLink}
                                            to="/register"
                                            variant="h6"
                                        >
                                            Sign up
                                        </Link>
                                    </Typography>
                                )}
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
};

export default Login;
