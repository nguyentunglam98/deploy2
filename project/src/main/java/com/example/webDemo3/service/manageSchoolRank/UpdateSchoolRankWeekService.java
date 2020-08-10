package com.example.webDemo3.service.manageSchoolRank;

import com.example.webDemo3.dto.MessageDTO;
import com.example.webDemo3.dto.request.manageSchoolRankRequestDto.UpdateSchoolRankWeekRequestDto;

/*
kimpt142 - 21/07
 */
public interface UpdateSchoolRankWeekService {
    MessageDTO updateSchoolRankWeek(UpdateSchoolRankWeekRequestDto model);
}
