package com.tranminhduc_2210900014.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "tmd_savings")
public class TmdSaving {
    @Id
    @Column(name = "tmd_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tmd_user_id", nullable = false)
    private TmdUser tmdUser;

    @Column(name = "tmd_goal_name", nullable = false)
    private String tmdGoalName;

    @Column(name = "tmd_target_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal tmdTargetAmount;

    @ColumnDefault("0.00")
    @Column(name = "tmd_saved_amount", precision = 10, scale = 2)
    private BigDecimal tmdSavedAmount;

    @Column(name = "tmd_target_date", nullable = false)
    private LocalDate tmdTargetDate;

}