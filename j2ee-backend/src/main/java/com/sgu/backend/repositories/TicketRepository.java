package com.sgu.backend.repositories;

import com.sgu.backend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TicketRepository extends JpaRepository<Ticket,String> , JpaSpecificationExecutor<Ticket> {


}
