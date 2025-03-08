package com.sgu.user.controllers;

import com.sgu.user.apiresponse.ApiResponse;
import com.sgu.user.dto.request.account.AccountFilterForm;
import com.sgu.user.dto.request.account.AccountUpdateRoleForm;
import com.sgu.user.dto.request.account.AccountUpdateStatusForm;
import com.sgu.user.dto.response.account.AccountResponseForAdmin;
import com.sgu.user.entities.Account;
import com.sgu.user.security.JwtTokenProvider;
import com.sgu.user.services.AccountService;
import com.sgu.user.services.OTPService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/accounts")
@Tag(name = "Account API", description = "Quản lý tài khoản người dùng")
public class AccountController {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AccountService accountService;

    @Autowired
    private OTPService otpService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

//    /**
//     * 📌 Lấy thông tin tài khoản theo ID
//     * @param id Mã tài khoản
//     * @return Thông tin tài khoản dưới dạng DTO
//     */
//    @Operation(summary = "Lấy thông tin tài khoản theo ID", description = "Trả về chi tiết tài khoản dựa trên ID.")
//    @GetMapping("/{id}")
//    public ResponseEntity<ApiResponse<AccountResponseForUser>> getAccountById(@PathVariable String id) {
//        Account account = accountService.getAccountById(id);
//        AccountResponseForUser accountDTO = modelMapper.map(account, AccountResponseForUser.class);
//        return ResponseEntity.ok(new ApiResponse<>(200, "Account retrieved successfully", accountDTO));
//    }

    /**
     * 📌 Lấy danh sách tài khoản với phân trang và bộ lọc
     * @param pageable Phân trang dữ liệu
     * @param filterForm Bộ lọc tài khoản
     * @return Danh sách tài khoản kèm theo thông tin phân trang
     */
    @Operation(summary = "Lấy danh sách tài khoản", description = "Trả về danh sách tài khoản có hỗ trợ phân trang và lọc.")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<AccountResponseForAdmin>>> getAllAccounts(Pageable pageable,
                                                                                                                                                        AccountFilterForm filterForm) {
        Page<Account> accounts = accountService.getAllAccounts(pageable, filterForm);
        Page<AccountResponseForAdmin> accountDTOs = accounts.map(account -> modelMapper.map(account, AccountResponseForAdmin.class));

        return ResponseEntity.ok(new ApiResponse<>(200, "Account list retrieved successfully", accountDTOs));
    }

    /**
     * 📌 Cập nhật trạng thái tài khoản
     * @param accountId ID tài khoản cần cập nhật
     * @param form Trạng thái mới
     * @return Thông tin tài khoản sau khi cập nhật
     */
    @Operation(summary = "Cập nhật trạng thái tài khoản", description = "Cho phép ADMIN cập nhật trạng thái tài khoản.")
    @PatchMapping("/{accountId}/status")
    public ResponseEntity<ApiResponse<AccountResponseForAdmin>> updateAccountStatus(
            @PathVariable String accountId,
            @RequestBody @Valid AccountUpdateStatusForm form) {

        Account updatedAccount = accountService.updateStatusOfAccount(accountId, form.getStatus());
        AccountResponseForAdmin responseDTO = modelMapper.map(updatedAccount, AccountResponseForAdmin.class);

        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật trạng thái tài khoản thành công", responseDTO));
    }

    /**
     * 📌 Cập nhật vai trò tài khoản
     * @param accountId ID tài khoản cần cập nhật
     * @param form Vai trò mới
     * @return Thông tin tài khoản sau khi cập nhật
     */
    @Operation(summary = "Cập nhật vai trò tài khoản", description = "Cho phép ADMIN cập nhật vai trò tài khoản.")
    @PatchMapping("/{accountId}/role")
    public ResponseEntity<ApiResponse<AccountResponseForAdmin>> updateAccountRole(
            @PathVariable String accountId,
            @RequestBody @Valid AccountUpdateRoleForm form) {

        Account updatedAccount = accountService.updateRoleOfAccount(accountId, form.getRole());
        AccountResponseForAdmin responseDTO = modelMapper.map(updatedAccount, AccountResponseForAdmin.class);

        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật vai trò tài khoản thành công", responseDTO));
    }


}
