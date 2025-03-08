package com.tranminhduc_2210900014.repository;

import com.tranminhduc_2210900014.model.TmdTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TmdTransactionRepository extends JpaRepository<TmdTransaction, Integer> {
    List<TmdTransaction> findByTmdUserId(Integer tmdUserId);
}
