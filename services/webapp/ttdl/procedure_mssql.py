import json
from maychu import tao_maychu, show_tables


# from sqlalchemy.orm import scoped_session, sessionmaker
# from bangbieu import Base

# pwd = "Ph0ngK3H0@ch"
# cnnstr = f"mssql+pyodbc://pkh:{pwd}@192.168.24.4/PKHData?driver=ODBC+Driver+17+for+SQL+Server"
db = tao_maychu("pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
db.execution_options(isolation_level="AUTOCOMMIT")
show_tables(db, "dbo")


def tinh_tamqt(schema="dbo"):
    # init prog
    sql = (f"CREATE PROC {schema}.tinh_tamqt AS ")
    try:
        db.execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinh_tamqt"
        f" @Baogiaid INT=0,"
        f" @Plgia NVARCHAR(50)='dutoan',"
        f" @Hesoid INT=0;"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY DECLARE"
    )
    # heso chiphi
    lds = ["vl", "nc", "mtc", "tructiepkhac", "chung", "khongxacdinh",
           "thutinhtruoc", "khaosat", "thietke", "giamsat"]
    for heso in lds:
        sql += f" @{heso} DECIMAL(19,5)=1.0000,"
    # tong ket kinh phi
    lds = ["tongxaydung", "tongtailap", "tongcongtrinh",
           "dautucty", "dautukhach", "tratruoc"]
    for chiphi in lds:
        sql += f" @{chiphi} DECIMAL(19,5)=1.0000,"
    # kinh phi chi tiet
    lds = ["Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Chung", "Giaxaydung", "Thutinhtruoc",
           "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue", "Vattongxaydung", "Tongxaydung", "Tailap", "Vattailap", "Tailaptruocthue"]
    # phan ong nganh
    for chiphi in lds:
        sql += f" @on{chiphi} DECIMAL(19,5)=1.0000,"
    # phan ong cai
    for chiphi in lds:
        sql += f" @oc{chiphi} DECIMAL(19,5)=1.0000,"
    sql += f" @Plqt NVARCHAR(50);"
    # tinh tamqtx
    sql += f" IF((@Baogiaid>0) OR (Len(@Plgia)>0)) EXEC {schema}.tinh_tamqt3x @Baogiaid, @Plgia;"
    # load Zvl, Znc, Zmtc, Tailap
    # load hesochiphi
    ods = {"nc": "heso_nc", "mtc": "heso_mtc", "tructiepkhac": "heso_ttpk", "chung": "heso_cpchung", "khongxacdinh": "khongxacdinh",
           "thutinhtruoc": "heso_thunhaptt", "khaosat": "heso_khaosat", "thietke": "heso_thietke", "giamsat": "heso_gstc"}
    s = f" Select "
    for heso in ods:
        s += f"@{heso}=Isnull({ods[heso]},0),"
    s += f"@vl=1.0000 From dbo.hesochiphi Where hesoid=@Hesoid;"
    sql += s
    # tinh chi phi
    sql += f" CASE When @Hesoid<20200721 Then Begin"
    s = ""
    lds = ["on", "oc"]
    for phui in lds:
        s += (f" Set @{phui}Vl= dbo.lamtronso(@{phui}Zvl*@vl,0)"
              f" Set @{phui}Nc= dbo.lamtronso(@{phui}Znc*@nc,0)"
              f" Set @{phui}Mtc= dbo.lamtronso(@{phui}Zmtc*@mtc,0)"
              f" Set @{phui}Zvlncmtc= (@{phui}Vl + @{phui}Nc + @{phui}Mtc)"
              f" Set @{phui}Tructiepkhac= dbo.lamtronso(@{phui}Zvlncmtc * @tructiepkhac,0)"
              f" Set @{phui}Tructiep= (@{phui}Zvlncmtc + @{phui}Tructiepkhac)"
              f" Set @{phui}Chung= dbo.lamtronso(@{phui}Tructiep * @chung,0)"
              f" Set @{phui}Giaxaydung= (@{phui}Chung + @{phui}Tructiep)"
              f" Set @{phui}Thutinhtruoc= dbo.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0)"
              f" Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc)"
              f" Set @{phui}KhaosatThietke= dbo.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0)"
              f" Set @{phui}Giamsat= dbo.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0)"
              f" Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + + @{phui}Giamsat)"
              f" Set @{phui}Vattongxaydung= dbo.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0)"
              f" Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Vattongxaydung)"
              # Tailap
              f" Set @{phui}Tailaptruocthue= dbo.lamtronso(@{phui}Tailap * 100/110,0)"
              f" Set @{phui}Vattailap= (@{phui}Tailap - @{phui}Tailaptruocthue)"
              )
    s = (
        f"{s}"
        f" Set @tongxaydung= (@onTongxaydung + @ocTongxaydung)"
        f" Set @tongtailap= (@onTailap + @ocTailap)"
        f" Set @tongcongtrinh= (@tongxaydung + @tongtailap)"
    )
    sql += f" {s} End When @Hesoid>=20200721 Then Begin"
    s = ""
    lds = ["on", "oc"]
    for phui in lds:
        s += (f" Set @{phui}Vl= dbo.lamtronso(@{phui}Zvl*@vl,0)"
              f" Set @{phui}Nc= dbo.lamtronso(@{phui}Znc*@nc,0)"
              f" Set @{phui}Mtc= dbo.lamtronso(@{phui}Zmtc*@mtc,0)"
              f" Set @{phui}Zvlncmtc= (@{phui}Vl + @{phui}Nc + @{phui}Mtc)"
              f" Set @{phui}Tructiepkhac= dbo.lamtronso(@{phui}Zvlncmtc * @tructiepkhac,0)"
              f" Set @{phui}Tructiep= (@{phui}Zvlncmtc + @{phui}Tructiepkhac)"
              f" Set @{phui}Chung= dbo.lamtronso(@{phui}Tructiep * @chung,0)"
              f" Set @{phui}Giaxaydung= (@{phui}Chung + @{phui}Tructiep)"
              f" Set @{phui}Thutinhtruoc= dbo.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0)"
              f" Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc)"
              f" Set @{phui}KhaosatThietke= dbo.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0)"
              f" Set @{phui}Giamsat= dbo.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0)"
              f" Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + + @{phui}Giamsat)"
              f" Set @{phui}Vattongxaydung= dbo.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0)"
              f" Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Vattongxaydung)"
              # Tailap
              f" Set @{phui}Tailaptruocthue= dbo.lamtronso(@{phui}Tailap * 100/110,0)"
              f" Set @{phui}Vattailap= (@{phui}Tailap - @{phui}Tailaptruocthue)"
              )
    s = (
        f"{s}"
        f" Set @tongxaydung= (@onTongxaydung + @ocTongxaydung)"
        f" Set @tongtailap= (@onTailap + @ocTailap)"
        f" Set @tongcongtrinh= (@tongxaydung + @tongtailap)"
    )
    s += f" End END"
    sql += f" END TRY END;"
    try:
        db.execute(sql)
    except:
        pass


tinh_tamqt("web")
# db.close()
