import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Typography,
    Alert,
} from "@material-ui/core";
import { AuthContext } from "../helpers/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState("");
    const { setAuthState } = useContext(AuthContext);

    const onClickSignup = (values, setSubmitting) => {
        const data = {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            password: values.password,
        };

        setSignupError("");
        setSubmitting(true);
        axios
            .post("http://localhost:3001/student/create", data)
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
                    setSignupError(response.data.message);
                    console.log({ state: "error", result: response });
                }
            })
            .catch((error) => {
                setSubmitting(false);
                setSignupError(error.message);
                console.log({ state: "error", result: error });
            });
    };

    return (
        <>
            <Helmet>
                <title>Register | Material Kit</title>
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
                            email: "",
                            firstName: "",
                            lastName: "",
                            password: "",
                            policy: false,
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email("Must be a valid email")
                                .max(50)
                                .required("Email is required"),
                            firstName: Yup.string()
                                .max(25)
                                .required("First name is required"),
                            lastName: Yup.string()
                                .max(25)
                                .required("Last name is required"),
                            password: Yup.string()
                                .max(32)
                                .required("password is required"),
                            policy: Yup.boolean().oneOf(
                                [true],
                                "This field must be checked"
                            ),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            onClickSignup(values, setSubmitting);
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
                                        Create new account
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Use your email to create new account
                                    </Typography>
                                </Box>
                                <TextField
                                    error={Boolean(
                                        touched.firstName && errors.firstName
                                    )}
                                    fullWidth
                                    helperText={
                                        touched.firstName && errors.firstName
                                    }
                                    label="First name"
                                    margin="normal"
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    variant="outlined"
                                />
                                <TextField
                                    error={Boolean(
                                        touched.lastName && errors.lastName
                                    )}
                                    fullWidth
                                    helperText={
                                        touched.lastName && errors.lastName
                                    }
                                    label="Last name"
                                    margin="normal"
                                    name="lastName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    variant="outlined"
                                />
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
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        display: "flex",
                                        ml: -1,
                                    }}
                                >
                                    <Checkbox
                                        checked={values.policy}
                                        name="policy"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        I have read the{" "}
                                        <Link
                                            color="primary"
                                            component={RouterLink}
                                            to="#"
                                            underline="always"
                                            variant="h6"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </Typography>
                                </Box>
                                {Boolean(touched.policy && errors.policy) && (
                                    <FormHelperText error>
                                        {errors.policy}
                                    </FormHelperText>
                                )}
                                {signupError && signupError !== "" && (
                                    <Alert severity="error" variant="outlined">
                                        {signupError}
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
                                        Sign up now
                                    </Button>
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Have an account?{" "}
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        variant="h6"
                                    >
                                        Sign in
                                    </Link>
                                </Typography>
                            </form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
};

export default Register;
