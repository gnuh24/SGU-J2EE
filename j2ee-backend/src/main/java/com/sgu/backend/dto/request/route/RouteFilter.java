package com.sgu.backend.dto.request.route;

import lombok.Data;

@Data
public class RouteFilter {

    private String search;
    private String status;
    private Double minDistance;
    private Double maxDistance;
    private Double minDuration;
    private Double maxDuration;
}