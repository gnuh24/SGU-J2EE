package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.coach.CoachCreateForm;
import com.sgu.backend.dto.request.coach.CoachFilter;
import com.sgu.backend.dto.request.coach.CoachUpdateForm;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoachServiceImpl implements CoachService {

    private final CoachRepository coachRepository;
    private final ModelMapper modelMapper;
    private final SeatService seatService;

    @Override
    public CoachResponseDTO create(CoachCreateForm form) {
        Coach coach = modelMapper.map(form, Coach.class);
        coach.setId(IdGenerator.generateId());

        Coach savedCoach = coachRepository.save(coach);

        // ✅ Gọi SeatService để tạo danh sách ghế
        List<Seat> seats = seatService.createMany(form.getSeats(), savedCoach);

        // Gán lại nếu cần trả về
        savedCoach.setSeats(seats);

        return modelMapper.map(savedCoach, CoachResponseDTO.class);
    }

    @Override
    public CoachResponseDTO update(String id, CoachUpdateForm form) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach not found"));
        modelMapper.map(form, coach);
        coach.setUpdatedAt(LocalDateTime.now());
        coachRepository.save(coach);
        return modelMapper.map(coach, CoachResponseDTO.class);
    }

    @Override
    public void delete(String id) {
        coachRepository.deleteById(id);
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
}
