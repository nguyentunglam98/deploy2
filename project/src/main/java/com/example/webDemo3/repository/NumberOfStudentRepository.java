package com.example.webDemo3.repository;

import com.example.webDemo3.entity.NumberOfStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * lamnt98
 * 23/09
 */
@Repository
public interface NumberOfStudentRepository extends JpaRepository<NumberOfStudent,Integer> {
}
