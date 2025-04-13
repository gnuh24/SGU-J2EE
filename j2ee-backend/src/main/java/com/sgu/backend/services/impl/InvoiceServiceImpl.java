package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.invoice.InvoiceCreateForm;
import com.sgu.backend.dto.request.invoice.InvoiceFilter;
import com.sgu.backend.dto.request.invoice.InvoiceUpdateForm;
import com.sgu.backend.dto.response.invoice.InvoiceResponseDTO;
import com.sgu.backend.dto.response.ticket.TicketResponseDTO;
import com.sgu.backend.entities.Account;
import com.sgu.backend.entities.Invoice;
import com.sgu.backend.repositories.AccountRepository;
import com.sgu.backend.repositories.InvoiceRepository;
import com.sgu.backend.services.InvoiceService;
import com.sgu.backend.specifications.InvoiceSpecification;
import com.sgu.backend.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    @Override
    public InvoiceResponseDTO create(InvoiceCreateForm form) {
        Invoice invoice = new Invoice();
        invoice.setId(IdGenerator.generateId());
        invoice.setIssuedAt(LocalDateTime.now());
        invoice.setTotalAmount(form.getTotalAmount());

        Account account = accountRepository.findById(form.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        invoice.setAccount(account);

        invoiceRepository.save(invoice);
        return convertToDto(invoice);
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
        return invoices.map(this::convertToDto);
    }

    private InvoiceResponseDTO convertToDto(Invoice invoice) {
        InvoiceResponseDTO dto = modelMapper.map(invoice, InvoiceResponseDTO.class);
        dto.setAccountId(invoice.getAccount().getId());
        dto.setAccountUsername(invoice.getAccount().getUsername());

        if (invoice.getTickets() != null) {
            dto.setTickets(invoice.getTickets().stream()
                    .map(ticket -> modelMapper.map(ticket, TicketResponseDTO.class))
                    .collect(Collectors.toList()));
        }

        return dto;
    }
}
