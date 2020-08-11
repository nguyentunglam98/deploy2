package com.example.webDemo3.dto.manageEmulationResponseDto;

import com.example.webDemo3.dto.MessageDTO;
import com.example.webDemo3.entity.ViolationClass;
import lombok.Data;

import java.util.List;

@Data
public class ViewViolationClassHistoryResponseDto {

    List<ViolationClass> ViolationClassList;
    private MessageDTO message;
}
