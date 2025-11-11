import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tickets";

class TicketService {
  getAllTickets() {
    return axios.get(BASE_URL);
  }

  getTicketById(id) {
    return axios.get(`${BASE_URL}/${id}`);
  }

  createTicket(ticket) {
    return axios.post(BASE_URL, ticket);
  }

  updateTicket(id, ticket) {
    return axios.put(`${BASE_URL}/${id}`, ticket);
  }

  deleteTicket(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
}

export default new TicketService();
