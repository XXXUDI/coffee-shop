package com.socompany.coffee_shop.repository;

import org.springframework.stereotype.Repository;

import com.socompany.coffee_shop.model.Coffee;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface CoffeeRepository extends MongoRepository<Coffee, String> {

    public List<Coffee> findByCafeId(String cafeId);
}
