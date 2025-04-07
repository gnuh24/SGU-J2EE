package com.sgu.backend.repositories;

import com.sgu.backend.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ProfileRepository extends JpaRepository<Profile, String>, JpaSpecificationExecutor<Profile> {
}
