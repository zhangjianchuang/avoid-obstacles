package com.robot.api.controller;

import com.robot.api.service.InstructService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.Objects;
import java.util.UUID;

import static com.robot.api.service.InstructServiceImpl.tmpImagePath;

@RestController
@RequestMapping("/api")
public class InstructController {
    @Autowired
    private InstructService service;

    @PostMapping("/get/next/instructions")
    public String getNext(@RequestParam("file") MultipartFile uploadFile) {
        if (Objects.isNull(uploadFile) || uploadFile.isEmpty()) {
            return "file can not null";
        }
        String originalFilename = uploadFile.getOriginalFilename();
        if (StringUtils.isBlank(originalFilename)) {
            return "file name can not null";
        }
        return service.getNextInstruct(uploadFile);
    }

    @PostMapping("/get/img/{image}")
    public String getNext(@PathVariable String image, HttpServletResponse response) {
        if (StringUtils.isNotBlank(image)) {
            File file = new File(tmpImagePath + image);
            if (file.exists()) {
                response.setContentType("application/force-download");
                response.addHeader("Content-Disposition", "attachment;fileName=" + image);
                byte[] buffer = new byte[1024];
                try (FileInputStream fis = new FileInputStream(file);
                     BufferedInputStream bis = new BufferedInputStream(fis)) {
                    OutputStream os = response.getOutputStream();
                    int          i  = bis.read(buffer);
                    while (i != -1) {
                        os.write(buffer, 0, i);
                        i = bis.read(buffer);
                    }
                    os.close();
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
        return "success";
    }
}
