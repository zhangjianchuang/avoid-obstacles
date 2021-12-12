package com.robot.image.utils;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @author zhangjianchuang@kanzhun.com
 * @date 2021年11月09日 10:07 上午
 */
public class HttpUtil {
    public static String upload(String url, File imageFilePath) {
        HttpEntity reqEntity = MultipartEntityBuilder
                .create()
                .addPart("file", new FileBody(imageFilePath))
                .build();
        HttpPost httpPost = new HttpPost(url);
        httpPost.setEntity(reqEntity);
        try (CloseableHttpClient httpClient = HttpClients.createDefault();
             CloseableHttpResponse response = httpClient.execute(httpPost)) {
            HttpEntity    resultEntity = response.getEntity();
            StringBuilder sb           = new StringBuilder();
            if (resultEntity != null) {
                try (InputStream is = resultEntity.getContent();
                     BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                    }
                }
            }
            EntityUtils.consume(resultEntity);
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }
}
