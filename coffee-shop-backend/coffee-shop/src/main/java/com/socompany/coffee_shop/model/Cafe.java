package com.socompany.coffee_shop.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "cafes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cafe {

    private String id;
    private String address;
    
}
