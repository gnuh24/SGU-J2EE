package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.invoice.InvoiceCreateForm;
import com.sgu.backend.dto.request.invoice.InvoiceCreateFormByAdmin;
import com.sgu.backend.dto.request.invoice.InvoiceFilter;
import com.sgu.backend.dto.request.invoice.InvoiceUpdateForm;
import com.sgu.backend.dto.response.invoice.InvoiceResponseDTO;
import com.sgu.backend.services.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/invoices")
@CrossOrigin(origins = "*")
@Tag(name = "Invoice API", description = "Quản lý hoá đơn")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @Operation(summary = "Lấy danh sách hoá đơn")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<InvoiceResponseDTO>>> getAll(Pageable pageable, InvoiceFilter filter) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách hoá đơn", invoiceService.getAll(pageable, filter)));
    }

    @Operation(summary = "Lấy hoá đơn theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<InvoiceResponseDTO>> getById(@PathVariable String id) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết hoá đơn", invoiceService.getById(id)));
    }

    @Operation(summary = "Tạo hoá đơn bởi nguười dùng")
    @PostMapping
    public ResponseEntity<ApiResponse<InvoiceResponseDTO>> createByUser(@RequestBody @Valid InvoiceCreateForm form) {
        return ResponseEntity.ok(new ApiResponse<>(201, "Tạo hoá đơn thành công", invoiceService.createByUser(form)));
    }

    @Operation(summary = "Cập nhật hoá đơn")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<InvoiceResponseDTO>> update(@PathVariable String id, @RequestBody @Valid InvoiceUpdateForm form) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật hoá đơn thành công", invoiceService.update(id, form)));
    }

    @Operation(summary = "Xoá hoá đơn")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String id) {
        invoiceService.delete(id);
        return ResponseEntity.ok(new ApiResponse<>(200, "Xoá hoá đơn thành công", null));
    }
    @Operation(summary = "Tạo hóa đơn từ Admin, bao gồm cả tạo profile mới")
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<InvoiceResponseDTO>> createInvoiceByAdmin(
            @RequestBody @Valid InvoiceCreateFormByAdmin form) {

        InvoiceResponseDTO response = invoiceService.createInvoiceByAdmin(form);
        return ResponseEntity.ok(new ApiResponse<>(200, "Tạo hóa đơn thành công (Admin)", response));
    }


}
