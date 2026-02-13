const pool = require("../config/db");
const logger = require("../config/logger");

/**
 * CREATE NOTE
 */
exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw new Error("Title and content are required");
    }

    const user_id = req.user.id;

    // Insert note
    const [result] = await pool.query(
      "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
      [user_id, title, content]
    );

    // Fetch newly created note
    const [rows] = await pool.query(
      "SELECT * FROM notes WHERE id = ?",
      [result.insertId]
    );

    logger.info(`Note created by user ${user_id}`);

    res.status(201).json({
      success: true,
      note: rows[0],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET ALL NOTES (for logged-in user)
 */
exports.getNotes = async (req, res, next) => {
  console.log("Decoded user from JWT:", req.user);

  try {
    const user_id = req.user.id;

    const [notes] = await pool.query(
      "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC",
      [user_id]
    );

    res.json({
      success: true,
      notes,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET NOTE BY ID
 */
exports.getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const [rows] = await pool.query(
      "SELECT * FROM notes WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (rows.length === 0) {
      const err = new Error("Note not found");
      err.status = 404;
      throw err;
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};


/**
 * UPDATE NOTE
 */
exports.updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const user_id = req.user.id;

    const [result] = await pool.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
      [title, content, id, user_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Note not found or not yours");
    }

    logger.info(`Note ${id} updated by user ${user_id}`);

    res.json({
      success: true,
      message: "Note updated",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE NOTE
 */
exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const [result] = await pool.query(
      "DELETE FROM notes WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Note not found or not yours");
    }

    logger.info(`Note ${id} deleted by user ${user_id}`);

    res.json({
      success: true,
      message: "Note deleted",
    });
  } catch (err) {
    next(err);
  }
};
