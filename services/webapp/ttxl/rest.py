import json
import arrow
from ttdl.mssql import Server


class Rest():
    def __init__(self, schema='web', bang='hoso'):
        self.schema = schema.lower()
        self.bang = bang.lower()
        self.mabang()

    def runsql(self, sql=''):
        engine = Server("pkh", "Ph0ngK3H0@ch",
                        "192.168.24.4:1433", "PKHData")
        try:
            kq = engine.core().execute(sql)
            data = []
            for row in kq:
                dl = dict(row)
                for k in dl.copy():
                    if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                        if k in ['lastupdate', 'ngaylendot']:
                            dl[k] = int(arrow.get(dl[k]).to(
                                'utc').float_timestamp * 1000)
                        else:
                            dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
                    if isinstance(dl[k], decimal.Decimal):
                        dl[k] = float(dl[k])
                data.append(dl)
            kq.close()
            return data
        except IntegrityError as err:
            if err.orig:
                return {"err_code": int(err.orig.args[0]), "err": err.orig.args[1]}
            else:
                return None

    def mabang(self):
        if self.bang in ["hoso"]:
            self.ma = "mahoso"
        elif self.mabang in ["khachhang"]:
            self.ma = "makhachhang"
        else:
            self.ma = None

    def gom(self, nam=None):
        sql = f"Select * "
        if nam:
            sql += f"From {self.schema}.{self.bang} Where data Like '%: {nam}%'"
        else:
            sql += f"From {self.schema}.{self.bang} Where idutc>0"

        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" in r)):
                return None
            print(f"Rest {self.bang} gom[{nam}]={r}")
            return r
        except:
            return None

    def nap(self, idutc):
        if not idutc:
            return None
        sql = f"Select top 1 * From {self.schema}.{self.bang} Where idutc={idutc}"
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" in r)):
                return None
            print(f"Rest {self.bang} nap[{idutc}]={r}")
            return r
        except:
            return None

    def xoa(self, idutc):
        if not idutc:
            return None
        sql = f"Delete From {self.schema}.{self.bang} Where idutc={idutc};"
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" not in r)):
                print(f"Rest {self.bang} xoa[{idutc}]= ok")
        except:
            return None

    def moi(self, dl, ismoi=False):
        if not dl:
            return None
        # check dl
        for k in dl.copy():
            if k not in ['idutc', 'inok', 'lastupdate', 'status', 'refs', 'data', self.ma]:
                del dl[k]
        if not dl['idutc']:
            dl['idutc'] = int(arrow.utcnow().float_timestamp * 1000)
        dl['inok'] = 1
        if dl['status']:
            dl['status'] = f"N'{dl['status']}'"
        if dl[self.ma]:
            dl[self.ma] = f"N'{dl[self.ma]}'"
        if dl['refs']:
            try:
                dl["refs"] = json.dumps(dl["refs"], ensure_ascii=False)
            except:
                pass
            dl['refs'] = f"N'{dl['refs']}'"
        if dl['data']:
            try:
                dl['data'] = json.dumps(dl['data'], ensure_ascii=False)
            except:
                pass
            dl['data'] = f"N'{dl['data']}'"
        while True:
            dl['lastupdate'] = int(arrow.utcnow().float_timestamp * 1000)
            sql = (f"INSERT INTO {self.schema}.{self.bang} ({','.join(dl.keys())}) "
                   f"VALUES ({','.join(dl.values())});")
            try:
                kq = self.runsql(sql)
                if "err" in kq:
                    print(f"err={kq['err']}")
                    if ismoi and kq['err_code'] == 23000:
                        # duplicate Primary key
                        dl["idutc"] += 1
                    else:
                        break
                else:
                    print("created ok")
                    break
            except:
                break

    def sua(self, dl):
        if (not dl['idutc']) or (not dl['data']) or (len(dl['data']) < 1):
            return None
        # check dl
        for k in dl.copy():
            if k not in ['idutc', 'inok', 'status', 'refs', 'data', self.ma]:
                del dl[k]
        try:
            dl['data'] = json.loads(dl['data'])
            for k in dl['data'].copy():
                if (dl['data'][k] == None) or (len(dl['data'][k]) < 1):
                    if k.lower() not in ['ghichu', 'notes']:
                        del dl['data'][k]
        except:
            pass
        dl['data'] = f"N'{json.dumps(dl['data'], ensure_ascii=False)}'"
        if dl['status']:
            dl['status'] = f"N'{dl['status']}'"
        if dl[self.ma]:
            dl[self.ma] = f"N'{dl[self.ma]}'"
        if dl['refs']:
            try:
                dl["refs"] = json.loads(dl["refs"])
                for k in dl['refs'].copy():
                    if (dl['refs'][k] == None) or (len(dl['refs'][k]) < 1):
                        del dl['refs'][k]
                    else:
                        for k1 in k:
                            if (dl['refs'][k][k1] == None) or (len(dl['refs'][k][k1]) < 1):
                                del dl['refs'][k][k1]
            except:
                pass
            dl["refs"] = f"N'{json.dumps(dl['refs'], ensure_ascii=False)}'"
        # update to server
        sql = f"UPDATE {self.schema}.{self.bang} SET "
        for k in dl:
            sql += f"{k}={dl[k]},"
        sql += f"lastupdate={int(arrow.utcnow().float_timestamp * 1000)} Where idutc={dl['idutc']};"
        try:
            r = self.runsql(sql)
            if ((r == None) or (len(r) < 1) or ("err" not in r)):
                print(f"Rest {self.bang} sua[{dl['idutc']}]=ok")
        except:
            return None
