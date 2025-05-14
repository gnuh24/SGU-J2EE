package com.sgu.backend.services.impl;



import com.sgu.backend.dto.request.seat.SeatCreateForm;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

		@Autowired
    private SeatRepository seatRepository;
		
		@Autowired
    private CoachRepository coachRepository;
	
	@Autowired
    private ModelMapper modelMapper;


    @Override
    public Seat create(SeatCreateForm form) {
        Seat seat = new Seat();
        seat.setNumber(form.getNumber());
        seat.setCoach(form.getCoach());
        return seatRepository.save(seat);
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
	
//    @Override
//    public List<Seat> createMany(List<SeatCreateForm> seatForms, Coach coach) {
//        List<Seat> seats = seatForms.stream().map(form -> {
//            Seat seat = modelMapper.map(form, Seat.class);
//            seat.setCoach(coach);
//            return seat;
//        }).toList();
//
//        return seatRepository.saveAll(seats);
//    }


}
