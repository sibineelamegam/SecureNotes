import Note from "../../models/Note.js";

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.userId })
      .populate("owner", "username email role") // include specific fields from User
      

    res.status(200).json(notes);
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Failed to fetch notes." });
  }
};

export default getNotes;
