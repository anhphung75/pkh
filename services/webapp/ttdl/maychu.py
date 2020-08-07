#import urllib
from sqlalchemy import create_engine


def tao_maychu_api(db_user=None, db_pwd=None, db_host=None, db_name=None):
    from sqlalchemy.orm import scoped_session, sessionmaker
    from ttdl.bangbieu import Base
    try:
        cnnstr = f"mssql+pyodbc://{db_user}:{db_pwd}@{db_host}/{db_name}?driver=ODBC+Driver+17+for+SQL+Server"
        # params = urllib.parse.quote_plus(
        #    "DRIVER={FreeTDS};SERVER=mssql;Port:1433;DATABASE=master;UID=sa;PWD=w3b@pkh2019")
        #cnnstr = f"mssql+pyodbc:///?odbc_connect={params}"
        #cnnstr = f"sqlite:///:memory:"
        engine = create_engine(cnnstr, echo=True)
        Base.metadata.create_all(engine)
        Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
        db = Session()
    except:
        return None
    return db


def tao_maychu(db_user=None, db_pwd=None, db_host=None, db_name=None):
    try:
        cnnstr = f"mssql+pyodbc://{db_user}:{db_pwd}@{db_host}/{db_name}?driver=ODBC+Driver+17+for+SQL+Server"
        # params = urllib.parse.quote_plus(
        #    "DRIVER={FreeTDS};SERVER=mssql;Port:1433;DATABASE=master;UID=sa;PWD=w3b@pkh2019")
        #cnnstr = f"mssql+pyodbc:///?odbc_connect={params}"
        #cnnstr = f"sqlite:///:memory:"
        db = create_engine(cnnstr, echo=True)
    except:
        return None
    return db


def show_tables(db=None, schema="dbo"):
    from sqlalchemy import inspect
    try:
        inspector = inspect(db)
        tt = 0
        for table_name in inspector.get_table_names(schema=schema):
            tt += 1
            print(f"{tt: 02}- {schema}.{table_name}")
    except:
        pass
