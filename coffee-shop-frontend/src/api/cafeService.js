import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

export default class CafeService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async getCafes() {
    try {
      const response = await this.api.get("/cafes");
      console.log("Cafes fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cafes:", error);
      throw error;
    }
  }
  
  async getCafeById(id) {
    try {
      const response = await this.api.get(`/cafes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching cafe with id ${id}:`, error);
      throw error;
    }
  }
}
