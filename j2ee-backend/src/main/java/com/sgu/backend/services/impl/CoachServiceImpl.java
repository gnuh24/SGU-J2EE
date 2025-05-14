package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.coach.CoachCreateForm;
import com.sgu.backend.dto.request.coach.CoachFilter;
import com.sgu.backend.dto.request.coach.CoachUpdateForm;
import com.sgu.backend.dto.request.seat.SeatCreateForm;
import com.sgu.backend.dto.response.coach.CoachResponseDTO;
import com.sgu.backend.entities.Coach;
import com.sgu.backend.entities.Seat;
import com.sgu.backend.repositories.CoachRepository;
import com.sgu.backend.services.CoachService;
import com.sgu.backend.services.SeatService;
import com.sgu.backend.specifications.CoachSpecification;
import com.sgu.backend.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoachServiceImpl implements CoachService {

		@Autowired
    private final CoachRepository coachRepository;
		
		@Autowired
		
		private final ModelMapper modelMapper;
		
		@Autowired
		
		private final SeatService seatService;

    @Override
	@Transactional
    public Coach create(CoachCreateForm form) {
        Coach coach = modelMapper.map(form, Coach.class);
		coach.setCapacity(28);
			
        Coach savedCoach = coachRepository.save(coach);
		for (int i=1; i <= 28; i++){
				SeatCreateForm seatCreateForm = new SeatCreateForm();
				seatCreateForm.setNumber(i);
				seatCreateForm.setCoach(savedCoach);
				seatService.create(seatCreateForm);
		}
		
        return savedCoach;
    }

    @Override
    public Coach update(String id, CoachUpdateForm form) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach not found"));
        
		if (form.getStatus() != null){
				coach.setStatus(form.getStatus());
		}
		
		if (form.getLicensePlate() != null){
				coach.setLicensePlate(form.getLicensePlate());
		}
		
        return coachRepository.save(coach);
    }


    @Override
    public CoachResponseDTO getById(String id) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach not found"));
        return modelMapper.map(coach, CoachResponseDTO.class);
    }

    @Override
    public Page<CoachResponseDTO> filter(Pageable pageable, CoachFilter filter) {
        Page<Coach> coaches = coachRepository.findAll(CoachSpecification.filter(filter), pageable);
        return coaches.map(coach -> modelMapper.map(coach, CoachResponseDTO.class));
    }
		
		@Override
		public List<CoachResponseDTO> getAllNoPaging() {
				return coachRepository.findAll()
						.stream()
						.map(this::convertToDTO)
						.collect(Collectors.toList());
		}
		
		private CoachResponseDTO convertToDTO(Coach coach) {
				CoachResponseDTO dto = new CoachResponseDTO();
				dto.setId(coach.getId());
				dto.setLicensePlate(coach.getLicensePlate());
				dto.setStatus(coach.getStatus());
				dto.setCapacity(coach.getCapacity());
				// Thêm các trường khác nếu cần
				return dto;
		}
		
		
}
