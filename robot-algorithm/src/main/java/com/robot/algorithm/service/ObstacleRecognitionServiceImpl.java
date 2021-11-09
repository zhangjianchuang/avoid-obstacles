package com.robot.algorithm.service;

import com.robot.algorithm.utils.HttpUtil;
import org.springframework.stereotype.Service;

/**
 * @author zhangjianchuang@kanzhun.com
 * @date 2021年11月09日 10:13 上午
 */
@Service
public class ObstacleRecognitionServiceImpl implements ObstacleRecognitionService {
    private final String downloadImageHost = "localhost:20002/api/get/img/";
    private final String saveTo            = "tmp/";

    @Override
    public boolean hasObstacle(String image) {
        String saveFile = saveTo + image;
        boolean downResult       = HttpUtil.httpDownload(downloadImageHost + image, saveFile);
        if(downResult){
            System.out.println("down success");
            return true;
        }
        return false;
    }
}
