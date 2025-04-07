package com.sgu.backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfilePosition {

    @EmbeddedId
    private ProfilePositionId id;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal salaryCoefficient;

    @Column
    private LocalDate endDate;

    @ManyToOne
    @MapsId("profileId")
    @JoinColumn(name = "profileId", referencedColumnName = "id")
    private Profile profile;

    @ManyToOne
    @MapsId("positionId")
    @JoinColumn(name = "positionId", referencedColumnName = "id")
    private Position position;

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProfilePositionId implements Serializable {
	@Column(name = "profileId", nullable = false, length = 10)
	private String profileId;

	@Column(name = "positionId", nullable = false, length = 10)
	private String positionId;

	@Column(name = "startDate", nullable = false)
	private LocalDate startDate;
    }
}

