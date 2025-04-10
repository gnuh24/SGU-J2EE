package com.sgu.backend.repositories;

import com.sgu.backend.entities.Coach;
import com.sgu.backend.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String> {
    List<Seat> findByCoach(Coach coach);
}
