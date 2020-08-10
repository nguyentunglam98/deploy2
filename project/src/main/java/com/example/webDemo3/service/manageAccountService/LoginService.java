package com.example.webDemo3.service.manageAccountService;

import com.example.webDemo3.dto.manageAccountResponseDto.LoginResponseDto;
import com.example.webDemo3.dto.request.manageAccountRequestDto.LoginRequestDto;

public interface LoginService {
    LoginResponseDto checkLoginUser(LoginRequestDto u);
}
