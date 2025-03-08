package com.sgu.user.services.impl;

import com.sgu.user.dto.request.auth.LoginRequestForm;
import com.sgu.user.dto.response.auth.AuthResponseDTO;
import com.sgu.user.entities.Account;
import com.sgu.user.exceptions.AuthException.AuthExceptionHandler;
import com.sgu.user.repositories.AccountRepository;
import com.sgu.user.security.JwtTokenProvider;
import com.sgu.user.services.AccountService;
import com.sgu.user.services.AuthService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthExceptionHandler authExceptionHandler;

//    @Override
//    public AuthResponseDTO login(LoginRequestForm request)  {
//
//	Account user = accountService.getAccountByEmail(request.getEmail());
//
//	if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
//	    throw new BadCredentialsException("Email hoặc mật khẩu không đúng!");
//	}
//
//	if (user.getRole() != Account.Role.USER) {
//	    throw new BadCredentialsException("Email hoặc mật khẩu không đúng!");
//	}
//
//	if (user.getStatus().toString().equals("INACTIVE")) {
//	    throw new DisabledException("Tài khoản của bạn chưa được kích hoạt, hãy kiểm tra email " + request.getEmail());
//	}
//
//	if (user.getStatus().toString().equals("BANNED")) {
//	    throw new LockedException("Tài khoản của bạn đã bị khóa! Nếu có vấn đề, vui lòng liên hệ Admin.");
//	}
//
//	// Tạo và trả về AuthResponseDTO
//	return buildAuthResponse(user);
//    }

    @Override
    public AuthResponseDTO staffLogin(LoginRequestForm request)  {
	Account user = accountService.getAccountByEmail(request.getEmail());
	if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	    throw new BadCredentialsException("Email hoặc mật khẩu không đúng!");
	}

	if (user.getStatus().toString().equals("INACTIVE")) {
	    throw new DisabledException("Tài khoản của bạn chưa được kích hoạt, hãy kiểm tra email " + request.getEmail());
	}

	if (user.getStatus().toString().equals("BANNED")) {
	    throw new LockedException("Tài khoản của bạn đã bị khóa! Nếu có vấn đề, vui lòng liên hệ Admin.");
	}

	// Tạo và trả về AuthResponseDTO
	return buildAuthResponse(user);
    }

    private AuthResponseDTO buildAuthResponse(Account user) {
	AuthResponseDTO response = new AuthResponseDTO();
	response.setId(user.getId());
	response.setEmail(user.getEmail());
	response.setRole(user.getRole().toString());

	// Tạo Token
	String jwt = jwtTokenProvider.generateToken(user);
	response.setToken(jwt);
	response.setTokenExpirationTime("30 phút");

	// Tạo Refresh Token
	String refreshToken = jwtTokenProvider.generateRefreshToken(new HashMap<>(), user);
	response.setRefreshToken(refreshToken);
	response.setRefreshTokenExpirationTime("7 ngày");

	return response;
    }

//    @Override
//    public AuthResponseDTO refreshToken(String oldToken, String refreshToken){
//
//	AuthResponseDTO response = new AuthResponseDTO();
//
//	try{
//
//	    String emailFromAccessToken = jwtTokenProvider.getUsernameWithoutExpired(oldToken);
//	    String emailFromRefreshToken = jwtTokenProvider.getUsername(refreshToken);
//
//	    if (!emailFromAccessToken.equals(emailFromRefreshToken)){
//		throw new MismatchedTokenAccountException("AccessToken và RefreshToken không khớp với cùng một tài khoản.");
//	    }
//	    //Tìm tài khoản dựa trên Email
//	    Account account = accountService.getAccountByEmail(emailFromAccessToken);
//
//	    response.setId(account.getId());
//	    response.setEmail(emailFromAccessToken);
//	    response.setRole(account.getRole().toString());
//
//	    // Tạo Token
//	    String jwt = jwtTokenProvider.generateToken(account);
//	    response.setToken(jwt);
//	    response.setTokenExpirationTime("30 phút");
//
//	    // Tạo Refresh Token
//	    response.setRefreshToken(refreshToken);
//	    response.setRefreshTokenExpirationTime("7 ngày");
//
//	} catch (ExpiredJwtException e1) {
//	    throw new TokenExpiredException("Refresh Token đã hết hạn sử dụng.");
//	} catch (SignatureException e2) {
//	    throw new InvalidJWTSignatureException("Refresh Token chứa signature không hợp lệ.");
//	} catch (UsernameNotFoundException e3) {
//	    throw new UsernameNotFound("Refresh Token chứa thông tin không tồn tại trong hệ thống.");
//	}
//
//	return response;
//    }
}
