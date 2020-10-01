import datetime,arrow,decimal
from ttxl.reports import qtvt
from ttdl import Maychu

def run_mssql(sql=''):
    mssql = Maychu("mssql", "PKH.TCTB", "123456789",
                   "192.168.24.4:1433", "PKHData")
    kq = mssql.core().execute(sql)
    data = []
    for row in kq:
        dl = dict(row)
        for k in dl.copy():
            if type(dl[k]) in [datetime, datetime.date, datetime.datetime, datetime.time]:
                if k == 'lastupdate':
                    dl[k] = int(arrow.get(dl[k]).float_timestamp * 1000)
                else:
                    dl[k] = int(arrow.get(dl[k]).format("YYYYMMDD"))
            if isinstance(dl[k], decimal.Decimal):
                dl[k] = float(dl[k])
        data.append(dl)
    kq.close()
    for cp in data:
        print(f"runsql cp={cp}")
    return data


# test
schema="pkh"
madot="2020GMMP008"
kq = qtvt.dulieuin(schema)
print(f"kq={kq}")
#dl=ds['qtvt'][madot]
#print(f"dl tieude={dl.tieude}")
