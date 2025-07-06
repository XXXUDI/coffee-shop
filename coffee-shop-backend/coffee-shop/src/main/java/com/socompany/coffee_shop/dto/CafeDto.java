package com.socompany.coffee_shop.dto;

public record CafeDto(String id, String address) {
    // This record class is used to transfer data related to cafes
    // It contains the cafe's ID and address
    // Lombok annotations are not needed here as records automatically generate getters and constructors
}
