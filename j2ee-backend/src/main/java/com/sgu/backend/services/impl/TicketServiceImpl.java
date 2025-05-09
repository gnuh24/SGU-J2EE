package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.dto.request.ticket.TicketUpdateForm;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Ticket;
import com.sgu.backend.repositories.InvoiceRepository;
import com.sgu.backend.repositories.ScheduleRepository;
import com.sgu.backend.repositories.SeatRepository;
import com.sgu.backend.repositories.TicketRepository;
import com.sgu.backend.services.TicketService;
import com.sgu.backend.specifications.TicketSpecification;
import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
		
    private final TicketRepository ticketRepository;
    private final ScheduleRepository scheduleRepository;
    private final SeatRepository seatRepository;
    private final InvoiceRepository invoiceRepository;
    private final ModelMapper modelMapper;

    @Override
    public TicketResponseDTO create(TicketCreateForm form) {
        Ticket ticket = new Ticket();
        ticket.setId(IdGenerator.generateId());
        ticket.setSchedule(scheduleRepository.findById(form.getScheduleId()).orElseThrow());
        ticket.setSeat(seatRepository.findById(form.getSeatId()).orElseThrow());
        ticket.setInvoice(form.getInvoiceId() != null ? invoiceRepository.findById(form.getInvoiceId()).orElse(null) : null);
        ticket.setPrice(form.getPrice());
        ticket.setStatus(form.getStatus());
        return modelMapper.map(ticketRepository.save(ticket), TicketResponseDTO.class);
    }

    @Override
    public TicketResponseDTO update(String id, TicketUpdateForm form) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow();
//        if (form.getScheduleId() != null)
//            ticket.setSchedule(scheduleRepository.findById(form.getScheduleId()).orElseThrow());
//        if (form.getSeatId() != null)
//            ticket.setSeat(seatRepository.findById(form.getSeatId()).orElseThrow());
//        if (form.getInvoiceId() != null)
//            ticket.setInvoice(invoiceRepository.findById(form.getInvoiceId()).orElse(null));
//        if (form.getPrice() != null)
//            ticket.setPrice(form.getPrice());
        if (form.getStatus() != null)
            ticket.setStatus(Ticket.TicketStatus.valueOf(form.getStatus()));
        return modelMapper.map(ticketRepository.save(ticket), TicketResponseDTO.class);
    }

    @Override
    public TicketResponseDTO getDTOById(String id) {
        return modelMapper.map(ticketRepository.findById(id).orElseThrow(), TicketResponseDTO.class);
    }
		

		@Override
		public Ticket getById(String id) {
				return ticketRepository.findById(id)
						.orElseThrow(() -> new EntityNotFoundException("Ticket with id " + id + " not found"));
		}
		
		

    @Override
    public Page<TicketResponseDTO> getAll(Pageable pageable, TicketFilter filter) {
        Page<Ticket> tickets = ticketRepository.findAll(TicketSpecification.filter(filter), pageable);
	return tickets.map(ticket -> modelMapper.map(ticket, TicketResponseDTO.class));
    }
}
