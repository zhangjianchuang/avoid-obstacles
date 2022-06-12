import json
import time
from datetime import datetime

import paho.mqtt.publish as publish
import requests

url = 'https://opendata.sz.gov.cn/data/dataSet/singleFileDownload'
payload = {'fileId': '1387949354534088704', 'resId': '29200/01503670', 'isShowOriginalFileName': False}
r = requests.post(url, data=payload)

jsonResp = json.loads(r.content)
dataUrl = jsonResp['message']
r = requests.post(dataUrl)
for obj in json.loads(r.content[1:-1]):
    data = [0,0,0,0,0,0,0,0,0,0,0]
    if 'xzqz' in obj:
        data.insert(0, int(obj['xzqz']))
    if 'jzsj' in obj:
        data.insert(1, obj['jzsj'].replace("时", ''))
    if 'ljqznanx' in obj:
        data.insert(2, obj['ljqznanx'])
    if 'ljqzzs' in obj:
        data.insert(3, int(obj['ljqzzs']))
    if 'jzrq' in obj:
        a = time.strptime(obj['jzrq'], "%Y年%m月%d日")
        date = datetime.strftime(datetime.strptime(obj['jzrq'], "%Y年%m月%d日"), "%Y-%m-%d")
        data.insert(4, int(time.mktime(a)))
    if 'ljqznvx' in obj:
        data.insert(5, obj['ljqznvx'])
    if 'zz' in obj:
        data.insert(6, int(obj['zz']))
    if 'wz' in obj:
        data.insert(7, int(obj['wz']))
    if 'ljcy' in obj:
        data.insert(8, int(obj['ljcy']))
    if 'ljsw' in obj:
        data.insert(9, int(obj['ljsw']))
    if 'dqglzl' in obj:
        data.insert(10, int(obj['dqglzl']))
    if 'jsyxgc' in obj:
        data.insert(11, int(obj['jsyxgc']))
    print(data)
    publish.single("/covid19/sz/data", json.dumps(data), auth={'username': "croxs", 'password': "123"},
                   hostname="192.168.0.101")
