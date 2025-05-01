package com.sgu.backend.repositories;

import com.sgu.backend.entities.Route;
import com.sgu.backend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDateTime;

public interface TicketRepository extends JpaRepository<Ticket,String> , JpaSpecificationExecutor<Ticket> {


}
