package com.sgu.backend.services;

import com.sgu.backend.dto.request.coach.CoachCreateForm;
import com.sgu.backend.dto.request.coach.CoachFilter;
import com.sgu.backend.dto.request.coach.CoachUpdateForm;
import com.sgu.backend.dto.response.coach.CoachResponseDTO;
import com.sgu.backend.entities.Coach;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CoachService {
    Coach create(CoachCreateForm form);
    Coach update(String id, CoachUpdateForm form);
    CoachResponseDTO getById(String id);
    Page<CoachResponseDTO> filter(Pageable pageable, CoachFilter filter);
}
