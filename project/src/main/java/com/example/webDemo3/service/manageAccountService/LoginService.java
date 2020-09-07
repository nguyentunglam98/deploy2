package com.example.webDemo3.service.manageAccountService;

import com.example.webDemo3.dto.manageAccountResponseDto.SearchUserResponseDto;
import com.example.webDemo3.dto.request.manageAccountRequestDto.LoginRequestDto;
import com.example.webDemo3.dto.manageAccountResponseDto.LoginResponseDto;

public interface LoginService {
    SearchUserResponseDto getAdminInfor();
    LoginResponseDto checkLoginUser(LoginRequestDto u);
}
