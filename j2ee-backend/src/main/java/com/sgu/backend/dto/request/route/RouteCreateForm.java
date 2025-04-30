package com.sgu.backend.dto.request.route;

import com.sgu.backend.entities.Route;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class RouteCreateForm {

    @NotNull
    private Double distance;

    @NotNull
    private Double duration;

    @NotNull
    private BigDecimal price;

    @NotNull
    private String departureStationId;

    @NotNull
    private String arrivalStationId;

    @NotNull
    private Route.RouteStatus status;
}
