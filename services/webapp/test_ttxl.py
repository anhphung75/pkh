import datetime
import arrow
import decimal
from ttxl.reports import dutoan, qtvt, qtgt
from ttxl.reports import bth_dot_vl


# test
schema = "pkh"
madot="2020GMMP622"
maqt = "2020GMMP622001"
kq = dutoan.Dulieu(schema, maqt)
print(f"kq={vars(kq)}")
dl = dutoan.dulieuin(schema)
print(f"dl={dl}")
