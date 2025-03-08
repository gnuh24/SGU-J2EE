package com.sgu.user.dto.request.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountFilterForm {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date from;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date to;

    private String search;

    private String role;

    private String status;

}

