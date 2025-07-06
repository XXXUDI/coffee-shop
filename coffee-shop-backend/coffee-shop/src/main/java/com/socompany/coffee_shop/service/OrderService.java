package com.socompany.coffee_shop.service;

import com.socompany.coffee_shop.dto.OrderDto;
import com.socompany.coffee_shop.mapper.OrderMapper;
import com.socompany.coffee_shop.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;


    @Transactional
    public OrderDto createOrder(OrderDto dto) {
        var order = orderMapper.toEntity(dto);
        order.setStatus("pending");
        order.setCreatedAt(Instant.now());
        return orderMapper.toDto(orderRepository.save(order));
    }

    public Optional<OrderDto> getOrderById(String id) {
        return Optional.ofNullable(orderRepository.findById(id)
                .map(orderMapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Order with id " + id + " not found!")));
    }
}
