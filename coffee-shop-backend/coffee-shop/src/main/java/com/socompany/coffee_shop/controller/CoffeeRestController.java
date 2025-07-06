package com.socompany.coffee_shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.socompany.coffee_shop.dto.CoffeeDto;
import com.socompany.coffee_shop.service.CoffeeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/coffees")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CoffeeRestController {

    private final CoffeeService coffeeService;


    // Endpoint to get all coffees
    @GetMapping("/all")
    public ResponseEntity<List<CoffeeDto>> getAllCoffees() {
        log.info("Fetching all coffees");
        return ResponseEntity.ok(coffeeService.getAllCoffees());
    }

    // Endpoint to get coffee by ID
    @GetMapping("/{id}")
    public ResponseEntity<CoffeeDto> getCoffeeById(String id) {
        log.info("Fetching coffee by ID: {}", id);
        return coffeeService.getCoffeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint to get coffees by cafe ID
    @GetMapping("/cafe/{cafeId}")
    public ResponseEntity<List<CoffeeDto>> getCoffeesByCafeId(@PathVariable String cafeId) {
        log.info("Fetching coffees for cafe ID: {}", cafeId);
        return ResponseEntity.ok(coffeeService.getCoffeesByCafeId(cafeId));
    }

    // Endpoint to create a new coffee
    @PostMapping("/create")
    public ResponseEntity<CoffeeDto> createCoffee(@RequestBody CoffeeDto coffeeDto) {
        log.info("Creating new coffee: {}", coffeeDto);
        CoffeeDto createdCoffee = coffeeService.createCoffee(coffeeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCoffee);
    }

    // Endpoint to update an existing coffee
    @PutMapping("/update/{id}")
    public ResponseEntity<CoffeeDto> updateCoffee(@PathVariable String id, @RequestBody CoffeeDto coffeeDto) {
        log.info("Updating coffee with ID: {}", id);
        return coffeeService.updateCoffee(id, coffeeDto) != null
                ? ResponseEntity.ok(coffeeService.updateCoffee(id, coffeeDto))
                : ResponseEntity.notFound().build();
    }

    // Endpoint to delete a coffee by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCoffee(@PathVariable String id) {
        log.info("Deleting coffee with ID: {}", id);
        if (coffeeService.deleteCoffee(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
