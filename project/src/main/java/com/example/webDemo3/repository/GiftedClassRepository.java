package com.example.webDemo3.repository;

import com.example.webDemo3.entity.GiftedClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * kimpt142 - 29/6
 */
@Repository
public interface GiftedClassRepository extends JpaRepository<GiftedClass,Integer> {
    @Query("select LOWER(gt.name) from GiftedClass gt")
    List<String> findAllGiftedNameLower();
}
