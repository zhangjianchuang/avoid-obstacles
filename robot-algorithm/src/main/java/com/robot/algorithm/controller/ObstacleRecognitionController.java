package com.robot.algorithm.controller;

import com.robot.algorithm.service.ObstacleRecognitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhangjianchuang@kanzhun.com
 * @date 2021年11月09日 9:46 上午
 */
@RestController
@RequestMapping("/algorithm/obstacle/recognition")
public class ObstacleRecognitionController {

    @Autowired
    private ObstacleRecognitionService service;

    @RequestMapping("/exist/{image}")
    public String exist(@PathVariable String image) {
        return service.hasObstacle(image);
    }
}
