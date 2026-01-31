import { useEffect, useState } from "react";
import API from "../../services/api";
import NoteCard from "./NoteCard";
import { toast } from "react-toastify";

function NotesDashboard({ navigate }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes"); // GET all notes for the logged-in user
      setNotes(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <button onClick={() => navigate("/notes/new")}>Create New Note</button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {notes.length > 0 ? (
          notes.map((note) => <NoteCard key={note.id} note={note} fetchNotes={fetchNotes} />)
        ) : (
          <p>No notes yet</p>
        )}
      </div>
    </div>
  );
}

export default NotesDashboard;
