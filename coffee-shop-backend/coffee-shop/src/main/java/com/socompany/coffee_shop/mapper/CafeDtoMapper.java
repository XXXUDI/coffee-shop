package com.socompany.coffee_shop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.socompany.coffee_shop.dto.CafeDto;
import com.socompany.coffee_shop.model.Cafe;

/*
 * This class is responsible for mapping between Cafe and CafeDto objects.
 * It uses MapStruct to generate the implementation at compile time.
 */

@Mapper(componentModel = "spring")
public interface CafeDtoMapper {

    @Mapping(target = "id", source = "cafe.id")
    @Mapping(target = "address", source = "cafe.address")
    CafeDto toDto(Cafe cafe);

    @Mapping(target = "id", source = "dto.id")
    @Mapping(target = "address", source = "dto.address")
    Cafe toEntity(CafeDto dto);
}
