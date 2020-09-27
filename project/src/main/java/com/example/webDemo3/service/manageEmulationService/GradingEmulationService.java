package com.example.webDemo3.service.manageEmulationService;

import com.example.webDemo3.dto.MessageDTO;
import com.example.webDemo3.dto.manageEmulationResponseDto.ClassOfRedStarResponseDto;
import com.example.webDemo3.dto.manageEmulationResponseDto.ViewGradingEmulationResponseDto;
import com.example.webDemo3.dto.manageEmulationResponseDto.ViewNumberOfStudentResponseDto;
import com.example.webDemo3.dto.request.manageEmulationRequestDto.AddViolationForClassRequestDto;
import com.example.webDemo3.dto.request.manageEmulationRequestDto.ClassOfRedStarRequestDto;
import com.example.webDemo3.dto.request.manageEmulationRequestDto.ViewNumberOfStudentRequestDto;

public interface GradingEmulationService {
    ViewGradingEmulationResponseDto getClassAndViolationList();
    MessageDTO addViolationForClass(AddViolationForClassRequestDto model);
    ClassOfRedStarResponseDto getClassIdByUserAndDate(ClassOfRedStarRequestDto model);
    ViewNumberOfStudentResponseDto viewNumberOfStudent(ViewNumberOfStudentRequestDto model);
}
