import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import { useNavigate } from "react-router-dom";

const ProductListToolbar = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/app/admin_tutors_create");
    };

    return (
        <Box {...props}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Button>Import</Button>
                <Button sx={{ mx: 1 }}>Export</Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleClick}
                >
                    Add tutor
                </Button>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box sx={{ maxWidth: 500 }}>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                                fontSize="small"
                                                color="action"
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search product"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ProductListToolbar;
