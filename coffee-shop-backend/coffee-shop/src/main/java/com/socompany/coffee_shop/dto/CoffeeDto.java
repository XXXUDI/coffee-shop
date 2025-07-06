package com.socompany.coffee_shop.dto;

import java.util.List;

public record CoffeeDto(
    String id,
    String name,
    String description,
    double price,
    String imageUrl,
    List<String> tags,
    String cafeId // Reference to the cafe where this coffee is served
) {

}
