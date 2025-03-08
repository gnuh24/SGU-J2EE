package com.sgu.user.dto.response.position;

import com.sgu.user.utils.IdGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PositionResponseDTO {

    private String id;

    private String name;

    private BigDecimal baseSalary;

}
