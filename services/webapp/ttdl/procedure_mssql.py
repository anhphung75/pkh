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
        f"ALTER PROC {schema}.tinh_tamqt "
        f"@Baogiaid INT=0,"
        f"@Plgia NVARCHAR(50)='dutoan',"
        f"@Hesoid INT=0 "
        f"WITH ENCRYPTION AS "
        f"BEGIN SET NOCOUNT ON "
        f"BEGIN TRY DECLARE "
        # heso chiphi
        f"@vl DECIMAL(19,5)=1.0000,"
        f"@nc DECIMAL(19,5)=0.0000,"
        f"@mtc DECIMAL(19,5)=0.0000,"
        f"@tructiepkhac DECIMAL(19,5)=0.0000,"
        f"@chung DECIMAL(19,5)=0.0000,"
        f"@khongxacdinh DECIMAL(19,5)=0.0000,"
        f"@thunhaptinhtruoc DECIMAL(19,5)=0.0000,"
        f"@khaosat DECIMAL(19,5)=0.0000,"
        f"@thietke DECIMAL(19,5)=0.0000,"
        f"@giamsat DECIMAL(19,5)=0.0000,"
        # tong ket kinh phi
        f"@Plqt NVARCHAR(50),"
        f"@tca DECIMAL(19,5)=0.0000,"
        f"@tcb DECIMAL(19,5)=0.0000,"
        f"@gxd DECIMAL(19,5)=0.0000,"
        f"@Dautucty DECIMAL(19,5)=0.0000,"
        f"@Dautukhach DECIMAL(19,5)=0.0000,"
        f"@onZvl DECIMAL(19,5)=0.0000,"
        f"@onZnc DECIMAL(19,5)=0.0000,"
        f"@onZmtc DECIMAL(19,5)=0.0000,"
        f"@ocZvl DECIMAL(19,5)=0.0000,"
        f"@ocZnc DECIMAL(19,5)=0.0000,"
        f"@ocZmtc DECIMAL(19,5)=0.0000,"
        # phan ong nganh
        f"@onVl DECIMAL(19,5)=0.0000,"
        f"@onNc DECIMAL(19,5)=0.0000,"
        f"@onMtc DECIMAL(19,5)=0.0000,"
        f"@onA DECIMAL(19,5)=0.0000,"
        f"@onTT DECIMAL(19,5)=0.0000,"
        f"@onT DECIMAL(19,5)=0.0000,"
        f"@onC DECIMAL(19,5)=0.0000,"
        f"@onZ DECIMAL(19,5)=0.0000,"
        f"@onTL DECIMAL(19,5)=0.0000,"
        f"@onG DECIMAL(19,5)=0.0000,"
        f"@onI DECIMAL(19,5)=0.0000,"
        f"@onJ DECIMAL(19,5)=0.0000,"
        f"@onLa DECIMAL(19,5)=0.0000,"
        f"@onVat1 DECIMAL(19,5)=0.0000,"
        f"@onGxd1 DECIMAL(19,5)=0.0000,"
        f"@onGxd2 DECIMAL(19,5)=0.0000,"
        f"@onLb DECIMAL(19,5)=0.0000,"
        f"@onVat2 DECIMAL(19,5)=0.0000,"
        f"@onGT DECIMAL(19,5)=0.0000,"
        # phan ong cai
        f"@ocVl DECIMAL(19,5)=0.0000,"
        f"@ocNc DECIMAL(19,5)=0.0000,"
        f"@ocMtc DECIMAL(19,5)=0.0000,"
        f"@ocA DECIMAL(19,5)=0.0000,"
        f"@ocTT DECIMAL(19,5)=0.0000,"
        f"@ocT DECIMAL(19,5)=0.0000,"
        f"@ocC DECIMAL(19,5)=0.0000,"
        f"@ocZ DECIMAL(19,5)=0.0000,"
        f"@ocTL DECIMAL(19,5)=0.0000,"
        f"@ocG DECIMAL(19,5)=0.0000,"
        f"@ocI DECIMAL(19,5)=0.0000,"
        f"@ocJ DECIMAL(19,5)=0.0000,"
        f"@ocLa DECIMAL(19,5)=0.0000,"
        f"@ocVat1 DECIMAL(19,5)=0.0000,"
        f"@ocGxd1 DECIMAL(19,5)=0.0000,"
        f"@ocGxd2 DECIMAL(19,5)=0.0000,"
        f"@ocLb DECIMAL(19,5)=0.0000,"
        f"@ocVat2 DECIMAL(19,5)=0.0000,"
        f"@ocGT DECIMAL(19,5)=0.0000;"
        # tinh tamqtx
        f"IF(@Baogiaid > 0) OR (Len(@Plgia) > 0) EXEC pkh.tinh_tamqt3x @Baogiaid, @Plgia;"
        # load hesochiphi
        f"Select @ nc=Isnull(heso_nc, 0), @ nc=Isnull(heso_mtc, 0), @ tructiepkhac=Isnull(heso_ttpk, 0),



        f"@tructiepkhac DECIMAL(19,5)=0.0000,"
        f"@chung DECIMAL(19,5)=0.0000,"
        f"@khongxacdinh DECIMAL(19,5)=0.0000,"
        f"@thunhaptinhtruoc DECIMAL(19,5)=0.0000,"
        f"@khaosat DECIMAL(19,5)=0.0000,"
        f"@thietke DECIMAL(19,5)=0.0000,"
        f"@giamsat DECIMAL(19,5)=0.0000,"

        # @ HesoTTPK=ISNULL(heso_ttpk, 0),
        # @ HesoCPChung=ISNULL(heso_cpchung, 0),
        # @ HesoThuNhapTT=ISNULL(heso_thunhaptt, 0),
        # @ HesoKhaoSat=ISNULL(heso_khaoSat, 0),
        # @ HesoThietKe=ISNULL(heso_thietke, 0),
        # @ HesoGSTC=ISNULL(heso_gstc, 0)
        # FROM
        # dbo.hesochiphi
        # WHERE
        # hesoid= @ Hesoid

        f"END END "
    )
    try:
        db.execute(sql)
    except:
        pass


tinh_tamqt("web")
# db.close()
