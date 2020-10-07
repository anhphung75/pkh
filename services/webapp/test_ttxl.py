import datetime
import arrow
import decimal
from ttxl.reports import qtvt, qtgt
from ttxl.reports import bth_dot_vl


# test
schema = "pkh"
madot = "2020GMMP472"
madot="2020GMDT009"
kq = qtvt.Dulieu(schema, madot)
print(f"kq={vars(kq)}")
dl = qtvt.dulieuin(schema)
print(f"dl={dl}")
