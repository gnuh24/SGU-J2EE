package com.sgu.backend.controllers;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.dto.request.ticket.TicketUpdateForm;
import com.sgu.backend.dto.response.ticket.TicketDetailResponseDTO;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Ticket;
import com.sgu.backend.services.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
@Tag(name = "Ticket API", description = "Quản lý vé xe")
public class TicketController {
		
		@Autowired
		private TicketService ticketService;
		
		@Autowired
		private ModelMapper modelMapper;
		
//		private final String ip = "192.168.95.216";
		
		private final String ip = "http://localhost";
		
		
		/**
		 * Lấy danh sách vé theo trang và filter
		 */
		@Operation(summary = "Lấy danh sách vé", description = "Trả về danh sách các vé xe dựa trên phân trang và bộ lọc.")
		@GetMapping
		public ResponseEntity<ApiResponse<Page<TicketResponseDTO>>> getAll(
				@Parameter(description = "Thông tin phân trang và bộ lọc cho vé")
				Pageable pageable,
				@Parameter(description = "Bộ lọc cho vé")
				TicketFilter filter) {
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách vé", ticketService.getAll(pageable, filter)));
		}
		
		/**
		 * Lấy vé theo ID
		 */
		@Operation(summary = "Lấy vé theo ID", description = "Trả về chi tiết vé theo ID của vé.")
		@GetMapping("/{id}")
		public ResponseEntity<ApiResponse<TicketDetailResponseDTO>> getById(@PathVariable String id) {
				TicketDetailResponseDTO ticket = modelMapper.map(ticketService.getById(id), TicketDetailResponseDTO.class );
				return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết vé", ticket));
		}
		
//		/**
//		 * Tạo vé
//		 */
//		@Operation(summary = "Tạo vé", description = "Tạo một vé mới.")
//		@PostMapping
//		public ResponseEntity<ApiResponse<TicketResponseDTO>> create(@RequestBody @Valid TicketCreateForm form) {
//				return ResponseEntity.ok(new ApiResponse<>(201, "Tạo vé thành công", ticketService.create(form)));
//		}
		
		/**
		 * Cập nhật trạng thái vé
		 */
		@Operation(summary = "Cập nhật trạng thái vé", description = "Cập nhật trạng thái của vé theo ID.")
		@PutMapping("/{id}/status")
		public ResponseEntity<ApiResponse<TicketResponseDTO>> update(
				@Parameter(description = "ID của vé cần cập nhật trạng thái")
				@PathVariable String id,
				@RequestBody @Valid TicketUpdateForm form) {
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật vé thành công", ticketService.update(id, form)));
		}
		
		@Operation(summary = "Cập nhật trạng thái vé", description = "Cập nhật trạng thái của vé theo ID.")
		@GetMapping("/{id}/ticket-checking")
		public ResponseEntity<ApiResponse<TicketResponseDTO>> update(
				@Parameter(description = "ID của vé cần cập nhật trạng thái")
				@PathVariable String id) throws Exception {
				
				
				Ticket ticket = ticketService.getById(id);
				
				if (!ticket.getStatus().equals(Ticket.TicketStatus.BOOKED)){
						throw new Exception("Vé đã bị hủy hoặc đã sử dụng !");
				}
				
				TicketUpdateForm form = new TicketUpdateForm();
				form.setStatus("USED");
				
				
				return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật vé thành công", ticketService.update(id, form)));
		}
		
		

		
		@GetMapping("/{id}/qrcode")
		public void generateQrCode(@PathVariable String id, HttpServletResponse response) throws IOException {
				try {
						// Dữ liệu sẽ được mã hoá (ở đây là URL tra cứu vé)
//						String data = "http://" + ip + ":4200/admin/booking/ticket-checking/" + id ;
						String data =  id ;
						
						// Tạo QR code
						QRCodeWriter qrCodeWriter = new QRCodeWriter();
						BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 300, 300);
						
						response.setContentType("image/png");
						MatrixToImageWriter.writeToStream(bitMatrix, "PNG", response.getOutputStream());
						
				} catch (WriterException e) {
						response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Không thể tạo mã QR");
				}
		}
}
