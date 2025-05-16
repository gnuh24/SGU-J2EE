package com.sgu.backend.services.impl;


import com.sgu.backend.dto.request.account.*;
import com.sgu.backend.dto.request.auth.UserRegistrationForm;
import com.sgu.backend.dto.request.profile.ProfileCreateForm;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.OTP;
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
import com.sgu.backend.utils.IdGenerator;
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
    @Transactional
    public Account createAccount(UserRegistrationForm accountCreateForm) {

        Profile profile = profileService.getProfileByPhone(accountCreateForm.getPhone());
        Account account = new Account();

        if (profile == null){
            ProfileCreateForm profileCreateForm = new ProfileCreateForm();
            profileCreateForm.setEmail(accountCreateForm.getEmail());
            profileCreateForm.setFullname(accountCreateForm.getFullname());
            profileCreateForm.setPhone(accountCreateForm.getPhone());
            profile = profileService.createProfile(profileCreateForm, null);
        }else{
            profile.setFullname(accountCreateForm.getFullname());
            profile.setEmail(accountCreateForm.getEmail());
            profileService.updateProfile(profile);
        }

        account.setEmail(accountCreateForm.getEmail());
        account.setPassword(passwordEncoder.encode(accountCreateForm.getPassword()));
        account.setProfile(profile);

        account = accountRepository.save(account);

//        OTP otp = otpService.createOTP(account, OTP.Category.REGISTER, 25);
//        emailService.sendRegistrationUserConfirm(account.getEmail(), otp);
        return account;
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
	
    @Override
    public Account resetPasswordOfAccount(OTP otp, AccountUpdateFormForResetPassword form) {
        	Account account = getAccountById(otp.getAccountId());
            String newPassword = passwordEncoder.encode(form.getNewPassword());
            account.setPassword(newPassword);
            return accountRepository.save(account);
   
    }
}

