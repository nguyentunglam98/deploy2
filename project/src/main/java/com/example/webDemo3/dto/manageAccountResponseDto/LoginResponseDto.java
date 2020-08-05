package com.example.webDemo3.dto.manageAccountResponseDto;

import com.example.webDemo3.dto.MessageDTO;
import lombok.Data;

@Data
public class LoginResponseDto {
    private MessageDTO message;
    private Integer roleid;
    private Integer currentYearId;
}
