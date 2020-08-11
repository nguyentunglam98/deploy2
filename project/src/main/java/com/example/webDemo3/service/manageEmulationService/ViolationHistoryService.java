package com.example.webDemo3.service.manageEmulationService;

import com.example.webDemo3.dto.manageEmulationResponseDto.ViewViolationClassHistoryResponseDto;
import com.example.webDemo3.dto.request.manageEmulationRequestDto.ViolationHistoryResquestDTO;

import java.util.List;

public interface ViolationHistoryService {
    public ViewViolationClassHistoryResponseDto getHistoryViolationOfClas(ViolationHistoryResquestDTO model);
}
