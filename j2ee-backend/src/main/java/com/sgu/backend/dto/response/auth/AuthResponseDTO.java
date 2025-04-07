package com.sgu.backend.dto.response.auth;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDTO {

    private String id;
    private String email;
    private String role;

    private String token;
    private String tokenExpirationTime;

    private String refreshToken;
    private String refreshTokenExpirationTime;

}
