package com.sgu.backend.repositories;

import com.sgu.backend.entities.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

public interface CoachRepository extends JpaRepository<Coach, String>, JpaSpecificationExecutor<Coach> {
}