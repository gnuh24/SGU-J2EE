package com.sgu.backend.services;

import com.sgu.backend.dto.request.route.RouteCreateForm;
import com.sgu.backend.dto.request.route.RouteFilter;
import com.sgu.backend.dto.request.route.RouteUpdateForm;
import com.sgu.backend.dto.response.route.RouteResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RouteService {
    RouteResponse create(RouteCreateForm form);
    RouteResponse update(String id, RouteUpdateForm form);
    RouteResponse getById(String id);
    void delete(String id);
    Page<RouteResponse> getAll(Pageable pageable, RouteFilter filter);
}
