package com.sgu.backend.dto.request.profile;


import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProfilePositionCreateForm {

    	private String positionId;

	    private LocalDate startDate;
	    private LocalDate endDate;

    	private BigDecimal salaryCoefficient;
}
