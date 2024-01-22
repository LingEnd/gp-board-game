import { Box, Card, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { onSubmit } from "./+Page.telefunc";
import { usePageContext } from "vike-react/usePageContext";

export default Page;

function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = usePageContext();

  return (
    <Box>
      <Card>
        <Stack spacing={2} width="80%" mx="auto" my={3}>
          <TextField
            label="title"
            variant="filled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="content"
            multiline
            minRows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={() => {
                setTitle("");
                setContent("");
              }}
            >
              reset
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (user) onSubmit(title, content, user.id);
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
