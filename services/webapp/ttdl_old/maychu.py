# import urllib
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import scoped_session, sessionmaker
from ttdl.bangbieu import Base


class maychu:
    def __init__(self, server='postgresql', user=None, pwd=None, host=None, dbname=None):
        self.user = user
        self.pwd = pwd
        self.host = host
        self.dbname = dbname
        if server == 'mssql':
            self.server = server
            self.cnnstr = (
                f"{server}+pyodbc://{self.user}:{self.pwd}@{self.host}/{self.dbname}?"
                f"driver=ODBC+Driver+17+for+SQL+Server")
        elif server == 'postgresql':
            self.server = server
            self.cnnstr = (
                f"{server}+psycopg2://{self.user}:{self.pwd}@{self.host}/{self.dbname}")
        else:
            self.server = 'sqlite'
            self.cnnstr = f"{server}:///draft.db"

    def core(self):
        try:
            # params = urllib.parse.quote_plus(
            #    "DRIVER={FreeTDS};SERVER=mssql;Port:1433;DATABASE=master;UID=sa;PWD=w3b@pkh2019")
            # cnnstr = f"mssql+pyodbc:///?odbc_connect={params}"
            # cnnstr = f"sqlite:///:memory:"
            may = create_engine(self.cnnstr, echo=True)
            may.execution_options(isolation_level="AUTOCOMMIT")
        except:
            return None
        return may

    def orm(self):
        try:
            may = create_engine(self.cnnstr, echo=True)
            Base.metadata.create_all(may)
            Session = scoped_session(sessionmaker(bind=may, autoflush=True))
        except:
            return None
        return Session()

    def show_views(self, schema=None):
        if schema:
            schema = f"'{schema}'"
        else:
            schema = f"o.object_id"
        sql = (
            f"Select CONCAT(OBJECT_SCHEMA_NAME({schema}),'.', o.name) as view"
            f" From	sys.objects as o Where o.type='V';")
        try:
            self.engine().execute(sql)
        except:
            pass

    def del_object(self, otype='Table', oname=None):
        sql = (
            f"Drop {otype} {oname};")
        try:
            self.engine().execute(sql)
        except:
            print(f"{otype} {oname} not exist!!!")
            pass
