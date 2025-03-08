package com.sgu.user.entities;

import com.sgu.user.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Date;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
public class Profile {

    @Id
    private String id = IdGenerator.generateId();

    @Column(length = 255)
    private String fullname;

    @Column(length = 255, unique = true, nullable = false)
    private String email;

    @Column(length = 15)
    private String phone;

    @Column
    private Boolean gender;

    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column
    @Enumerated(EnumType.STRING)
    private Profile.Status status = Profile.Status.ACTIVE;

    @Column
    private Boolean isFingerprintVerified = false;

    @OneToOne(mappedBy = "profile")
    private Account account;

    // Enum Status (Viết hoa toàn bộ)
    public enum Status {
	    ACTIVE,        // 🟢 Nhân viên đang làm việc bình thường
	    INACTIVE,      // ⚪ Nhân viên bị vô hiệu hóa (tạm thời ngừng làm việc)
	    SUSPENDED,     // 🟡 Nhân viên bị đình chỉ do vi phạm hoặc lý do khác
	    TERMINATED,    // 🔴 Nhân viên đã nghỉ việc, hợp đồng chấm dứt
	    ON_LEAVE,       // 🔵 Nhân viên đang nghỉ phép dài hạn
            DELETED
    }
}
