package com.sgu.user.services;

import com.sgu.user.dto.request.account.*;
import com.sgu.user.dto.request.auth.UserRegistrationForm;
import com.sgu.user.entities.Account;
import com.sgu.user.entities.Position;
import com.sgu.user.entities.Profile;
import com.sgu.user.entities.ProfilePosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Date;

public interface AccountService extends UserDetailsService {

    Page<Account> getAllAccounts(Pageable pageable, AccountFilterForm filterForm);

    Account getAccountByEmail(String username);

    Account getAccountById(String id);

    boolean isEmailExists(String email);

    Account createAccount(UserRegistrationForm userRegistrationForm, Profile profile);

    Account updateStatusOfAccount(String accountId, Account.Status status);

    Account updateRoleOfAccount(String accountId, Account.Role role);

}