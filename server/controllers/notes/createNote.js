import Note from "../../models/Note.js";

const createNote = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  try {
    const newNote = await Note.create({
      owner: req.userId, // From verifyJWT middleware
      title,
      description,
    });

    // Populate the owner before sending the response - to fetch the User model data
    const populatedNote = await newNote.populate("owner", "username email role"); 

    res.status(201).json(populatedNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ message: "Failed to create note." });
  }
};

export default createNote;
