package com.robot.algorithm.service;

import com.robot.algorithm.utils.HttpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * @author zhangjianchuang@kanzhun.com
 * @date 2021年11月09日 10:13 上午
 */
@Service
public class ObstacleRecognitionServiceImpl implements ObstacleRecognitionService {
    private final String downloadImageHost = "localhost:20002/api/get/img/";
    private final String saveTo = "script/tmp/";

    private final String searcherHost = "localhost:20003/search/";

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String hasObstacle(String image) {
        String saveFile = saveTo + image;
        boolean downResult = HttpUtil.httpDownload(downloadImageHost + image, saveFile);

        if (downResult) {
            System.out.println("down success");
            return restTemplate.getForObject(searcherHost + image, String.class);
        }
        return "s";
    }
}
