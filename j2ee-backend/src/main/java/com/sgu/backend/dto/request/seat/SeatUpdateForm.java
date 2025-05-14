package com.sgu.backend.dto.request.seat;

import com.sgu.backend.entities.Seat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SeatUpdateForm {
    @NotNull
    private Integer number;

    @NotBlank
    private String coachId;
}
