def raw2listjson(recs):
    data = []
    try:
        for rec in recs:
            d = rec.__dict__
            dsbo = ['_sa_instance_state']
            for k in dsbo:
                if k in d:
                    del d[k]
            data.append(d)
    except:
        return []
    return data
