package com.sgu.backend.repositories;

import com.sgu.backend.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String>, JpaSpecificationExecutor<Account> {

    boolean existsByEmail(String email);

    Optional<Account> findByEmail(String email);
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}

