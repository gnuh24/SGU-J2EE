package com.sgu.backend.specifications;


import com.mysql.cj.util.StringUtils;
import com.sgu.backend.dto.request.coach_station.CoachStationFilterForm;
import com.sgu.backend.entities.CoachStation;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
public class CoachStationSpecification implements Specification<CoachStation> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<CoachStation> root,
				 @NonNull CriteriaQuery<?> query,
				 @NonNull CriteriaBuilder criteriaBuilder) {

	if (field.equalsIgnoreCase("name")) {
	    return criteriaBuilder.like(root.get("name"), "%" + value + "%");
	}

	if (field.equalsIgnoreCase("status")) {
	    return criteriaBuilder.equal(root.get("status"), value);
	}

	return null;
    }

    public static Specification<CoachStation> buildWhere(CoachStationFilterForm form) {
	Specification<CoachStation> where = null;
	String search = form.getSearch();

	if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
	    search = search.trim();
	    search = search.toLowerCase();

	    CoachStationSpecification name = new CoachStationSpecification("name", search);

	    where = Specification.where(name);
	}

	if (form != null) {

	    if (form.getStatus() != null) {
		String status = form.getStatus().toString();
		CoachStationSpecification statusSpec = new CoachStationSpecification("status", status);
		where = where != null ? where.and(statusSpec) : Specification.where(statusSpec);
	    }

	}

	return where;
    }
}
