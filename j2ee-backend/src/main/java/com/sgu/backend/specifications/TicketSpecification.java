package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.entities.Ticket;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class TicketSpecification {
		public static Specification<Ticket> filter(TicketFilter filter) {
				return (root, query, cb) -> {
						List<Predicate> predicates = new ArrayList<>();
						
						if (filter.getStatus() != null && StringUtils.hasText(filter.getStatus().toString())) {
								predicates.add(cb.equal(root.get("status"), filter.getStatus()));
						}
						
						if (StringUtils.hasText(filter.getSearch())) {
								String keyword = "%" + filter.getSearch().toLowerCase() + "%";
								predicates.add(cb.or(
										cb.like(cb.lower(root.get("id")), keyword),
										cb.like(cb.lower(root.get("invoice").get("profile").get("phone")), keyword),
										cb.like(cb.lower(root.get("invoice").get("profile").get("fullname")), keyword)
								));
						}
						
						return cb.and(predicates.toArray(new Predicate[0]));
				};
		}
}
