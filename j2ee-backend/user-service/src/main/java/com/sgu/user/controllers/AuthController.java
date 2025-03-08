package com.sgu.user.controllers;


import com.sgu.user.apiresponse.ApiResponse;
import com.sgu.user.dto.request.auth.UserRegistrationForm;
import com.sgu.user.dto.request.auth.LoginRequestForm;
import com.sgu.user.dto.response.auth.AuthResponseDTO;
import com.sgu.user.dto.response.auth.RegisterResponseDTO;
import com.sgu.user.entities.Account;
import com.sgu.user.services.AccountService;
import com.sgu.user.services.AuthService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ModelMapper modelMapper;


    // Endpoint to check if email exists
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmailExists(@RequestParam String email) {
        boolean exists = accountService.isEmailExists(email);
        ApiResponse<Boolean> response = new ApiResponse<>(200, "Email existence check completed successfully", exists);
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/login")
//    public ResponseEntity<ApiResponse<AuthResponseDTO>> loginUser(
//            @RequestBody @Valid LoginRequestForm loginInputForm) {
//
//        AuthResponseDTO loginInfo = authService.login(loginInputForm);
//        return ResponseEntity.ok(new ApiResponse<>(200, "Login successful", loginInfo));
//    }

    @PostMapping("/staff-login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> loginStaff(
            @RequestBody @Valid LoginRequestForm loginInputForm) {

        AuthResponseDTO loginInfo = authService.staffLogin(loginInputForm);
        return ResponseEntity.ok(new ApiResponse<>(200, "Login successful", loginInfo));
    }

//    @PostMapping("/register")
//    public ResponseEntity<ApiResponse<RegisterResponseDTO>> createAccount(@RequestBody @Valid UserRegistrationForm form) {
//
//        // Create the account
//        Account account = accountService.createAccount(form);
//
//        // Map account entity to DTO
//        RegisterResponseDTO authResponseDTO = new RegisterResponseDTO();
//        authResponseDTO.setId(account.getId());
//        authResponseDTO.setEmail(account.getEmail());
//
//        // Return response
//        return ResponseEntity.ok(
//                new ApiResponse<>(
//                        201,
//                        "Account created successfully. Please activate your account on your  email: " + account.getEmail() ,
//                        authResponseDTO
//                )
//        );
//    }


//    @PostMapping("/send-otp-update-email")
//    public ResponseEntity<ApiResponse<String>> sendOtpForUpdateEmail(@RequestHeader("Authorization") String jwtToken,
//                                                                                                                        @ModelAttribute @Valid AccountUpdateFormForEmail form ) {
//
//        String request = otpService.getOTPForUpdateEmail(jwtToken,  form.getNewEmail());
//        return ResponseEntity.ok(
//                new ApiResponse<>(
//                        200, // HTTP status code
//                        request, // Success message
//                        null
//                )
//        );
//    }

    //    @PostMapping("/send-otp-reset-password")
//    public ResponseEntity<ApiResponse<String>> sendOtpForResetPassword(@RequestHeader("Authorization") String jwtToken ) {
//
//        String request = otpService.getOTPForResetPassword(jwtToken);
//        return ResponseEntity.ok(
//                new ApiResponse<>(
//                        200, // HTTP status code
//                        request, // Success message
//                        null
//                )
//        );
//    }
//    @PostMapping("/refresh-token")
//    public ResponseEntity<ApiResponse<AuthResponseDTO>> refreshToken(
//            @RequestHeader("Authorization") String accessToken,
//            @RequestParam("refreshToken") String refreshToken) {
//
//        // Loại bỏ "Bearer " nếu token có tiền tố này
//        if (accessToken.startsWith("Bearer ")) {
//            accessToken = accessToken.substring(7);
//        }
//
//        // Gọi service để xử lý refresh token và nhận AuthResponseDTO
//        AuthResponseDTO authResponse = authService.refreshToken(accessToken, refreshToken);
//
//        return ResponseEntity.ok(new ApiResponse<>(
//                200,
//                "Refresh token thành công",
//                authResponse
//        ));
//    }
}
