import Note from "../../models/Note.js";

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Only owner or admin can delete
    if (note.owner.toString() !== req.userId && req.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Failed to delete note." });
  }
};

export default deleteNote;
