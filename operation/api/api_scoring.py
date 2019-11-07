# -*- coding: utf-8 -*-

from flask import request, make_response
from . import api
from ..common.mongodb_connect import ConMongodb
import json


# global
@api.route('/api/save/global', methods=['POST', 'GET'])
def save_global():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'global'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# browser
@api.route('/api/save/browser', methods=['POST', 'GET'])
def save_browser():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'browser'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# mp
@api.route('/api/save/mp', methods=['POST', 'GET'])
def save_mp():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'mp'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# platform
@api.route('/api/save/platform', methods=['POST', 'GET'])
def save_platform():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'platform'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# sdk
@api.route('/api/save/sdk', methods=['POST', 'GET'])
def save_sdk():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'sdk'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# server
@api.route('/api/save/server', methods=['POST', 'GET'])
def save_server():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'server'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# sso
@api.route('/api/save/sso', methods=['POST', 'GET'])
def save_sso():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'sso'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))


# view
@api.route('/api/save/view', methods=['POST', 'GET'])
def save_view():
    if request.method == 'POST':
        query = request.get_data()
        values = json.loads(query)
        ConMongodb().demo.demo.update({'name': 'view'}, {'$set': {'data': values}}, True)
        return make_response(json.dumps({'code': 200}))
