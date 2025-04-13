package com.sgu.backend.dto.request.route;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RouteUpdateForm {
    @NotNull
    private Double distance;

    @NotNull
    private Double duration;

    @NotNull
    private BigDecimal price;
}