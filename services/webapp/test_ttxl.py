import datetime
import arrow
import decimal
from ttxl.reports import qtvt, qtgt
from ttxl.reports import bth_dot_vl


# test
schema = "pkh"
madot = "2020GMMP590"
kq = bth_dot_vl.Dulieu(schema, madot)
print(f"kq={vars(kq)}")
dl = bth_dot_vl.dulieuin(schema)
print(f"dl={dl}")
