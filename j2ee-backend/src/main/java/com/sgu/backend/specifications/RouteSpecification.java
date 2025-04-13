package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.route.RouteFilter;
import com.sgu.backend.entities.Route;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class RouteSpecification {
    public static Specification<Route> filter(RouteFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getMinDistance() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("distance"), filter.getMinDistance()));
            }
            if (filter.getMaxDistance() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("distance"), filter.getMaxDistance()));
            }
            if (filter.getMinDuration() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("duration"), filter.getMinDuration()));
            }
            if (filter.getMaxDuration() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("duration"), filter.getMaxDuration()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
