package com.sgu.backend.dto.request.route;

import lombok.Data;

@Data
public class RouteFilter {
    private Double minDistance;
    private Double maxDistance;
    private Double minDuration;
    private Double maxDuration;
}