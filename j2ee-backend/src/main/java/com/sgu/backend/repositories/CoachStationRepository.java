package com.sgu.backend.repositories;

import com.sgu.backend.entities.CoachStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachStationRepository extends JpaRepository<CoachStation, String> {
    List<CoachStation> findByCityId(String cityId);
}
