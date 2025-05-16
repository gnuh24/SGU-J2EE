package com.sgu.backend.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.OTP;
import com.sgu.backend.entities.Profile;
import com.sgu.backend.redis.RedisContants;
import com.sgu.backend.redis.RedisService;
import com.sgu.backend.security.JwtTokenProvider;
import com.sgu.backend.services.AccountService;
import com.sgu.backend.services.EmailService;
import com.sgu.backend.services.OTPService;
import com.sgu.backend.services.ProfileService;
import com.sgu.backend.utils.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class OTPServiceImpl implements OTPService {

//    @Autowired
//    private OTPRepository otpRepository;
		
		@Autowired
		private ProfileService profileService;

    @Autowired
    @Lazy
    private AccountService accountService;

    @Autowired
    @Lazy
    private EmailService emailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private RedisService redisService;

//    @Override
//    public String getOTPForUpdateEmail(String jwtToken, String newEmail) {
//        String oldEmail = jwtTokenProvider.getUsernameWithoutExpired(jwtToken);
//        Account account = accountService.getAccountByEmail(oldEmail);
//
//        OTP otp = createOTP(account, OTP.Category.UPDATE_EMAIL, 6);
//
//        emailService.sendUpdateEmailUserConfirm(newEmail, otp);
//
//        return "Khởi tạo mã xác thực thành công !! Hãy kiểm tra email: " + newEmail;
//    }
//
    @Override
    public String getOTPForResetPassword(String email) throws JsonProcessingException {
        Account account = accountService.getAccountByEmail(email);
		createOTP(account);

        return "Khởi tạo mã xác thực thành công !! Hãy kiểm tra email: " + account.getEmail();
    }
		
		@Override
		public OTP createOTP(Account account) throws JsonProcessingException {
			OTP otp = new OTP();
			otp.setId(IdGenerator.generateId());
			otp.setAccountId(account.getId());
			otp.setCode(IdGenerator.generateOTP());
				emailService.sendResetPasswordUserConfirm(account.getEmail(), otp);
				
				//COde dùng REDIS để lưu OTP
				// Lưu OTP vào Redis với TTL là 5 phút
				String redisKey = RedisContants.OTP_CODE + ":" + otp.getCode();
				String jsonOTP = new ObjectMapper().writeValueAsString(otp);
				redisService.set(redisKey, jsonOTP);
				
				redisService.setTimeToLive(redisKey, 500L * 60L); // TTL tính bằng giây (300 giây = 5 phút)
			return null;
		}

		@Override
		public OTP getOTPByCode(String code) {
				String redisKey = RedisContants.OTP_CODE + ":" + code;
				Object otpObject = redisService.get(redisKey);
				System.err.println(otpObject);
				if (otpObject == null) {
						throw new UsernameNotFoundException("OTP with code " + code + " not found");
				}
				try {
						String json = otpObject.toString();
						ObjectMapper mapper = new ObjectMapper();
						return mapper.readValue(json, OTP.class);
				} catch (Exception e) {
						throw new RuntimeException("Failed to convert OTP from Redis", e);
				}
		}



    @Override
    public void deleteOTP(OTP otp) {
//        otpRepository.deleteByCodeAndCategory(otp.getCode(), category);
    }


}