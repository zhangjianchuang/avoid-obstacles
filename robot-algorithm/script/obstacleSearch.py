#!/usr/bin/env python
import glob

import cv2
import numpy as np


class ObstacleSearcher:
    template = None

    def __init__(self, templateUrl):
        self.template = cv2.imread(templateUrl, 0)

    def search(self, imgUrl):
        img_rgb = cv2.imread(imgUrl)
        img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)

        w, h = self.template.shape[::-1]
        res = cv2.matchTemplate(img_gray, self.template, cv2.TM_CCOEFF_NORMED)
        threshold = 0.63
        loc = np.where(res >= threshold)
        for pt in zip(*loc[::-1]):
            # 标记实物
            cv2.rectangle(img_rgb, pt, (pt[0] + w, pt[1] + h), (0, 255, 255), 2)
            return True
        # test
        # cv2.imshow("image", img_rgb)
        # cv2.waitKey(0)
        return False


# test
# searcher = ObstacleSearcher("../../robot-image/obstacle-img/example.png")
# images = glob.glob("../../robot-image/obstacle-img/*")
# for name in images:
#     searcher.search(name)
