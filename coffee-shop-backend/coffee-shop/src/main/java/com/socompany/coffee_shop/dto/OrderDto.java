package com.socompany.coffee_shop.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String id;

    private String cafeId;
    private String customerAddress;
    private String paymentMethod;
    private double totalPrice;
    private double deliveryFee;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String status;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Instant createdAt;

    private Instant estimatedDeliveryTime;
}
