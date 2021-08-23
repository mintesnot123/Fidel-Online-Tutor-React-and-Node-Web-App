import { Helmet } from "react-helmet";
import { Box, Container, Grid, Pagination } from "@material-ui/core";
import AdminTutorToolbar from "src/components/admin/tutors/AdminTutorToolbar";
import TutorsList from "src/components/admin/tutors/TutorsList";

const ProductList = () => (
    <>
        <Helmet>
            <title>Tutors | Fidelonline</title>
        </Helmet>
        <Box
            sx={{
                backgroundColor: "background.default",
                minHeight: "100%",
                py: 3,
            }}
        >
            <Container maxWidth={false}>
                <AdminTutorToolbar />
                <Box sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} xl={12} xs={12}>
                            <TutorsList />
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 3,
                    }}
                >
                    <Pagination color="primary" count={3} size="small" />
                </Box>
            </Container>
        </Box>
    </>
);

export default ProductList;
