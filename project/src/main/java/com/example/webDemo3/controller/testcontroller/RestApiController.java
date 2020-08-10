package com.example.webDemo3.controller.testcontroller;

import com.example.webDemo3.entity.User;
import com.example.webDemo3.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RestApiController {

    @Autowired
    private DemoService demoService;

    @PostMapping("/user")
    public List<User> getUserList() {
        return demoService.findAll();
    }

    @PostMapping("/login")
    public Boolean login(@RequestBody User model)
    {
        return demoService.checkLoginUser(model);
    }

    @PostMapping("/new")
    public User addNew(@RequestBody User model) {
        return demoService.addNew(model);
    }

    @PostMapping("/update")
    public User updateUser(@RequestBody User model) {
        return demoService.updateUser(model);
    }

    @DeleteMapping("/delete")
    public void deleteUser(@RequestBody String username) {
        demoService.deleteUserByUsername(username);
    }
}
