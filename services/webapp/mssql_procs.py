import json
from ttdl import Maychu


# from sqlalchemy.orm import scoped_session, sessionmaker
# from bangbieu import Base

# pwd = "Ph0ngK3H0@ch"
# cnnstr = f"mssql+pyodbc://pkh:{pwd}@192.168.24.4/PKHData?driver=ODBC+Driver+17+for+SQL+Server"
db = Maychu("mssql", "pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
db.show_views()

# function
'''
def lamtronso(sothapphan=0, phanle=3):
    try:
        so = int(sothapphan*10**(phanle+1))
        lech = so % 10
        if lech >= 5:
            so += 5
        somoi = round(so/10**(phanle+1), phanle)
    except:
        somoi = 0
    return somoi
'''


def lamtronso(schema="dbo"):
    # init prog
    sql = (f"CREATE FUNCTION {schema}.lamtronso AS ")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER FUNCTION {schema}.lamtronso(@Sothapphan decimal(38,9), @Phanle int=0)"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @So decimal(38,0)=0.0, @Lech decimal(38,9)=0.0, @Kq decimal(38,9)=0.0;"
        f" If @Phanle<0 or @Phanle>8 RETURN @Sothapphan;"
        f" SET @So=CAST(@Sothapphan*Power(10,@Phanle+1) AS int);"
        f" SET @Lech=@So % 10;"
        f" IF @Lech>=5 SET @So=@So+5;"
        f" SET @Kq= round(@So/Power(10,@Phanle+1),@Phanle,1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


# proc
def creat_tinh_tamqt3x(schema="web", qt3x=1):
    # init prog
    if qt3x not in [1, 2, 3, 4]:
        return
    try:
        sql = (f"CREATE PROC {schema}.tinh_tamqt3{qt3x} AS ")
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinh_tamqt3{qt3x}"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY")
    # load tamdulieu
    sql += (
        f" SELECT IDENTITY(INT, 1, 1) AS id,tt,chiphiid,ghichu,lastupdate,maqt,maqtgt,"
        f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc,"
        f" soluong1,giavl1,gianc1,giamtc1,trigiavl1,trigianc1,trigiamtc1"
        f" INTO #tamdulieu"
        f" FROM {schema}.tamqt3{qt3x}"
        f" WHERE chiphiid>0"
        f" ORDER BY tt,chiphiid;")
    sql += (
        f" UPDATE #tamdulieu SET"
        f" tt=id,"
        f" giavl=(Select Top 1 Isnull(giavl,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" gianc=(Select Top 1 Isnull(gianc,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" giamtc=(Select Top 1 Isnull(giamtc,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" giavl1=(Select Top 1 Isnull(giavl1,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" gianc1=(Select Top 1 Isnull(gianc1,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" giamtc1=(Select Top 1 Isnull(giamtc1,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" trigiavl=dbo.lamtronso(soluong*giavl,0),"
        f" trigianc=dbo.lamtronso(soluong*gianc,0),"
        f" trigiamtc=dbo.lamtronso(soluong*giamtc,0),"
        f" trigiavl1=dbo.lamtronso(soluong1*giavl1,0),"
        f" trigianc1=dbo.lamtronso(soluong1*gianc1,0),"
        f" trigiamtc1=dbo.lamtronso(soluong1*giamtc1,0),"
        f" maqt=(Select Top 1 maqt From {schema}.tamqt),"
        f" maqtgt=(Case When id<10 Then CONCAT(maqt,{qt3x}0,id) Else CONCAT(maqt,{qt3x},id) End),"
        f" lastupdate=Isnull(lastupdate,getdate());")
    # update tamqt31
    sql += (f" DELETE FROM {schema}.tamqt3{qt3x};")
    sql += (
        f" INSERT INTO {schema}.tamqt3{qt3x}(tt,chiphiid,ghichu,lastupdate,maqt,maqtgt,"
        f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc,"
        f" soluong1,giavl1,gianc1,giamtc1,trigiavl1,trigianc1,trigiamtc1)"
        f" SELECT tt,chiphiid,ghichu,lastupdate,maqt,maqtgt,"
        f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc,"
        f" soluong1,giavl1,gianc1,giamtc1,trigiavl1,trigianc1,trigiamtc1"
        f" FROM #tamdulieu WHERE chiphiid>0;")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tinh_tamqt35(schema="web"):
    # init prog
    sql = (f"CREATE PROC {schema}.tinh_tamqt35 AS ")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinh_tamqt35"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY")
    # load tamdulieu
    sql += (
        f" SELECT IDENTITY(INT, 1, 1) AS id,tt,chiphiid,ghichu,lastupdate,maqt,maqtgt,"
        f" sl1,sl2,dongia,trigia1,trigia2"
        f" INTO #tamdulieu"
        f" FROM {schema}.tamqt35"
        f" WHERE chiphiid>0"
        f" ORDER BY tt,chiphiid;")
    sql += (
        f" UPDATE #tamdulieu SET"
        f" tt=id,"
        f" dongia=(Select Top 1 isnull(gia,0) From dbo.baogiachiphi bg"
        f" Where (bg.plgia=@Plgia) AND (bg.chiphiid=#tamdulieu.chiphiid) AND (bg.baogiaid<=@Baogiaid)"
        f" Order By baogiaid DESC),"
        f" trigia1=(Case When @Hesoid<20200827 Then (dbo.lamtronso(sl1*dongia/1000,0)*1000)"
        f" Else dbo.lamtronso(sl1*dongia,0) End),"
        f" trigia2=(Case When @Hesoid<20200827 Then (dbo.lamtronso(sl2*dongia/1000,0)*1000)"
        f" Else dbo.lamtronso(sl2*dongia,0) End),"
        f" maqt=(Select Top 1 maqt From {schema}.tamqt),"
        f" maqtgt=(Case When id<10 Then CONCAT(maqt,50,id) Else CONCAT(maqt,5,id) End),"
        f" lastupdate=Isnull(lastupdate,getdate());")
    # update tamqt35
    sql += (f" DELETE FROM {schema}.tamqt35;")
    sql += (
        f" INSERT INTO {schema}.tamqt35("
        f" tt,chiphiid,sl1,sl2,dongia,trigia1,trigia2,ghichu,lastupdate,maqt,maqtgt)"
        f" SELECT tt,chiphiid,sl1,sl2,dongia,trigia1,trigia2,ghichu,lastupdate,maqt,maqtgt"
        f" FROM #tamdulieu WHERE chiphiid>0;")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tinh_tamqt3x(schema="web"):
    # init prog
    sql = (f"CREATE PROC {schema}.tinh_tamqt3x AS ")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinh_tamqt3x"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY")
    # load tamdulieu
    sql += (
        f" EXEC {schema}.tinh_tamqt31 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt32 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt33 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt34 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt35 @Baogiaid, @Hesoid, @Plgia;"
    )
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tinh_tamqt(schema="web"):
    # init prog
    sql = (f"CREATE PROC {schema}.tinh_tamqt AS ")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinh_tamqt"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY DECLARE")
    # heso chiphi
    lds = ["vl", "nc", "mtc", "tructiepkhac", "chung", "giantiepkhac",
           "thutinhtruoc", "khaosat", "thietke", "giamsat"]
    for heso in lds:
        sql += f" @{heso} DECIMAL(19,5)=1.0000,"
    # tong ket kinh phi
    lds = ["tongxaydung", "tailap", "congtrinh", "congtrinhtruocthue",
           "thuecongtrinh", "dautucty", "dautukhach", "tratruoc"]
    for chiphi in lds:
        sql += f" @{chiphi} DECIMAL(19,5)=1.0000,"
    # kinh phi chi tiet
    lds = [
        "Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Giantiep", "Giantiepkhac", "Chung", "Giaxaydung", "Thutinhtruoc", "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue", "Thuetongxaydung", "Tongxaydung", "Tailap", "Thuetailap", "Tailaptruocthue"]
    # phan ong nganh
    for chiphi in lds:
        sql += (
            f" @on{chiphi} DECIMAL(19,5)=1.0000,"
            f" @oc{chiphi} DECIMAL(19,5)=1.0000,")
    sql += f" @Plqt NVARCHAR(50);"
    # tinh tamqtx
    sql += f" IF((@Baogiaid>0) OR (Len(@Plgia)>0)) EXEC {schema}.tinh_tamqt3x @Baogiaid, @Hesoid, @Plgia;"
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
            f" Set @{phui}Giantiepkhac= dbo.lamtronso(@{phui}Tructiep * @giantiepkhac,0);"
            f" Set @{phui}Giantiep= (@{phui}Chung + @{phui}Giantiepkhac);"
            f" Set @{phui}Giaxaydung= (@{phui}Giantiep + @{phui}Tructiep);"
            f" Set @{phui}Thutinhtruoc= dbo.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0);"
            f" Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc);"
            f" Set @{phui}KhaosatThietke= dbo.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0);"
            f" Set @{phui}Giamsat= dbo.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0);"
            f" Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + @{phui}Giamsat);"
            f" Set @{phui}Thuetongxaydung= dbo.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0);"
            f" Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Thuetongxaydung);"
            # Tailap
            f" Set @{phui}Tailaptruocthue= dbo.lamtronso(@{phui}Tailap * 100/110,0);"
            f" Set @{phui}Thuetailap= (@{phui}Tailap - @{phui}Tailaptruocthue);")
    sql += (
        f" Set @tongxaydung= (@onTongxaydung + @ocTongxaydung);"
        f" Set @tailap= (@onTailap + @ocTailap);"
        f" Set @congtrinh= (@tongxaydung + @tailap);"
        f" Set @congtrinhtruocthue= dbo.lamtronso(@congtrinh*100/110,0);"
        f" Set @thuecongtrinh= (@congtrinh-@congtrinhtruocthue);"
        f" Select @Plqt=Isnull(maqt, ''), @Dautucty=dautucty From {schema}.tamqt;"
        f" IF @Plqt LIKE '%MP%' Set @dautucty= dbo.lamtronso(@congtrinh, 0);"
        f" ELSE If @dautucty is null Set @dautucty= (@onTongxaydung + @onTailap);"
        f" Set @dautukhach= (@congtrinh - @dautucty);")
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
        f" gxd=@congtrinh,"
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
        f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0),"
        f" tiencat= Isnull((Select sum(vl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0);")
    sql += (
        f" If @Baogiaid>0 Update {schema}.tamqt SET baogiaid=@Baogiaid;"
        f" If @Hesoid>0 Update {schema}.tamqt SET hesoid=@Hesoid;")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tinhlai_dotqt(schema="web"):
    # init prog
    sql = (f"CREATE PROC {schema}.tinhlai_dotqt AS ")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"ALTER PROC {schema}.tinhlai_dotqt"
        f" @Madot NVARCHAR(MAX)=''"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" DECLARE @Maqt NVARCHAR(MAX)='',@Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan';"
        f" DECLARE mCursor CURSOR FOR"
        f" Select maqt,baogiaid,hesoid,plgia From {schema}.qt"
        f" Where madot = @Madot AND Left(Isnull(tinhtrang, ''), 2) Not In ('Fi', 'TN', 'OK', 'oK');"
        f" OPEN mCursor;"
        f" BEGIN TRY")
    # mo cursor
    sql += (
        f" Fetch Next From mCursor INTO @Maqt,@Baogiaid,@Hesoid,@Plgia;"
        f" WHILE @@FETCH_STATUS = 0 Begin Begin"
        f" EXEC {schema}.load_tamqt @Maqt;"
        f" EXEC {schema}.tinh_tamqt @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.save_tamqt; End"
        f" Fetch Next From mCursor INTO @Maqt,@Baogiaid,@Hesoid,@Plgia; End"
    )
    sql += (
        f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH"
        f" CLOSE mCursor; DEALLOCATE mCursor; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def spQtgt(schema="web"):
    lamtronso()
    creat_tinh_tamqt3x(schema, 1)
    creat_tinh_tamqt3x(schema, 2)
    creat_tinh_tamqt3x(schema, 3)
    creat_tinh_tamqt3x(schema, 4)
    tinh_tamqt35(schema)
    tinh_tamqt3x(schema)
    tinh_tamqt(schema)
    tinhlai_dotqt(schema)


# spQtgt("qlmlq2")
#lamtronso()
