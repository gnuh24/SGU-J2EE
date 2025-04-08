package com.sgu.backend.dto.response.coach_station;

import com.sgu.backend.dto.response.city.CityResponseDTO;
import com.sgu.backend.entities.City;
import com.sgu.backend.entities.CoachStation;
import lombok.Data;

import java.math.BigDecimal;


@Data
public class CoachStationResponseDTO {

    private String id ;

    private String name;

    private String address;


    private String createdAt;

    private String updatedAt;

    private BigDecimal longitude;

    private BigDecimal latitude;

    private CoachStation.Status status ;

    private CityResponseDTO city;

}
