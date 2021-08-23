import { useState } from "react";
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

const Register = () => {
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState("");

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
            .post("http://localhost:3001/tutor/create", data, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setSubmitting(false);
                if (response.data.state === "success") {
                    console.log({ state: "success", result: response });
                    navigate("/app/admin_tutors", { replace: true });
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
                <title>Create Tutor | Fidelonline</title>
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
                                        Add Tutor
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                        variant="body2"
                                    >
                                        Use email to create new tutor account
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
                                        Create Tutor
                                    </Button>
                                </Box>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Back to see all{" "}
                                    <Link
                                        component={RouterLink}
                                        to="/app/admin_tutors"
                                        variant="h6"
                                    >
                                        Tutors
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
