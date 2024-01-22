import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { Announcement } from "@prisma/client";

type Props = {
  announcement: Announcement & {
    user: {
      name: string | null;
      image: string | null;
    };
  };
};

const AnnouncementCard = ({ announcement }: Props) => {
  const { title, content, createdAt, id, user } = announcement;

  return (
    <Card
      sx={{
        height: "100%",
        borderColor: "background.paper",
        maxWidth: 400,
        borderWidth: 1,
        borderStyle: "solid",
        "&:hover": {
          borderColor: "primary.main",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        avatar={<Avatar src={user.image || undefined} />}
        title={user.name || "Anonymous"}
        subheader={
          // format createdAt as "September 14, 2016"
          new Date(createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        }
      />
      <CardContent
        sx={{
          bgcolor: "background.default",
          flex: 1,
          maxHeight: 200,
        }}
      >
        <Typography variant="h5" component="div" overflow="hidden">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" overflow="hidden">
          {content}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          bgcolor: "background.default",
        }}
      >
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;
