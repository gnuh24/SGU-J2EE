package com.sgu.backend.services;

import com.sgu.backend.dto.request.auth.LoginRequestForm;
import com.sgu.backend.dto.request.auth.UserRegistrationForm;
import com.sgu.backend.dto.response.auth.AuthResponseDTO;

public interface AuthService {

  AuthResponseDTO login(LoginRequestForm request);
  boolean registration(UserRegistrationForm userRegistrationForm);
  boolean verifiOTP( String email,String otp);

    AuthResponseDTO staffLogin(LoginRequestForm request);

    AuthResponseDTO refreshToken(String oldToken, String refreshToken);
}
