import json
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from maychu import tao_maychu_api
from bangbieu import Base, DinhmucChiphi

global db
db = tao_maychu_api(db_user=None, db_pwd=None, db_host=None, db_name=None)


def update_hesochiphi():
    recs = [
        {"hesoid": "1",
         "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"hesoid": "2",
         "mota": {"vl": 1, "nc": 2.8, "mtc": 1.34, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"hesoid": "3",
         "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"hesoid": "4",
         "mota": {"vl": 1, "nc": 3.857, "mtc": 1.504, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"hesoid": "5",
         "mota": {"vl": 1, "nc": 5.714, "mtc": 1.82, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"hesoid": "6",
         "mota": {"vl": 1, "nc": 1, "mtc": 1, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"hesoid": "7",
         "mota": {"vl": 1, "nc": 1, "mtc": 1, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
        {"hesoid": "20190725",
         "mota": {"vl": 1, "nc": 1, "mtc": 1,
                  "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
        {"hesoid": "20200721",
         "mota": {"vl": 1, "nc": 1, "mtc": 1, "chung": 0.055, "giantiepkhac": 0.02, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}}
    ]
    bdl = HesoChiphi
    for rec in recs:
        dl = bdl.copy()
        uid = "hesoid"
        dl.hesoid = rec[uid]
        dl.heso = json.dumps(rec["mota"])
        try:
            dl = db.query(bdl).filter(bdl.hesoid == rec[uid]).first()
            dl.heso = json.dumps(rec["mota"])
        except:
            db.add(dl)
    db.commit()
    db.close()


# main prog
update_hesochiphi()
