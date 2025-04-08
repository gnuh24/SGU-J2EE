package com.sgu.backend.dto.response.city;

import com.sgu.backend.entities.City;
import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CityResponseDTO {

	private String id;
	private String name;
	private City.Status status;
    	private String createdAt ;
	    private String updatedAt ;

}
