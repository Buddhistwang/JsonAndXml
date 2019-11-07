# -*- coding: utf-8 -*-

"""连接数据库操作"""

from pymongo import MongoClient
from pymongo import ReadPreference

from config import MONGODB_HOST


class ConMongodb(object):
    def __init__(self):
        self.mongo_host = MONGODB_HOST
        self.client = MongoClient(self.mongo_host)
        self.demo = self.client.get_database('demo', read_preference=ReadPreference.SECONDARY_PREFERRED)



