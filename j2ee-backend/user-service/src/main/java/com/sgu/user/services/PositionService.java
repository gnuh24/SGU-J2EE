package com.sgu.user.services;

import com.sgu.user.entities.Position;

import java.util.List;

public interface PositionService {
    List<Position> getAllPositionsWithoutPaging();

    Position getPositionById(String positionId);
}
