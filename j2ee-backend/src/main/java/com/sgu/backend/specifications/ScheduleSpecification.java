package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.schedule.ScheduleFilterForm;
import com.sgu.backend.entities.Schedule;
import com.sgu.backend.services.ScheduleService;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public class ScheduleSpecification {
    public static Specification<Schedule> filter(ScheduleFilterForm filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getRouteId() != null) {
                predicates.add(cb.equal(root.get("route").get("id"), filter.getRouteId()));
            }
            if (filter.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), filter.getStatus()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
