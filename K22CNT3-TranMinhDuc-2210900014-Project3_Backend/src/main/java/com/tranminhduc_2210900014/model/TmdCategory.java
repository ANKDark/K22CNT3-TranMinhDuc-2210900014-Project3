package com.tranminhduc_2210900014.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "tmdUser")
@Table(name = "tmd_categories")
public class TmdCategory {
    @Id
    @Column(name = "tmd_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "tmd_user_id", nullable = false)
    private TmdUser tmdUser;

    @Column(name = "tmd_name", nullable = false, length = 100)
    private String tmdName;

    @Column(name = "tmd_type", nullable = false)
    private Boolean tmdType = false;

}