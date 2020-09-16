import datetime
import locale


class Thoigian():
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
    def raw2listjson(self, recs):
        data = []
        # try:
        for rec in recs:
            d = rec.__dict__
            dsbo = ['_sa_instance_state']
            for k in d.copy():
                if type(d[k]) in (datetime, datetime.date, datetime.datetime, datetime.time):
                    d[k] = d[k].isoformat()
                if k in dsbo:
                    del d[k]
            data.append(d)
        # except:
        #    return []
        return data


class Tien():
    def __init__(self, sotien=None):
        try:
            self.sotien = int(sotien)
        except:
            self.sotien = None

    def so(self, kyhieu=False):
        if self.sotien == None:
            return f""
        if self.sotien == 0:
            return f""
        else:
            try:
                #locale.setlocale(locale.LC_ALL, 'vi_VI')
                somoi = locale.format_string(
                    f'%.0f', self.sotien, True, kyhieu)
            except:
                return f""
            return somoi

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


def lamtronso(sothapphan=0, phanle=2):
    from decimal import Decimal
    try:
        somoi = float(round(Decimal(sothapphan), phanle))
    except:
        somoi = 0
    return somoi


def tachhangso(sothapphan=0, phanle=3):
    if sothapphan == None:
        return f""
    elif sothapphan == 0:
        return f""
    else:
        #try:
        #locale.setlocale(locale.LC_ALL, 'vi_VI')
        somoi = locale.format_string(f'%.{phanle}f', sothapphan, True)
        #except:
        #    return f""
        return somoi
