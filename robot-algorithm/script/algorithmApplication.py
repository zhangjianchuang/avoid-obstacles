# -*- coding: utf-8 -*-
# !/usr/bin/env python


from bottle import route, run

from obstacleSearch import ObstacleSearcher

templateUrl = "img-template/template.png"
searcher = ObstacleSearcher(templateUrl)


@route('/search/<image>')
def index(image):
    if searcher.search("tmp/" + image):
        return "t"
    return "r"


run(host='localhost', port=20003)
