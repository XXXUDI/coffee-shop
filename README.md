# ☕ Coffee Shop - Coffee Delivery System

A full-featured web application for ordering and delivering coffee with the ability to select cafes, browse menus, and place orders.

## 🏗️ Project Architecture

The project consists of two main parts:
- **Backend**: Spring Boot REST API with MongoDB
- **Frontend**: React SPA with Vite

## 📁 Project Structure

```
coffee-shop/
├── coffee-shop-backend/     # Spring Boot Backend
│   └── coffee-shop/
│       ├── src/main/java/com/socompany/coffee_shop/
│       │   ├── controller/  # REST Controllers
│       │   ├── service/     # Business Logic
│       │   ├── repository/  # MongoDB Repositories
│       │   ├── model/       # Entity Models
│       │   ├── dto/         # Data Transfer Objects
│       │   └── mapper/      # Object Mappers
│       └── src/main/resources/
│           └── application.yaml # Configuration
├── coffee-shop-frontend/    # React Frontend
│   ├── src/
│   │   ├── api/            # HTTP Clients
│   │   ├── components/     # React Components
│   │   ├── pages/          # Application Pages
│   │   ├── context/        # React Context
│   │   ├── hooks/          # Custom Hooks
│   │   ├── cart/           # Cart Logic
│   │   └── routes/         # Routing
│   └── public/             # Static Resources
└── README.md
```

## 🛠️ Technologies

### Backend
- **Java 17** + **Spring Boot 3.5.3**
- **MongoDB** - Main Database
- **Maven** - Dependency Management
- **Lombok** - Reduces Boilerplate Code
- **MapStruct** - Object Mapping

### Frontend
- **React 19** + **Vite 7**
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **CSS Modules** - Styling
- **Context API** - State Management

## 🗄️ Data Model

### Cafes
```java
@Document(collection = "cafes")
public class Cafe {
    private String id;
    private String address;
}
```

### Coffee
```java
@Document(collection = "coffees")
public class Coffee {
    private String id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private List<String> tags;
    private String cafeId; // Reference to cafe
}
```

### Orders
```java
@Document(collection = "orders")
public class Order {
    private String id;
    private String cafeId;
    private String customerAddress;
    private String paymentMethod;
    private double totalPrice;
    private double deliveryFee;
    private String status;
    private Instant createdAt;
    private Instant estimatedDeliveryTime;
}
```

## 🌐 API Endpoints

### Cafes
- `GET /api/v1/cafes` - Get all cafes
- `GET /api/v1/cafes/{id}` - Get cafe by ID
- `GET /api/v1/cafes/search/{address}` - Search cafes by address

### Coffee
- `GET /api/v1/coffees/all` - Get all coffee
- `GET /api/v1/coffees/{id}` - Get coffee by ID
- `GET /api/v1/coffees/cafe/{cafeId}` - Get coffee for specific cafe
- `POST /api/v1/coffees/create` - Create new coffee
- `PUT /api/v1/coffees/update/{id}` - Update coffee
- `DELETE /api/v1/coffees/delete/{id}` - Delete coffee

### Orders
- `POST /api/v1/orders/create` - Create order
- `GET /api/v1/orders/{id}` - Get order by ID

## 🎯 Functionality

### Main User Flow:

1. **Cafe Selection** 📍
   - User selects a cafe from the list of available addresses
   - System loads coffee menu for the selected cafe

2. **Menu Browsing** ☕
   - Display list of available coffee for the selected cafe
   - Each coffee has name, description, price, image, and tags

3. **Add to Cart** 🛒
   - User can add coffee to cart
   - Ability to change item quantities

4. **Order Checkout** 📝
   - Enter delivery address
   - Select payment method (credit card, debit card, cash)
   - **Note**: Payment system is absent - only method selection

5. **Order Creation** ✅
   - Send data to backend
   - Generate and save order in MongoDB
   - Return order ID to client

6. **Success Page** 🎉
   - Display order ID
   - Order details (address, payment method, delivery time)

## 🧩 Key Components

### Backend

#### Controllers
- **CafeRestController** - Cafe management
- **CoffeeRestController** - Coffee management
- **OrderController** - Order processing

#### Services
- **CafeService** - Cafe business logic
- **CoffeeService** - Coffee business logic
- **OrderService** - Order business logic

### Frontend

#### Main Pages
- **MainPage** - Main page with menu
- **CheckoutPage** - Order checkout page
- **DeliveryResultPage** - Order result (success/error/loading)

#### Key Components
- **Header** - Header with logo and cart
- **Banner** - Banner on main page
- **CoffeeList** - Coffee list
- **CoffeeItem** - Individual coffee item
- **CartSummary** - Cart summary
- **AddressForm** - Address input form

#### Context and Hooks
- **CafeContext** - Selected cafe management
- **CartContext** - Cart management
- **useCafe** - Hook for working with cafes
- **useOrderForm** - Hook for order form

#### API Services
- **CafeService** - Cafe API interaction
- **CoffeeService** - Coffee API interaction
- **OrderService** - Order API interaction

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 18+
- MongoDB 4.4+

### Backend
```bash
cd coffee-shop-backend/coffee-shop
./mvnw spring-boot:run
```
Server will start at `http://localhost:8080`

### Frontend
```bash
cd coffee-shop-frontend
npm install
npm run dev
```
Application will start at `http://localhost:5173`

### Database
Make sure MongoDB is running on `localhost:27017`
Database: `coffee-shop`

## 🔧 Configuration

### Backend (application.yaml)
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/coffee-shop
      database: coffee-shop
server:
  port: 8080
```

### Frontend
API Base URL: `http://localhost:8080/api/v1`

## 📝 Features

- **CORS** configured for frontend domain
- **Logging** configured for all operations
- **Data validation** on backend
- **Error handling** on frontend and backend
- **Responsive design** with CSS Modules
- **TypeScript ready** (easy migration possible)

## 🎨 UI/UX

- Modern design with coffee theme
- Intuitive navigation
- Responsive layout
- Coffee icons and images
- User-friendly input forms

## 🔜 Future Enhancements

- Real payment system integration
- User authentication and authorization
- Real-time order status tracking
- Admin panel for managing cafes and menu
- Mobile application
- Map integration for delivery tracking

---

**Developer**: XXXUDI  
**Version**: 1.0.0  
**License**: MIT
