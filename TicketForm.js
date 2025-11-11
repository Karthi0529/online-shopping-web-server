import React, { useEffect, useState } from "react";
import TicketService from "./TicketService";

const TicketForm = ({ onSubmit, editTicket }) => {
  const [ticket, setTicket] = useState({
    orderId: "",
    query: "",
    description: "",
    resolvedOn: "",
    resolution: "",
  });

  useEffect(() => {
    if (editTicket) {
      setTicket(editTicket);
    } else {
      setTicket({
        orderId: "",
        query: "",
        description: "",
        resolvedOn: "",
        resolution: "",
      });
    }
  }, [editTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTicket) {
      TicketService.updateTicket(editTicket.id, ticket)
        .then(() => onSubmit())
        .catch((error) => console.error("Error updating:", error));
    } else {
      TicketService.createTicket(ticket)
        .then(() => onSubmit())
        .catch((error) => console.error("Error creating:", error));
    }

    setTicket({
      orderId: "",
      query: "",
      description: "",
      resolvedOn: "",
      resolution: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-secondary">{editTicket ? "✏️ Edit Ticket" : "➕ Add New Ticket"}</h4>
      <div className="row">
        <div className="col-md-3">
          <input
            type="number"
            name="orderId"
            value={ticket.orderId}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Order ID"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="query"
            value={ticket.query}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Query Type"
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            value={ticket.description}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Description"
          />
        </div>
        <div className="col-md-4">
          <input
            type="datetime-local"
            name="resolvedOn"
            value={ticket.resolvedOn || ""}
            onChange={handleChange}
            className="form-control mb-2"
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="resolution"
            value={ticket.resolution}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Resolution"
          />
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-success mt-2">
            {editTicket ? "Update Ticket" : "Add Ticket"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TicketForm;
