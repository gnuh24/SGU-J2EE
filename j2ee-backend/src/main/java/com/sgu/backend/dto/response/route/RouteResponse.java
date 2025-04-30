package com.sgu.backend.dto.response.route;

import com.sgu.backend.dto.response.coach_station.CoachStationResponseDTO;
import com.sgu.backend.entities.CoachStation;
import com.sgu.backend.entities.Route;
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
    private CoachStationResponseDTO departureStationId;
    private CoachStationResponseDTO arrivalStationId;
    private Route.RouteStatus status;
}
