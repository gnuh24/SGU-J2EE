package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.coach_station.CoachStationCreateForm;
import com.sgu.backend.dto.request.coach_station.CoachStationFilterForm;
import com.sgu.backend.dto.request.coach_station.CoachStationUpdateForm;
import com.sgu.backend.entities.City;
import com.sgu.backend.entities.CoachStation;
import com.sgu.backend.repositories.CoachStationRepository;
import com.sgu.backend.services.CityService;
import com.sgu.backend.services.CoachStationService;
import com.sgu.backend.specifications.CoachStationSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoachStationServiceImpl implements CoachStationService {

    @Autowired
    private CoachStationRepository coachStationRepository;

    @Autowired
    private CityService cityService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<CoachStation> getAllCoachStationsByAdmin(Pageable pageable, CoachStationFilterForm form) {
	Specification<CoachStation> spec = CoachStationSpecification.buildWhere(form);
	return coachStationRepository.findAll(spec, pageable);
    }

    @Override
    public List<CoachStation> getAllCoachStationByCityId(String cityId) {
	return coachStationRepository.findByCityId(cityId);
    }

    @Override
    public CoachStation getCoachStationById(String coachStationId) {
	return coachStationRepository.findById(coachStationId)
		.orElseThrow(() -> new RuntimeException("CoachStation not found with id: " + coachStationId));
    }

    @Override
    public CoachStation createCoachStation(CoachStationCreateForm form) {
	// Tìm thành phố theo cityId
	City city = cityService.getCityById(form.getCityId());

	// Tạo đối tượng CoachStation từ form
	CoachStation coachStation = new CoachStation();
	coachStation.setName(form.getName());
	coachStation.setAddress(form.getAddress());
	coachStation.setCity(city);
	coachStation.setLongitude(form.getLongitude());
	coachStation.setLatitude(form.getLatitude());
	coachStation.setStatus(form.getStatus());


	// Lưu vào cơ sở dữ liệu
	return coachStationRepository.save(coachStation);
    }


    @Override
    public CoachStation updateCoachStation(String coachStationId, CoachStationUpdateForm form) {
	CoachStation coachStation = getCoachStationById(coachStationId);

	if (form.getName() != null) {
	    coachStation.setName(form.getName());
	}
	if (form.getAddress() != null) {
	    coachStation.setAddress(form.getAddress());
	}
	if (form.getLongitude() != null) {
	    coachStation.setLongitude(form.getLongitude());
	}
	if (form.getLatitude() != null) {
	    coachStation.setLatitude(form.getLatitude());
	}
	if (form.getStatus() != null) {
	    coachStation.setStatus(form.getStatus());
	}

	// Tìm thành phố theo cityId
	if (form.getCityId() != null){
	    City city = cityService.getCityById(form.getCityId());
	    coachStation.setCity(city);
	}


	return coachStationRepository.save(coachStation);
    }

}
