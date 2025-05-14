package com.sgu.backend.services.impl;

import com.sgu.backend.dto.request.route.RouteCreateForm;
import com.sgu.backend.dto.request.route.RouteFilter;
import com.sgu.backend.dto.request.route.RouteUpdateForm;
import com.sgu.backend.dto.response.coach_station.CoachStationResponseDTO;
import com.sgu.backend.dto.response.route.RouteResponse;
import com.sgu.backend.entities.Route;
import com.sgu.backend.repositories.CoachStationRepository;
import com.sgu.backend.repositories.RouteRepository;
import com.sgu.backend.services.RouteService;
import com.sgu.backend.specifications.RouteSpecification;
import com.sgu.backend.utils.IdGenerator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {

    private final RouteRepository routeRepository;
    private final CoachStationRepository coachStationRepository;
    private final ModelMapper modelMapper;

    @Override
    public RouteResponse create(RouteCreateForm form) {
        Route route = new Route();
        route.setId(IdGenerator.generateId());
        route.setDistance(form.getDistance());
        route.setDuration(form.getDuration());
        route.setPrice(form.getPrice());
        route.setStatus(form.getStatus());

        route.setDepartureStation(coachStationRepository.findById(form.getDepartureStationId())
                .orElseThrow(() -> new RuntimeException("Departure station not found")));

        route.setArrivalStation(coachStationRepository.findById(form.getArrivalStationId())
                .orElseThrow(() -> new RuntimeException("Arrival station not found")));

        routeRepository.save(route);
        return convertToDto(route);
    }

    @Override
    public RouteResponse update(String id, RouteUpdateForm form) {
        Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Route not found"));

        route.setDistance(form.getDistance());
        route.setDuration(form.getDuration());
        route.setPrice(form.getPrice());
        route.setStatus(form.getStatus());

        route.setDepartureStation(coachStationRepository.findById(form.getDepartureStationId())
                .orElseThrow(() -> new RuntimeException("Departure station not found")));

        route.setArrivalStation(coachStationRepository.findById(form.getArrivalStationId())
                .orElseThrow(() -> new RuntimeException("Arrival station not found")));

        routeRepository.save(route);
        return convertToDto(route);
    }

    @Override
    public RouteResponse getById(String id) {
        Route route = routeRepository.findById(id).orElseThrow(() -> new RuntimeException("Route not found"));
        return convertToDto(route);
    }

    @Override
    public void delete(String id) {
        routeRepository.deleteById(id);
    }

    @Override
    public Page<RouteResponse> getAll(Pageable pageable, RouteFilter filter) {
        Page<Route> routes = routeRepository.findAll(RouteSpecification.filter(filter), pageable);
        return routes.map(this::convertToDto);
    }
		
		@Override
		public List<RouteResponse> getAllNoPaging() {
				// Lấy danh sách tất cả tuyến đường
				List<Route> routes = routeRepository.findAll();
				
				// Ánh xạ từng đối tượng Route thành RouteResponse và trả về danh sách
				return routes.stream()  // Chuyển đổi List thành Stream
						.map(this::convertToDto)  // Ánh xạ mỗi đối tượng Route thành RouteResponse
						.collect(Collectors.toList());  // Thu thập kết quả thành một List
		}

		
		private RouteResponse convertToDto(Route route) {
        RouteResponse dto = modelMapper.map(route, RouteResponse.class);

        // Chuyển đổi CoachStation -> CoachStationResponseDTO
        CoachStationResponseDTO departureStationDTO = modelMapper.map(route.getDepartureStation(), CoachStationResponseDTO.class);
        CoachStationResponseDTO arrivalStationDTO = modelMapper.map(route.getArrivalStation(), CoachStationResponseDTO.class);

//        dto.setDepartureStationName(departureStationDTO);
//        dto.setArrivalStationId(arrivalStationDTO);

        return dto;
    }

}
