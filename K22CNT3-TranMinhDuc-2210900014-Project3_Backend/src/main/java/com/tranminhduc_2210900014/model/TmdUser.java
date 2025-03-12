package com.tranminhduc_2210900014.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "tmd_users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TmdUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tmd_id", nullable = false)
    private Integer id;

    @Column(name = "tmd_name", nullable = false, length = 100)
    private String tmdName;

    @Column(name = "tmd_email", nullable = false, length = 100, unique = true)
    private String tmdEmail;

    @Column(name = "tmd_password_hash", nullable = false)
    private String tmdPasswordHash;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "tmd_created_at", updatable = false)
    private Instant tmdCreatedAt = Instant.now();
}
