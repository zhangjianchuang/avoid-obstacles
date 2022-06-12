import zeep
wsdl = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl'
client = zeep.Client(wsdl=wsdl)
print(client.service.Method1('Zeep', 'is cool'))