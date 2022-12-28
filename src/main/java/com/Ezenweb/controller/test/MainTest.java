package com.Ezenweb.controller.test;

import com.Ezenweb.test.Tester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class MainTest {
    @Autowired
    Thread thread;

    @GetMapping("/tester")
    public void tester(){
        System.out.println("들어옴");
        thread.start();
    }


}
