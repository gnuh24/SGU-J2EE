package com.sgu.backend.specifications;

import com.sgu.backend.dto.request.ticket.TicketFilter;
import com.sgu.backend.entities.Ticket;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class TicketSpecification {
    public static Specification<Ticket> filter(TicketFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter.getScheduleId() != null)
                predicates.add(cb.equal(root.get("schedule").get("id"), filter.getScheduleId()));
            if (filter.getSeatId() != null)
                predicates.add(cb.equal(root.get("seat").get("id"), filter.getSeatId()));
            if (filter.getInvoiceId() != null)
                predicates.add(cb.equal(root.get("invoice").get("id"), filter.getInvoiceId()));
            if (filter.getStatus() != null)
                predicates.add(cb.equal(root.get("status"), filter.getStatus()));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
