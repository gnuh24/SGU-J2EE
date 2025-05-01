package com.sgu.backend.dto.request.invoice;

import com.sgu.backend.dto.request.profile.ProfileCreateForm;
import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import lombok.Data;

import java.util.List;

@Data
public class InvoiceCreateFormByAdmin {
    private String profileId;
    private Double totalAmount;

    // Thông tin tạo profile mới
    private ProfileCreateForm profile;

    // Danh sách vé
    private List<TicketCreateForm> tickets;
}
