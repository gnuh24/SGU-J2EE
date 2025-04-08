package com.sgu.backend.services;

import com.sgu.backend.dto.request.coach_station.CoachStationCreateForm;
import com.sgu.backend.dto.request.coach_station.CoachStationFilterForm;
import com.sgu.backend.dto.request.coach_station.CoachStationUpdateForm;
import com.sgu.backend.entities.CoachStation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CoachStationService {
    Page<CoachStation> getAllCoachStationsByAdmin(Pageable pageable, CoachStationFilterForm form);
    List<CoachStation> getAllCoachStationByCityId(String cityId);
    CoachStation getCoachStationById(String coachStationId);
    CoachStation createCoachStation(CoachStationCreateForm form);
    CoachStation updateCoachStation(String coachStationId, CoachStationUpdateForm form);
}
