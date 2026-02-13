import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { toast } from "react-toastify";
import "../../styles/style.css";
import Edit_image from "../../assets/Edit_image.png"; 
import trash from "../../assets/trash.png"; 

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  const getDateLabel = () => {
    // If updated_at exists and is different from created_at → edited
    if (
      note.updated_at &&
      note.created_at &&
      note.updated_at !== note.created_at
    ) {
      return {
        label: "Updated on",
        date: note.updated_at,
      };
    }
  
    // Otherwise → created only
    return {
      label: "Created on",
      date: note.created_at,
    };
  };
  

  return (
    <div className="individual-card">
      <div className="card-content-delbtn">
        <div>
          <h4>{note.title}</h4>
          <hr style={{color:"#7b9e61"}}></hr>
          {/* ✅ RENDER RICH TEXT CONTENT */}
          <div
            style={{ maxHeight: "120px", overflow: "hidden"}}
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        </div>

        <div>
            <button
              onClick={handleDelete}
              disabled={loading}
              style={{ marginLeft: "8px" }}
              className="edit-del-button"
            >
              {/* {loading ? "Deleting..." : "Delete"} */}
              <img src={trash} alt="Edit" className="edit-del-img"></img>
            </button>
        </div>
      </div>


      <div className="editbtn-date">
        <div>
          <button onClick={() => navigate(`/notes/edit/${note.id}`)} className="edit-del-button">
            {/* Edit */}
            <img src={Edit_image} alt="Edit" className="edit-del-img"></img>
          </button>
        </div>

        {/* ✅ CREATED / UPDATED DATE */}
        <div className="note-date">
          {getDateLabel().label}: {formatDate(getDateLabel().date)}
        </div>
      </div>

      

    </div>
  );
}

export default NoteCard;
