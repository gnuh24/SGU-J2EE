package com.sgu.backend.repositories;

import com.sgu.backend.entities.ProfilePosition;
import com.sgu.backend.entities.ProfilePosition.ProfilePositionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProfilePositionRepository extends JpaRepository<ProfilePosition, ProfilePositionId> {
    List<ProfilePosition> findByIdProfileId(String profileId);
    List<ProfilePosition> findByIdPositionId(String positionId);

    // 🔹 Lấy vị trí gần nhất (Có thể đã kết thúc)
    @Query("""
        SELECT pp FROM ProfilePosition pp 
        WHERE pp.id.profileId = :profileId 
        ORDER BY pp.id.startDate DESC 
        LIMIT 1
    """)
    Optional<ProfilePosition> findLatestByProfileId(String profileId);


}
