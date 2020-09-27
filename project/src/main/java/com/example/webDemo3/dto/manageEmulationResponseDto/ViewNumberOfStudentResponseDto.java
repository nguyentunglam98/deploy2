package com.example.webDemo3.dto.manageEmulationResponseDto;

import com.example.webDemo3.dto.MessageDTO;
import lombok.Data;

/*
lamnt98 - 23/09
 */
@Data
public class ViewNumberOfStudentResponseDto {
    private Integer numberOfStudent;
    private Integer numberOfUnion;
    private MessageDTO message;
}
