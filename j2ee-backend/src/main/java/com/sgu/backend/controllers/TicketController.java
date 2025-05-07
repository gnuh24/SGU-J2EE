package com.sgu.backend.controllers;

import com.sgu.backend.apiresponse.ApiResponse;
import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.dto.request.ticket.TicketUpdateForm;
import com.sgu.backend.dto.response.ticket.TicketDetailResponseDTO;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Ticket;
import com.sgu.backend.services.TicketService;
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
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
@Tag(name = "Ticket API", description = "Quản lý vé xe")
public class TicketController {

    @Autowired
    private TicketService ticketService;
	
	@Autowired
	private ModelMapper modelMapper;

    @Operation(summary = "Lấy danh sách vé")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<TicketResponseDTO>>> getAll(Pageable pageable, TicketFilter filter) {
			System.err.println("Search được không");
        return ResponseEntity.ok(new ApiResponse<>(200, "Danh sách vé", ticketService.getAll(pageable, filter)));
    }

    @Operation(summary = "Lấy vé theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TicketDetailResponseDTO>> getById(@PathVariable String id) {
			TicketDetailResponseDTO ticket = modelMapper.map(ticketService.getById(id), TicketDetailResponseDTO.class );
        return ResponseEntity.ok(new ApiResponse<>(200, "Chi tiết vé", ticket));
    }

    @Operation(summary = "Tạo vé")
    @PostMapping
    public ResponseEntity<ApiResponse<TicketResponseDTO>> create(@RequestBody @Valid TicketCreateForm form) {
        return ResponseEntity.ok(new ApiResponse<>(201, "Tạo vé thành công", ticketService.create(form)));
    }

    @Operation(summary = "Cập nhật trạng thái vé")
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<TicketResponseDTO>> update(@PathVariable String id, @RequestBody @Valid TicketUpdateForm form) {
        return ResponseEntity.ok(new ApiResponse<>(200, "Cập nhật vé thành công", ticketService.update(id, form)));
    }


}
