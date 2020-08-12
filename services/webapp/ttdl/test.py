from maychu import db


# from sqlalchemy.orm import scoped_session, sessionmaker
# from bangbieu import Base

# pwd = "Ph0ngK3H0@ch"
# cnnstr = f"mssql+pyodbc://pkh:{pwd}@192.168.24.4/PKHData?driver=ODBC+Driver+17+for+SQL+Server"
db = db("mssql", "pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
db.show_tables("web")
db.del_table("web.tinh_tamqtt")
db.show_tables("web")
