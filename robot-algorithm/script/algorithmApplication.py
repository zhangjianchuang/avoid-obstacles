# -*- coding: utf-8 -*-
# !/usr/bin/env python

import os
import time

from bottle import route, run, static_file, request
from obstacleSearch import ObstacleSearcher

templateUrl = "img-template/template.png"
searcher = ObstacleSearcher(templateUrl)
localPath = '/Users/zhangjianchuang/develop/code/source/avoid-obstacles/robot-algorithm/script/tmp/'


@route('/search/<image>')
def index(image):
    if searcher.search(localPath + image):
        return {"result": "Obstacles, turn"}
    return {"result": "No obstacles, go straight"}


@route('/static/<filename>')
def send_static(filename):
    return static_file(filename, root=localPath)


@route('/images')
def send_static():
    files = os.listdir(localPath)
    fileList = []
    for f in files:
        if not f.startswith("."):
            fileList.append(f)
    return {"files": fileList}


@route('/upload', method='POST')
def do_upload():
    upload = request.files.get('avatar-foo')
    upload.save(localPath, overwrite=True)  # 把文件保存到save_path路径下
    return 'ok'


run(host='192.168.0.103', port=20003)
