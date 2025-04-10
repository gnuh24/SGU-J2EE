package com.sgu.backend.services.impl;



import com.sgu.backend.dto.request.seat.SeatCreateForm;
import com.sgu.backend.dto.request.seat.SeatFilter;
import com.sgu.backend.dto.request.seat.SeatUpdateForm;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Coach;
import com.sgu.backend.entities.Seat;
import com.sgu.backend.repositories.CoachRepository;
import com.sgu.backend.repositories.SeatRepository;
import com.sgu.backend.services.SeatService;
import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;
    private final CoachRepository coachRepository;
    private final ModelMapper modelMapper;


    @Override
    public Seat create(SeatCreateForm form) {
        Coach coach = coachRepository.findById(form.getCoachId())
                .orElseThrow(() -> new EntityNotFoundException("Coach not found with ID: " + form.getCoachId()));

        Seat seat = new Seat();
        seat.setNumber(form.getNumber());
        seat.setType(form.getType());
        seat.setIsNextToWindow(form.getIsNextToWindow());
        seat.setFloor(form.getFloor());
        seat.setCoach(coach);

        return seatRepository.save(seat);
    }

    @Override
    public Seat update(String id, SeatUpdateForm form) {
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seat not found with ID: " + id));

        seat.setNumber(form.getNumber());
        seat.setType(form.getType());
        seat.setIsNextToWindow(form.getIsNextToWindow());
        seat.setFloor(form.getFloor());

        return seatRepository.save(seat);
    }

    @Override
    public void delete(String id) {
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Seat not found with ID: " + id));

        seatRepository.delete(seat);
    }

    @Override
    public List<SeatResponseDTO> getById(String id) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Coach not found with ID: " + id));

        List<Seat> seats= seatRepository.findByCoach(coach);
        List<SeatResponseDTO> seatDTOs = seats.stream()
                .map(seat -> modelMapper.map(seat, SeatResponseDTO.class))
                .toList();
        return seatDTOs;
    }
    @Override
    public List<Seat> createMany(List<SeatCreateForm> seatForms, Coach coach) {
        List<Seat> seats = seatForms.stream().map(form -> {
            Seat seat = modelMapper.map(form, Seat.class);
            seat.setId(IdGenerator.generateId());
            seat.setCoach(coach);
            return seat;
        }).toList();

        return seatRepository.saveAll(seats);
    }


}
