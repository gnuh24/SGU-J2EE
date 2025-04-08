package com.sgu.backend.dto.request.city;

import com.sgu.backend.entities.City;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CityUpdateForm {

    private String name;

    private City.Status status;

}
