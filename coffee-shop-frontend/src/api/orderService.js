import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

export default class OrderService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async createOrder(orderData) {
    try {
      const response = await this.api.post("/orders/create", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await this.api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  }
}