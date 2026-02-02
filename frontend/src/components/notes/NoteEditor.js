import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import RichTextEditor from "../editor/RichTextEditor"; // ✅ ADD THIS

function NoteEditor() {
  const { id } = useParams(); // edit mode if id exists
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      API.get(`/notes/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content); // ✅ HTML content loads correctly
        })
        .catch(() => toast.error("Failed to fetch note"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

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
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>{id ? "Edit Note" : "New Note"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            fontSize: "16px",
          }}
        />

        {/* ✅ RICH TEXT EDITOR */}
        <RichTextEditor value={content} onChange={setContent} />

        <div style={{ marginTop: "15px" }}>
          <button type="submit">
            {id ? "Update Note" : "Create Note"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
