import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function NoteEditor() {
  const { id } = useParams(); // if editing an existing note
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      // fetch existing note
      API.get(`/notes/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
        })
        .catch((err) => toast.error("Failed to fetch note"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/notes/${id}`, { title, content });
        toast.success("Note updated!");
      } else {
        await API.post("/notes", { title, content });
        toast.success("Note created!");
      }
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save note");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Note" : "New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <ReactQuill value={content} onChange={setContent} />
        <button type="submit">{id ? "Update" : "Create"}</button>
        <button type="button" onClick={() => navigate("/dashboard")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NoteEditor;
