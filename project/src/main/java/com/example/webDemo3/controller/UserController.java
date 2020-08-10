package com.example.webDemo3.controller;

import com.example.webDemo3.dto.manageAccountResponseDto.LoginResponseDto;
import com.example.webDemo3.dto.MessageDTO;
import com.example.webDemo3.dto.manageAccountResponseDto.ViewPerInforResponseDto;
import com.example.webDemo3.dto.request.manageAccountRequestDto.ChangePasswordRequestDto;
import com.example.webDemo3.dto.request.manageAccountRequestDto.EditPerInforRequestDto;
import com.example.webDemo3.dto.request.manageAccountRequestDto.LoginRequestDto;
import com.example.webDemo3.dto.request.manageAccountRequestDto.ViewPerInforRequestDto;
import com.example.webDemo3.service.manageAccountService.ChangePasswordService;
import com.example.webDemo3.service.manageAccountService.EditPerInforService;
import com.example.webDemo3.service.manageAccountService.LoginService;
import com.example.webDemo3.service.manageAccountService.ViewPerInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private ChangePasswordService changePasswordService;

    @Autowired
    private ViewPerInfoService viewPerInfoService;

    @Autowired
    private EditPerInforService editPerInforService;

    @Autowired
    private LoginService loginService;

    /**
     * lamnt98
     * 23/06
     * catch request from client to change password
     * @param model
     * @return MessageDTO
     */
    @PostMapping("/changepassword")
    public MessageDTO login(@RequestBody ChangePasswordRequestDto model)
    {
        return changePasswordService.checkChangePasswordUser(model);
    }


    /**
     * lamnt98
     * 26/06
     * catch request from client to edit information of user
     * @param model
     * @return MessageDTO
     */
    @PostMapping("/editinformation")
    public MessageDTO login(@RequestBody EditPerInforRequestDto model)
    {
        return editPerInforService.editUserInformation(model);
    }

    /**
     * kimpt142
     * 23/6/2020
     * catch request from client to check login and if success, add username into session
     * @param model is User entity include username and password
     * @return LoginDto with (1,success) if success
     */
    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto model, HttpSession session)
    {
        LoginResponseDto responseDto = loginService.checkLoginUser(model);
        if(responseDto.getMessage().getMessageCode() == 0) {
            session.setAttribute("username", model.getUsername());
        }
        return responseDto;
    }

    /**
     * kimpt142
     * 23/6/2020
     * catch request logout and remove session
     * @param session save username
     * @return message
     */
    @PostMapping("/logout")
    public MessageDTO logout(HttpSession session)
    {
        MessageDTO message = new MessageDTO();
        if(session.getAttribute("username") != null){
            session.removeAttribute("username");
            message.setMessageCode(0);
            message.setMessage("Thành công");
            return message;
        }
        return message;
    }


    /**
     * lamnt98
     * 25/06
     * catch request from client to find information of user
     * @param model
     * @return ViewPerInforResponseDto
     */
    @PostMapping("/viewinformation")
    public ViewPerInforResponseDto viewInformation(@RequestBody ViewPerInforRequestDto model)
    {
        ViewPerInforResponseDto responseDto = viewPerInfoService.getUserInformation(model);
        return responseDto;
    }

}
