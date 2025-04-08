package com.sgu.backend.dto.request.city;

import com.sgu.backend.entities.City;
import lombok.Data;

@Data
public class CityFilterForm {
    private String search;
    private City.Status status;
}
