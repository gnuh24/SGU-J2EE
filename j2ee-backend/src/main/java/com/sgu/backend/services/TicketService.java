package com.sgu.backend.services;

import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.dto.request.ticket.TicketUpdateForm;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketService {
    TicketResponseDTO create(TicketCreateForm form);
    TicketResponseDTO update(String id, TicketUpdateForm form);
    TicketResponseDTO getById(String id);
    void delete(String id);
    Page<TicketResponseDTO> getAll(Pageable pageable, TicketFilter filter);
}
