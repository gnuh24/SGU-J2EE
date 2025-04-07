package com.sgu.backend.services.impl;

import com.sgu.backend.entities.Position;
import com.sgu.backend.repositories.PositionRepository;
import com.sgu.backend.services.PositionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {

    @Autowired
    private PositionRepository positionRepository;

    @Override
    public List<Position> getAllPositionsWithoutPaging() {
	return positionRepository.findAll();
    }

    @Override
    public Position getPositionById(String positionId) {
        return  positionRepository.findById(positionId)
		.orElseThrow(() -> new EntityNotFoundException("Không tìm thấy positionvới ID: " + positionId));
    }
}