package com.tranminhduc_2210900014.repository;

import com.tranminhduc_2210900014.model.TmdBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TmdBudgetRepository extends JpaRepository<TmdBudget, Integer> {
    List<TmdBudget> findByTmdUserId(int tmdUserId);
}
