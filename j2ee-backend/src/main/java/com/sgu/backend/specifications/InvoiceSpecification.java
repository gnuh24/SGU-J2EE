package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.invoice.InvoiceFilter;
import com.sgu.backend.entities.Invoice;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class InvoiceSpecification {
		
		public static Specification<Invoice> filter(InvoiceFilter filter) {
				return (root, query, cb) -> {
						List<Predicate> predicates = new ArrayList<>();
						
						if (filter.getSearch() != null && !filter.getSearch().isBlank()) {
								String keyword = "%" + filter.getSearch().toLowerCase() + "%";
								predicates.add(cb.or(
										cb.like(cb.lower(root.get("id")), keyword),
										cb.like(cb.lower(root.get("profile").get("fullname")), keyword),
										cb.like(cb.lower(root.get("profile").get("phone")), keyword)
								));
						}
						
						// if (filter.getFromDate() != null) {
						//     predicates.add(cb.greaterThanOrEqualTo(root.get("issuedAt"), filter.getFromDate()));
						// }
						
						// if (filter.getToDate() != null) {
						//     predicates.add(cb.lessThanOrEqualTo(root.get("issuedAt"), filter.getToDate()));
						// }
						
						return cb.and(predicates.toArray(new Predicate[0]));
				};
		}
}
