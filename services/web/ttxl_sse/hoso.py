import json
import arrow

from sqlalchemy import func, desc
from ttdl.base import db
from ttdl.base import Hoso
from utils.api import raw2listjson
from ttdl.test import tamdskh


def gom(nam=None):
    bdl = Hoso
    if nam == None:
        data = db.query(bdl).filter(bdl.mahoso != None).all()
    else:
        sdk = '{}%'.format(nam)
        data = db.query(bdl).filter(bdl.mahoso.like(sdk)).all()
    db.close()

    tgdi = int(arrow.utcnow().float_timestamp * 1000)
    _id = tgdi
    _event = 'message'
    _data = json.dumps(raw2listjson(data))
    return 'id:{}\\nenvent:{}\\ndata:{}\\n\\n'.format(_id, _event, _data)


def test():
    tgdi = int(arrow.utcnow().float_timestamp * 1000)
    _id = tgdi
    _event = 'message'
    _data = json.dumps(tamdskh)
    return _data
