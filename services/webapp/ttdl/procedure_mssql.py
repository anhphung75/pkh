import json
from maychu import db


# from sqlalchemy.orm import scoped_session, sessionmaker
# from bangbieu import Base

# pwd = "Ph0ngK3H0@ch"
# cnnstr = f"mssql+pyodbc://pkh:{pwd}@192.168.24.4/PKHData?driver=ODBC+Driver+17+for+SQL+Server"
db = db("mssql", "pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
db.show_views("dbo")


def tinh_tamqt(schema="web"):
    # init prog
    sql = (f"CREATE PROC {schema}.tinh_tamqt AS ")
    try:
        db.engine().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinh_tamqt"
        f" @Baogiaid INT=0, @Plgia NVARCHAR(50)='dutoan', @Hesoid INT=0"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY DECLARE")
    # heso chiphi
    lds = ["vl", "nc", "mtc", "tructiepkhac", "chung", "giantiepkhac",
           "thutinhtruoc", "khaosat", "thietke", "giamsat"]
    for heso in lds:
        sql += f" @{heso} DECIMAL(19,5)=1.0000,"
    # tong ket kinh phi
    lds = ["tongxaydung", "tongtailap", "tongcongtrinh",
           "dautucty", "dautukhach", "tratruoc"]
    for chiphi in lds:
        sql += f" @{chiphi} DECIMAL(19,5)=1.0000,"
    # kinh phi chi tiet
    lds = [
        "Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Giantiep", "Giantiepkhac", "Chung", "Giaxaydung", "Thutinhtruoc", "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue", "Vattongxaydung", "Tongxaydung", "Tailap", "Vattailap", "Tailaptruocthue"]
    # phan ong nganh
    for chiphi in lds:
        sql += (
            f" @on{chiphi} DECIMAL(19,5)=1.0000,"
            f" @oc{chiphi} DECIMAL(19,5)=1.0000,")
    sql += f" @Plqt NVARCHAR(50);"
    # tinh tamqtx
    sql += f" IF((@Baogiaid>0) OR (Len(@Plgia)>0)) EXEC {schema}.tinh_tamqt3x @Baogiaid, @Plgia;"
    # load Zvl, Znc, Zmtc, Tailap
    sql += (
        f" SELECT @ocZvl=Sum(zVl), @ocZnc=Sum(zNc), @ocZmtc=Sum(zMtc) FROM"
        f" (Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
        f" From {schema}.tamqt31 UNION"
        f" Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
        f" From {schema}.tamqt32) AS U;"
        f" SELECT @ocTailap=Isnull(sum(trigia1),0) From {schema}.tamqt35;")
    sql += (
        f" SELECT @onZvl=Sum(zVl), @onZnc=Sum(zNc), @onZmtc=Sum(zMtc) FROM"
        f" (Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
        f" From {schema}.tamqt33 UNION"
        f" Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
        f" From {schema}.tamqt34) AS U;"
        f" SELECT @onTailap=Isnull(sum(trigia2),0) From {schema}.tamqt35;")
    # load hesochiphi
    ods = {"nc": "heso_nc", "mtc": "heso_mtc", "tructiepkhac": "heso_ttpk", "chung": "heso_cpchung",
           "giantiepkhac": "giantiepkhac", "thutinhtruoc": "heso_thunhaptt",
           "khaosat": "heso_khaosat", "thietke": "heso_thietke", "giamsat": "heso_gstc"}
    sql += f" Select "
    for heso in ods:
        sql += f"@{heso}=Isnull({ods[heso]},0),"
    sql += f"@vl=1.0000 From dbo.hesochiphi Where hesoid=@Hesoid;"
    # tinh chi phi
    sql += f" If @Hesoid<20200721 Begin"
    lds = ["on", "oc"]
    for phui in lds:
        sql += (
            f" Set @{phui}Vl= dbo.lamtronso(@{phui}Zvl*@vl,0);"
            f" Set @{phui}Nc= dbo.lamtronso(@{phui}Znc*@nc,0);"
            f" Set @{phui}Mtc= dbo.lamtronso(@{phui}Zmtc*@mtc,0);"
            f" Set @{phui}Zvlncmtc= (@{phui}Vl + @{phui}Nc + @{phui}Mtc);"
            f" Set @{phui}Tructiepkhac= dbo.lamtronso(@{phui}Zvlncmtc * @tructiepkhac,0);"
            f" Set @{phui}Tructiep= (@{phui}Zvlncmtc + @{phui}Tructiepkhac);"
            f" Set @{phui}Chung= dbo.lamtronso(@{phui}Tructiep * @chung,0);"
            f" Set @{phui}Giantiepkhac= 0;"
            f" Set @{phui}Giantiep= (@{phui}Chung + @{phui}Giantiepkhac);")
    sql += f" End If @Hesoid>=20200721 Begin"
    lds = ["on", "oc"]
    for phui in lds:
        sql += (
            f" Set @{phui}Vl= dbo.lamtronso(@{phui}Zvl*@vl,0);"
            f" Set @{phui}Nc= dbo.lamtronso(@{phui}Znc*@nc,0);"
            f" Set @{phui}Mtc= dbo.lamtronso(@{phui}Zmtc*@mtc,0);"
            f" Set @{phui}Tructiep= (@{phui}Vl + @{phui}Nc + @{phui}Mtc);"
            f" Set @{phui}Tructiepkhac= 0"
            f" Set @{phui}Chung= dbo.lamtronso(@{phui}Tructiep * @chung,0);"
            f" Set @{phui}Giantiepkhac= dbo.lamtronso(@{phui}Tructiep * @giantiepkhac,0);"
            f" Set @{phui}Giantiep= (@{phui}Chung + @{phui}Giantiepkhac);")
    sql += f" End"
    lds = ["on", "oc"]
    for phui in lds:
        sql += (
            f" Set @{phui}Giaxaydung= (@{phui}Giantiep + @{phui}Tructiep);"
            f" Set @{phui}Thutinhtruoc= dbo.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0);"
            f" Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc);"
            f" Set @{phui}KhaosatThietke= dbo.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0);"
            f" Set @{phui}Giamsat= dbo.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0);"
            f" Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + @{phui}Giamsat);"
            f" Set @{phui}Vattongxaydung= dbo.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0);"
            f" Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Vattongxaydung);"
            # Tailap
            f" Set @{phui}Tailaptruocthue= dbo.lamtronso(@{phui}Tailap * 100/110,0);"
            f" Set @{phui}Vattailap= (@{phui}Tailap - @{phui}Tailaptruocthue);")
    sql += (
        f" Set @tongxaydung= (@onTongxaydung + @ocTongxaydung);"
        f" Set @tongtailap= (@onTailap + @ocTailap);"
        f" Set @tongcongtrinh= (@tongxaydung + @tongtailap);"
        f" Select @Plqt=Isnull(maqt, ''), @Dautucty=dautucty From {schema}.tamqt;"
        f" IF @Plqt LIKE '%MP%' Set @dautucty= dbo.lamtronso(@tongcongtrinh, 0);"
        f" ELSE If @dautucty is null Set @dautucty= (@onTongxaydung + @onTailap);"
        f" Set @dautukhach= (@tongcongtrinh - @dautucty);")
    sql += (
        f" UPDATE {schema}.tamqt SET"
        f" plgia = Isnull(@Plgia, 'dutoan'),"
        f" vlcai=@ocZvl,"
        f" nccai=@ocZnc,"
        f" mtccai=@ocZmtc,"
        f" vlnganh=@onZvl,"
        f" ncnganh=@onZnc,"
        f" mtcnganh=@onZmtc,"
        f" gxd1kq1=@ocTongxaydung,"
        f" gxd2kq1=@ocTailap,"
        f" gxd1kq2=@onTongxaydung,"
        f" gxd2kq2=@onTailap,"
        f" gxd=@tongcongtrinh,"
        f" dautucty= @dautucty,"
        f" dautukhach= @dautukhach,")
    # thqt01 viev
    sql += (
        f" dhn15= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=15),0),"
        f" dhn50= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=50),0),"
        f" dhn80= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=80),0),"
        f" dhn100= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=100),0),"
        f" sldh= Isnull((Select sum(sl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='DHN'),0),"
        # tong hop ong
        f" ong25= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=25),0),"
        f" ong34= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=34),0),"
        f" ong50= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=50),0),"
        f" ong100= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=100),0),"
        f" ong125= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=125),0),"
        f" ong150= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=150),0),"
        f" ong200= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=200),0),"
        f" ong250= Isnull((Select sl From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=250),0),"
        f" slong= Isnull((Select sum(sl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Ong'),0),"
        # tong hop cat
        f" slcat= Isnull((Select sum(sl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat'),0),"
        f" tiencat= Isnull((Select sum(vl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat'),0);")
    sql += (
        f" If @baogiaid>0 Update {schema}.tamqt SET baogiaid=@baogiaid;"
        f" If @hesoid>0 Update {schema}.tamqt SET hesoid=@hesoid;")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.engine().execute(sql)
    except:
        pass


tinh_tamqt("web")
# db.close()
