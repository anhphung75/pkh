import datetime
import decimal
import math
import arrow


class Thoigian():
    def __init__(self, vdate=None):
        try:
            self.vdate = int(vdate)
        except:
            self.vdate = None

    def stodate(self, sdate):
        if type(sdate) in (datetime, datetime.datetime, datetime.time):
            return sdate.date()
        elif type(sdate) is datetime.date:
            return sdate
        elif type(sdate) is str:
            dsformat = ['%d/%m/%Y', '%d-%m-%Y', '%d/%m/%Y', '%d-%m-%Y',
                        '%Y/%m/%d', '%Y-%m-%d', '%Y/%m/%d', '%Y-%m-%d']
            for s in dsformat:
                try:
                    result = datetime.datetime.strptime(sdate, s).date()
                    if type(result) is datetime.date:
                        return result
                except:
                    pass
        else:
            return None

    def datetos(self, date):
        if type(date) in (datetime, datetime.datetime, datetime.time):
            return date.date().strftime('%Y-%m-%d')
        elif type(date) is datetime.date:
            return date.strftime('%Y-%m-%d')
        elif type(date) is str:
            return date
        else:
            return None

    def sdates(self, sdate):
        return self.datetos(self.stodate(sdate))


class Api():
    def __init__(self, recs):
        self.recs = recs

    def orm(self):
        try:
            data = []
            dsbo = ["_sa_instance_state"]
            for row in self.recs:
                #dl = dict(row)
                dl = row.__dict__
                for k in dl.copy():
                    if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                        if k in ["lastupdate", "utcid"]:
                            dl[k] = int(
                                arrow.get(dl[k]).float_timestamp * 1000)
                        else:
                            dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
                    if isinstance(dl[k], decimal.Decimal):
                        dl[k] = float(dl[k])
                    for l in dsbo:
                        if l in k:
                            del dl[k]
                data.append(dl)
            return data
        except:
            return None

    def core(self):
        try:
            data = []
            for row in self.recs:
                dl = dict(row)
                for k in dl:
                    if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                        if k in ["lastupdate", "utcid"]:
                            dl[k] = int(
                                arrow.get(dl[k]).float_timestamp * 1000)
                        else:
                            dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
                    if isinstance(dl[k], decimal.Decimal):
                        dl[k] = float(dl[k])
                data.append(dl)
            return data
        except:
            return None


class Tien():
    def __init__(self, sotien=None):
        try:
            self.sotien = int(sotien)
        except:
            self.sotien = None

    def so(self, kyhieu=''):
        if self.sotien == None:
            return f""
        if self.sotien == 0:
            return f""
        else:
            s = f"{self.sotien}"
            hang = []
            while len(s) > 2:
                hang.append(s[-3:])
                s = s[:-3]
            try:
                s = int(s)
                hang.append(f"{s}")
            except:
                pass
            somoi = f"{'.'.join(reversed(hang))} {kyhieu}"
            return somoi.strip()

    def chu(self):
        if self.sotien == None:
            return f"Không thể đọc !!!"
        elif self.sotien == 0:
            return f"Không đồng."
        elif self.sotien < 0:
            sno = "Nợ "
            self.sotien = abs(self.sotien)
        else:
            ssotien = f"{self.sotien}"
            if len(ssotien) > 21:
                return f"Không thể đọc !!!"
            else:
                sno = ""
        chu = ["không", "một", "hai", "ba", "bốn",
               "năm", "sáu", "bảy", "tám", "chín"]
        hang = ['', 'ngàn', 'triệu', 'tỷ', 'ngàn tỷ', 'triệu tỷ', 'tỷ tỷ']
        # dao nguoc list so
        lso = []
        for so in list(str(self.sotien))[::-1]:
            lso.append(int(so))
        hangso = {}
        for h in range(7):
            hangso[h] = {"tram": 0, "chuc": 0, "donvi": 0}
        for id in range(len(lso)):
            h = int(id / 3)
            trchdv = id % 3
            if trchdv == 0:
                hangso[h]['donvi'] = lso[id]
            if trchdv == 1:
                hangso[h]['chuc'] = lso[id]
            if trchdv == 2:
                hangso[h]['tram'] = lso[id]
        kq = ""
        for h in range(6, -1, -1):
            tram = hangso[h]['tram']
            chuc = hangso[h]['chuc']
            donvi = hangso[h]['donvi']
            if (tram+chuc+donvi) > 0:
                if len(kq) > 0:
                    kq += f"{chu[tram]} trăm "
                if (chuc+donvi) > 0:
                    if chuc == 0:
                        if len(kq) > 0:
                            kq += f"lẻ {chu[donvi]} "
                        else:
                            kq += f"{chu[donvi]} "
                    elif chuc == 1:
                        if donvi == 5:
                            kq += "mười lăm "
                        elif donvi == 0:
                            kq += "mười "
                        else:
                            kq += f"mười {chu[donvi]} "
                    else:
                        if donvi == 0:
                            kq += f"{chu[chuc]} mươi "
                        elif donvi == 1:
                            kq += f"{chu[chuc]} mươi mốt "
                        else:
                            kq += f"{chu[chuc]} mươi {chu[donvi]} "
                if len(hang[h]) > 0:
                    kq += f"{hang[h]} "
        if len(sno) > 0:
            kq = f"{sno}{kq}đồng."
        else:
            kq = f"{kq[0].upper()}{kq[1:]}đồng."
        return kq


def lamtronso(solamtron=0, sole=3):
    try:
        if sole > 9 or sole < 0:
            return solamtron
        le = 10**(sole)
        kq = math.trunc(solamtron * le) / le
        le = 10**(sole+1)
        kt = math.trunc(solamtron * le) / le
        them = 0
        lech = round((kt-kq) * le)
        if lech > 4:
            them = 1/10**sole
        return kq+them
    except:
        return 0


def tachhangso(sothapphan=0, phanle=3):
    if sothapphan == None:
        return f"- "
    elif sothapphan == 0:
        return f"- "
    else:
        s = f"{sothapphan:12f}"
        for d in ['.', ',']:
            if s.count(d) == 1:
                dauthapphan = d
        v = s.find(dauthapphan)
        songuyen = s[:v]
        sole = s[v+1:][:phanle]
        hang = []
        while len(songuyen) > 2:
            hang.append(songuyen[-3:])
            songuyen = songuyen[:-3]
        try:
            songuyen = int(songuyen)
            hang.append(f"{songuyen}")
        except:
            pass
        if phanle == 0:
            return f"{'.'.join(reversed(hang))}".strip()
        else:
            return f"{'.'.join(reversed(hang))},{sole}".strip()
