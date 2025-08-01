import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Stack,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const NoteManagementPage = () => {
  const [notes, setNotes] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes/admin/all");
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleOpenEdit = (note) => {
    setSelectedNote(note);
    setEditForm({ title: note.title, description: note.description });
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedNote(null);
    setEditForm({ title: "", description: "" });
  };

  const handleSaveEdit = async () => {
    if (!selectedNote) return;

    try {
      const res = await axiosInstance.put(
        `/notes/${selectedNote._id}`,
        editForm
      );
      setNotes((prev) =>
        prev.map((note) => (note._id === selectedNote._id ? res.data : note))
      );
      handleCloseEdit();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Manage All Notes
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>S.No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note,index) => (
              <TableRow key={note._id}>
                 <TableCell>{index+1}</TableCell>
                <TableCell>{note.title}</TableCell>
                <TableCell>{note.description}</TableCell>
                <TableCell>{note._id}</TableCell>
                <TableCell>
                  {note.owner ? (
                    <>
                      {note.owner.username} ({note.owner.role})<br />
                      <small>{note.owner.email}</small>
                    </>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEdit(note)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(note._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({ ...editForm, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoteManagementPage;
