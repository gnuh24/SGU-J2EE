package com.sgu.user.services.impl;


import com.sgu.user.dto.request.account.*;
import com.sgu.user.dto.request.auth.UserRegistrationForm;
import com.sgu.user.entities.Account;
import com.sgu.user.entities.Position;
import com.sgu.user.entities.ProfilePosition;
import com.sgu.user.security.JwtTokenProvider;
import com.sgu.user.repositories.AccountRepository;
import com.sgu.user.services.EmailService;
import com.sgu.user.services.AccountService;
import com.sgu.user.services.OTPService;
import com.sgu.user.services.ProfileService;
import com.sgu.user.specifications.AccountSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;

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
        return accountRepository.existsByEmail(username);
    }


    @Override
    public Account createAccount(String email, Date birthday, ProfilePosition profilePosition) {
        if (isEmailExists(email)){
            throw new RuntimeException("Email :" + email + " đã tồn tại trong hệ thống !");
        }

        Account account = new Account();
        account.setEmail(email);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String formattedDate = sdf.format(birthday);

        account.setPassword(passwordEncoder.encode(formattedDate));

        Account.Role role = switch (profilePosition.getPosition().getId()) {
	    case "POS001" -> Account.Role.HR;
	    case "POS002" -> Account.Role.INVENTORY_MANAGER;
	    case "POS003" -> Account.Role.BUSINESS_MANAGER;
	    default -> null;
	};
	account.setRole(role);

        account.setProfile(profilePosition.getProfile());

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

