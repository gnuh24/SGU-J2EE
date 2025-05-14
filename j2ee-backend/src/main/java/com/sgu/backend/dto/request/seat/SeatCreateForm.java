package com.sgu.backend.dto.request.seat;

import com.sgu.backend.entities.Coach;
import com.sgu.backend.entities.Seat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SeatCreateForm {
		
    private Integer number;
	
    private Coach coach; // ID của Coach
}
