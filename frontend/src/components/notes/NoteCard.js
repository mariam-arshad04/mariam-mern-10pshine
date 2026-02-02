import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";

function NoteCard({ note, fetchNotes }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div
      style={{
        border: "1px solid gray",
        padding: "12px",
        width: "220px",
        borderRadius: "6px",
      }}
    >
      <h4>{note.title}</h4>

      {/* ✅ RENDER RICH TEXT CONTENT */}
      <div
        style={{ maxHeight: "120px", overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => navigate(`/notes/edit/${note.id}`)}>
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          style={{ marginLeft: "8px" }}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
