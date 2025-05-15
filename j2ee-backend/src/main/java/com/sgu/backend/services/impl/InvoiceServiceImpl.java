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
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

		@Autowired
    private final InvoiceRepository invoiceRepository;
		
		@Autowired
    private final TicketService ticketService;
		
		@Autowired
    private final ProfileService profileService;
		
		@Autowired
    private final ProfileRepository profileRepository;
		
		@Autowired
    private final ModelMapper modelMapper;

    @Override
	@Transactional
    public InvoiceResponseDTO createByUser(InvoiceCreateForm form) {
        Invoice invoice = new Invoice();
        invoice.setId(IdGenerator.generateId());
        invoice.setCreatedAt(LocalDateTime.now());
        invoice.setTotalAmount(form.getTotalAmount());
		invoice.setPaymentMethod(form.getPaymentMethod());
		invoice.setPaymentStatus(Invoice.PaymentStatus.PENDING);
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Account user = (Account) authentication.getPrincipal();
			
			Profile profile = profileService.getProfileById(form.getProfileId());
        invoice.setProfile(profile);

        invoiceRepository.save(invoice); // phải lưu trước để có id dùng cho ticket

        // Gọi ticketService để tạo từng vé, gắn invoiceId vào mỗi form
        List<TicketResponseDTO> ticketResponses = new ArrayList<>();
			System.err.println("Tạo hóa đơn thành công");
        for (TicketCreateForm ticketForm : form.getTickets()) {
            ticketForm.setInvoice(invoice); // gán invoiceId cho ticket
            ticketService.create(ticketForm);
        }
			
			System.err.println("Tạo xong cả vé");

        // Nếu InvoiceResponseDTO của bạn có danh sách tickets thì bạn cần set vào đây
        InvoiceResponseDTO invoiceResponse = convertToDto(invoice);

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
    public InvoiceResponseDTO getDTOById(String id) {
        return convertToDto(invoiceRepository.findById(id).orElseThrow());
    }
		
	@Override
		public Invoice getById(String id) {
				return invoiceRepository.findById(id).orElseThrow(
						() -> new EntityNotFoundException("Invoice with id " + id + " not found")
				);
		}
		
		@Override
		public List<Invoice> getAllByProfileId(String id) {
			return invoiceRepository.findByProfile_Id(id);
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

//        // 3. Tạo ticket
//        List<TicketResponseDTO> ticketResponses = new ArrayList<>();
//        for (TicketCreateForm ticketForm : form.getTickets()) {
//            ticketForm.setInvoiceId(invoice.getId());
//            ticketService.create(ticketForm);
//        }

        // 4. Trả về response
        InvoiceResponseDTO responseDTO = convertToDto(invoice);
        return responseDTO;
    }

}
