package com.sgu.backend.dto.response.city;

import com.sgu.backend.entities.City;
import lombok.Data;

@Data
public class CityResponseDTO {

	private String id;
	private String name;
	private City.Status status;

}
