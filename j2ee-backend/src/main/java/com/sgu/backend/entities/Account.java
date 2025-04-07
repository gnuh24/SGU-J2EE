package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
public class Account implements UserDetails {

    @Id
    private String id = IdGenerator.generateId();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.INACTIVE;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


    // Enum Role (Viết hoa toàn bộ)
    public enum Role {
        ADMIN, USER
    }

    // Enum Status (Viết hoa toàn bộ)
    public enum Status {
        ACTIVE, INACTIVE, BANNED
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()) );
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @OneToOne
    @JoinColumn(name = "ProfileId", nullable = false)
    private Profile profile;


    @Override
    public String getUsername() {
        return this.email;
    }


}

