import json
from ttdl import Maychu


# from sqlalchemy.orm import scoped_session, sessionmaker
# from bangbieu import Base

# pwd = "Ph0ngK3H0@ch"
# cnnstr = f"mssql+pyodbc://pkh:{pwd}@192.168.24.4/PKHData?driver=ODBC+Driver+17+for+SQL+Server"
db = Maychu("mssql", "pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
# db.show_views()


def lamtronso(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.lamtronso")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.lamtronso(@Solamtron decimal(38,9), @Sole int=0)"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @So0 decimal(38,9), @So1 decimal(38,9), @Lech decimal(38,9), @Kq decimal(38,9);"
        f" If @Sole<0 or @Sole>9 RETURN @Solamtron;"
        f" SET @So0=Round(@Solamtron,@Sole,1);"
        f" SET @So1=Round(@Solamtron,@Sole+1,1);"
        f" SET @Lech=(@So1-@So0)*Power(10,@Sole+1);"
        f" IF @Lech<5 SET @Kq=@So0 ELSE SET @Kq=Round(@Solamtron,@Sole);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def giavl(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.giavl")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.giavl(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(giavl,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def gianc(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.gianc")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.gianc(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(gianc,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def giamtc(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.giamtc")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.giamtc(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(giamtc,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def giatl(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.giatl")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.giatl(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(gia,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def giavl_thau(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.giavl_thau")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.giavl_thau(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(giavl1,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def gianc_thau(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.gianc_thau")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.gianc_thau(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(gianc1,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


def giamtc_thau(schema="dbo"):
    # init prog
    sql = (f"DROP FUNCTION {schema}.giamtc_thau")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE FUNCTION {schema}.giamtc_thau(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
        f" Returns decimal(38,9) AS BEGIN"
        f" Declare @Kq decimal(38,9)=0.0;"
        f" Select Top 1 @Kq=Isnull(giamtc1,0.0) From dbo.baogiachiphi"
        f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
        f" Order By baogiaid DESC;"
        f" IF @Kq<0 SET @Kq=@Kq*(-1);"
        f" RETURN @Kq; END;")
    try:
        db.core().execute(sql)
    except:
        pass


# proc


def baogiathau():
    sql = (f"DROP PROC dbo.baogiathau")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC dbo.baogiathau"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY")
    sql += (
        f" UPDATE s SET"
        f" s.giavl1=0, s.gianc1=isnull(s.gianc,0), s.giamtc1=isnull(s.giamtc,0), s.tinhtrang=N'OK-QTT'"
        f" FROM dbo.baogiachiphi s LEFT JOIN dbo.chiphi r ON s.chiphiid=r.chiphiid"
        f" WHERE Isnull(s.tinhtrang,'') <> N'OK-QTT' And r.koqtt like '%VL%';")
    sql += (
        f" UPDATE s SET"
        f" s.giavl1=isnull(s.giavl,0), s.gianc1=0, s.giamtc1=isnull(s.giamtc,0), s.tinhtrang=N'OK-QTT'"
        f" FROM dbo.baogiachiphi s LEFT JOIN dbo.chiphi r ON s.chiphiid=r.chiphiid"
        f" WHERE Isnull(s.tinhtrang,'') <> N'OK-QTT' And r.koqtt like '%NC%';")
    sql += (
        f" UPDATE s SET"
        f" s.giavl1=isnull(s.giavl,0), s.gianc1=isnull(s.gianc,0), s.giamtc1=0, s.tinhtrang=N'OK-QTT'"
        f" FROM dbo.baogiachiphi s LEFT JOIN dbo.chiphi r ON s.chiphiid=r.chiphiid"
        f" WHERE Isnull(s.tinhtrang,'') <> N'OK-QTT' And r.koqtt like '%MTC%';")
    sql += (
        f" UPDATE s SET"
        f" s.giavl1=isnull(s.giavl,0), s.gianc1=isnull(s.gianc,0), s.giamtc1=isnull(s.giamtc,0),"
        f" s.tinhtrang=N'OK-QTT'"
        f" FROM dbo.baogiachiphi s LEFT JOIN dbo.chiphi r ON s.chiphiid=r.chiphiid"
        f" WHERE Isnull(s.tinhtrang,'') <> N'OK-QTT' And Isnull(r.koqtt,'') not like '%VL%'"
        f" And Isnull(r.koqtt,'') not like '%NC%' And Isnull(r.koqtt,'') not like '%MTC%'")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def nap_tamqt3x(schema="web", qt3x=1):
    """
    BEGIN tran 
  MERGE pkh.tamqt31 AS s 
  USING # tamdulieu AS r 
  ON s.maqtgt = r.maqtgt 
  WHEN MATCHED THEN UPDATE SET
 s.maqt = r.maqt,
 s.maqtgt = r.maqtgt,
 s.tt = r.tt,
 s.chiphiid = r.chiphiid,
 s.soluong = r.soluong,
 s.giavl = r.giavl,
 s.gianc = r.gianc,
 s.giamtc = r.giamtc,
 s.trigiavl = r.trigiavl,
 s.trigianc = r.trigianc,
 s.trigiamtc = r.trigiamtc,
 - - - qtt s.soluong1 = r.soluong1,
 s.giavl1 = r.giavl1,
 s.gianc1 = r.gianc1,
 s.giamtc1 = r.giamtc1,
 s.trigiavl1 = r.trigiavl1,
 s.trigianc1 = r.trigianc1,
 s.trigiamtc1 = r.trigiamtc1,
 s.ghichu = r.ghichu,
 s.lastupdate = ISNULL(r.lastupdate, getdate()) 
 WHEN NOT MATCHED THEN 
 INSERT(maqtgt,tt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc,
  soluong1,
  giavl1,
  gianc1,
  giamtc1,
  trigiavl1,
  trigianc1,
  trigiamtc1,
  ghichu,
  lastupdate,
  maqt)
VALUES(r.maqtgt,r.tt,r.chiphiid, r.soluong,
    r.giavl,
    r.gianc,
    r.giamtc,
    r.trigiavl,
    r.trigianc,
    r.trigiamtc,
    r.soluong1,
    r.giavl1,
    r.gianc1,
    r.giamtc1,
    r.trigiavl1,
    r.trigianc1,
    r.trigiamtc1,
    r.ghichu, ISNULL(r.lastupdate, getdate()),
    r.maqt) 
WHEN NOT MATCHED BY SOURCE THEN DELETE; 
WHILE (@ @TranCount > 0) COMMIT tran; 
    """


def load_tamqt3x(schema="web", qt3x=1):
    # init prog
    if qt3x not in [1, 2, 3, 4, 5]:
        return
    try:
        sql = (f"DROP PROC {schema}.load_tamqt3{qt3x}")
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.load_tamqt3{qt3x}"
        f" @Maqt NVARCHAR(50),@Mauqt NVARCHAR(50)=''"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY Declare @Maq INT=26;")
    if qt3x in [1, 2, 3, 4]:
        # init tam dulieu
        sql += (
            f" SELECT IDENTITY(INT, 1, 1) AS id,maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc"
            f" INTO #tamdulieu FROM dbo.qt3{qt3x} WHERE maqt='tao moi';")
        # load tamdulieu xep lai tt
        sql += (
            f" IF Len(@Mauqt)>0"
            f" Begin INSERT INTO #tamdulieu(maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc)"
            f" SELECT maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc"
            f" FROM dbo.qt3{qt3x}"
            f" WHERE maqtgt Like Concat(@Mauqt,'%') AND chiphiid>0"
            f" ORDER BY tt,chiphiid;")
        # up chiphikhuvuc
        sql += (
            f" Select Top 1 @Maq=hoso.maq FROM {schema}.qt qt LEFT JOIN dbo.hoso hoso ON qt.hosoid=hoso.hosoid"
            f" WHERE qt.maqt=@Maqt ORDER BY qt.maqt Desc;"
            f" UPDATE s SET"
            f" s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End"
            f" FROM #tamdulieu s INNER JOIN dbo.chiphikhuvuc r ON s.chiphiid=r.chiphiid;")
        sql += (
            f" End ELSE"
            f" Begin INSERT INTO #tamdulieu(maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc)"
            f" SELECT maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc"
            f" FROM {schema}.qt3{qt3x}"
            f" WHERE maqtgt Like Concat(@Maqt,'%') AND chiphiid>0"
            f" ORDER BY tt,chiphiid; End")
        sql += (
            f" UPDATE s SET"
            f" s.maqt=@Maqt,s.tt=r.tt,s.chiphiid=r.chiphiid,s.ghichu=r.ghichu,s.lastupdate=r.lastupdate,"
            f" s.soluong=r.soluong,s.giavl=r.giavl,s.gianc=r.gianc,s.giamtc=r.giamtc,"
            f" s.trigiavl=r.trigiavl,s.trigianc=r.trigianc,s.trigiamtc=r.trigiamtc,"
            f" s.maqtgt=(Case When r.id<10 Then CONCAT(@Maqt,{qt3x}0,r.id) Else CONCAT(@Maqt,{qt3x},r.id) End)"
            f" FROM {schema}.tamqt3{qt3x} s INNER JOIN #tamdulieu r ON s.chiphiid=r.chiphiid;"
            f" Select * from #tamdulieu;"
            f" Select * from {schema}.tamqt3{qt3x};")
    if qt3x in [5]:
        # init tam dulieu
        sql += (
            f" SELECT IDENTITY(INT, 1, 1) AS id,maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" sl1,sl2,dongia,trigia1,trigia2"
            f" INTO #tamdulieu FROM dbo.qt3{qt3x} WHERE maqt='tao moi';")
        # load tamdulieu xep lai tt
        sql += (
            f" IF Len(@Mauqt)>0"
            f" Begin INSERT INTO #tamdulieu(maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" sl1,sl2,dongia,trigia1,trigia2)"
            f" SELECT maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" sl1,sl2,dongia,trigia1,trigia2"
            f" FROM dbo.qt3{qt3x}"
            f" WHERE maqtgt Like Concat(@Mauqt,'%') AND chiphiid>0"
            f" ORDER BY tt,chiphiid; End"
            f" ELSE"
            f" Begin INSERT INTO #tamdulieu(maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" sl1,sl2,dongia,trigia1,trigia2)"
            f" SELECT maqt,maqtgt,tt,chiphiid,ghichu,lastupdate,"
            f" sl1,sl2,dongia,trigia1,trigia2"
            f" FROM {schema}.qt3{qt3x}"
            f" WHERE maqtgt Like Concat(@Maqt,'%') AND chiphiid>0"
            f" ORDER BY tt,chiphiid; End")
        sql += (
            f" UPDATE s SET"
            f" s.maqt=@Maqt,s.tt=r.tt,s.chiphiid=r.chiphiid,s.ghichu=r.ghichu,s.lastupdate=r.lastupdate,"
            f" s.sl1=r.sl1,s.sl2=r.sl2,s.dongia=r.dongia,s.trigia1=r.trigia1,s.trigia2=r.trigia2,"
            f" s.maqtgt=(Case When r.id<10 Then CONCAT(@Maqt,{qt3x}0,r.id) Else CONCAT(@Maqt,{qt3x},r.id) End)"
            f" FROM {schema}.tamqt3{qt3x} s INNER JOIN #tamdulieu r ON s.chiphiid=r.chiphiid;")
    sql += (f" DELETE FROM {schema}.tamqt3{qt3x} WHERE tt Not In (Select id From #tamdulieu Where id>0);")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def load_tamqt(schema="web"):
    # init prog
    sql = (f"DROP PROC {schema}.load_tamqt")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.load_tamqt"
        f" @Maqt NVARCHAR(50), @Gxd DECIMAL(38,0)=0.0, @Mauqt NVARCHAR(50)=''"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY"
        f" DECLARE @Tinhtrang NVARCHAR(50)='', @Maq INT=26, @Baogiaid INT=0,"
        f" @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan';")
    sql += (
        f" Select Top 1 @Baogiaid=baogiaid From {schema}.qt Where maqt=@Maqt;"
        f" IF LEN(@Baogiaid)<1 Select Top 1 @Baogiaid=baogiaid From dbo.qt Order By baogiaid Desc;"
        f" Select Top 1 @Hesoid=hesoid From {schema}.qt Where maqt=@Maqt;"
        f" IF LEN(@Hesoid)<1 Select Top 1 @Hesoid=hesoid From dbo.qt Order By baogiaid Desc;"
        f" Select Top 1 @Plgia=isnull(plgia,'dutoan') From {schema}.qt Where maqt=@Maqt;")
    sql += (
        f" UPDATE s SET"
        f" s.maqt=@Maqt, s.baogiaid=@Baogiaid, s.hesoid=@Hesoid, s.plgia=@Plgia,"
        f" s.madot=r.madot, s.tt=r.tt, s.hosoid=r.hosoid, s.soho=r.soho,"
        f" s.gxd=r.gxd, s.dautucty=r.dautucty, s.dautukhach=r.dautukhach,"
        f" s.ghichu=.ghichu, s.tinhtrang=r.tinhtrang, s.nguoilap=r.nguoilap,"
        f" s.ngaylap=r.ngaylap, s.inok=r.inok, s.ngaygan=r.ngaygan,"
        f" s.ngayhoancong=r.ngayhoancong, s.sodhn=r.ngayhoancong, s.hieudhn=r.hieudhn,"
        f" s.chisodhn=r.chisodhn, s.madshc=r.madshc, s.hesothauid=r.hesothauid"
        f" FROM {schema}.tamqt s INNER JOIN {schema}.qt r ON s.maqt=r.maqt;")
    sql += (
        f" IF @Gxd>0"
        f" Begin SELECT TOP 1 @Mauqt=maqt"
        f" FROM dbo.qt WHERE ((gxd=@Gxd) And (hesoid=@Hesoid)) ORDER BY lastupdate DESC,baogiaid DESC,maqt DESC;"
        f" If len(@Mauqt)<1 SELECT TOP 1 @Mauqt=maqt"
        f" FROM {schema}.qt WHERE ((gxd=@Gxd) And (hesoid=@Hesoid)) ORDER BY lastupdate DESC,baogiaid DESC,maqt DESC;"
        f" End")
    sql += (
        f" IF LEN(@Mauqt)>0 Begin EXEC {schema}.load_tamqt31 @Maqt, @Mauqt; EXEC {schema}.load_tamqt32 @Maqt, @Mauqt;"
        f" EXEC {schema}.load_tamqt33 @Maqt, @Mauqt; EXEC {schema}.load_tamqt34 @Maqt, @Mauqt;"
        f" EXEC {schema}.load_tamqt35 @Maqt, @Mauqt; End"
        f" ELSE Begin EXEC {schema}.load_tamqt31 @Maqt; EXEC {schema}.load_tamqt32 @Maqt;"
        f" EXEC {schema}.load_tamqt33 @Maqt; EXEC {schema}.load_tamqt34 @Maqt;"
        f" EXEC {schema}.load_tamqt35 @Maqt; End")
    sql += (
        f" EXEC {schema}.tinh_tamqt31 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt32 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt33 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt34 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt35 @Baogiaid, @Hesoid, @Plgia;"
        f" EXEC {schema}.tinh_tamqt @Baogiaid, @Hesoid, @Plgia;"
    )
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def creat_tinh_tamqt3x(schema="web", qt3x=1):
    # init prog
    if qt3x not in [1, 2, 3, 4]:
        return
    try:
        sql = (f"DROP PROC {schema}.tinh_tamqt3{qt3x}")
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.tinh_tamqt3{qt3x}"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY")
    # load tamdulieu xep lai tt
    sql += (
        f" SELECT IDENTITY(INT, 1, 1) AS id,chiphiid,isnull(ghichu,'') as ghichu,"
        f" isnull(lastupdate,getdate()) as lastupdate,abs(isnull(soluong,0)) as soluong,"
        f" abs(isnull(giavl,0)) as giavl,abs(isnull(gianc,0)) as gianc,abs(isnull(giamtc,0)) as giamtc"
        f" INTO #tamdulieu"
        f" FROM {schema}.tamqt3{qt3x}"
        f" WHERE chiphiid>0"
        f" ORDER BY tt,chiphiid;")
    # tinh toan lai gia
    sql += (
        f" UPDATE #tamdulieu SET"
        f" giavl=dbo.giavl(chiphiid,@Baogiaid,@Plgia),"
        f" gianc=dbo.gianc(chiphiid,@Baogiaid,@Plgia),"
        f" giamtc=dbo.giamtc(chiphiid,@Baogiaid,@Plgia)"
        f" WHERE chiphiid>0;")
    # lam tron
    sql += (
        f" UPDATE #tamdulieu SET"
        f" soluong=dbo.lamtronso(soluong,6),"
        f" giavl=dbo.lamtronso(giavl,3),"
        f" gianc=dbo.lamtronso(gianc,3),"
        f" giamtc=dbo.lamtronso(giamtc,3)"
        f" WHERE chiphiid>0;"
        # test
        f" Select 'qt35 tamdulieu' as test,* from #tamdulieu;")
    sql += (
        f" UPDATE s SET"
        f" s.maqt=(Select Top 1 maqt From {schema}.tamqt),"
        f" s.maqtgt=(Case When r.id<10 Then CONCAT(maqt,{qt3x}0,r.id) Else CONCAT(maqt,{qt3x},r.id) End),"
        f" s.tt=r.id,s.chiphiid=r.chiphiid,s.ghichu=r.ghichu,s.lastupdate=r.lastupdate,"
        f" s.soluong=r.soluong,s.giavl=r.giavl,s.gianc=r.gianc,s.giamtc=r.giamtc"
        f" FROM {schema}.tamqt3{qt3x} s INNER JOIN #tamdulieu r ON s.chiphiid=r.chiphiid;")
    sql += (f" DELETE FROM {schema}.tamqt3{qt3x} WHERE tt Not In (Select id From #tamdulieu Where id>0);")
    # tinh tien
    sql += (
        f" UPDATE {schema}.tamqt3{qt3x} SET"
        f" trigiavl=dbo.lamtronso(soluong*giavl,0),"
        f" trigianc=dbo.lamtronso(soluong*gianc,0),"
        f" trigiamtc=dbo.lamtronso(soluong*giamtc,0)"
        f" WHERE chiphiid>0;")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tinh_tamqt35(schema="web"):
    # init prog
    sql = (f"DROP PROC {schema}.tinh_tamqt35")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.tinh_tamqt35"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY")
    # load tamdulieu xep lai tt
    sql += (
        f" SELECT IDENTITY(INT, 1, 1) AS id,chiphiid,isnull(ghichu,'') as ghichu,"
        f" isnull(lastupdate,getdate()) as lastupdate,abs(isnull(dongia,0)) as gia,"
        f" abs(isnull(sl1,0)) as sl1,abs(isnull(sl2,0)) as sl2"
        f" INTO #tamdulieu"
        f" FROM {schema}.tamqt35"
        f" WHERE chiphiid>0"
        f" ORDER BY tt,chiphiid;")
    # tinh toan lai gia
    sql += (
        f" UPDATE #tamdulieu SET"
        f" gia=dbo.giatl(chiphiid,@Baogiaid,@Plgia)"
        f" WHERE chiphiid>0;")
    # lam tron
    sql += (
        f" UPDATE #tamdulieu SET"
        f" sl1=dbo.lamtronso(sl1,3),"
        f" sl2=dbo.lamtronso(sl2,3),"
        f" gia=dbo.lamtronso(gia,3)"
        f" WHERE chiphiid>0;"
        # test
        f" Select 'qt35 tamdulieu' as test,* from #tamdulieu;")
    sql += (
        f" UPDATE s SET"
        f" s.maqt=(Select Top 1 maqt From {schema}.tamqt),"
        f" s.maqtgt=(Case When r.id<10 Then CONCAT(maqt,50,r.id) Else CONCAT(maqt,5,r.id) End),"
        f" s.tt=r.id,s.chiphiid=r.chiphiid,s.ghichu=r.ghichu,s.lastupdate=r.lastupdate,"
        f" s.sl1=r.sl1,s.sl2=r.sl2,s.dongia=r.gia"
        f" FROM {schema}.tamqt35 s INNER JOIN #tamdulieu r ON s.chiphiid=r.chiphiid;")
    sql += (f" DELETE FROM {schema}.tamqt35 WHERE tt Not In (Select id From #tamdulieu Where id>0);")
    sql += (
        f" UPDATE {schema}.tamqt35 SET"
        f" trigia1=(Case When @Hesoid<20200827 Then (dbo.lamtronso(sl1*dongia/1000,0)*1000)"
        f" Else dbo.lamtronso(sl1*dongia,0) End),"
        f" trigia2=(Case When @Hesoid<20200827 Then (dbo.lamtronso(sl2*dongia/1000,0)*1000)"
        f" Else dbo.lamtronso(sl2*dongia,0) End)"
        f" WHERE chiphiid>0;")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tinh_tamqt3x(schema="web"):
    # init prog
    sql = (f"DROP PROC {schema}.tinh_tamqt3x")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.tinh_tamqt3x"
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
    sql = (f"DROP PROC {schema}.tinh_tamqt")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.tinh_tamqt"
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
        f" slcat= Case When @Hesoid>=20200827"
        f" Then Isnull((Select sum(sl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
        f" Else Isnull((Select sum(sl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End,"
        f" tiencat= Case When @Hesoid>=20200827"
        f" Then Isnull((Select sum(vl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
        f" Else Isnull((Select sum(vl) From {schema}.tamthqt01"
        f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End;")
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
    sql = (f"DROP PROC {schema}.tinhlai_dotqt")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql = (
        f"CREATE PROC {schema}.tinhlai_dotqt"
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
    giavl()
    gianc()
    giamtc()
    giatl()
    load_tamqt3x(schema, 1)
    load_tamqt3x(schema, 2)
    load_tamqt3x(schema, 3)
    load_tamqt3x(schema, 4)
    load_tamqt3x(schema, 5)
    load_tamqt(schema)
    creat_tinh_tamqt3x(schema, 1)
    creat_tinh_tamqt3x(schema, 2)
    creat_tinh_tamqt3x(schema, 3)
    creat_tinh_tamqt3x(schema, 4)
    tinh_tamqt35(schema)
    tinh_tamqt3x(schema)
    tinh_tamqt(schema)
    tinhlai_dotqt(schema)
    # thau
    baogiathau()
    giavl_thau()
    gianc_thau()
    giamtc_thau()


# spQtgt("pkd")
load_tamqt("pkd")
