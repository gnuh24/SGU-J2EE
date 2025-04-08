package com.sgu.backend.dto.request.coach_station;

import com.sgu.backend.entities.CoachStation;
import lombok.Data;

@Data
public class CoachStationFilterForm {

    private String search;

    private CoachStation.Status status;

}
