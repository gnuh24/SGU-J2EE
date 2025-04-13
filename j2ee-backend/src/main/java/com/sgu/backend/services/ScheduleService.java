package com.sgu.backend.services;

import com.sgu.backend.dto.request.schedule.ScheduleCreateForm;
import com.sgu.backend.dto.request.schedule.ScheduleFilterForm;
import com.sgu.backend.dto.request.schedule.ScheduleUpdateForm;
import com.sgu.backend.dto.response.schedule.ScheduleResponseDTO;
import com.sgu.backend.entities.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ScheduleService {
    Page<ScheduleResponseDTO> getAll(Pageable pageable, ScheduleFilterForm filter);
    ScheduleResponseDTO getById(String id);
    ScheduleResponseDTO create(ScheduleCreateForm form);
    ScheduleResponseDTO update(String id, ScheduleUpdateForm form);
    void delete(String id);
}
