import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const UserNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes");
        setNotes(res.data);
      } catch (err) {
        setError("Failed to fetch notes");
      }
    };
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const { title, description } = noteData;
    if (!title.trim() || !description.trim()) {
      setError("Both fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/notes", noteData);
      setNotes((prev) => [ ...prev,res.data]);
      setNoteData({ title: "", description: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Create a Note
      </Typography>

      <form onSubmit={handleCreateNote}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={noteData.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          value={noteData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Note"}
        </Button>
      </form>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" mb={2}>
        My Notes
      </Typography>

      {notes.length === 0 ? (
        <Typography>No notes found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note, index) => (
                <TableRow key={note._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{note.title}</TableCell>
                  <TableCell>
                    {note.description.length > 80
                      ? note.description.slice(0, 80) + "..."
                      : note.description}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200, wordBreak: "break-word" }}>
                    {note._id}
                  </TableCell>
                  <TableCell>
                    {note.owner?.username} ({note.owner?.role})<br />
                    <Typography variant="body2" color="text.secondary">
                      {note.owner?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => navigate(`/notes/${note._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserNotesPage;
