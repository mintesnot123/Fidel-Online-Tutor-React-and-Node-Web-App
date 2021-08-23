import { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Alert,
} from "@material-ui/core";

const genders = [
    {
        value: "male",
        label: "Male",
    },
    {
        value: "female",
        label: "Female",
    },
    {
        value: "none",
        label: "None",
    },
];

const AccountProfileDetails = ({ profile, setProfile, role }) => {
    const [updateResult, setUpdateResult] = useState({
        state: "success",
        message: "",
    });

    const initialValues = {
        firstname: profile && profile.firstname ? profile.firstname : "",
        lastname: profile && profile.lastname ? profile.lastname : "",
        gender: profile && profile.gender ? profile.gender : "",
        age: profile && profile.age ? profile.age : "",
        studAddress: profile && profile.studAddress ? profile.studAddress : "",
        mobile_no: profile && profile.mobile_no ? profile.mobile_no : "",
        emergency_contact:
            profile && profile.emergency_contact
                ? profile.emergency_contact
                : "",
        username: profile && profile.username ? profile.username : "",
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().max(25).required("First name is required"),
        lastname: Yup.string().max(25).required("Last name is required"),
        gender: Yup.string().max(6),
        age: Yup.number().max(150),
        studAddress: Yup.string().max(50),
        mobile_no: Yup.string().max(15),
        emergency_contact: Yup.string().max(15),
        username: Yup.string().max(25),
    });

    const onUpdateProfile = (values, setSubmitting) => {
        const profile = {
            firstname: values.firstname,
            lastname: values.lastname,
            ...(values.gender &&
                values.gender !== "" && { gender: values.gender }),
            ...(values.age && values.age !== "" && { age: Number(values.age) }),
            ...(values.studAddress &&
                values.studAddress !== "" && {
                    studAddress: values.studAddress,
                }),
            ...(values.mobile_no &&
                values.mobile_no !== "" && { mobile_no: values.mobile_no }),
            ...(values.emergency_contact &&
                values.emergency_contact !== "" && {
                    emergency_contact: values.emergency_contact,
                }),
            ...(values.username &&
                values.username !== "" && { username: values.username }),
        };
        //console.log("profile", profile);

        setUpdateResult({ state: "success", message: "" });
        setSubmitting(true);
        axios
            .put(
                role === "student"
                    ? "http://localhost:3001/student/update"
                    : "http://localhost:3001/tutor/update",
                profile,
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                setSubmitting(false);
                if (response.data.state === "success") {
                    setProfile({
                        state: "success",
                        message: "Profile read succefully",
                        data: response.data.data,
                    });
                    setUpdateResult({
                        state: "success",
                        message: response.data.message,
                    });
                    console.log({ state: "success", result: response });
                    //navigate("/app/dashboard", { replace: true });
                } else {
                    setUpdateResult({
                        state: "error",
                        message: response.data.message,
                    });
                    console.log({ state: "error", result: response });
                }
            })
            .catch((error) => {
                setSubmitting(false);
                setUpdateResult({
                    state: "error",
                    message: error.message,
                });
                console.log({ state: "error", result: error });
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onUpdateProfile(values, setSubmitting);
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
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader
                            subheader="Edit your profile."
                            title="Profile"
                        />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.firstname &&
                                                errors.firstname
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.firstname &&
                                            errors.firstname
                                        }
                                        inputProps={{ maxLength: 25 }}
                                        label="First name"
                                        margin="normal"
                                        name="firstname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstname}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.lastname && errors.lastname
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.lastname && errors.lastname
                                        }
                                        inputProps={{ maxLength: 25 }}
                                        label="Last name"
                                        margin="normal"
                                        name="lastname"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastname}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.mobile_no &&
                                                errors.mobile_no
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.mobile_no &&
                                            errors.mobile_no
                                        }
                                        inputProps={{ maxLength: 15 }}
                                        label="Phone Number"
                                        margin="normal"
                                        name="mobile_no"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.mobile_no}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.studAddress &&
                                                errors.studAddress
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.studAddress &&
                                            errors.studAddress
                                        }
                                        inputProps={{ maxLength: 50 }}
                                        label="Address"
                                        margin="normal"
                                        name="studAddress"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.studAddress}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.gender && errors.gender
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.gender && errors.gender
                                        }
                                        inputProps={{ maxLength: 6 }}
                                        select
                                        SelectProps={{ native: true }}
                                        label="Gender"
                                        margin="normal"
                                        name="gender"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.gender}
                                        variant="outlined"
                                    >
                                        {genders.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.age && errors.age
                                        )}
                                        fullWidth
                                        helperText={touched.age && errors.age}
                                        inputProps={{ maxLength: 3 }}
                                        type="number"
                                        label="Age"
                                        margin="normal"
                                        name="age"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.age}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.emergency_contact &&
                                                errors.emergency_contact
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.emergency_contact &&
                                            errors.emergency_contact
                                        }
                                        inputProps={{ maxLength: 15 }}
                                        label="Emergency contact"
                                        margin="normal"
                                        name="emergency_contact"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.emergency_contact}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        error={Boolean(
                                            touched.username && errors.username
                                        )}
                                        fullWidth
                                        helperText={
                                            touched.username && errors.username
                                        }
                                        inputProps={{ maxLength: 25 }}
                                        label="User name"
                                        margin="normal"
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.username}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        {updateResult &&
                            updateResult.message &&
                            updateResult.message !== "" && (
                                <Alert
                                    severity={updateResult.state}
                                    variant="outlined"
                                >
                                    {updateResult.message}
                                </Alert>
                            )}
                        <Divider />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                p: 2,
                            }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                Save details
                            </Button>
                        </Box>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default AccountProfileDetails;
