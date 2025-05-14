package com.sgu.backend.dto.request.coach;

import com.sgu.backend.entities.Coach;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CoachUpdateForm {

    @NotBlank
    private String licensePlate;

    @NotNull
    private Coach.CoachStatus status;
}
