package com.robot.image.controller;

import com.robot.image.service.ObstaclesImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/image/obstacle")
public class ObstaclesImageController {
    @Autowired
    private ObstaclesImageService service;

    @RequestMapping("/begin/send")
    public String send() {
        service.send();
        return "ok";
    }
}
