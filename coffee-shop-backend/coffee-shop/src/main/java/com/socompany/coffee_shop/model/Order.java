package com.socompany.coffee_shop.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    private String id; // Unique identifier for the order
    private String cafeId; // ID of the cafe where the order was placed
    private String customerAddress; // Address of the customer who placed the order
    private String paymentMethod; // Payment method used for the order
    private double totalPrice; // Total price of the order
    private double deliveryFee; // Delivery fee for the order
    private String status = "pending"; // Status of the order (e.g., "Pending", "Completed", "Cancelled")
    @CreatedDate
    private Instant createdAt; // Timestamp when the order was created
    private Instant estimatedDeliveryTime; // Estimated delivery time for the order

}
