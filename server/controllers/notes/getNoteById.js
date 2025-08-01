import Note from "../../models/Note.js";

const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Only allow access if requester is the owner or an admin
    if (note.owner.toString() !== req.userId && req.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    res.status(200).json(note);
  } catch (err) {
    console.error("Error fetching note:", err);
    res.status(500).json({ message: "Failed to fetch note." });
  }
};

export default getNoteById;
