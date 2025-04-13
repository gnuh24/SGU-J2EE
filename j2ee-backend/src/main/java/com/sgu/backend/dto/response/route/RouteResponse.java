package com.sgu.backend.dto.response.route;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RouteResponse {
    private String id;
    private Double distance;
    private Double duration;
    private BigDecimal price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}