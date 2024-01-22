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
import AnnouncementCard from "../../../../../../components/AnnouncementCard";
import {
  onQueryAnnouncement,
  onUpdate,
  onCreate,
  onDelete,
} from "./AnnouncementsDisplay.telefunc";
import { usePageContext } from "vike-react/usePageContext";

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
  const { user } = usePageContext();
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
        md={2}
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
        <Link underline="hover" color="inherit" href="/admin">
          admin
        </Link>
        <Typography color="text.primary">announcements management</Typography>
      </Breadcrumbs>

      <Grid spacing={1} container width="100%">
        <Grid item xs={12} md={2} minHeight={200}>
          <Paper
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Button
              sx={{
                width: "100%",
                height: "100%",
              }}
              variant="outlined"
              onClick={() => setOpen(true)}
            >
              <AddCircle
                sx={{
                  m: "auto",
                }}
              />
            </Button>
          </Paper>
        </Grid>
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
        <DialogTitle bgcolor="primary.main">
          {
            <Typography variant="h6">
              {id === "" ? "Create Announcement" : "Edit Announcement"}
            </Typography>
          }
        </DialogTitle>
        <DialogContent
          sx={{
            bgcolor: "background.default",
            p: 0,
          }}
        >
          <Card
            sx={{
              m: 2,
            }}
          >
            <Stack spacing={2} width="95%" mx="auto" my={3}>
              <TextField
                label="title"
                variant="filled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="content"
                multiline
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setId("");
                    setOpen(false);
                  }}
                >
                  cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={async () => {
                    if (user) {
                      if (id === "") await onCreate(title, content, user.id);
                      else await onUpdate(id, title, content);
                      setTitle("");
                      setContent("");
                      setId("");
                      const newAnnouncements = await onQueryAnnouncement();
                      setAnnouncements(newAnnouncements);
                      setOpen(false);
                    }
                  }}
                >
                  Save
                </Button>
                {id !== "" && (
                  <Button
                    variant="contained"
                    onClick={async () => {
                      if (user) {
                        await onDelete(id);
                        setTitle("");
                        setContent("");
                        setId("");
                        const newAnnouncements = await onQueryAnnouncement();
                        setAnnouncements(newAnnouncements);
                        setOpen(false);
                      }
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            </Stack>
          </Card>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default AnnouncementsDisplay;
