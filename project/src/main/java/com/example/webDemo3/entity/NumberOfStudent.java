package com.example.webDemo3.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * lamnt98 - 23/09
 */
@Entity
@Data
@Table(name = "NUMBER_OF_STUDENTS")
public class NumberOfStudent {

    @Id
    @Column(name = "CLASS_ID")
    private Integer classID;

    @Column(name = "NUMBER_OF_STUDENT")
    private Integer numberOfStudent;

    @Column(name = "NUMBER_OF_UNION")
    private Integer numberOfUnion;

    public NumberOfStudent() {
    }

    public NumberOfStudent(Integer classID, Integer numberOfStudent, Integer numberOfUnion) {
        this.classID = classID;
        this.numberOfStudent = numberOfStudent;
        this.numberOfUnion = numberOfUnion;
    }
}
