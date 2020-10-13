import datetime
import arrow
import decimal
from ttxl.reports import dutoan, qtvt, qtgt
from ttxl.reports import bth_dot_vl,bth_dot_qtgt


# test
schema = "pkh"
madot="2020GMMP424"
maqt = "2020GMMP622001"
kq = bth_dot_vl.Dulieu(schema, madot)
print(f"kq={vars(kq)}")
#dl = bth_dot_qtgt.dulieuin(schema)
#print(f"dl={dl}")
