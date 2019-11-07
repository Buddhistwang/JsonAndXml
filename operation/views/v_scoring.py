# -*- coding: utf-8 -*-

from flask import render_template
from . import views
from ..common.mongodb_connect import ConMongodb
import xmltodict
import json



# global
@views.route('/scoring/global', methods=['POST', 'GET'])
def global_info():
    # 显示原始配置文件
    # with open('global.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)

    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'global'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/global.html", data=result, **locals())


# browser
@views.route('/scoring/browser', methods=['POST', 'GET'])
def browser():
    # 显示原始配置文件
    # with open('browser-conf-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)

    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'browser'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/browser.html", data=result, **locals())


# mp
@views.route('/scoring/mp', methods=['POST', 'GET'])
def mp():
    # 显示原始配置文件
    # with open('mp-config-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)

    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'mp'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/mp.html", data=result, **locals())


# platform
@views.route('/scoring/platform', methods=['POST', 'GET'])
def platform():
    # 显示原始配置文件
    # with open('platform-storm-conf-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)

    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'platform'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/platform.html", data=result, **locals())


# sdk
@views.route('/scoring/sdk', methods=['POST', 'GET'])
def sdk():
    # with open('sdk-config-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)

    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'sdk'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/sdk.html", data=result, **locals())


# server
@views.route('/scoring/server', methods=['POST', 'GET'])
def server():
    # 显示原始配置文件
    # with open('server-config-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)

    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'server'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/server.html", data=result, **locals())


# sso
@views.route('/scoring/sso', methods=['POST', 'GET'])
def sso():
    # with open('sso-conf-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)
    result = {}
    query = list(ConMongodb().demo.demo.find({'name': 'sso'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/sso.html", data=result, **locals())


# view
@views.route('/scoring/view', methods=['POST', 'GET'])
def view():
    # with open('view-config-raw.xml', 'r') as f:
    #     xmlStr = f.read()
    # convertedDict = xmltodict.parse(xmlStr)
    # result = json.dumps(convertedDict, indent=1)
    result = {}
    query = list(ConMongodb().demo.demo.find({'name':'view'}, {'_id': 0, 'name': 0}))
    if query:
        datas = query[0].get('data')
        result = json.dumps(datas, indent=1)
    return render_template("/scoring/view.html", data=result, **locals())





