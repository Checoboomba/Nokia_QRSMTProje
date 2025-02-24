import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets")
      .then(response => setTickets(response.data))
      .catch(error => console.error("Error fetching tickets:", error));
  }, []);

  const handleStatusChange = (ticketId, newStatus) => {
    axios.post("http://localhost:5000/api/update-ticket", { ticketId, status: newStatus })
      .then(() => {
        setTickets(prevTickets =>
          prevTickets.map(ticket => ticket.ticketId === ticketId ? { ...ticket, status: newStatus } : ticket)
        );
      })
      .catch(error => console.error("Error updating status:", error));
  };

  const handleCommentChange = (ticketId, newComment) => {
    axios.post("http://localhost:5000/api/update-ticket", { ticketId, comments: newComment })
      .then(() => {
        setTickets(prevTickets =>
          prevTickets.map(ticket => ticket.ticketId === ticketId ? { ...ticket, comments: newComment } : ticket)
        );
      })
      .catch(error => console.error("Error updating comments:", error));
  };

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      axios.delete(`http://localhost:5000/api/delete-ticket/${ticketId}`)
        .then(() => {
          setTickets(prevTickets => prevTickets.filter(ticket => ticket.ticketId !== ticketId));
        })
        .catch(error => console.error("Error deleting ticket:", error));
    }
  };

  return (
    <div className="dashboard-container">
      <button className="home-button" onClick={() => navigate("/")}>Home</button>

      <h1>Manager Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Machine</th>
            <th>Date</th>
            <th>Local Time Created</th> {/* Column heading now white */}
            <th>Status</th>
            <th>Errors</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket._id}>
              <td>{ticket.ticketId}</td>
              <td>{ticket.machineNumber}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              <td>{new Date(ticket.createdAt).toLocaleTimeString()}</td> {/* Only time is displayed */}
              <td>
                <select value={ticket.status} onChange={(e) => handleStatusChange(ticket.ticketId, e.target.value)}>
                  <option value="Created">Created</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
              <td>{ticket.errors.join(", ")}</td>
              <td>
                <input
                  type="text"
                  value={ticket.comments}
                  onChange={(e) => handleCommentChange(ticket.ticketId, e.target.value)}
                  placeholder="Add comment..."
                />
              </td>
              <td>
                <button className="delete-button" onClick={() => handleDeleteTicket(ticket.ticketId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;