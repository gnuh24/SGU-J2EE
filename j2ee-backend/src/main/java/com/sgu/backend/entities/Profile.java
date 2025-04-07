package com.sgu.backend.entities;

import com.sgu.backend.utils.IdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
public class Profile {

    @Id
    private String id = IdGenerator.generateId();

    @Column(length = 255)
    private String fullname;

    @Column(length = 255, unique = true)
    private String email;

    @Column(length = 15, unique = true,  nullable = false)
    private String phone;

    @OneToOne(mappedBy = "profile")
    private Account account;

    // Enum Status (Viết hoa toàn bộ)
    public enum Status {
	    ACTIVE,        // 🟢 Nhân viên đang làm việc bình thường
	    INACTIVE,      // ⚪ Nhân viên bị vô hiệu hóa (tạm thời ngừng làm việc)
            BANNED
    }
}
