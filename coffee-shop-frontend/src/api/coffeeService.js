import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";
export default class CoffeeService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });
  }

  async getCoffeesByCafeId(cafeId) {
    try {
      const url = `/coffees/cafe/${cafeId}`;
      console.log(`Making request to: ${this.api.defaults.baseURL}${url}`);
      console.log(`Cafe ID being sent: ${cafeId}`);
      
      const response = await this.api.get(url);
      console.log(`Coffees fetched successfully for cafe ${cafeId}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching coffees for cafe ${cafeId}:`, error);
      throw error;
    }
  }

  transformCoffeeDto(coffeeDto) {
    return {
      id: coffeeDto.id,
      name: coffeeDto.name,
      description: coffeeDto.description,
      price: coffeeDto.price.toFixed(2).replace('.', ','),
      image: coffeeDto.imageUrl,
      tags: coffeeDto.tags,
      cafeId: coffeeDto.cafeId
    };
  }

  async getTransformedCoffeesByCafeId(cafeId) {
    try {
      const coffees = await this.getCoffeesByCafeId(cafeId);
      return coffees.map(coffee => this.transformCoffeeDto(coffee));
    } catch (error) {
      console.error(`Error getting transformed coffees for cafe ${cafeId}:`, error);
      throw error;
    }
  }
}
