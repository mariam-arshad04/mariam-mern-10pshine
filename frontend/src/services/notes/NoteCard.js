import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function NoteCard({ note, fetchNotes }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    setLoading(true);
    try {
      await API.delete(`/notes/${note.id}`);
      toast.success("Note deleted successfully");
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", width: "200px" }}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
      <button onClick={() => window.location.assign(`/notes/edit/${note.id}`)}>Edit</button>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default NoteCard;
