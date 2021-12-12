package com.robot.image.service;

import com.robot.image.utils.HttpUtil;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class ObstaclesImageServiceImpl implements ObstaclesImageService {
    private final String imagePath           = "./obstacle-image/";
    private final String getNextInstructions = "localhost:20002/api/get/next/instructions";

    @Override
    public String send() {
        File          file   = new File(imagePath);
        File[]        images = file.listFiles();
        StringBuilder sb     = new StringBuilder();
        if (hasImage(images)) {
            for (File image : images) {
                sb.append(HttpUtil.upload(getNextInstructions, image)).append("\n");
            }
        }
        return sb.toString();
    }

    private boolean hasImage(File[] images) {
        return images != null && images.length > 0;
    }
}
