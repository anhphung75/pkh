import datetime
import json
import arrow

from sqlalchemy import func, desc
from ttdl.bangbieu import Hoso
from utils.api import raw2listjson


def get_mahoso_tiep(db, mahoso=None):
    bdl = Hoso
    if mahoso == None:
        nam = datetime.date.today().year
    else:
        vitri = mahoso.index('hs')
        nam = mahoso[:vitri]
    dktim = '{}hs%'.format(nam)
    r = db.query(bdl.mahoso).filter(bdl.mahoso.like(dktim)).order_by(
        desc(bdl.mahoso)).first()
    if r == None:
        _mahoso = nam + 'hs000000'
    else:
        last_mahoso = r.mahoso
        vitri = last_mahoso.index('hs')
        _mahoso = '{}hs{:06d}'.format(nam, int(last_mahoso[vitri+2:]))
    return _mahoso


def moi(db, mahoso=None, data={}):
    r = db.query(Hoso).filter(Hoso.mahoso == mahoso).first()
    if r != None:
        return
    bdl = Hoso(mahoso=mahoso)
    db.add(bdl)
    if 'sohoso' in data:
        bdl.sohoso = data['sohoso']
    if 'khachhang' in data:
        bdl.khachhang = data['khachhang']
    if 'diachikhachhang' in data:
        bdl.diachikhachhang = data['diachikhachhang']
    if 'lienhe' in data:
        bdl.lienhe = data['lienhe']
    if 'maq' in data:
        bdl.maq = data['maq']
    if 'maqp' in data:
        bdl.maq = data['maqp']
    if 'ghichu' in data:
        bdl.ghichu = data['ghichu']
    if 'hosoid' in data:
        bdl.hosoid = data['hosoid']
    db.commit()
    db.close()
    return


def sua(db, mahoso=None, data={}):
    bdl = db.query(Hoso).filter(Hoso.mahoso == mahoso).first()
    if bdl == None:
        return
    # db.add(bdl)
    if 'sohoso' in data:
        bdl.sohoso = data['sohoso']
    if 'khachhang' in data:
        bdl.khachhang = data['khachhang']
    if 'diachikhachhang' in data:
        bdl.diachikhachhang = data['diachikhachhang']
    if 'lienhe' in data:
        bdl.lienhe = data['lienhe']
    if 'maq' in data:
        bdl.maq = data['maq']
    if 'maqp' in data:
        bdl.maq = data['maqp']
    if 'ghichu' in data:
        bdl.ghichu = data['ghichu']
    if 'hosoid' in data:
        bdl.hosoid = data['hosoid']
    db.commit()
    return


def xoa(db, mahoso=None, data={}):
    bdl = db.query(Hoso).filter(Hoso.mahoso == mahoso).all()
    if len(bdl) == 0:
        return
    for r in bdl:
        db.delete(r)
    db.commit()
    return


def xem(db, mahoso=None):
    bdl = Hoso
    data = db.query(bdl).filter(bdl.sohoso == mahoso).all()
    # db.close()
    if len(data) == 0:
        return ['loi len_data = 0']
    print('result = {}'.format(data))
    return json.dumps(raw2listjson(data))


def gom(db, nam=None):
    bdl = Hoso
    if nam == None:
        data = db.query(bdl).filter(bdl.mahoso != None).all()
    else:
        stim = '{}%'.format(nam)
        data = db.query(bdl).filter(bdl.mahoso.like(stim)).limit(2).all()
    db.close()
    return json.dumps(raw2listjson(data))
