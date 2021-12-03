# -*- coding: utf-8 -*-
# !/usr/bin/env python


from bottle import route, run, static_file
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


@route('/h')
def hello():
    return {"h": "hello world"}


run(host='192.168.0.103', port=20003)
