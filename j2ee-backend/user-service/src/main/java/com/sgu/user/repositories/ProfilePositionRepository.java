package com.sgu.user.repositories;

import com.sgu.user.entities.ProfilePosition;
import com.sgu.user.entities.ProfilePosition.ProfilePositionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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
