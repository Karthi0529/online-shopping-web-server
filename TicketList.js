import React, { useState, useEffect } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";



const TicketList = () => {
const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ticketData, setTicketData] = useState({
    orderId: "",
    query: "",
    description: "",
    resolvedOn: "",
    resolution: "",
  });

  useEffect(() => {
    API.get("/api/tickets").then((res) => setTickets(res.data || []));
  }, []);

  const openModal = (ticket = null) => {
    if (ticket) {
      setEditingTicket(ticket);
      setTicketData({
        orderId: ticket.orderId,
        query: ticket.query,
        description: ticket.description,
        resolvedOn: ticket.resolvedOn
          ? new Date(ticket.resolvedOn).toISOString().slice(0, 16)
          : "",
        resolution: ticket.resolution || "",
      });
    } else {
      setEditingTicket(null);
      setTicketData({ orderId: "", query: "", description: "", resolvedOn: "", resolution: "" });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTicket) {
      API.put(`/api/tickets/${editingTicket.id}`, ticketData).then((res) => {
        setTickets(tickets.map((t) => (t.id === editingTicket.id ? res.data : t)));
        setShowModal(false);
      });
    } else {
      API.post("/api/tickets", ticketData).then((res) => {
        setTickets([...tickets, res.data]);
        setShowModal(false);
      });
    }
  };

  const handleDelete = (id) => {
    API.delete(`/api/tickets/${id}`).then(() => {
      setTickets(tickets.filter((t) => t.id !== id));
    });
  };



  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        
      <h2 style={{ color: "#1e3a8a", marginBottom: "20px" }}>🎫 Customer Support Tickets</h2>
      
      {/* Add Ticket Button */}
      <button
        onClick={() => openModal()}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        + Add Ticket
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={modalOverlayStyle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={modalContentStyle}>
            <h3 style={{ color: "#0c4a6e", marginBottom: "15px" }}>
              {editingTicket ? "✏️ Edit Ticket" : "➕ Add New Ticket"}
            </h3>
            <form
              onSubmit={handleSubmit}
              style={{ display: "grid", gap: "15px", gridTemplateColumns: "1fr 1fr" }}
            >
              <input
                type="number"
                placeholder="Order ID"
                value={ticketData.orderId}
                onChange={(e) => setTicketData({ ...ticketData, orderId: e.target.value })}
                style={inputStyle}
                required
              />
              <input
                type="text"
                placeholder="Query Type"
                value={ticketData.query}
                onChange={(e) => setTicketData({ ...ticketData, query: e.target.value })}
                style={inputStyle}
                required
              />
              <textarea
                placeholder="Description"
                value={ticketData.description}
                onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                style={{ ...inputStyle, gridColumn: "span 2" }}
              />
              <input
                type="datetime-local"
                value={ticketData.resolvedOn}
                onChange={(e) => setTicketData({ ...ticketData, resolvedOn: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Resolution"
                value={ticketData.resolution}
                onChange={(e) => setTicketData({ ...ticketData, resolution: e.target.value })}
                style={inputStyle}
              />
              <button type="submit" style={submitBtnStyle}>
                {editingTicket ? "Update Ticket" : "Add Ticket"}
              </button>
              <button
                type="button"
                style={cancelBtnStyle}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tickets Table */}
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Query</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Raised On</th>
            <th style={thStyle}>Resolved On</th>
            <th style={thStyle}>Resolution</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, index) => (
            <tr
              key={t.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                transition: "0.2s ease",
              }}
            >
              <td style={tdStyle}>{t.id}</td>
              <td style={tdStyle}>{t.orderId}</td>
              <td style={tdStyle}>
                <span style={queryTagStyle}>{t.query}</span>
              </td>
              <td style={tdStyle}>{t.description}</td>
              <td style={tdStyle}>{new Date(t.raisedOn).toLocaleString()}</td>
              <td style={tdStyle}>
                {t.resolvedOn ? (
                  <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                    {new Date(t.resolvedOn).toLocaleString()}
                  </span>
                ) : (
                  <span style={{ color: "#dc2626", fontWeight: "bold" }}>Pending</span>
                )}
              </td>
              <td style={tdStyle}>{t.resolution || "-"}</td>
              <td style={{ ...tdStyle, display: "flex", gap: "5px" }}>
                <button style={editBtnStyle} onClick={() => openModal(t)}>
                  Edit
                </button>
                <button style={deleteBtnStyle} onClick={() => handleDelete(t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


       <button
  onClick={() => navigate("/dashboard")}
  
  style={{
    padding: "8px 15px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight:"bold"
  }}
>
  ← Back to Dashboard
</button>
    </div>
  );
};

// Styles
const inputStyle = { padding: "10px", borderRadius: "5px", border: "1px solid #cbd5e1" };
const submitBtnStyle = {
  gridColumn: "span 1",
  padding: "10px",
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};
const cancelBtnStyle = {
  gridColumn: "span 1",
  padding: "10px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};
const thStyle = { padding: "12px" };
const tdStyle = { padding: "10px", verticalAlign: "middle" };
const tableStyle = { width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" };
const theadStyle = { backgroundColor: "#1e3a8a", color: "white", textAlign: "left" };
const editBtnStyle = { padding: "5px 12px", backgroundColor: "#fbbf24", border: "none", borderRadius: "5px", cursor: "pointer", color: "white", fontWeight: "bold" };
const deleteBtnStyle = { padding: "5px 12px", backgroundColor: "#ef4444", border: "none", borderRadius: "5px", cursor: "pointer", color: "white", fontWeight: "bold" };
const queryTagStyle = { padding: "3px 10px", borderRadius: "12px", backgroundColor: "#e0f2fe", color: "#0369a1", fontWeight: "bold", display: "inline-block" };
const modalOverlayStyle = {
  position: "fixed",
  top: 0, left: 0,
  width: "100%", height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "600px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};

export default TicketList;
