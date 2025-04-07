package com.sgu.backend.services;

import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.OTP;

public interface EmailService {

    void sendRegistrationUserConfirm(String email, String otp);
    void sendUpdatePasswordUserConfirm(Account account, OTP otp);
    void sendUpdateEmailUserConfirm(String newEmail, OTP otp);
    void sendResetPasswordUserConfirm(String email, OTP otp);

}
