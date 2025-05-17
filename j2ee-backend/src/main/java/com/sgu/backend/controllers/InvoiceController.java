package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.invoice.InvoiceCreateForm;
import com.sgu.backend.dto.request.invoice.InvoiceCreateFormByAdmin;
import com.sgu.backend.dto.request.invoice.InvoiceFilter;
import com.sgu.backend.dto.request.invoice.InvoiceUpdateForm;
import com.sgu.backend.dto.response.invoice.InvoiceDetailResponseDTO;
import com.sgu.backend.dto.response.invoice.InvoicePdfExporter;
import com.sgu.backend.dto.response.invoice.InvoiceResponseDTO;
import com.sgu.backend.entities.Invoice;
import com.sgu.backend.entities.Profile;
import com.sgu.backend.external.vnpay.VNPAYService;
import com.sgu.backend.services.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * InvoiceController is responsible for handling all invoice-related requests.
 * This includes actions such as getting, creating, updating, and managing invoices.
 */
@RestController
@RequestMapping("/invoices")
@CrossOrigin(origins = "*")
@Tag(name = "Invoice API", description = "Quản lý hoá đơn")
public class InvoiceController {
		
		@Autowired
		private InvoiceService invoiceService;
		
		@Autowired
		private ModelMapper modelMapper;
		
		@Autowired
		private VNPAYService vnpayService;
		
		/**
		 * Get all invoices with pagination and optional filtering.
		 *
		 * @param pageable the pagination information
		 * @param filter   the filters applied to the list of invoices
		 * @return a paginated list of invoice response DTOs
		 */
		@Operation(summary = "Lấy danh sách hoá đơn", description = "Lấy danh sách hoá đơn có phân trang và bộ lọc.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<InvoiceResponseDTO>>> getAll(Pageable pageable, InvoiceFilter filter) {
				return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách hoá đơn", invoiceService.getAll(pageable, filter)));
		}
		
		
		@Operation(summary = "Lấy danh sách hoá đơn", description = "Lấy danh sách hoá đơn có phân trang và bộ lọc.")
		@GetMapping("profile/{profileId}")
		public ResponseEntity<ApiResponse<List<InvoiceResponseDTO>>> getAllByProfileId(@PathVariable String profileId) {
				List<Invoice> entities = invoiceService.getAllByProfileId(profileId);
				
				List<InvoiceResponseDTO> dtoList = entities.stream()
						.map(
								(invoice) -> (
										modelMapper.map(invoice, InvoiceResponseDTO.class)
								)
						)
						.collect(Collectors.toList());
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách hoá đơn", dtoList));
		}


		
		/**
		 * Get the details of a specific invoice by its ID.
		 *
		 * @param id the ID of the invoice
		 * @return the details of the invoice
		 */
		@Operation(summary = "Lấy hoá đơn theo ID", description = "Lấy thông tin chi tiết của một hoá đơn theo ID.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<InvoiceDetailResponseDTO>> getById(@PathVariable String id) {
				Invoice invoice = invoiceService.getById(id);
				InvoiceDetailResponseDTO invoiceDetailResponseDTO = modelMapper.map(invoice, InvoiceDetailResponseDTO.class);
				return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết hoá đơn", invoiceDetailResponseDTO));
		}
		
		@GetMapping("/{id}/export-pdf")
		public void exportInvoiceToPDF(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
				// Thiết lập header để trình duyệt tải file về
				response.setContentType("application/pdf");
				String headerKey = "Content-Disposition";
				String headerValue = "attachment; filename=invoice_" + id + ".pdf";
				response.setHeader(headerKey, headerValue);
				
				// Lấy hóa đơn từ service
				Invoice invoice = invoiceService.getById(id); // đảm bảo có hàm này
				if (invoice == null) {
						response.sendError(HttpServletResponse.SC_NOT_FOUND, "Không tìm thấy hóa đơn");
						return;
				}
				
				// Xuất PDF
				InvoicePdfExporter exporter = new InvoicePdfExporter(invoice);
				exporter.export(response);
		}
		
