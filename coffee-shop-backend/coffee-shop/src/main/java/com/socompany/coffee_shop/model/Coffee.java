package com.socompany.coffee_shop.model;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "coffees")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Coffee {

    private String id;
    private String name;
    private String description;
    private double price;
    private String imageUrl;
    private List<String> tags;
    private String cafeId; // Reference to the cafe where this coffee is served
}
