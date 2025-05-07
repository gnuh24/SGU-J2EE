package com.sgu.backend.dto.response.route;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sgu.backend.dto.response.coach_station.CoachStationResponseDTO;
import com.sgu.backend.entities.CoachStation;
import com.sgu.backend.entities.Route;
import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class RouteResponse {

    private String id;
    private Double distance;
    private Double duration;
    private BigDecimal price;
    private String createdAt;
    private String updatedAt;

    @JsonProperty("departure")
    private String departureStationName;

    @JsonProperty("destination")
    private String arrivalStationName;
    private Route.RouteStatus status;
}
