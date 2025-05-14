package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.schedule.ScheduleFilterForm;
import com.sgu.backend.entities.Route;
import com.sgu.backend.entities.Schedule;
import com.sgu.backend.services.ScheduleService;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class ScheduleSpecification {
    public static Specification<Schedule> filter(ScheduleFilterForm filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
				
				if (StringUtils.hasText(filter.getSearch())) {
						String keyword = "%" + filter.getSearch().toLowerCase() + "%";
						predicates.add(cb.or(
								cb.like(cb.lower(root.get("id")), keyword)
//								,
//								cb.like(cb.lower(root.get("invoice").get("profile").get("phone")), keyword),
//								cb.like(cb.lower(root.get("invoice").get("profile").get("fullname")), keyword)
						));
				}
			
            if (filter.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), filter.getStatus()));
            }
				
				if (filter.getDepartureTime() != null) {
						Expression<Date> dateExpr = cb.function("date", java.sql.Date.class, root.get("departureTime"));
						predicates.add(cb.equal(dateExpr, filter.getDepartureTime()));
				}


			Join<Schedule, Route> routeJoin = root.join("route");

			// Lọc theo CoachStation.id
			if (filter.getStartCityId() != null) {
				predicates.add(cb.equal(routeJoin.get("departureStation").get("id"), filter.getStartCityId()));
			}

			if (filter.getEndCityId() != null) {
				predicates.add(cb.equal(routeJoin.get("arrivalStation").get("id"), filter.getEndCityId()));
			}

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
