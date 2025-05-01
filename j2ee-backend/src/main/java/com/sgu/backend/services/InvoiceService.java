package com.sgu.backend.services;

import com.sgu.backend.dto.request.invoice.InvoiceCreateForm;
import com.sgu.backend.dto.request.invoice.InvoiceCreateFormByAdmin;
import com.sgu.backend.dto.request.invoice.InvoiceFilter;
import com.sgu.backend.dto.request.invoice.InvoiceUpdateForm;
import com.sgu.backend.dto.response.invoice.InvoiceResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface InvoiceService {
    InvoiceResponseDTO createByUser(InvoiceCreateForm form);
    InvoiceResponseDTO update(String id, InvoiceUpdateForm form);
    InvoiceResponseDTO getById(String id);
    void delete(String id);
    Page<InvoiceResponseDTO> getAll(Pageable pageable, InvoiceFilter filter);
    InvoiceResponseDTO createInvoiceByAdmin(InvoiceCreateFormByAdmin form);
}

