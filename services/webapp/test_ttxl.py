import datetime
import arrow
import decimal
from ttxl.reports import qtvt, qtvl


# test
schema = "pkh"
madot = "2020GMMP472"
madot="2020GMDT009"
kq = qtvl.Dulieu(schema, madot)
print(f"kq={vars(kq)}")
dl = qtvl.dulieuin(schema)
print(f"dl={dl}")
