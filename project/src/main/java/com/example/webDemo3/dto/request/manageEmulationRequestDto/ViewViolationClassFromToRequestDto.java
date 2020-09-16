package com.example.webDemo3.dto.request.manageEmulationRequestDto;

import lombok.Data;

import java.sql.Date;

/*
kimpt142 - 11/09
 */
@Data
public class ViewViolationClassFromToRequestDto {
    private Integer classId;
    private Date fromDate;
    private Date toDate;
    private Integer pageNumber;
}
