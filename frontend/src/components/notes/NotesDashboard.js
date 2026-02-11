import { useEffect, useState } from "react";
import API from "../../services/api";
import NoteCard from "./NoteCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/style.css";
import sidebar_bg from "../../assets/sidebar_bg.png"; 
// import nav_logo from "../../assets/nav_logo.png"; 
import pencil from "../../assets/pencil.png"; 

function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); // 👈 ADD THIS
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data.notes);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch notes");
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  });
  

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{display: "flex", flexDirection: "row", border: "2px solid transparent"}}>
      <div className="sidebar">
        <div className="sidebar-top">
          <h1 style={{color:"#415233"}}>NoteHive</h1>
            <button onClick={() => navigate("/notes/new")} className="new-button">
              Create New Note
            </button>
            
            {/* <button onClick={() => navigate("/notes/new")} className="new-button">
              Create New Note
            </button> */}

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="filter-dropdown"
            >
              <option value="newest">Newest → Oldest</option>
              <option value="oldest">Oldest → Newest</option>
            </select>
          </div>


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

      <div className="main-board"> 
        <div className="heading-btn">
          <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
            <img src={pencil} alt="Edit" style={{height:"100px", width:"100px"}}></img>
            <h1 style={{color:"#14825a", fontSize:"45px"}}>ALL NOTES</h1>
          </div>
          <button onClick={() => navigate("/notes/new")} className="add-button">
              Add Note
          </button>
        </div>
        

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 3rem", marginTop:"20px" }}>
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                fetchNotes={fetchNotes}
              />
            ))
          ) : (
            <p>No notes yet</p>
          )}
        </div>
      </div>

      {/* <button onClick={() => navigate("/notes/new")}>
        Create New Note
      </button> */}

      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              fetchNotes={fetchNotes}
            />
          ))
        ) : (
          <p>No notes yet</p>
        )}
      </div> */}
    </div>
  );
}

export default NotesDashboard;
