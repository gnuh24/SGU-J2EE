package com.sgu.backend.repositories;

import com.sgu.backend.entities.CoachStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachStationRepository extends JpaRepository<CoachStation, String>, JpaSpecificationExecutor<CoachStation> {
    List<CoachStation> findByCityId(String cityId);
}
