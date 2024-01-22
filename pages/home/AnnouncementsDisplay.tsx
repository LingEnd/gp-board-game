import { AddCircle, Delete } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Dialog,
  Grid,
  Link,
  Paper,
  Typography,
  DialogTitle,
  DialogContent,
  Card,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { Announcement } from "@prisma/client";
import React, { useState } from "react";
import AnnouncementCard from "../../components/AnnouncementCard";
import { onQueryAnnouncement } from "./AnnouncementsDisplay.telefunc";

function AnnouncementsDisplay() {
  const [announcements, setAnnouncements] = React.useState<
    Array<
      Announcement & {
        user: {
          name: string | null;
          image: string | null;
        };
      }
    >
  >([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    onQueryAnnouncement().then((announcementsAndUser) =>
      setAnnouncements(announcementsAndUser)
    );
  }, []);

  const renderAnnouncements = announcements.map((announcement) => {
    return (
      <Grid
        item
        xs={12}
        md={3}
        key={announcement.id}
        onClick={() => {
          setTitle(announcement.title);
          setContent(announcement.content);
          setId(announcement.id);
          setOpen(true);
        }}
        sx={{
          cursor: "pointer",
        }}
      >
        <AnnouncementCard announcement={announcement} />
      </Grid>
    );
  });

  return (
    <Box width="100%">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          PBG
        </Link>
        <Typography color="text.primary">Home</Typography>
      </Breadcrumbs>

      <Typography variant="h4" my={2}>
        Welcome to <strong>PBG</strong>
      </Typography>

      <Typography variant="h6" my={2}>
        Announcements
      </Typography>

      <Grid spacing={1} container width="100%">
        {renderAnnouncements}
      </Grid>

      <Dialog
        open={open}
        onClose={() => {
          setTitle("");
          setContent("");
          setId("");
          setOpen(false);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle bgcolor="primary.main">{title}</DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "background.default",
            p: 0,
          }}
        >
          <Typography
            sx={{
              m: 2,
            }}
          >
            {content}
          </Typography>
        </DialogContent>
      </Dialog>

      <Typography variant="h4" my={2}>
        Have fun!
      </Typography>
    </Box>
  );
}

export default AnnouncementsDisplay;
