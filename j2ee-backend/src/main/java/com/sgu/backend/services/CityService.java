package com.sgu.backend.services;

import com.sgu.backend.dto.request.city.CityCreateForm;
import com.sgu.backend.dto.request.city.CityFilterForm;
import com.sgu.backend.dto.request.city.CityUpdateForm;
import com.sgu.backend.entities.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CityService {
    Page<City> getAllCityByAdmin(Pageable pageable, CityFilterForm form);
    List<City> getAllCityNoPaging();
    City getCityById(String cityId);
    City createCity(CityCreateForm form);
    City updateCity(String cityId, CityUpdateForm form);
}
