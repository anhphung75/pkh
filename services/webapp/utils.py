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
