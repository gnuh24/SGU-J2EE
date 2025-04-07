package com.sgu.backend.services.impl;


import com.sgu.backend.dto.request.account.*;
import com.sgu.backend.dto.request.auth.UserRegistrationForm;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.Profile;
import com.sgu.backend.redis.RedisContants;
import com.sgu.backend.redis.RedisService;
import com.sgu.backend.security.JwtTokenProvider;
import com.sgu.backend.repositories.AccountRepository;
import com.sgu.backend.services.EmailService;
import com.sgu.backend.services.AccountService;
import com.sgu.backend.services.OTPService;
import com.sgu.backend.services.ProfileService;
import com.sgu.backend.specifications.AccountSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private OTPService otpService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RedisService redisService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account with email " + username + " not found"));
    }

    @Override
    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Account with email " + email + " not found"));
    }

    @Override
    public Account getAccountById(String id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Account with id " + id + " not found"));
    }

    @Override
    public Page<Account> getAllAccounts(Pageable pageable, AccountFilterForm filterForm) {
        Specification<Account> specification = AccountSpecification.buildWhere(filterForm);
        return accountRepository.findAll(specification, pageable);
    }

    @Override
//    @Cacheable(value = "account:email", key = "#email", unless = "#result == null")
    public boolean isEmailExists(String username) {

        if(redisService.hashExists(RedisContants.EMAIL_EXIST,username)){
            return true;
        }

        if (accountRepository.existsByEmail(username)){
            redisService.hashSet(RedisContants.EMAIL_EXIST,username,true);
            return true;
        } else {
            return false;
        }

    }


    @Override
    public Account createAccount(UserRegistrationForm userRegistrationForm, Profile profile) {
        if (isEmailExists(userRegistrationForm.getEmail())){
            throw new RuntimeException("Email :" + userRegistrationForm.getEmail() + " đã tồn tại trong hệ thống !");
        }

        Account account = new Account();
        account.setEmail(userRegistrationForm.getEmail());



        account.setPassword(passwordEncoder.encode(userRegistrationForm.getPassword()));

        Account.Role role =Account.Role.USER;


	     account.setRole(role);
         account.setProfile(profile);



        return accountRepository.save(account);
    }

    @Override
    public Account updateStatusOfAccount(String accountId, Account.Status status) {
        Account account = getAccountById(accountId);
        account.setStatus(status);
        return accountRepository.save(account);
    }

    @Override
    public Account updateRoleOfAccount(String accountId, Account.Role role) {
        Account account = getAccountById(accountId);
        account.setRole(role);
        return accountRepository.save(account);
    }


//    @Override
//    public Account updateAccount(Integer accountId, AccountUpdateForm accountUpdateForm) {
//        Account existingAccount = getAccountById(accountId);
//
//        if (accountUpdateForm.getFullname() != null) {
//            existingAccount.setFullname(accountUpdateForm.getFullname());
//        }
//        if (accountUpdateForm.getBirthday() != null) {
//            existingAccount.setBirthday(accountUpdateForm.getBirthday());
//        }
//        if (accountUpdateForm.getGender() != null) {
//            existingAccount.setGender(accountUpdateForm.getGender());
//        }
//        if (accountUpdateForm.getAvatar() != null) {
//            existingAccount.setAvatar(accountUpdateForm.getAvatar());
//        }
//
//        // Save updated account
//        return accountRepository.save(existingAccount);
//    }
//
//
//    @Override
//    public Account updatePasswordOfAccount(String jwtToken, AccountUpdateFormForPassword form) throws RuntimeException {
//
//        String email = jwtTokenProvider.getUsernameWithoutExpired(jwtToken);
//        Account account = getAccountByEmail(email);
//
//        if (!passwordEncoder.matches(form.getOldPassword(), account.getPassword())) {
//            throw new RuntimeException("Mật khẩu cũ không đúng !!");
//        }
//
//        String newPassword = passwordEncoder.encode(form.getNewPassword());
//        account.setPassword(newPassword);
//        return accountRepository.save(account);
//    }
//
//    @Override
//    public Account updateEmailOfAccount(String jwtToken, AccountUpdateFormForEmail form) throws RuntimeException {
//
//        String otpCode = form.getOtp();
//
//        OTP otp = otpService.getOTPByCode(otpCode, OTP.Category.UPDATE_EMAIL);
//
//        String oldEmail = jwtTokenProvider.getUsernameWithoutExpired(jwtToken);
//
//        if (!oldEmail.equals(otp.getAccount().getEmail())) {
//            throw new RuntimeException("Token bạn gửi không có chức năng thay đổi email của tài khoản này !!");
//        }
//
//        if (otp.getExpirationTime().isAfter(LocalDateTime.now())) {
//            Account account = getAccountByEmail(oldEmail);
//            account.setEmail(form.getNewEmail());
//            accountRepository.save(account);
//            return account;
//        } else {
//            // remove Registration User Token
//            otpService.deleteOTP(otp, OTP.Category.UPDATE_EMAIL);
//            throw new TokenExpiredException("OTP kích hoạt tài khoản của bạn đã hết hạn !!");
//
//        }
//
//    }
//
//    @Override
//    public Account resetPasswordOfAccount(String jwtToken, AccountUpdateFormForResetPassword form) throws RuntimeException {
//        String email = jwtTokenProvider.getUsernameWithoutExpired(jwtToken);
//        Account account = getAccountByEmail(email);
//
//        OTP otp = otpService.getOTPByCode(form.getOtp(), OTP.Category.RESET_PASSWORD);
//        if (!email.equals(otp.getAccount().getEmail())){
//            throw new RuntimeException("Token bạn gửi không có chức năng thay đổi email của tài khoản này !!");
//        }
//
//
//        if (otp.getExpirationTime().isAfter(LocalDateTime.now())) {
//            String newPassword = passwordEncoder.encode(form.getNewPassword());
//            account.setPassword(newPassword);
//            return accountRepository.save(account);
//        } else {
//            // remove Registration User Token
//            otpService.deleteOTP(otp, OTP.Category.RESET_PASSWORD);
//            throw new TokenExpiredException("OTP kích hoạt tài khoản của bạn đã hết hạn !!");
//
//        }
//    }
}

