package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.schedule.ScheduleCreateForm;
import com.sgu.backend.dto.request.schedule.ScheduleFilterForm;
import com.sgu.backend.dto.request.schedule.ScheduleUpdateForm;
import com.sgu.backend.dto.response.schedule.ScheduleResponseDTO;
import com.sgu.backend.entities.Coach;
import com.sgu.backend.entities.Route;
import com.sgu.backend.entities.Schedule;
import com.sgu.backend.repositories.CoachRepository;
import com.sgu.backend.repositories.RouteRepository;
import com.sgu.backend.repositories.ScheduleRepository;
import com.sgu.backend.services.ScheduleService;
import com.sgu.backend.specifications.ScheduleSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<ScheduleResponseDTO> getAll(Pageable pageable, ScheduleFilterForm filter) {
        Page<Schedule> schedules = scheduleRepository.findAll(ScheduleSpecification.filter(filter), pageable);
        return schedules.map(schedule -> modelMapper.map(schedule, ScheduleResponseDTO.class));
    }

    @Override
    public ScheduleResponseDTO getById(String id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        return modelMapper.map(schedule, ScheduleResponseDTO.class);
    }
		
		@Override
		public Schedule getScheduleById(String id) {
				return scheduleRepository.findById(id)
						.orElseThrow(() -> new RuntimeException("Schedule not found"));
		}
		
		@Override
    public ScheduleResponseDTO create(ScheduleCreateForm form) {
        Schedule schedule = new Schedule();
		
			
        // Gán Route và Coach từ ID
        Route route = routeRepository.findById(form.getRouteId())
                .orElseThrow(() -> new RuntimeException("Route not found"));

		Coach coach = coachRepository.findById(form.getCoachId())
						.orElseThrow( () -> new RuntimeException("Coach not found"));
			
			schedule.setRoute(route);
			schedule.setCoach(coach);
			schedule.setDepartureTime(form.getDepartureTime());
			schedule.setStatus(form.getStatus());

        schedule = scheduleRepository.save(schedule);
			
			return modelMapper.map(schedule, ScheduleResponseDTO.class);
    }
		
		@Override
		public ScheduleResponseDTO update(String id, ScheduleUpdateForm form) {
				// Tìm schedule theo ID
				Schedule schedule = scheduleRepository.findById(id)
						.orElseThrow(() -> new RuntimeException("Schedule not found"));
				
				// Lấy thông tin coach
				Coach coach = coachRepository.findById(form.getCoachId())
						.orElseThrow(() -> new RuntimeException("Coach not found"));
				
				// Lấy thông tin route
				Route route = routeRepository.findById(form.getRouteId())
						.orElseThrow(() -> new RuntimeException("Route not found"));
				
				// Cập nhật các trường từ form
				schedule.setCoach(coach);
				schedule.setRoute(route);
				schedule.setDepartureTime(form.getDepartureTime());
				schedule.setStatus(form.getStatus());
				
				// Lưu lại vào DB
				schedule = scheduleRepository.save(schedule);
				
				// Trả về DTO
				return modelMapper.map(schedule, ScheduleResponseDTO.class);
		}


    @Override
    public void delete(String id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        scheduleRepository.delete(schedule);
    }
}
