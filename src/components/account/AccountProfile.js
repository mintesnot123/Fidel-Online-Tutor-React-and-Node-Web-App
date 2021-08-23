import moment from "moment";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
} from "@material-ui/core";

const user = {
    avatar: "/static/images/avatars/avatar_6.png",
    city: "Los Angeles",
    country: "USA",
    jobTitle: "Senior Developer",
    name: "Katarina Smith",
    timezone: "GTM-7",
};

const AccountProfile = ({ profile }) => {
    var createdAtVar = profile.createdAt
        ? new Date(Date.parse(profile.createdAt.replace(/[-]/g, "/")))
        : null;    
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        sx={{
                            height: 100,
                            width: 100,
                        }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h3">
                        {`${profile.firstname} ${profile.lastname}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {`${profile.mobile_no} | ${profile.email}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {`${profile.studAddress}${
                            profile.age && ` | ${profile.age} years old`
                        }${profile.gender && ` | ${profile.gender}`}`}
                    </Typography>
                    <Typography color="textSecondary" variant="body1">
                        {`Created At ${
                            profile.createdAt && profile.createdAt
                        } `}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color="primary" fullWidth variant="text">
                    Upload picture
                </Button>
            </CardActions>
        </Card>
    );
};

export default AccountProfile;
