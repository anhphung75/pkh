import json
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from maychu import tao_maychu_api
from bangbieu import Base, DinhmucChiphi

global db
db = tao_maychu_api(db_user=None, db_pwd=None, db_host=None, db_name=None)


def update_dinhmucchiphi():
    recs = [
        {"madmcp": "1",
         "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.015, "chung": 0.045, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"madmcp": "2",
         "mota": {"vl": 1, "nc": 2.8, "mtc": 1.34, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"madmcp": "3",
         "mota": {"vl": 1, "nc": 2.289, "mtc": 1.26, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"madmcp": "4",
         "mota": {"vl": 1, "nc": 3.857, "mtc": 1.504, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"madmcp": "5",
         "mota": {"vl": 1, "nc": 5.714, "mtc": 1.82, "tructiepkhac": 0.02, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"madmcp": "6",
         "mota": {"vl": 1, "nc": 1, "mtc": 1, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.3, "giamsat": 0.02053}},
        {"madmcp": "7",
         "mota": {"vl": 1, "nc": 1, "mtc": 1, "chung": 0.05, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
        {"madmcp": "20190725",
         "mota": {"vl": 1, "nc": 1, "mtc": 1,
                  "chung": 0.05, "thunhaptinhtruoc": 0.055, "khaosat": 0.0236, "thietke": 1.2, "giamsat": 0.02566}},
        {"madmcp": "20200721",
         "mota": {"vl": 1, "nc": 1, "mtc": 1, "chung": 0.055, "khongxacdinh": 0.02, "thunhaptinhtruoc": 0.055,
                  "khaosat": 0.0207, "thietke": 1.2, "giamsat": 0.02566}}
    ]
    bdl = DinhmucChiphi
    for rec in recs:
        dl = bdl.copy()
        dl.madmcp = rec["madmcp"]
        dl.heso = json.dumps(rec["mota"])
        try:
            db.add(dl)
        except:
            dl = db.query(bdl).filter(bdl.madmcp == rec["madmcp"]).first()
            dl.heso = json.dumps(rec["mota"])
    db.commit()
    db.close()


# main prog
update_dinhmucchiphi()
