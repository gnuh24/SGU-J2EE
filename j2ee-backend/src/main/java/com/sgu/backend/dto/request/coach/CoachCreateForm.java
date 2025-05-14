package com.sgu.backend.dto.request.coach;

import com.sgu.backend.dto.request.seat.SeatCreateForm;
import com.sgu.backend.entities.Coach;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CoachCreateForm {

    @NotBlank
    private String licensePlate;

    @NotNull
    private Coach.CoachStatus status;
}
