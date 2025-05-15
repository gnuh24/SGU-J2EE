package com.sgu.backend.services;

import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.dto.request.ticket.TicketUpdateForm;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TicketService {
    Ticket create(TicketCreateForm form);
    TicketResponseDTO update(String id, TicketUpdateForm form);
    TicketResponseDTO getDTOById(String id);
	Ticket getById(String id);
	List<Ticket> getByScheduleId(String scheduleId);
    Page<TicketResponseDTO> getAll(Pageable pageable, TicketFilter filter);
}
