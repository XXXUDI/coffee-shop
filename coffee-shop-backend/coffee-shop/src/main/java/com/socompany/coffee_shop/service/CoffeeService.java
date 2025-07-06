package com.socompany.coffee_shop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.socompany.coffee_shop.dto.CoffeeDto;
import com.socompany.coffee_shop.mapper.CoffeeDtoMapper;
import com.socompany.coffee_shop.repository.CoffeeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class CoffeeService {

    private final CoffeeRepository coffeeRepository;
    private final CoffeeDtoMapper coffeeDtoMapper;

    /**
     * Retrieves all coffees from the repository.
     *
     * @return List of CoffeeDto objects representing all coffees.
     */
    public List<CoffeeDto> getAllCoffees() {
        log.info("Fetching all coffees");
        return coffeeRepository.findAll().stream().map(coffeeDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a coffee by its ID.
     *
     * @param id The ID of the coffee to retrieve.
     * @return Optional containing the CoffeeDto if found, or empty if not found.
     */
    public Optional<CoffeeDto> getCoffeeById(String id) {
        log.info("Fetching coffee by ID: {}", id);
        return coffeeRepository.findById(id)
                .map(coffeeDtoMapper::toDto);
    }

    /**
     * Retrieves all coffees associated with a specific cafe ID.
     *
     * @param cafeId The ID of the cafe to retrieve coffees for.
     * @return List of CoffeeDto objects representing coffees for the specified cafe.
     */
    public List<CoffeeDto> getCoffeesByCafeId(String cafeId) {
        log.info("Fetching coffees for cafe ID: {}", cafeId);
        return coffeeRepository.findByCafeId(cafeId).stream()
                .map(coffeeDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    /**
     * Creates a new coffee entry in the repository.
     *
     * @param coffeeDto The CoffeeDto object containing coffee details.
     * @return The created CoffeeDto object.
     */
    public CoffeeDto createCoffee(CoffeeDto coffeeDto) {
        log.info("Creating new coffee: {}", coffeeDto);
        return coffeeDtoMapper.toDto(
                coffeeRepository.save(coffeeDtoMapper.toEntity(coffeeDto))
        );
    }

    /**
     * Updates an existing coffee entry in the repository.
     *
     * @param id        The ID of the coffee to update.
     * @param coffeeDto The CoffeeDto object containing updated coffee details.
     * @return The updated CoffeeDto object.
     */
    public CoffeeDto updateCoffee(String id, CoffeeDto coffeeDto) {
        log.info("Updating coffee with ID: {}", id);
        return coffeeRepository.findById(id)
                .map(existingCoffee -> {
                    existingCoffee.setName(coffeeDto.name());
                    existingCoffee.setDescription(coffeeDto.description());
                    existingCoffee.setPrice(coffeeDto.price());
                    existingCoffee.setImageUrl(coffeeDto.imageUrl());
                    existingCoffee.setTags(coffeeDto.tags());
                    return coffeeDtoMapper.toDto(coffeeRepository.save(existingCoffee));
                })
                .orElseThrow(() -> new IllegalArgumentException("Coffee not found with ID: " + id));
    }

    /**
     * Deletes a coffee entry by its ID.
     *
     * @param id The ID of the coffee to delete.
     * @return true if the coffee was deleted, false if it was not found.
     */
    public boolean deleteCoffee(String id) {
        log.info("Deleting coffee with ID: {}", id);
        if (!coffeeRepository.existsById(id)) {
            return false;
        } else {
            coffeeRepository.deleteById(id);
            return true;
        }
    }
}
