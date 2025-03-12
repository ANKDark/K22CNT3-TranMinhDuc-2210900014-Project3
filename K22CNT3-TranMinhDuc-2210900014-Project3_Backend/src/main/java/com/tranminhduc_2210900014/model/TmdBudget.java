package com.tranminhduc_2210900014.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tmd_budgets")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TmdBudget {
    @Id
    @Column(name = "tmd_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tmd_user_id", nullable = false)
    private TmdUser tmdUser;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tmd_category_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TmdCategory tmdCategory;

    @Column(name = "tmd_amount_limit", nullable = false, precision = 10, scale = 2)
    private BigDecimal tmdAmountLimit;

    @Column(name = "tmd_start_date", nullable = false)
    private LocalDate tmdStartDate;

    @Column(name = "tmd_end_date", nullable = false)
    private LocalDate tmdEndDate;

}