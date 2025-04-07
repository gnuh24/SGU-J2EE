package com.sgu.backend.services;

import com.sgu.backend.entities.Position;

import java.util.List;

public interface PositionService {
    List<Position> getAllPositionsWithoutPaging();

    Position getPositionById(String positionId);
}
