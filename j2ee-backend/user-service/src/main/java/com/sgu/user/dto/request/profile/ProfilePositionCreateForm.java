package com.sgu.user.dto.request.profile;


import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
public class ProfilePositionCreateForm {

    	private String positionId;

	    private LocalDate startDate;
	    private LocalDate endDate;

    	private BigDecimal salaryCoefficient;
}
