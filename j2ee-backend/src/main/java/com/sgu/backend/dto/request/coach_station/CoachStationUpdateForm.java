package com.sgu.backend.dto.request.coach_station;

import com.sgu.backend.entities.CoachStation;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CoachStationUpdateForm {

    private String name;
    private String address;
    private BigDecimal longitude;
    private BigDecimal latitude;
    private CoachStation.Status status;
    private String cityId;

}
