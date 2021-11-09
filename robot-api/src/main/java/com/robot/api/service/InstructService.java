package com.robot.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface InstructService {

    /**
     * 's' is Straight ahead
     * 'l' is Turn left
     *
     * @param uploadFile img file
     * @return java.lang.String
     * @author zhangjianchuang@kanzhun.com
     * @date 2021/11/9 9:50 上午
     */
    String getNextInstruct(MultipartFile uploadFile);
}
