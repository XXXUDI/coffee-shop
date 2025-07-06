package com.socompany.coffee_shop.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.socompany.coffee_shop.model.Cafe;

@Repository
public interface CafeRepository extends MongoRepository<Cafe, String> {
    // Custom query methods can be defined here if needed

    List<Cafe> findAllByOrderByAddressAsc(); // Find all cafes and sort by address in ascending order
    List<Cafe> findByAddressContainingIgnoreCase(String address); // Find cafes by address

}
