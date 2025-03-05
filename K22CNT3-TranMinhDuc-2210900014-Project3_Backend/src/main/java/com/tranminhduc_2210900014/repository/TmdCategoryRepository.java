package com.tranminhduc_2210900014.repository;
import com.tranminhduc_2210900014.model.TmdCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TmdCategoryRepository extends JpaRepository<TmdCategory, Integer> {
        List<TmdCategory> findByTmdUserId(Integer tmdUserId);
        Optional<TmdCategory> findByTmdName(String tmdName);
        long countByTmdUserId(Integer tmdUserId);
}
