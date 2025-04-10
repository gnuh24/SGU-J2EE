package com.sgu.backend.specifications;



import com.sgu.backend.dto.request.coach.CoachFilter;
import com.sgu.backend.entities.Coach;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class CoachSpecification {
    public static Specification<Coach> filter(CoachFilter filter) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if (filter.getType() != null) {
                predicate = cb.and(predicate, cb.like(cb.lower(root.get("type")), "%" + filter.getType().toLowerCase() + "%"));
            }



            if (filter.getStatus() != null) {
                predicate = cb.and(predicate, cb.equal(root.get("status"), filter.getStatus()));
            }

            if (filter.getMinCapacity() != null) {
                predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("capacity"), filter.getMinCapacity()));
            }

            if (filter.getMaxCapacity() != null) {
                predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("capacity"), filter.getMaxCapacity()));
            }

            return predicate;
        };
    }
}
