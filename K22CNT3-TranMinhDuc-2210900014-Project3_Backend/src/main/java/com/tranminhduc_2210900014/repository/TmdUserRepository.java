package com.tranminhduc_2210900014.repository;

import com.tranminhduc_2210900014.model.TmdUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TmdUserRepository extends JpaRepository<TmdUser, Integer> {
    Optional<TmdUser> findByTmdEmail(String tmdEmail);
}
