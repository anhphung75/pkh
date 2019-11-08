import datetime


def stodate(sdate):
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


def datetos(date):
    if type(date) in (datetime, datetime.datetime, datetime.time):
        return date.date().strftime('%Y-%m-%d')
    elif type(date) is datetime.date:
        return date.strftime('%Y-%m-%d')
    elif type(date) is str:
        return date
    else:
        return None


def sdates(sdate):
    return datetos(stodate(sdate))
