package com.sgu.backend.repositories;

import com.sgu.backend.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,String> , JpaSpecificationExecutor<Ticket> {
		
		
		@Query(value = "SELECT * FROM Ticket WHERE scheduleId = :scheduleId", nativeQuery = true)
		List<Ticket> findByScheduleId(@Param("scheduleId") String scheduleId);

}
