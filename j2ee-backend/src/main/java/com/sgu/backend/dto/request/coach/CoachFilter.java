package com.sgu.backend.dto.request.coach;

import com.sgu.backend.entities.Coach;
import lombok.Data;

@Data
public class CoachFilter {
    private String type;                    // VD: "Giường nằm"
    private Coach.CoachStatus status;      // ACTIVE, INACTIVE, MAINTENANCE
    private Integer minCapacity;
    private Integer maxCapacity;
}
