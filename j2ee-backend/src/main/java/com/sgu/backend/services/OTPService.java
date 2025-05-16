package com.sgu.backend.services;


import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.OTP;

public interface OTPService {

//    String getOTPForUpdateEmail(String jwtToken, String newEmail);
    String getOTPForResetPassword(String jwtToken);
//
//    boolean verifyOTPAndActivateAccount(String code);
    OTP createOTP(Account account);
//
    OTP getOTPByCode(String code);
    void deleteOTP(OTP otp);
}
