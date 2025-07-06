package com.socompany.coffee_shop.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.socompany.coffee_shop.dto.CafeDto;
import com.socompany.coffee_shop.mapper.CafeDtoMapper;
import com.socompany.coffee_shop.model.Cafe;
import com.socompany.coffee_shop.repository.CafeRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CafeService {

    private final CafeRepository cafeRepository;
    private final CafeDtoMapper cafeDtoMapper;

    public List<CafeDto> getAllCafes() {
        log.info("Fetching all cafes");
        List<Cafe> cafes = cafeRepository.findAllByOrderByAddressAsc();
        return cafes.stream()
                    .map(cafeDtoMapper::toDto)
                    .collect(Collectors.toList());
    }

    public List<CafeDto> searchCafesByAddress(String address) {
        log.info("Searching cafes by address: {}", address);
        List<Cafe> cafes = cafeRepository.findByAddressContainingIgnoreCase(address);
        return cafes.stream()
                    .map(cafeDtoMapper::toDto)
                    .collect(Collectors.toList());
    }

    public Optional<CafeDto> getCafeById(String id) {
        log.info("Fetching cafe by ID: {}", id);
        return cafeRepository.findById(id)
                             .map(cafeDtoMapper::toDto);
    }


    @Transactional
    public CafeDto createCafe(CafeDto cafeDto) {
        log.info("Creating new cafe: {}", cafeDto);
        Cafe cafe = cafeDtoMapper.toEntity(cafeDto);
        Cafe savedCafe = cafeRepository.save(cafe);
        return cafeDtoMapper.toDto(savedCafe);
    }

    @Transactional
    public CafeDto updateCafe(String id, CafeDto cafeDto) {
        log.info("Updating cafe with ID: {}", id);
        return cafeRepository.findById(id)
                .map(existingCafe -> {
                    existingCafe.setAddress(cafeDto.address());
                    Cafe updatedCafe = cafeRepository.save(existingCafe);
                    return cafeDtoMapper.toDto(updatedCafe);
                })
                .orElseThrow(() -> new IllegalArgumentException("Cafe not found with ID: " + id));
    }

    @Transactional
    public void deleteCafe(String id) {
        log.info("Deleting cafe with ID: {}", id);
        if (!cafeRepository.existsById(id)) {
            throw new IllegalArgumentException("Cafe not found with ID: " + id);
        }
        cafeRepository.deleteById(id);
    }


}
