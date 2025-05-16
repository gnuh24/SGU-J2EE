package com.sgu.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
//@Entity
public class OTP {

    private Integer id;

    private LocalDateTime createTime;

    private String code;

    private LocalDateTime expirationTime;

    private Account account;

}

