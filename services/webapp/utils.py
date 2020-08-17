import datetime


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

    def so(self):
        if self.sotien == None:
            return None
        elif self.sotien == 0:
            return f"- "
        else:
            return f"{self.sotien:,}".replace(',', '.')

    def chu(self):
        if self.sotien == None:
            return f"Không thể đọc !!!"
        elif self.sotien == 0:
            return f"Không đồng."
        ssotien = f"{self.sotien}"
        if len(ssotien) > 21:
            return f"Không thể đọc !!!"
        chu = [u"không", u"một", u"hai", u"ba", u"bốn",
               u"năm", u"sáu", u"bảy", u"tám", u"chín"]
        # dao nguoc list so
        lso = []
        for so in list(str(self.sotien))[::-1]:
          lso.append(int(so))
        print(f"lso={lso}")
        lchu = []
        for id in range(len(lso)):
            so=lso[id]
            hang = id % 3
            print(f"id={id} so={so} hang={hang}")
            if hang == 0:
                if lso[id] == 1:
                    if lso[id+1] > 1:
                        lchu.append(u"mốt")
                    else:
                        lchu.append(u"một")
                elif lso[id] == 5:
                    if lso[id+1] > 0:
                        lchu.append(u"lăm")
                    else:
                        lchu.append(u"năm")
                else:
                    lchu.append(chu[so])
            elif hang == 1:
                lchu.append(u"mươi")
                lchu.append(chu[so])
            else:
                lchu.append(u"trăm")
                lchu.append(chu[so])
        # điền hàng
        print(f"lchu chua hang= {lchu}")
        if len(lso) > 3:
            lchu.insert(5, u"ngàn")
        print(f"lchu dien hang ngan= {lchu}")
        if len(lso) > 6:
            lchu.insert(11, u"triệu")
        print(f"lchu dien hang trieu= {lchu}")
        if len(lso) > 9:
            lchu.insert(17, u"tỷ")
        if len(lso) > 12:
            lchu.insert(23, u"ngàn tỷ")
        if len(lso) > 15:
            lchu.insert(29, u"triệu tỷ")
        if len(lso) > 18:
            lchu.insert(35, u"tỷ tỷ")
        print(f"dien hang lchu= {lchu}")
        # tạo chuõi
        lchu = lchu[::-1]
        kq = ""
        for chu in lchu:
            kq += f"{chu} "
        kq = f"{kq}đồng."
        kq=str(kq)
        kq.replace("không trăm không mươi không triệu tỷ", "")
        kq.replace("không trăm không mươi không triệu tỷ", "")
        kq.replace("không trăm không mươi không ngàn tỷ", "")
        kq.replace("không trăm không mươi không tỷ", "")
        kq.replace("không trăm không mươi không triệu", "")
        kq.replace("không trăm không mươi không ngàn", "")
        kq.replace("không trăm không mươi không", "")
        kq.replace("không mươi không", "")
        kq.replace("không mươi", "")
        kq.replace("một mươi", "mười")
        print(f"kq= {kq}")
        " ".join(kq.split())
        kq.replace("  ", " ")
        kq = f"{kq[0].upper()}{kq[1:]}"
        return kq

