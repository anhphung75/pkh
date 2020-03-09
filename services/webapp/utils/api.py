import datetime


def raw2listjson(recs):
    data = []
    #try:
    for rec in recs:
        d = rec.__dict__
        dsbo = ['_sa_instance_state']
        for k in d.copy():
            if type(d[k]) in (datetime, datetime.date, datetime.datetime, datetime.time):
                d[k] = d[k].isoformat()
            if k in dsbo:
                del d[k]
        data.append(d)
    #except:
    #    return []
    return data
