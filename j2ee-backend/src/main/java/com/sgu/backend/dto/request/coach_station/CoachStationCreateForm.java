package com.sgu.backend.dto.request.coach_station;

import com.sgu.backend.entities.CoachStation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CoachStationCreateForm {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Address cannot be blank")
    private String address;

    @NotBlank(message = "City ID cannot be blank")
    private String cityId;

    @NotNull(message = "Longitude cannot be null")
    private BigDecimal longitude;

    @NotNull(message = "Latitude cannot be null")
    private BigDecimal latitude;

    @NotNull(message = "Status cannot be null")
    private CoachStation.Status status;

}
