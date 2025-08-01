import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const NoteDetailsPage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${noteId}`);
        setNote(res.data);
      } catch (err) {
        setError("Failed to load note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axiosInstance.put(`/notes/${noteId}`, note);
      navigate("/notes");
    } catch (err) {
      setError("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/notes/${noteId}`);
      navigate("/notes");
    } catch (err) {
      setError("Failed to delete note.");
    }
  };

  if (loading) return <Typography>Loading note...</Typography>;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper sx={{ p: 3, width: "100%", maxWidth: 600 }}>
        <Typography variant="h6" mb={2}>Edit Note</Typography>

        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={note.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={note.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleUpdate} disabled={saving}>
              Update
            </Button>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default NoteDetailsPage;
