package com.tranminhduc_2210900014.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "tmd_users")
public class TmdUser {
    @Id
    @Column(name = "tmd_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tmd_name", nullable = false, length = 100)
    private String tmdName;

    @Column(name = "tmd_email", nullable = false, length = 100)
    private String tmdEmail;

    @Column(name = "tmd_password_hash", nullable = false)
    private String tmdPasswordHash;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "tmd_created_at")
    private Instant tmdCreatedAt = Instant.now();
}