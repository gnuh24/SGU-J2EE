package com.sgu.user.services;

import com.sgu.user.dto.request.auth.LoginRequestForm;
import com.sgu.user.dto.request.auth.UserRegistrationForm;
import com.sgu.user.dto.response.auth.AuthResponseDTO;

public interface AuthService {

  AuthResponseDTO login(LoginRequestForm request);
  boolean registration(UserRegistrationForm userRegistrationForm);
  boolean verifiOTP( String email,String otp);

    AuthResponseDTO staffLogin(LoginRequestForm request);

//    AuthResponseDTO refreshToken(String oldToken, String refreshToken);
}
