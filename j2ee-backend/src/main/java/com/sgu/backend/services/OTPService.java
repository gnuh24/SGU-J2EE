package com.sgu.backend.services;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.OTP;

public interface OTPService {

//    String getOTPForUpdateEmail(String jwtToken, String newEmail);
    String getOTPForResetPassword(String jwtToken) throws JsonProcessingException;
//
//    boolean verifyOTPAndActivateAccount(String code);
    OTP createOTP(Account account) throws JsonProcessingException;
//
    OTP getOTPByCode(String code);
    void deleteOTP(OTP otp);
}
