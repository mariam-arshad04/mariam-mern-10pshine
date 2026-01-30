const pool = require("../config/db");
const logger = require("../config/logger");

exports.createNote = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) throw new Error("Title is required");
    const user_id = req.user.id;

    await pool.query("INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)", [user_id, title, content]);
    logger.info(`Note created by user ${user_id}`);

    res.status(201).json({ success: true, message: "Note created" });
  } catch (err) {
    next(err);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const [notes] = await pool.query("SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC", [user_id]);
    res.json({ success: true, notes });
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const user_id = req.user.id;

    const [result] = await pool.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?",
      [title, content, id, user_id]
    );

    if (result.affectedRows === 0) throw new Error("Note not found or not yours");

    logger.info(`Note ${id} updated by user ${user_id}`);
    res.json({ success: true, message: "Note updated" });
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const [result] = await pool.query("DELETE FROM notes WHERE id = ? AND user_id = ?", [id, user_id]);
    if (result.affectedRows === 0) throw new Error("Note not found or not yours");

    logger.info(`Note ${id} deleted by user ${user_id}`);
    res.json({ success: true, message: "Note deleted" });
  } catch (err) {
    next(err);
  }
};
