package com.sgu.backend.dto.response.position;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PositionResponseDTO {

    private String id;

    private String name;

    private BigDecimal baseSalary;

}
