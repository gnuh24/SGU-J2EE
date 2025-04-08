package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.city.CityCreateForm;
import com.sgu.backend.dto.request.city.CityFilterForm;
import com.sgu.backend.dto.request.city.CityUpdateForm;
import com.sgu.backend.entities.City;
import com.sgu.backend.repositories.CityRepository;
import com.sgu.backend.services.CityService;
import com.sgu.backend.specifications.CitySpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<City> getAllCityByAdmin(Pageable pageable, CityFilterForm form) {
	Specification<City> spec = CitySpecification.buildWhere(form);
	// TODO: Implement filtering logic here
	return cityRepository.findAll(spec, pageable);
    }

    @Override
    public List<City> getAllCityNoPaging() {
	return cityRepository.findAll();
    }

    @Override
    public City getCityById(String cityId) {
	return cityRepository.findById(cityId)
		.orElseThrow(() -> new RuntimeException("City not found with id: " + cityId));
    }

    @Override
    public City createCity(CityCreateForm form) {
	City city = modelMapper.map(form, City.class);
	return cityRepository.save(city);
    }

    @Override
    public City updateCity(String cityId, CityUpdateForm form) {
	City city = getCityById(cityId);

	if (form.getName() != null){
	    city.setName(form.getName());
	}

	if (form.getStatus() != null){
	    city.setStatus(form.getStatus());
	}

	return cityRepository.save(city);
    }
}
