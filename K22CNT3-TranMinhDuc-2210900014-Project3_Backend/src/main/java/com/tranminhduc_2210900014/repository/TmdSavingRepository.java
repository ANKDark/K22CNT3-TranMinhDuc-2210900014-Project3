package com.tranminhduc_2210900014.repository;

import com.tranminhduc_2210900014.model.TmdSaving;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TmdSavingRepository extends JpaRepository<TmdSaving, Integer> {
    List<TmdSaving> findByTmdUserId(int tmdUserId);
}
