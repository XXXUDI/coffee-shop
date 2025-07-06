package com.socompany.coffee_shop.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.socompany.coffee_shop.dto.CafeDto;
import com.socompany.coffee_shop.service.CafeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/api/v1/cafes")
@RequiredArgsConstructor
@Slf4j
public class CafeRestController {
    
    // Injecting the CafeService to handle business logic
    private final CafeService cafeService;

    /**
     * Endpoint to get all cafes.
     * 
     * @return ResponseEntity containing a list of CafeDto objects.
     */
    @GetMapping
    public ResponseEntity<List<CafeDto>> getAllCafes() {
        log.info("Fetching all cafes");
        List<CafeDto> cafes = cafeService.getAllCafes();
        return ResponseEntity.ok(cafes);
    }

    /**
     * Endpoint to search cafes by address.
     * 
     * @param address The address to search for.
     * @return ResponseEntity containing a list of CafeDto objects matching the address.
     */
    @GetMapping("/search/{address}")
    public ResponseEntity<List<CafeDto>> searchCafesByAddress(@PathVariable String address) {
        log.info("Searching cafes by address: {}", address);
        List<CafeDto> cafes = cafeService.searchCafesByAddress(address);
        return ResponseEntity.ok(cafes);
    }

    /**
     * Endpoint to get a cafe by its ID.
     * 
     * @param id The ID of the cafe to retrieve.
     * @return ResponseEntity containing the CafeDto object if found, or an error if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CafeDto> getCafeById(@PathVariable String id) {
        log.info("Fetching cafe by ID: {}", id);
        CafeDto cafe = cafeService.getCafeById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cafe not found with ID: " + id));
        return ResponseEntity.ok(cafe);
    }

    /**
     * Endpoint to create a new cafe.
     * 
     * @param cafeDto The CafeDto object containing the details of the cafe to create.
     * @return ResponseEntity containing the created CafeDto object.
     */
    @PostMapping("/create")
    public ResponseEntity<CafeDto> createCafe(@RequestBody CafeDto cafeDto) {
        log.info("Creating new cafe: {}", cafeDto);
        CafeDto createdCafe = cafeService.createCafe(cafeDto);
        return ResponseEntity.status(201).body(createdCafe);
    }

    /**
     * Endpoint to update an existing cafe.
     * 
     * @param id The ID of the cafe to update.
     * @param cafeDto The CafeDto object containing the updated details of the cafe.
     * @return ResponseEntity containing the updated CafeDto object.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CafeDto> updateCafe(@PathVariable String id, @RequestBody CafeDto cafeDto) {
        log.info("Updating cafe with ID: {}", id);
        CafeDto updatedCafe = cafeService.updateCafe(id, cafeDto);
        return ResponseEntity.ok(updatedCafe);
    }
    
    /**
     * Endpoint to delete a cafe by its ID.
     * 
     * @param id The ID of the cafe to delete.
     * @return ResponseEntity with no content if deletion is successful.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCafe(@PathVariable String id) {
        log.info("Deleting cafe with ID: {}", id);
        cafeService.deleteCafe(id);
        return ResponseEntity.noContent().build();
    }

}
