package com.robot.algorithm.utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

/**
 * @author zhangjianchuang@kanzhun.com
 * @date 2021年11月09日 10:07 上午
 */
public class HttpUtil {
    public static boolean httpDownload(String httpUrl, String saveFile) {
        URLConnection conn;
        try {
            URL url = new URL(httpUrl);
            conn = url.openConnection();
        } catch (IOException e) {
            return false;
        }

        try (InputStream inStream = conn.getInputStream();
             FileOutputStream fs = new FileOutputStream(saveFile)) {
            int    byteRead;
            byte[] buffer = new byte[1204];
            while ((byteRead = inStream.read(buffer)) != -1) {
                fs.write(buffer, 0, byteRead);
            }
            return true;
        } catch (IOException e) {
            return false;
        }
    }
}
