package com.sgu.user.specifications;

import com.sgu.user.dto.request.profile.ProfileFilterForm;
import com.sgu.user.entities.Profile;
import com.mysql.cj.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

@Data
public class ProfileSpecification implements Specification<Profile> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(	@NonNull Root<Profile> root,
						 	@NonNull CriteriaQuery<?> query,
						 	@NonNull CriteriaBuilder criteriaBuilder) {


	if (field.equalsIgnoreCase("email")) {
	    return criteriaBuilder.like(root.get("email"), "%" + value + "%");
	}

	if (field.equalsIgnoreCase("fullname")) {
	    return criteriaBuilder.like(root.get("fullname"), "%" + value + "%");
	}

	return null;
    }

    public static Specification<Profile> buildWhere(String search ,ProfileFilterForm form) {
	Specification<Profile> where = null;

	if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
	    search = search.trim();
	    search = search.toLowerCase();

	    ProfileSpecification email = new ProfileSpecification("email", search);
	    ProfileSpecification fullname = new ProfileSpecification("fullname", search);

	    where = Specification.where(email).or(fullname);
	}

	if (form != null) {

	    if (form.getStatus() != null) {
		String status = form.getStatus().toString();
		ProfileSpecification statusSpec = new ProfileSpecification("status", status);
		where = where != null ? where.and(statusSpec) : Specification.where(statusSpec);
	    }

	}

	return where;
    }
}

