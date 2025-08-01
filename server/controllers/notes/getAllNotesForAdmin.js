// server/controllers/notes/getAllNotesForAdmin.js

import Note from "../../models/Note.js";

const getAllNotesForAdmin = async (req, res) => {
  try {
    const notes = await Note.find().populate("owner", "username email role");

    const formatted = notes.map((note) => ({
      _id: note._id,
      title: note.title,
      description: note.description,
      owner: note.owner || null, // contains username, email, role
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error fetching all notes for admin:", err);
    res.status(500).json({ message: "Failed to fetch notes." });
  }
};

export default getAllNotesForAdmin;
