package com.sgu.backend.services.impl;

import com.sgu.backend.security.JwtTokenProvider;
import com.sgu.backend.services.AccountService;
import com.sgu.backend.services.EmailService;
import com.sgu.backend.services.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
public class OTPServiceImpl implements OTPService {

//    @Autowired
//    private OTPRepository otpRepository;

    @Autowired
    @Lazy
    private AccountService accountService;

    @Autowired
    @Lazy
    private EmailService emailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

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
//    @Override
//    public String getOTPForResetPassword(String jwtToken) {
//        String oldEmail = jwtTokenProvider.getUsernameWithoutExpired(jwtToken);
//        Account account = accountService.getAccountByEmail(oldEmail);
//
//        OTP otp = createOTP(account, OTP.Category.RESET_PASSWORD, 6);
//
//        emailService.sendResetPasswordUserConfirm(oldEmail,  otp);
//
//        return "Khởi tạo mã xác thực thành công !! Hãy kiểm tra email: " + oldEmail;
//    }
//
//    @Override
//    @Transactional
//    public boolean verifyOTPAndActivateAccount(String code) {
//
//        OTP otp = getOTPByCode(code, OTP.Category.REGISTER);
//
//        // Check if OTP is expired
//        if (otp.getExpirationTime().isBefore(LocalDateTime.now())) {
//            OTP newOTP = createOTP(otp.getAccount(), OTP.Category.REGISTER, 25);
//            emailService.sendRegistrationUserConfirm(otp.getAccount().getEmail(), newOTP);
//            deleteOTP(otp, OTP.Category.REGISTER);
//            throw new RuntimeException("OTP has expired. We have sent you a new OTP, please check email: " + newOTP.getAccount().getEmail());
//        }
//
////        accountService.updateStatusOfAccount(otp.getAccount(), Account.Status.ACTIVE);
//        deleteOTP(otp, OTP.Category.REGISTER);
//
//        return true;
//    }
//
//    @Override
//    public OTP createOTP(Account account, OTP.Category category, int length) {
//        OTP otp = new OTP();
//        otp.setAccount(account);
////        otp.setCode(IdGenerator.generateRandomCode(length));
//        otp.setCategory(category);
//        otp.setCreateTime(LocalDateTime.now());
//        otp.setExpirationTime(LocalDateTime.now().plusMinutes(5));
//        otp = otpRepository.save(otp);
//        return otp;
//    }
//
//
//    @Override
//    public OTP getOTPByCode(String code, OTP.Category category) {
//        return otpRepository.findByCodeAndCategory(code, category)
//                .orElseThrow(() -> new UsernameNotFoundException("OTP with code " + code + " not found"));
//    }
//
//    @Override
//    public void deleteOTP(OTP otp, OTP.Category category) {
//        otpRepository.deleteByCodeAndCategory(otp.getCode(), category);
//    }


}