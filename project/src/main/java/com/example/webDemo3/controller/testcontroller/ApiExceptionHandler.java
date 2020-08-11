package com.example.webDemo3.controller.testcontroller;

import com.example.webDemo3.entity.testentity.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ApiExceptionHandler {
//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//    public ErrorMessage handleAllException(Exception ex, WebRequest request) {
//        // quá trình kiểm soat lỗi diễn ra ở đây
//        return new ErrorMessage(10000, ex.getLocalizedMessage());
//    }

    /**
     * IndexOutOfBoundsException sẽ được xử lý riêng tại đây
     */
    @ExceptionHandler(IndexOutOfBoundsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage TodoException(Exception ex, WebRequest request) {
        return new ErrorMessage(10100, "Đối tượng không tồn tại");
    }
}
