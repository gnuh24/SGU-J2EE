package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.invoice.InvoiceCreateForm;
import com.sgu.backend.dto.request.invoice.InvoiceCreateFormByAdmin;
import com.sgu.backend.dto.request.invoice.InvoiceFilter;
import com.sgu.backend.dto.request.invoice.InvoiceUpdateForm;
import com.sgu.backend.dto.request.ticket.TicketCreateForm;
import com.sgu.backend.dto.response.invoice.InvoiceResponseDTO;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.Invoice;
import com.sgu.backend.entities.Profile;
import com.sgu.backend.repositories.InvoiceRepository;
import com.sgu.backend.repositories.ProfileRepository;
import com.sgu.backend.services.InvoiceService;
import com.sgu.backend.services.ProfileService;
import com.sgu.backend.services.TicketService;
import com.sgu.backend.specifications.InvoiceSpecification;
import com.sgu.backend.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final TicketService ticketService;
    private final ProfileService profileService;
    private final ProfileRepository profileRepository;
    private final ModelMapper modelMapper;

    @Override
    public InvoiceResponseDTO createByUser(InvoiceCreateForm form) {
        Invoice invoice = new Invoice();
        invoice.setId(IdGenerator.generateId());
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setTotalAmount(form.getTotalAmount());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account user = (Account) authentication.getPrincipal();
        invoice.setProfile(user.getProfile());

        invoiceRepository.save(invoice); // phải lưu trước để có id dùng cho ticket

        // Gọi ticketService để tạo từng vé, gắn invoiceId vào mỗi form
        List<TicketResponseDTO> ticketResponses = new ArrayList<>();
        for (TicketCreateForm ticketForm : form.getTickets()) {
            ticketForm.setInvoiceId(invoice.getId()); // gán invoiceId cho ticket
            TicketResponseDTO ticketDTO = ticketService.create(ticketForm);
            ticketResponses.add(ticketDTO);
        }

        // Nếu InvoiceResponseDTO của bạn có danh sách tickets thì bạn cần set vào đây
        InvoiceResponseDTO invoiceResponse = convertToDto(invoice);
        invoiceResponse.setTickets(ticketResponses); // giả sử có setTickets()

        return invoiceResponse;
    }

    @Override
    public InvoiceResponseDTO update(String id, InvoiceUpdateForm form) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();

        if (form.getTotalAmount() != null)
            invoice.setTotalAmount(form.getTotalAmount());

        invoiceRepository.save(invoice);
        return convertToDto(invoice);
    }

    @Override
    public InvoiceResponseDTO getById(String id) {
        return convertToDto(invoiceRepository.findById(id).orElseThrow());
    }

    @Override
    public void delete(String id) {
        invoiceRepository.deleteById(id);
    }

    @Override
    public Page<InvoiceResponseDTO> getAll(Pageable pageable, InvoiceFilter filter) {
        Page<Invoice> invoices = invoiceRepository.findAll(InvoiceSpecification.filter(filter), pageable);
        return invoices.map(invoice -> {
            InvoiceResponseDTO dto = modelMapper.map(invoice, InvoiceResponseDTO.class);
            dto.setProfileId(invoice.getProfile().getId());
            dto.setProfileFullname(invoice.getProfile().getFullname());
            return dto;
        });
    }

    private InvoiceResponseDTO convertToDto(Invoice invoice) {
        InvoiceResponseDTO dto = modelMapper.map(invoice, InvoiceResponseDTO.class);
        dto.setProfileId(invoice.getProfile().getId());
        dto.setProfileFullname(invoice.getProfile().getFullname());

        if (invoice.getTickets() != null) {
            dto.setTickets(invoice.getTickets().stream()
                    .map(ticket -> modelMapper.map(ticket, TicketResponseDTO.class))
                    .collect(Collectors.toList()));
        }

        return dto;
    }
    @Override
    public InvoiceResponseDTO createInvoiceByAdmin(InvoiceCreateFormByAdmin form) {
        Profile profile;
        if(form.getProfileId()!=null){
             profile=profileService.getProfileById(form.getProfileId());
        }else {
            // 1. Tạo profile qua service
             profile = profileService.createProfile(form.getProfile());
        }

        // 2. Tạo invoice
        Invoice invoice = new Invoice();
        invoice.setId(IdGenerator.generateId());
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setTotalAmount(form.getTotalAmount());
        invoice.setProfile(profile);
        invoiceRepository.save(invoice);

        // 3. Tạo ticket
        List<TicketResponseDTO> ticketResponses = new ArrayList<>();
        for (TicketCreateForm ticketForm : form.getTickets()) {
            ticketForm.setInvoiceId(invoice.getId());
            TicketResponseDTO ticketDTO = ticketService.create(ticketForm);
            ticketResponses.add(ticketDTO);
        }

        // 4. Trả về response
        InvoiceResponseDTO responseDTO = convertToDto(invoice);
        responseDTO.setTickets(ticketResponses);
        return responseDTO;
    }

}
