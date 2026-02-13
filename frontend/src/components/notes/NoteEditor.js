import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import RichTextEditor from "../editor/RichTextEditor"; // ✅ ADD THIS
import sidebar_bg from "../../assets/sidebar_bg.png"; 
import pencil from "../../assets/pencil.png";

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
    <div className="edit-main-page">

      <div className="sidebar">
        <h1 style={{color:"#415233"}}>NoteHive</h1>
          {/* <button onClick={() => navigate("/notes/new")} className="new-button">
            Create New Note
          </button> */}

          <div className="sidebar-bottom">
            <div className="sidebar-bottom-content">
              <div className="sidebar_bottom_written">
                <h4>Your ideas, your notes — all in one place, anytime, anywhere!</h4>
              </div>
              <div className="sidebar_bottom_image">
                <img src={sidebar_bg} alt="Edit" className="sidebar-img"></img>
              </div>
            </div>
          </div>
      </div>

      <div className="edit-place">
        <div className="edit-area">
          <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
            <img src={pencil} alt="Edit" style={{height:"100px", width:"100px"}}></img>
            <h1 style={{color:"#14825a", fontSize:"45px"}}>{id ? "EDIT NOTE" : "NEW NOTE"}</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="note-title-input"
              required
              
            />

            {/* ✅ RICH TEXT EDITOR */}
            <RichTextEditor value={content} onChange={setContent} />

            <div style={{ marginTop: "15px" }} >
              <button type="submit" className="update-create-cancel-btn">
                {id ? "Update Note" : "Create Note"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="update-create-cancel-btn"
                style={{ marginLeft: "10px" }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;
