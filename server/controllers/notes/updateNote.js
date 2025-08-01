import Note from "../../models/Note.js";

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Only owner or admin can update
    if (note.owner.toString() !== req.userId && req.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    // Apply updates
    if (title) note.title = title;
    if (description) note.description = description;

    const updatedNote = await note.save();

    // Populate owner for frontend use
    await updatedNote.populate("owner", "username email role");

    res.status(200).json(updatedNote);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Failed to update note." });
  }
};

export default updateNote;
