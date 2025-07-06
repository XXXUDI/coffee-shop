package com.socompany.coffee_shop.mapper;

import com.socompany.coffee_shop.dto.CoffeeDto;
import com.socompany.coffee_shop.model.Coffee;
import org.mapstruct.Mapper;


/** 
 * Coffee DTO Mapper 
 * This interface defines methods to convert between Coffee entities and Coffee DTOs.
 * It uses MapStruct to generate the implementation at compile time.
*/
@Mapper(componentModel = "spring")
public interface CoffeeDtoMapper {

    public CoffeeDto toDto(Coffee coffee);
    public Coffee toEntity(CoffeeDto dto);

}