		/**
		 * Create a new invoice by a user.
		 *
		 * @param form the form data for creating the invoice
		 * @return the created invoice
		 */
		@Operation(summary = "Tạo hoá đơn bởi người dùng", description = "Người dùng có thể tạo một hoá đơn mới.")
		@PostMapping
		public ResponseEntity<ApiResponse<InvoiceResponseDTO>> createByUser(
				@RequestBody @Valid InvoiceCreateForm form,
				HttpServletRequest request)  {
				
				Invoice invoice = invoiceService.createByUser(form);
				InvoiceResponseDTO responseDTO = modelMapper.map(invoice, InvoiceResponseDTO.class);
				
				
				if (invoice.getPaymentMethod().equals(Invoice.PaymentMethod.VNPAY)){
						String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
						String vnpayUrl = vnpayService.createOrder(request,  invoice.getTotalAmount(), invoice.getId(), baseUrl);
						responseDTO.setUrl(vnpayUrl);
				}
				
				
				return ResponseEntity.ok(new ApiResponse<>(201, "Tạo hoá đơn thành công", responseDTO));
		}
		
		@GetMapping("/vnpay-payment-return")
		public void paymentCompleted(HttpServletRequest request, HttpServletResponse response) throws IOException {
				int paymentStatus = vnpayService.orderReturn(request);
				
				String orderId = request.getParameter("vnp_OrderInfo");
				String transactionId = request.getParameter("vnp_TransactionNo");
				String paymentTime = request.getParameter("vnp_PayDate");
				String responseCode = request.getParameter("vnp_ResponseCode");
				String transactionStatus = request.getParameter("vnp_TransactionStatus");
				
				String paymentNote = vnpayService.getPaymentNote(responseCode, transactionStatus);
				Invoice.PaymentStatus paymentStatusEnum = vnpayService.getPaymentStatus(responseCode, transactionStatus);
				
				InvoiceUpdateForm orderVNPAYResponseUpdateForm = new InvoiceUpdateForm();
				orderVNPAYResponseUpdateForm.setTransactionId(transactionId);
				orderVNPAYResponseUpdateForm.setPaymentNote(paymentNote);
				orderVNPAYResponseUpdateForm.setPaymentTime(paymentTime);
				orderVNPAYResponseUpdateForm.setPaymentStatus(paymentStatusEnum);
				
				invoiceService.update(orderId, orderVNPAYResponseUpdateForm);
				
				// ✅ Redirect về Angular frontend
				response.sendRedirect("http://localhost:4200/home");
		}


		
//		/**
//		 * Update an existing invoice by its ID.
//		 *
//		 * @param id   the ID of the invoice to update
//		 * @param form the form data for updating the invoice
//		 * @return the updated invoice
//		 */
//		@Operation(summary = "Cập nhật hoá đơn", description = "Cập nhật thông tin của một hoá đơn đã tồn tại.")
//		@PutMapping("/{id}")
//		public ResponseEntity<ApiResponse<InvoiceResponseDTO>> update(@PathVariable String id, @RequestBody @Valid InvoiceUpdateForm form) {
//				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật hoá đơn thành công", invoiceService.update(id, form)));
//		}
//
		/**
		 * Create a new invoice by an admin, which includes creating a new profile.
		 * This endpoint is restricted to users with the ADMIN role.
		 *
		 * @param form the form data for creating the invoice as an admin
		 * @return the created invoice response
		 */
		@Operation(summary = "Tạo hóa đơn từ Admin, bao gồm cả tạo profile mới", description = "Admin có thể tạo hoá đơn mới và bao gồm tạo profile cho người dùng.")
		@PostMapping("/admin")
		@PreAuthorize("hasRole('ADMIN')")
		public ResponseEntity<ApiResponse<InvoiceResponseDTO>> createInvoiceByAdmin(
				@RequestBody @Valid InvoiceCreateFormByAdmin form) {
				InvoiceResponseDTO response = invoiceService.createInvoiceByAdmin(form);
				return ResponseEntity.ok(new ApiResponse<>(200, "Tạo hóa đơn thành công (Admin)", response));
		}
}
