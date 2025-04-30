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

            if (filter.getProfileId() != null) {
                predicates.add(cb.equal(root.get("profile").get("id"), filter.getProfileId()));
            }

            if (filter.getProfileName() != null) {
                predicates.add(cb.like(cb.lower(root.get("profile").get("fullname")), "%" + filter.getProfileName().toLowerCase() + "%"));
            }

            if (filter.getProfilePhone() != null) {
                predicates.add(cb.like(cb.lower(root.get("profile").get("phone")), "%" + filter.getProfilePhone().toLowerCase() + "%"));
            }

            if (filter.getFromDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("issuedAt"), filter.getFromDate()));
            }

            if (filter.getToDate() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("issuedAt"), filter.getToDate()));
            }

            if (filter.getMinTotal() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("totalAmount"), filter.getMinTotal()));
            }

            if (filter.getMaxTotal() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("totalAmount"), filter.getMaxTotal()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
