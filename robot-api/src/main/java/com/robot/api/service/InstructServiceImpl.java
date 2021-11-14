package com.robot.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class InstructServiceImpl implements InstructService {
    public static final String tmpImagePath  = "tmp/";
    private final String algorithmHost = "localhost:20000";

    {
        File filePath = new File(tmpImagePath);
        if (!filePath.exists()) {
            if (!filePath.mkdirs()) {
                throw new RuntimeException("file create fail");
            }
        }
    }

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String getNextInstruct(MultipartFile uploadFile) {
        try {
            String fileName = UUID.randomUUID() + uploadFile.getOriginalFilename();
            String toPath           = tmpImagePath +  fileName;
            uploadFile.transferTo(new File(toPath));
            String  url              = algorithmHost + "/algorithm/obstacle/recognition/exist/" + fileName;
            return restTemplate.getForObject(url, String.class);
        } catch (IOException e) {
            throw new RuntimeException("文件上传失败");
        }
    }
}
