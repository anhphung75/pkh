from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from ttdl.bangbieu import Base


def tao_maychu_api(db_user=None, db_pwd=None, db_host=None, db_name=None):
    try:
        cnnstr = "mssql+pyodbc://{}:{}@{}/{}?driver=ODBC+Driver+17+for+SQL+Server".format(
            db_user, db_pwd, db_host, db_name)
        engine = create_engine(cnnstr)
        # params = urllib.parse.quote_plus(
        #    "DRIVER={FreeTDS};SERVER=mssql;Port:1433;DATABASE=master;UID=sa;PWD=w3b@pkh2019")
        #engine = create_engine("mssql+pyodbc:///?odbc_connect=%s" % params)
        #engine = create_engine('sqlite:///:memory:', echo=True)
        Base.metadata.create_all(engine)
        Session = scoped_session(sessionmaker(bind=engine, autoflush=True))
        db = Session()
    except:
        return None
    return db
