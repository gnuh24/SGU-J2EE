package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.route.RouteFilter;
import com.sgu.backend.entities.Route;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class RouteSpecification {
		public static Specification<Route> filter(RouteFilter filter) {
				return (root, query, cb) -> {
						Predicate predicate = cb.conjunction();
						
						if (filter.getSearch() != null && !filter.getSearch().isEmpty()) {
								String keyword = "%" + filter.getSearch().toLowerCase() + "%";
				    
								Predicate searchByDepartureStation = cb.like(cb.lower(root.get("departureStation").get("name")), keyword);
								Predicate searchByArrivalStation = cb.like(cb.lower(root.get("arrivalStation").get("name")), keyword);
								
								predicate = cb.and(predicate, cb.or(searchByDepartureStation, searchByArrivalStation));
						}
						
						if (filter.getStatus() != null && !filter.getStatus().isEmpty()) {
								predicate = cb.and(predicate, cb.equal(root.get("status"), filter.getStatus()));
						}
						
						if (filter.getMinDistance() != null) {
								predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("distance"), filter.getMinDistance()));
						}
						
						if (filter.getMaxDistance() != null) {
								predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("distance"), filter.getMaxDistance()));
						}
						
						if (filter.getMinDuration() != null) {
								predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("duration"), filter.getMinDuration()));
						}
						
						if (filter.getMaxDuration() != null) {
								predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("duration"), filter.getMaxDuration()));
						}
						
						return predicate;
				};
		}
}
