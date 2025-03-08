package com.tranminhduc_2210900014.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
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
@Table(name = "tmd_transactions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TmdTransaction {
    @Id
    @Column(name = "tmd_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tmd_user_id", nullable = false)
    private TmdUser tmdUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "tmd_category_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TmdCategory tmdCategory;

    @Column(name = "tmd_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal tmdAmount;

    @Column(name = "tmd_transaction_date", nullable = false)
    private LocalDate tmdTransactionDate;

    @Lob
    @Column(name = "tmd_note")
    private String tmdNote;
}
