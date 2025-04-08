package com.sgu.backend.dto.request.city;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CityCreateForm {
    @NotBlank(message = "City name cannot be blank")
    private String name;
}
