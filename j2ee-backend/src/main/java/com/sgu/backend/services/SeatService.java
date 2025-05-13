package com.sgu.backend.services;



import com.sgu.backend.dto.request.seat.SeatCreateForm;
import com.sgu.backend.dto.request.seat.SeatUpdateForm;
import com.sgu.backend.dto.response.seat.SeatResponseDTO;
import com.sgu.backend.entities.Coach;
import com.sgu.backend.entities.Seat;

import java.util.List;

public interface SeatService {
    Seat create(SeatCreateForm form);
    Seat update(String id, SeatUpdateForm form);
    void delete(String id);
    List<SeatResponseDTO> getById(String id);
    List<Seat> createMany(List<SeatCreateForm> seatForms, Coach coach);


}
