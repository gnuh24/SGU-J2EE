package com.sgu.user.services;

import com.sgu.user.entities.Account;
import com.sgu.user.entities.OTP;

public interface EmailService {

    void sendRegistrationUserConfirm(String email, OTP otp);
    void sendUpdatePasswordUserConfirm(Account account, OTP otp);
    void sendUpdateEmailUserConfirm(String newEmail, OTP otp);
    void sendResetPasswordUserConfirm(String email, OTP otp);

}
