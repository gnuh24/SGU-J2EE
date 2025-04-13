package com.sgu.backend.repositories;

import com.sgu.backend.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface InvoiceRepository extends JpaRepository<Invoice,String> , JpaSpecificationExecutor<Invoice> {
}
