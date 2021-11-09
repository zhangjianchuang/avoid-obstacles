package com.robot.image.service;

import com.robot.image.utils.HttpUtil;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ObstaclesImageServiceImpl implements ObstaclesImageService {
    private final String imagePath = "./obstacle-image/";
    private final String uploadUrl = "localhost:20002/api/get/next/instructions";

    @Override
    public void send() {
        File file = new File(imagePath);
        File[] images = file.listFiles();
        if(hasImage(images)){
            for (File image : images) {
                HttpUtil.upload(uploadUrl,image);
            }
        }
    }

    private boolean hasImage(File[] images) {
        return images != null && images.length > 0;
    }
}
