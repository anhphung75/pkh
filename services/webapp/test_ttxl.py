import datetime
import arrow
import decimal
from ttxl.reports import qtvl
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
schema = "pkh"
madot = "2020GMMP008"
sql = (
    f"Select cp.chiphiid,cp.motachiphi,cp.dvt,cp.soluong,"
    f" hs.hosoid,hs.sohoso,hs.khachhang,hs.diachikhachhang as diachigandhn"
    f" FROM ("
    f"Select qt32.chiphiid, sum(qt32.soluong) as soluong, qt32.giavl as gia, qt.tt, qt.hosoid"
    f" From {schema}.qt qt RIGHT JOIN {schema}.qt32 qt32 ON qt.maqt=qt32.maqt"
    f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
    f" Where (qt.madot='{madot}' And c.mapl1 Like 'VL%'"
    f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
    f" Group By qt32.chiphiid, qt.tt, qt.hosoid"
    f" UNION Select qt34.chiphiid, sum(qt34.soluong), qt34.giavl, qt.tt, qt.hosoid"
    f" From {schema}.qt qt RIGHT JOIN {schema}.qt34 qt34 ON qt.maqt=qt34.maqt"
    f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
    f" Where (qt.madot='{madot}' And cp.mapl1 Like 'VL%'"
    f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
    f" Group By qt34.chiphiid, qt.tt, qt.hosoid"
    f" UNION Select qt31.chiphiid, sum(qt31.soluong), qt31.giavl, qt.tt, qt.hosoid"
    f" From {schema}.qt qt RIGHT JOIN {schema}.qt31 qt31 ON qt.maqt=qt31.maqt"
    f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
    f" Where (qt.madot='{madot}' And cp.mapl1 Like 'VL%'"
    f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
    f" Group By qt31.chiphiid, qt.tt, qt.hosoid"
    f" UNION Select qt32.chiphiid, sum(qt32.soluong), qt32.giavl, qt.tt, qt.hosoid"
    f" From {schema}.qt qt RIGHT JOIN {schema}.qt32 qt32 ON qt.maqt=qt32.maqt"
    f" RIGHT JOIN dbo.chiphi c on qt32.chiphiid=c.chiphiid"
    f" Where (qt.madot='{madot}' And cp.mapl1 Like 'VL%'"
    f" And (qt.tinhtrang like 'ok%' Or qt.tinhtrang like 'fin%'))"
    f" Group By qt32.chiphiid, qt.tt, qt.hosoid"
    f" ) AS cp"
    f" LEFT JOIN dbo.hoso hs ON cp.hosoid=hs.hosoid"
    f" Order By cp.chiphiid, cp.tt"
)
kq = run_mssql(sql)
print(f"kq={kq}")
# dl=ds['qtvt'][madot]
#print(f"dl tieude={dl.tieude}")
