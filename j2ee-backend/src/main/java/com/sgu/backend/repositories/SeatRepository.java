package com.sgu.backend.repositories;

import com.sgu.backend.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String>, JpaSpecificationExecutor<Seat> {

	@Query(value = "SELECT s.* FROM Seat s " +
			"JOIN Coach c ON s.coachId= c.id " +
			"JOIN Schedule sch ON sch.coachId= c.id " +
			"WHERE sch.id = :scheduleId", nativeQuery = true)
	List<Seat> findByScheduleId(@Param("scheduleId") String scheduleId);

	@Query(value = "SELECT s.* FROM Seat s WHERE s.coachId = :coachId", nativeQuery = true)
	List<Seat> findByCoachId(@Param("coachId") String coachId);
}
