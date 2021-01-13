import json
from ttdl.mssql import Server


db = Server("pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
# db.show_views()


class Csdl:
    def __init__(self, xac='pkh'):
        self.xac = xac
        self.tao()

    def tao(self):
        self.tamqt3x(1)
        self.tamqt3x(2)
        self.tamqt3x(3)
        self.tamqt3x(4)
        self.tamqt3x(5)
        self.tamqt()

    def tamqt(self):
        try:
            sql = (f"DROP TABLE {self.xac}.tamqt")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE TABLE {self.xac}.tamqt ("
            f"mauqt NVARCHAR(50) NOT NULL DEFAULT '',"
            f"maqt NVARCHAR(50) NOT NULL DEFAULT '',"
            # dot
            f"madot NVARCHAR(50) NULL,"
            f"nam INT NULL DEFAULT 0,"
            f"quy NVARCHAR(50) NULL DEFAULT NULL,"
            f"plqt NVARCHAR(50) NULL DEFAULT NULL,"
            f"sodot NVARCHAR(50) NULL DEFAULT NULL,"
            f"nhathauid INT NULL DEFAULT 0,"
            # qt
            f"tt INT NULL,"
            f"soho INT NULL DEFAULT 0,"
            f"baogiaid INT NULL DEFAULT 0,"
            f"plgia NVARCHAR(50) NOT NULL DEFAULT 'dutoan',"
            f"hesoid INT NULL DEFAULT 0,"
            f"vlcai DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"nccai DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"mtccai DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"vlnganh DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ncnganh DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"mtcnganh DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"gxd1kq1 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"gxd1kq2 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"gxd2kq1 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"gxd2kq2 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tca DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tcb DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"gxd DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"dautucty DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"dautukhach DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ghichu NVARCHAR(255) NULL DEFAULT NULL,"
            f"tinhtrang NVARCHAR(50) NULL DEFAULT NULL,"
            f"nguoilap NVARCHAR(50) NULL DEFAULT NULL,"
            f"ngaylap DATETIME NULL DEFAULT NULL,"
            f"inok BIT NOT NULL DEFAULT 0,"
            # hoancong
            f"ngaygan DATETIME NULL DEFAULT NULL,"
            f"ngayhoancong DATETIME NULL DEFAULT NULL,"
            f"sodhn NVARCHAR(50) NULL DEFAULT NULL,"
            f"hieudhn NVARCHAR(50) NULL DEFAULT NULL,"
            f"chisodhn DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"madshc NVARCHAR(50) NULL DEFAULT NULL,"
            # qtt
            f"hesothauid INT NULL DEFAULT 0,"
            f"tvlcai DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tnccai DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tmtccai DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tvlnganh DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tncnganh DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tmtcnganh DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tgxd1kq1 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tgxd1kq2 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"sldh INT NULL DEFAULT 0,"
            f"dhn15 INT NULL DEFAULT 0,"
            f"dhn25 INT NULL DEFAULT 0,"
            f"dhn50 INT NULL DEFAULT 0,"
            f"dhn80 INT NULL DEFAULT 0,"
            f"dhn100 INT NULL DEFAULT 0,"
            f"slong DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong25 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong34 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong50 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong100 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong125 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong150 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong200 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ong250 DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"slcat DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tiencat DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"slcatnhua DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tiencatnhua DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tienvlk DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"nc DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tiennc DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"mtc DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"tienmtc DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"cptt DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"cong DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"thuevat DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"trigiaqtt DECIMAL(28,6) NULL DEFAULT 0.0,"
            f"ghichuqtt NVARCHAR(255) NULL DEFAULT NULL,"
            f"tinhtrangqtt NVARCHAR(50) NULL DEFAULT NULL,"
            # hoso
            f"hosoid INT NULL DEFAULT 0,"
            f"mahoso NVARCHAR(50) NULL DEFAULT NULL,"
            f"sohoso NVARCHAR(50) NULL DEFAULT NULL,"
            f"khachhang NVARCHAR(255) NULL DEFAULT NULL,"
            f"diachikhachhang NVARCHAR(255) NULL DEFAULT NULL,"
            f"maq INT NULL DEFAULT 0,"
            f"maqp INT NULL DEFAULT 0,"
            f"lastupdate DATETIME NULL DEFAULT NULL,"
            f"CONSTRAINT {self.xac}_tamqt_pk PRIMARY KEY (maqt));"
        )
        try:
            db.core().execute(sql)
        except:
            pass

    def tamqt3x(self, id=1):
        if id not in [1, 2, 3, 4, 5]:
            return
        try:
            sql = (f"DROP TABLE {self.xac}.tamqt3{id}")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE TABLE {self.xac}.tamqt3{id} ("
            f"maqtgt NVARCHAR(50) NOT NULL DEFAULT '',"
            f"tt INT NULL,"
            f"chiphiid INT NULL DEFAULT 0,")
        if id in [5]:
            sql += (
                f"oc_sl DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"on_sl DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"gia DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"oc_tien DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"on_tien DECIMAL(28,6) NULL DEFAULT 0.0,")
        else:
            sql += (
                f"soluong DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"giavl DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"gianc DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"giamtc DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"tienvl DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"tiennc DECIMAL(28,6) NULL DEFAULT 0.0,"
                f"tienmtc DECIMAL(28,6) NULL DEFAULT 0.0,")
        sql += (
            f"lastupdate DATETIME NULL DEFAULT NULL,"
            f"maqt NVARCHAR(50) NULL DEFAULT NULL,"
            f"mauqtgt NVARCHAR(50) NULL DEFAULT '',"
            f"CONSTRAINT {self.xac}_tamqt3{id}_pk PRIMARY KEY (maqtgt));"
        )
        try:
            db.core().execute(sql)
        except:
            pass


class Qtgt:
    def __init__(self, xac='pkh'):
        self.xac = xac
        self.kho = 'dbo'
        self.tao()

    def tao(self):
        # self.lamtronso()
        # self.giavl()
        # self.gianc()
        # self.giamtc()
        # self.giatl()
        self.nap_qt3x(1)
        self.nap_qt3x(2)
        self.nap_qt3x(3)
        self.nap_qt3x(4)
        self.nap_qt3x(5)
        self.nap_qt()

    def lamtronso(self):
        try:
            sql = (f"DROP FUNCTION {self.kho}.lamtronso")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE FUNCTION {self.kho}.lamtronso(@Solamtron decimal(38,9), @Sole int=0)"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Them decimal(38,9)=0.0, @Kq decimal(38,9), @Kt decimal(38,9), @Lech decimal(38,9);"
            f" If @Sole<0 or @Sole>9 RETURN @Solamtron;"
            f" SET @Kq=Round(@Solamtron,@Sole,1);"
            f" SET @Kt=Round(@Solamtron,@Sole+1,1);"
            f" SET @Lech=(@Kt-@Kq)*Power(10,@Sole+1);"
            f" IF @Lech>4 SET @Them=1/Power(10,@Sole);"
            f" RETURN (@Kq + @Them); END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def giavl(self):
        try:
            sql = (f"DROP FUNCTION {self.kho}.giavl")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE FUNCTION {self.kho}.giavl(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(giavl,0.0) From {self.kho}.baogiachiphi"
            f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
            f" Order By baogiaid DESC;"
            f" IF @Kq<0 SET @Kq=@Kq*(-1);"
            f" RETURN @Kq; END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def gianc(self):
        try:
            sql = (f"DROP FUNCTION {self.kho}.gianc")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE FUNCTION {self.kho}.gianc(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(gianc,0.0) From {self.kho}.baogiachiphi"
            f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
            f" Order By baogiaid DESC;"
            f" IF @Kq<0 SET @Kq=@Kq*(-1);"
            f" RETURN @Kq; END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def giamtc(self):
        try:
            sql = (f"DROP FUNCTION {self.kho}.giamtc")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE FUNCTION {self.kho}.giamtc(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(giamtc,0.0) From {self.kho}.baogiachiphi"
            f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
            f" Order By baogiaid DESC;"
            f" IF @Kq<0 SET @Kq=@Kq*(-1);"
            f" RETURN @Kq; END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def giatl(self):
        try:
            sql = (f"DROP FUNCTION {self.kho}.giatl")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE FUNCTION {self.kho}.giatl(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(gia,0.0) From {self.kho}.baogiachiphi"
            f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
            f" Order By baogiaid DESC;"
            f" IF @Kq<0 SET @Kq=@Kq*(-1);"
            f" RETURN @Kq; END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def nap_qt3x(self, qt3x=1):
        if qt3x not in [1, 2, 3, 4, 5]:
            return
        sql = (f"DROP PROC {self.xac}.nap_qt3{qt3x}")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.nap_qt3{qt3x} "
            f"@Maqt NVARCHAR(50),@Mauqt NVARCHAR(50)='' "
            f"WITH ENCRYPTION AS "
            f"BEGIN SET NOCOUNT ON "
            f"BEGIN TRY IF DataLength(Isnull(@Maqt,''))<1 Return; ")
        # tao bdl
        sql += (
            f"SELECT top 1 * INTO #bdl FROM {self.xac}.tamqt3{qt3x}; "
            f"DELETE FROM #bdl; ")
        if qt3x in [1, 2, 3, 4]:
            sql += (
                f"IF DataLength(Isnull(@Mauqt,''))>0 "
                f"Begin INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,"
                f"tienvl,tiennc,tienmtc) SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,"
                f"maqtgt as mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc "
                f"FROM {self.xac}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,soluong,"
                f"giavl,gianc,giamtc,tienvl,tiennc,tienmtc) SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,"
                f"maqtgt as mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc "
                f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) If Not Exists (Select * From {self.xac}.tamqt3{qt3x}) "
                f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{qt3x} Order By lastupdate; "
                f"INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,"
                f"tienvl,tiennc,tienmtc) SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,"
                f"maqtgt as mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc "
                f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
                f"UPDATE #bdl SET soluong=0; End End ")
            sql += (
                f"IF DataLength(Isnull(@Mauqt,''))<1 "
                f"Begin INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,"
                f"tienvl,tiennc,tienmtc) SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,"
                f"maqtgt as mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc "
                f"FROM {self.xac}.qt3{qt3x} WHERE maqt=@Maqt AND chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,soluong,"
                f"giavl,gianc,giamtc,tienvl,tiennc,tienmtc) SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,"
                f"maqtgt as mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc "
                f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Maqt AND chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) If Not Exists (Select * From {self.xac}.tamqt3{qt3x}) "
                f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{qt3x} Order By lastupdate; "
                f"INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,"
                f"tienvl,tiennc,tienmtc) SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,"
                f"maqtgt as mauqtgt,chiphiid,soluong,giavl,gianc,giamtc,trigiavl,trigianc,trigiamtc "
                f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
                f"UPDATE #bdl SET soluong=0; End End ")
        else:
            sql += (
                f"IF DataLength(Isnull(@Mauqt,''))>0 "
                f"Begin INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien) "
                f"SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,maqtgt as mauqtgt,chiphiid,dongia,"
                f"sl1,sl2,trigia1,trigia2 FROM {self.xac}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 "
                f"ORDER BY tt,chiphiid; If Not Exists (Select * From #bdl) "
                f"INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien) "
                f"SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,maqtgt as mauqtgt,chiphiid,dongia,"
                f"sl1,sl2,trigia1,trigia2 FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 "
                f"ORDER BY tt,chiphiid; If Not Exists (Select * From #bdl) "
                f"If Not Exists (Select * From {self.xac}.tamqt3{qt3x}) "
                f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{qt3x} Order By lastupdate; "
                f"INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien) "
                f"SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,maqtgt as mauqtgt,chiphiid,dongia,"
                f"sl1,sl2,trigia1,trigia2 FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 "
                f"ORDER BY tt,chiphiid; "
                f"UPDATE #bdl SET soluong=0; End End ")
            sql += (
                f"IF DataLength(Isnull(@Mauqt,''))<1 "
                f"Begin INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien) "
                f"SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,maqtgt as mauqtgt,chiphiid,dongia,"
                f"sl1,sl2,trigia1,trigia2 FROM {self.xac}.qt3{qt3x} WHERE maqt=@Maqt AND chiphiid>0 "
                f"ORDER BY tt,chiphiid; If Not Exists (Select * From #bdl) "
                f"INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien) "
                f"SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,maqtgt as mauqtgt,chiphiid,dongia,"
                f"sl1,sl2,trigia1,trigia2 FROM {self.kho}.qt3{qt3x} WHERE maqt=@Maqt AND chiphiid>0 "
                f"ORDER BY tt,chiphiid; If Not Exists (Select * From #bdl) "
                f"If Not Exists (Select * From {self.xac}.tamqt3{qt3x}) "
                f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{qt3x} Order By lastupdate; "
                f"INSERT INTO #bdl (maqt,tt,mauqtgt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien) "
                f"SELECT @Maqt as maqt,Identity(INT, 1, 1) As tt,maqtgt as mauqtgt,chiphiid,dongia,"
                f"sl1,sl2,trigia1,trigia2 FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 "
                f"ORDER BY tt,chiphiid; "
                f"UPDATE #bdl SET soluong=0; End End ")
        # up maqtgt
        sql += (
            f"UPDATE #bdl SET "
            f"maqtgt=Case When r.tt<10 Then CONCAT(@Maqt,{qt3x}0,r.tt) Else CONCAT(@Maqt,{qt3x},r.tt) End "
            f"WHERE tt>0; ")
        # Up to tamqt3x
        if qt3x in [1, 2, 3, 4]:
            sql += (
                f"MERGE {self.xac}.tamqt3{qt3x} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
                f"WHEN MATCHED THEN UPDATE SET "
                f"s.maqt=r.maqt,s.maqtgt=r.maqtgt,s.mauqtgt=r.mauqtgt,s.tt=r.tt,s.chiphiid=r.chiphiid,"
                f"s.soluong=r.soluong,s.giavl=r.giavl,s.gianc=r.gianc,s.giamtc=r.giamtc,"
                f"s.tienvl=r.tienvl,s.tiennc=r.tiennc,s.tienmtc=r.tienmtc,"
                f"s.lastupdate=isnull(r.lastupdate,getdate()) "
                f"WHEN NOT MATCHED THEN "
                f"INSERT (maqt,maqtgt,mauqtgt,tt,chiphiid,soluong,giavl,gianc,giamtc,"
                f"tienvl,tiennc,tienmtc,lastupdate) "
                f"VALUES (r.maqt,r.maqtgt,r.mauqtgt,r.tt,r.chiphiid,r.soluong,r.giavl,r.gianc,r.giamtc,"
                f"r.tienvl,r.tiennc,r.tienmtc,isnull(r.lastupdate,getdate())) "
                f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        else:
            sql += (
                f"MERGE {self.xac}.tamqt3{qt3x} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
                f"WHEN MATCHED THEN UPDATE SET "
                f"s.maqt=r.maqt,s.maqtgt=r.maqtgt,s.mauqtgt=r.mauqtgt,s.tt=r.tt,s.chiphiid=r.chiphiid,"
                f"s.gia=r.gia,s.oc_sl=r.oc_sl,s.on_sl=r.on_sl,s.oc_tien=r.oc_tien,s.on_tien=r.on_tien,"
                f"s.lastupdate=isnull(r.lastupdate,getdate()) "
                f"WHEN NOT MATCHED THEN "
                f"INSERT (maqt,maqtgt,mauqtgt,tt,chiphiid,gia,oc_sl,on_sl,oc_tien,on_tien,lastupdate) "
                f"VALUES (r.maqt,r.maqtgt,r.mauqtgt,r.tt,r.chiphiid,r.gia,r.oc_sl,r,on_sl,"
                f"r.oc_tien,r,on_tien,isnull(r.lastupdate,getdate())) "
                f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        # xoa cu
        # sql += f"Delete From {self.xac}.tamqt3{qt3x} Where ((maqt<>@Maqt) Or (maqtgt not like CONCAT(@Maqt,'%'))); "
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def nap_qt(self):
        sql = (f"DROP PROC {self.xac}.nap_qt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql0 = ""
        sql = (
            f"CREATE PROC {self.xac}.nap_qt "
            f"@Maqt NVARCHAR(50),@Mauqt NVARCHAR(50)='',@Gxd DECIMAL(38,9)=0.0 "
            f"WITH ENCRYPTION AS "
            f"BEGIN SET NOCOUNT ON "
            f"BEGIN TRY Declare @ttdl NVARCHAR(50)='',@Maq INT=26; "
            f"IF DataLength(Isnull(@Maqt,''))<1 Return; ")
        # tao bdl
        sql += (
            f"SELECT top 1 * INTO #bdl FROM {self.xac}.tamqt; "
            f"DELETE FROM #bdl; ")
        # load dulieu
        sql += (
            f"IF Isnull(@Gxd,0)>0 "
            f"Begin If Not Exists (Select * From #bdl) INSERT INTO #bdl "
            f"SELECT TOP 1 * FROM {self.xac}.qt WHERE gxd=@Gxd; "
            f"If Not Exists (Select * From #bdl) INSERT INTO #bdl "
            f"SELECT TOP 1 * FROM {self.kho}.qt WHERE gxd=@Gxd; End "
            f"IF DataLength(Isnull(@Mauqt,''))>0 "
            f"Begin If Not Exists (Select * From #bdl) INSERT INTO #bdl "
            f"SELECT TOP 1 * FROM {self.xac}.qt WHERE maqt=@Mauqt; "
            f"If Not Exists (Select * From #bdl) INSERT INTO #bdl "
            f"SELECT TOP 1 * FROM {self.kho}.qt WHERE maqt=@Mauqt; End "
            f"IF Not Exists (Select * From #bdl) INSERT INTO #bdl "
            f"SELECT TOP 1 * FROM {self.xac}.qt WHERE maqt=@Maqt; "
            f"IF Not Exists (Select * From #bdl) INSERT INTO #bdl "
            f"SELECT TOP 1 * FROM {self.kho}.qt WHERE maqt=@Maqt; "
            f"IF Not Exists (Select * From #bdl) Begin Set @Mauqt=@Maqt;"
            f"INSERT INTO #bdl (maqt,mauqt) VALUES (@Maqt,@Mauqt); End "
            f"ELSE Begin Select top 1 @Mauqt=maqt From #bdl; "
            f"UPDATE #bdl SET maqt=@Maqt,mauqt=@Mauqt; End ")
        # up qt
        sql += (
            f"UPDATE s SET "
            f"s.maqt=r.maqt,s.mauqt=r.mauqt,"
            f"s.baogiaid=Isnull(r.baogiaid,(Select Top 1 baogiaid From {self.kho}.baogiachiphi Order By baogiaid DESC)),"
            f"s.hesoid=Isnull(r.hesoid,(Select Top 1 hesoid From {self.kho}.hesochiphi Order By hesoid DESC)),"
            f"s.plgia=Isnull(r.plgia,'dutoan'),"
            f"s.madot=r.madot,s.hosoid=r.hosoid,s.tt=r.tt,s.soho=r.soho,"
            f"s.vlcai=r.vlcai,s.nccai=r.nccai,s.mtccai=r.mtccai,s.gxd1kq1=r.gxd1kq1,s.gxd1kq2=r.gxd1kq2,"
            f"s.vlnganh=r.vlnganh,s.ncnganh=r.ncnganh,s.mtcnganh=r.mtcnganh,s.gxd2kq1=r.gxd2kq1,s.gxd2kq2=r.gxd2kq2,"
            f"s.gxd=r.gxd,s.dautucty=r.dautucty,s.dautukhach=r.dautukhach,s.ghichu=r.ghichu,s.tinhtrang=r.tinhtrang,"
            f"s.nguoilap=r.nguoilap,s.ngaylap=r.ngaylap,s.inok=r.inok,s.ngaygan=r.ngaygan,s.ngayhoancong=r.ngayhoancong,"
            f"s.sodhn=r.sodhn,s.hieudhn=r.hieudhn,s.chisodhn=r.chisodhn,s.madshc=r.madshc,s.hesothauid=r.hesothauid,"
            f"s.tvlcai=r.tvlcai,s.tnccai=r.tnccai,s.tmtccai=r.tmtccai,s.tvlnganh=r.tvlnganh,s.tncnganh=r.tncnganh,"
            f"s.tmtcnganh=r.tmtcnganh,s.tgxd1kq1=r.tgxd1kq1,s.tgxd1kq2=r.tgxd1kq2,"
            f"s.sldh=r.sldh,s.dhn15=r.dhn15,s.dhn25=r.dhn25,s.dhn50=r.dhn50,s.dhn80=r.dhn80,s.dhn100=r.dhn100,"
            f"s.slong=r.slong,s.ong25=r.ong25,s.ong34=r.ong34,s.ong50=r.ong50,s.ong100=r.ong100,"
            f"s.ong125=r.ong125,s.ong150=r.ong150,s.ong200=r.ong200,s.ong250=r.ong250,"
            f"s.slcat=r.slcat,s.tiencat=r.tiencat,s.slcatnhua=r.slcatnhua,s.tiencatnhua=r.tiencatnhua,"
            f"s.tienvlk=r.tienvlk,s.nc=r.nc,s.tiennc=r.tiennc,s.mtc=r.mtc,s.tienmtc=r.tienmtc,s.cptt=r.cptt,"
            f"s.cong=r.cong,s.thuevat=r.thuevat,s.trigiaqtt=r.trigiaqtt,s.ghichuqtt=r.ghichuqtt,s.tinhtrangqtt=r.tinhtrangqtt,"
            f"s.lastupdate=isnull(r.lastupdate,getdate()) "
            f"FROM {self.xac}.tamqt s INNER JOIN #bdl r ON s.maqt=r.maqt; ")
        # up hoso
        sql += (
            f"UPDATE s SET "
            f"s.sohoso=r.sohoso,s.khachhang=r.khachhang,s.diachikhachhang=r.diachikhachhang,"
            f"s.maq=r.maq,s.maqp=r.maqp "
            f"FROM {self.xac}.tamqt s INNER JOIN {self.kho}.hoso r ON s.hosoid=r.hosoid; ")
        # up dot
        sql += (
            f"UPDATE s SET "
            f"s.nam=r.nam,s.plqt=r.plqt,s.quy=r.quy,s.sodot=r.sodot "
            f"FROM {self.xac}.tamqt s INNER JOIN {self.kho}.dot r ON s.madot=r.madot; ")
        # nap qt3x
        sql += (
            f"EXEC {self.xac}.nap_qt31 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt32 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt33 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt34 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt35 @Maqt, @Mauqt; ")
        # up chiphikhuvuc
        sql += (
            f"IF @Maqt=@Mauqt BEGIN "
            f"Select Top 1 @Maq=maq FROM {self.xac}.tamqt; "
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt31 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; "
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt32 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; "
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt33 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; "
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt34 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; END ")
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt35 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; END ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def tinh_qt3x(self, qt3x = 1):
        pass

    def tinh_qt(self):
        sql=(f"DROP PROC {self.xac}.tinh_qt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql=(
            f"CREATE PROC {self.xac}.tinh_qt"
            f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
            f" WITH ENCRYPTION AS"
            f" BEGIN SET NOCOUNT ON"
            f" BEGIN TRY DECLARE")
        # heso chiphi
        lds=["vl", "nc", "mtc", "tructiepkhac", "chung", "giantiepkhac",
               "thutinhtruoc", "khaosat", "thietke", "giamsat"]
        for heso in lds:
            sql += f" @{heso} DECIMAL(38,9)=1.0000,"
        # tong ket kinh phi
        lds = ["tongxaydung", "tailap", "congtrinh", "congtrinhtruocthue",
               "thuecongtrinh", "dautucty", "dautukhach", "tratruoc"]
        for chiphi in lds:
            sql += f" @{chiphi} DECIMAL(38,9)=1.0000,"
        # kinh phi chi tiet
        lds = [
            "Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Giantiep", "Giantiepkhac", "Chung", "Giaxaydung", "Thutinhtruoc", "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue", "Thuetongxaydung", "Tongxaydung", "Tailap", "Thuetailap", "Tailaptruocthue"]
        # phan ong nganh
        for chiphi in lds:
            sql += (
                f" @on{chiphi} DECIMAL(38,9)=1.0000,"
                f" @oc{chiphi} DECIMAL(38,9)=1.0000,")
        sql += f" @Plqt NVARCHAR(50);"
        # tinh tamqtx
        sql += (
            f" IF((@Baogiaid>0) OR (Len(Isnull(@Plgia,''))>0))"
            f" EXEC {self.xac}.tinh_tamqt3x @Baogiaid, @Hesoid, @Plgia;")
        # load Zvl, Znc, Zmtc, Tailap
        sql += (
            f" SELECT @ocZvl=Sum(zVl), @ocZnc=Sum(zNc), @ocZmtc=Sum(zMtc) FROM"
            f" (Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt31 UNION"
            f" Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt32) AS U;"
            f" SELECT @ocTailap=Isnull(sum(trigia1),0)"
            f" From {self.xac}.tamqt35;")
        sql += (
            f" SELECT @onZvl=Sum(zVl), @onZnc=Sum(zNc), @onZmtc=Sum(zMtc) FROM"
            f" (Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt33 UNION"
            f" Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt34) AS U;"
            f" SELECT @onTailap=Isnull(sum(trigia2),0)"
            f" From {self.xac}.tamqt35;")
        # load hesochiphi
        ods={"nc": "heso_nc", "mtc": "heso_mtc", "tructiepkhac": "heso_ttpk", "chung": "heso_cpchung",
               "giantiepkhac": "giantiepkhac", "thutinhtruoc": "heso_thunhaptt",
               "khaosat": "heso_khaosat", "thietke": "heso_thietke", "giamsat": "heso_gstc"}
        sql += f" Select "
        for heso in ods:
            sql += f"@{heso}=Isnull({ods[heso]},0),"
        sql += f"@vl=1.0000 From {self.kho}.hesochiphi Where hesoid=@Hesoid;"
        # tinh chi phi
        lds = ["on", "oc"]
        for phui in lds:
            sql += (
                f" Set @{phui}Vl= {self.kho}.lamtronso(@{phui}Zvl*@vl,0);"
                f" Set @{phui}Nc= {self.kho}.lamtronso(@{phui}Znc*@nc,0);"
                f" Set @{phui}Mtc= {self.kho}.lamtronso(@{phui}Zmtc*@mtc,0);"
                f" Set @{phui}Zvlncmtc= (@{phui}Vl + @{phui}Nc + @{phui}Mtc);"
                f" Set @{phui}Tructiepkhac= {self.kho}.lamtronso(@{phui}Zvlncmtc * @tructiepkhac,0);"
                f" Set @{phui}Tructiep= (@{phui}Zvlncmtc + @{phui}Tructiepkhac);"
                f" Set @{phui}Chung= {self.kho}.lamtronso(@{phui}Tructiep * @chung,0);"
                f" Set @{phui}Giantiepkhac= {self.kho}.lamtronso(@{phui}Tructiep * @giantiepkhac,0);"
                f" Set @{phui}Giantiep= (@{phui}Chung + @{phui}Giantiepkhac);"
                f" Set @{phui}Giaxaydung= (@{phui}Giantiep + @{phui}Tructiep);"
                f" Set @{phui}Thutinhtruoc= {self.kho}.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0);"
                f" Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc);"
                f" Set @{phui}KhaosatThietke= {self.kho}.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0);"
                f" Set @{phui}Giamsat= {self.kho}.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0);"
                f" Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + @{phui}Giamsat);"
                f" Set @{phui}Thuetongxaydung= {self.kho}.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0);"
                f" Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Thuetongxaydung);"
                # Tailap
                f" Set @{phui}Tailaptruocthue= {self.kho}.lamtronso(@{phui}Tailap * 100/110,0);"
                f" Set @{phui}Thuetailap= (@{phui}Tailap - @{phui}Tailaptruocthue);")
        sql += (
            f" Set @tongxaydung= (@onTongxaydung + @ocTongxaydung);"
            f" Set @tailap= (@onTailap + @ocTailap);"
            f" Set @congtrinh= (@tongxaydung + @tailap);"
            f" Set @congtrinhtruocthue= {self.kho}.lamtronso(@congtrinh*100/110,0);"
            f" Set @thuecongtrinh= (@congtrinh-@congtrinhtruocthue);"
            f" Select @Plqt=Isnull(maqt, ''), @Dautucty=dautucty From {self.xac}.tamqt;"
            f" IF @Plqt LIKE '%MP%' Set @dautucty= {self.kho}.lamtronso(@congtrinh, 0);"
            f" ELSE If @dautucty is null Set @dautucty= (@onTongxaydung + @onTailap);"
            f" Set @dautukhach= (@congtrinh - @dautucty);")
        sql += (
            f" UPDATE {self.xac}.tamqt SET"
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
            f" dhn15= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=15),0),"
            f" dhn50= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=50),0),"
            f" dhn80= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=80),0),"
            f" dhn100= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=100),0),"
            f" sldh= Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN'),0),"
            # tong hop ong
            f" ong25= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=25),0),"
            f" ong34= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=34),0),"
            f" ong50= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=50),0),"
            f" ong100= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=100),0),"
            f" ong125= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=125),0),"
            f" ong150= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=150),0),"
            f" ong200= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=200),0),"
            f" ong250= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=250),0),"
            f" slong= Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong'),0),"
            # tong hop cat
            f" slcat= Case When @Hesoid>=20200827"
            f" Then Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
            f" Else Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End,"
            f" tiencat= Case When @Hesoid>=20200827"
            f" Then Isnull((Select sum(vl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
            f" Else Isnull((Select sum(vl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End;")
        sql += (
            f" If @Baogiaid>0 Update {self.xac}.tamqt SET baogiaid=@Baogiaid;"
            f" If @Hesoid>0 Update {self.xac}.tamqt SET hesoid=@Hesoid;")
        sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def luu(self):
        pass

    def qtgt_tinh(self):
        try:
            sql=(f"DROP PROC {self.xac}.qtgt_tinh")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql=(
            f"CREATE PROC {self.xac}.qtgt_tinh"
            f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
            f" WITH ENCRYPTION AS"
            f" BEGIN SET NOCOUNT ON"
            f" BEGIN TRY DECLARE")
        # heso chiphi
        lds=["vl", "nc", "mtc", "tructiepkhac", "chung", "giantiepkhac",
               "thutinhtruoc", "khaosat", "thietke", "giamsat"]
        for heso in lds:
            sql += f" @{heso} DECIMAL(38,9)=1.0000,"
        # tong ket kinh phi
        lds = ["tongxaydung", "tailap", "congtrinh", "congtrinhtruocthue",
               "thuecongtrinh", "dautucty", "dautukhach", "tratruoc"]
        for chiphi in lds:
            sql += f" @{chiphi} DECIMAL(38,9)=1.0000,"
        # kinh phi chi tiet
        lds = [
            "Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Giantiep", "Giantiepkhac", "Chung", "Giaxaydung", "Thutinhtruoc", "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue", "Thuetongxaydung", "Tongxaydung", "Tailap", "Thuetailap", "Tailaptruocthue"]
        # phan ong nganh
        for chiphi in lds:
            sql += (
                f" @on{chiphi} DECIMAL(38,9)=1.0000,"
                f" @oc{chiphi} DECIMAL(38,9)=1.0000,")
        sql += f" @Plqt NVARCHAR(50);"
        # tinh tamqtx
        sql += (
            f" IF((@Baogiaid>0) OR (Len(Isnull(@Plgia,''))>0))"
            f" EXEC {self.xac}.tinh_tamqt3x @Baogiaid, @Hesoid, @Plgia;")
        # load Zvl, Znc, Zmtc, Tailap
        sql += (
            f" SELECT @ocZvl=Sum(zVl), @ocZnc=Sum(zNc), @ocZmtc=Sum(zMtc) FROM"
            f" (Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt31 UNION"
            f" Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt32) AS U;"
            f" SELECT @ocTailap=Isnull(sum(trigia1),0)"
            f" From {self.xac}.tamqt35;")
        sql += (
            f" SELECT @onZvl=Sum(zVl), @onZnc=Sum(zNc), @onZmtc=Sum(zMtc) FROM"
            f" (Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt33 UNION"
            f" Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc"
            f" From {self.xac}.tamqt34) AS U;"
            f" SELECT @onTailap=Isnull(sum(trigia2),0)"
            f" From {self.xac}.tamqt35;")
        # load hesochiphi
        ods={"nc": "heso_nc", "mtc": "heso_mtc", "tructiepkhac": "heso_ttpk", "chung": "heso_cpchung",
               "giantiepkhac": "giantiepkhac", "thutinhtruoc": "heso_thunhaptt",
               "khaosat": "heso_khaosat", "thietke": "heso_thietke", "giamsat": "heso_gstc"}
        sql += f" Select "
        for heso in ods:
            sql += f"@{heso}=Isnull({ods[heso]},0),"
        sql += f"@vl=1.0000 From {self.kho}.hesochiphi Where hesoid=@Hesoid;"
        # tinh chi phi
        lds = ["on", "oc"]
        for phui in lds:
            sql += (
                f" Set @{phui}Vl= {self.kho}.lamtronso(@{phui}Zvl*@vl,0);"
                f" Set @{phui}Nc= {self.kho}.lamtronso(@{phui}Znc*@nc,0);"
                f" Set @{phui}Mtc= {self.kho}.lamtronso(@{phui}Zmtc*@mtc,0);"
                f" Set @{phui}Zvlncmtc= (@{phui}Vl + @{phui}Nc + @{phui}Mtc);"
                f" Set @{phui}Tructiepkhac= {self.kho}.lamtronso(@{phui}Zvlncmtc * @tructiepkhac,0);"
                f" Set @{phui}Tructiep= (@{phui}Zvlncmtc + @{phui}Tructiepkhac);"
                f" Set @{phui}Chung= {self.kho}.lamtronso(@{phui}Tructiep * @chung,0);"
                f" Set @{phui}Giantiepkhac= {self.kho}.lamtronso(@{phui}Tructiep * @giantiepkhac,0);"
                f" Set @{phui}Giantiep= (@{phui}Chung + @{phui}Giantiepkhac);"
                f" Set @{phui}Giaxaydung= (@{phui}Giantiep + @{phui}Tructiep);"
                f" Set @{phui}Thutinhtruoc= {self.kho}.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0);"
                f" Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc);"
                f" Set @{phui}KhaosatThietke= {self.kho}.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0);"
                f" Set @{phui}Giamsat= {self.kho}.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0);"
                f" Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + @{phui}Giamsat);"
                f" Set @{phui}Thuetongxaydung= {self.kho}.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0);"
                f" Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Thuetongxaydung);"
                # Tailap
                f" Set @{phui}Tailaptruocthue= {self.kho}.lamtronso(@{phui}Tailap * 100/110,0);"
                f" Set @{phui}Thuetailap= (@{phui}Tailap - @{phui}Tailaptruocthue);")
        sql += (
            f" Set @tongxaydung= (@onTongxaydung + @ocTongxaydung);"
            f" Set @tailap= (@onTailap + @ocTailap);"
            f" Set @congtrinh= (@tongxaydung + @tailap);"
            f" Set @congtrinhtruocthue= {self.kho}.lamtronso(@congtrinh*100/110,0);"
            f" Set @thuecongtrinh= (@congtrinh-@congtrinhtruocthue);"
            f" Select @Plqt=Isnull(maqt, ''), @Dautucty=dautucty From {self.xac}.tamqt;"
            f" IF @Plqt LIKE '%MP%' Set @dautucty= {self.kho}.lamtronso(@congtrinh, 0);"
            f" ELSE If @dautucty is null Set @dautucty= (@onTongxaydung + @onTailap);"
            f" Set @dautukhach= (@congtrinh - @dautucty);")
        sql += (
            f" UPDATE {self.xac}.tamqt SET"
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
            f" dhn15= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=15),0),"
            f" dhn50= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=50),0),"
            f" dhn80= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=80),0),"
            f" dhn100= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=100),0),"
            f" sldh= Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='DHN'),0),"
            # tong hop ong
            f" ong25= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=25),0),"
            f" ong34= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=34),0),"
            f" ong50= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=50),0),"
            f" ong100= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=100),0),"
            f" ong125= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=125),0),"
            f" ong150= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=150),0),"
            f" ong200= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=200),0),"
            f" ong250= Isnull((Select sl From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=250),0),"
            f" slong= Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Ong'),0),"
            # tong hop cat
            f" slcat= Case When @Hesoid>=20200827"
            f" Then Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
            f" Else Isnull((Select sum(sl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End,"
            f" tiencat= Case When @Hesoid>=20200827"
            f" Then Isnull((Select sum(vl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
            f" Else Isnull((Select sum(vl) From {self.xac}.tamthqt01"
            f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End;")
        sql += (
            f" If @Baogiaid>0 Update {self.xac}.tamqt SET baogiaid=@Baogiaid;"
            f" If @Hesoid>0 Update {self.xac}.tamqt SET hesoid=@Hesoid;")
        sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def qtgt_luu(self):
        try:
            sql=(f"DROP PROC {self.xac}.qtgt_luu")
            db.core().execute(sql)
        except:
            pass
        # main prog


class Qtgt_thau:
    def __init__(self, xac = 'pkh'):
        self.xac=xac
        self.kho='dbo'
        self.tao()

    def tao(self):
        self.giavl()
        self.gianc()
        self.giamtc()

    def giavl(self):
        # init prog
        sql=(f"DROP FUNCTION {self.kho}.giavl_thau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql=(
            f"CREATE FUNCTION {self.kho}.giavl_thau(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(giavl1,0.0) From {self.kho}.baogiachiphi"
            f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
            f" Order By baogiaid DESC;"
            f" IF @Kq<0 SET @Kq=@Kq*(-1);"
            f" RETURN @Kq; END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def gianc(self):
        # init prog
        sql=(f"DROP FUNCTION {self.kho}.gianc_thau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql=(
            f"CREATE FUNCTION {self.kho}.gianc_thau(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(gianc1,0.0) From {self.kho}.baogiachiphi"
            f" Where (chiphiid=@Chiphiid) AND (baogiaid<=@Baogiaid) AND (plgia=@Plgia)"
            f" Order By baogiaid DESC;"
            f" IF @Kq<0 SET @Kq=@Kq*(-1);"
            f" RETURN @Kq; END;")
        try:
            db.core().execute(sql)
        except:
            pass

    def giamtc(self):
        # init prog
        sql=(f"DROP FUNCTION {self.kho}.giamtc_thau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql=(
            f"CREATE FUNCTION {self.kho}.giamtc_thau(@Chiphiid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan')"
            f" Returns decimal(38,9) AS BEGIN"
            f" Declare @Kq decimal(38,9)=0.0;"
            f" Select Top 1 @Kq=Isnull(giamtc1,0.0) From {self.kho}.baogiachiphi"
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
    sql=(f"DROP PROC dbo.baogiathau")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
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


def nap_tamqt3x(schema = "web", qt3x = 1):
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
WHILE (@@TranCount > 0) COMMIT tran;
    """


def load_tamqt3x(schema = "web", qt3x = 1):
    # init prog
    if qt3x not in [1, 2, 3, 4, 5]:
        return
    try:
        sql=(f"DROP PROC {schema}.load_tamqt3{qt3x}")
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
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


def tamqt_nap(xac = "web"):
    # init prog
    sql=(f"DROP PROC {xac}.tamqt_nap")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
        f"CREATE PROC {xac}.tamqt_nap"
        f" @Maqt NVARCHAR(50)=''"
        f" WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY"
        f" Declare @Mauqt NVARCHAR(50)='';"
        f" SET @Mauqt=@Maqt;")
    sql += (
        f" MERGE {xac}.tamqt AS s USING {xac}.qt AS r ON (s.mauqt=r.mauqt)"
        f" WHEN MATCHED THEN UPDATE SET s.maqt=@maqt,"
        f" s.baogiaid=CASE WHEN r.baogiaid>0 THEN r.baogiaid"
        f" ELSE (Select Top 1 baogiaid From dbo.baogiachiphi Order By baogiaid DESC) END,"
        f" s.hesoid=CASE WHEN r.hesoid>0 THEN r.hesoid"
        f" ELSE (Select Top 1 hesoid From dbo.hesochiphi Order By hesoid DESC) END,"
        f" s.plgia=Isnull(r.plgia,'dutoan'),"
        f" s.madot=r.madot,s.hosoid=r.hosoid,s.tt=r.tt,s.soho=r.soho,"
        f" s.vlcai=r.vlcai,s.nccai=r.nccai,s.mtccai=r.mtccai,s.gxd1kq1=r.gxd1kq1,s.gxd1kq2=r.gxd1kq2,"
        f" s.vlnganh=r.vlnganh,s.ncnganh=r.ncnganh,s.mtcnganh=r.mtcnganh,s.gxd2kq1=r.gxd2kq1,s.gxd2kq2=r.gxd2kq2,"
        f" s.gxd=r.gxd,s.dautucty=r.dautucty,s.dautukhach=r.dautukhach,s.ghichu=r.ghichu,s.tinhtrang=r.tinhtrang,"
        f" s.nguoilap=r.nguoilap,s.ngaylap=r.ngaylap,s.inok=r.inok,s.ngaygan=r.ngaygan,s.ngayhoancong=r.ngayhoancong,"
        f" s.sodhn=r.sodhn,s.hieudhn=r.hieudhn,s.chisodhn=r.chisodhn,s.madshc=r.madshc,s.hesothauid=r.hesothauid,"
        f" s.tvlcai=r.tvlcai,s.tnccai=r.tnccai,s.tmtccai=r.tmtccai,s.tvlnganh=r.tvlnganh,s.tncnganh=r.tncnganh,"
        f" s.tmtcnganh=r.tmtcnganh,s.tgxd1kq1=r.tgxd1kq1,s.tgxd1kq2=r.tgxd1kq2,"
        f" s.sldh=r.sldh,s.dhn15=r.dhn15,s.dhn25=r.dhn25,s.dhn50=r.dhn50,s.dhn80=r.dhn80,s.dhn100=r.dhn100,"
        f" s.slong=r.slong,s.ong25=r.ong25,s.ong34=r.ong34,s.ong50=r.ong50,s.ong100=r.ong100,"
        f" s.ong125=r.ong125,s.ong150=r.ong150,s.ong200=r.ong200,s.ong250=r.ong250,"
        f" s.slcat=r.slcat,s.tiencat=r.tiencat,s.slcatnhua=r.slcatnhua,s.tiencatnhua=r.tiencatnhua,"
        f" s.tienvlk=r.tienvlk,s.nc=r.nc,s.tiennc=r.tiennc,s.mtc=r.mtc,s.tienmtc=r.tienmtc,s.cptt=r.cptt,"
        f" s.cong=r.cong,s.thuevat=r.thuevat,s.trigiaqtt=r.trigiaqtt,s.ghichuqtt=r.ghichuqtt,s.tinhtrangqtt=r.tinhtrangqtt,"
        f" s.lastupdate=Isnull(r.lastupdate,getdate())"
        f" WHEN NOT MATCHED BY SOURCE THEN DELETE"
        f" WHEN NOT MATCHED BY TARGET THEN"
        f" INSERT (maqt,baogiaid,hesoid,plgia,madot,hosoid,tt,soho,"
        f"vlcai,nccai,mtccai,gxd1kq1,gxd1kq2,vlnganh,ncnganh,mtcnganh,gxd2kq1,gxd2kq2,"
        f"gxd,dautucty,dautukhach,ghichu,tinhtrang,nguoilap,ngaylap,ngaygan,ngayhoancong,"
        f"sodhn,hieudhn,chisodhn,madshc,hesothauid,"
        f"tvlcai,tnccai,tmtccai,tvlnganh,tncnganh,tmtcnganh,tgxd1kq1,tgxd1kq2,"
        f"sldh,dhn15,dhn25,dhn50,dhn80,dhn100,"
        f"slong,ong25,ong34,ong50,ong100,ong125,ong150,ong200,ong250,"
        f"slcat,tiencat,slcatnhua,tiencatnhua,tienvlk,nc,tiennc,mtc,tienmtc,"
        f"cptt,cong,thuevat,trigiaqtt,ghichuqtt,tinhtrangqtt,lastupdate)"
        f" VALUES (@Maqt,CASE WHEN r.baogiaid>0 THEN r.baogiaid"
        f" ELSE (Select Top 1 baogiaid From dbo.baogiachiphi Order By baogiaid DESC) END,"
        f" CASE WHEN r.hesoid>0 THEN r.hesoid"
        f" ELSE (Select Top 1 hesoid From dbo.hesochiphi Order By hesoid DESC) END,"
        f"Isnull(r.plgia,'dutoan'),r.madot,r.hosoid,r.tt,r.soho,"
        f"r.vlcai,r.nccai,r.mtccai,r.gxd1kq1,r.gxd1kq2,r.vlnganh,r.ncnganh,r.mtcnganh,r.gxd2kq1,r.gxd2kq2,"
        f"r.gxd,r.dautucty,r.dautukhach,r.ghichu,r.tinhtrang,r.nguoilap,r.ngaylap,r.ngaygan,r.ngayhoancong,"
        f"r.sodhn,r.hieudhn,r.chisodhn,r.madshc,r.hesothauid,"
        f"r.tvlcai,r.tnccai,r.tmtccai,r.tvlnganh,r.tncnganh,r.tmtcnganh,r.tgxd1kq1,r.tgxd1kq2,"
        f"r.sldh,r.dhn15,r.dhn25,r.dhn50,r.dhn80,r.dhn100,"
        f"r.slong,r.ong25,r.ong34,r.ong50,r.ong100,r.ong125,r.ong150,r.ong200,r.ong250,"
        f"r.slcat,r.tiencat,r.slcatnhua,r.tiencatnhua,r.tienvlk,r.nc,r.tiennc,r.mtc,r.tienmtc,"
        f"r.cptt,r.cong,r.thuevat,r.trigiaqtt,r.ghichuqtt,r.tinhtrangqtt,Isnull(r.lastupdate,getdate()));")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def tamqt_napgoc(xac = "web"):
    # init prog
    sql=(f"DROP PROC {xac}.tamqt_napgoc")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
        f"CREATE PROC {xac}.tamqt_napgoc"
        f" @Maqt NVARCHAR(50)=''"
        f" WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY")
    sql += (
        f" MERGE {xac}.tamqt AS s USING dbo.qt AS r ON (s.maqt=r.maqt)"
        f" WHEN MATCHED THEN UPDATE SET s.maqt=@maqt,"
        f" s.baogiaid=CASE WHEN r.baogiaid>0 THEN r.baogiaid"
        f" ELSE (Select Top 1 baogiaid From dbo.baogiachiphi Order By baogiaid DESC) END,"
        f" s.hesoid=CASE WHEN r.hesoid>0 THEN r.hesoid"
        f" ELSE (Select Top 1 hesoid From dbo.hesochiphi Order By hesoid DESC) END,"
        f" s.plgia=Isnull(r.plgia,'dutoan'),"
        f" s.madot=r.madot,s.hosoid=r.hosoid,s.tt=r.tt,s.soho=r.soho,"
        f" s.vlcai=r.vlcai,s.nccai=r.nccai,s.mtccai=r.mtccai,s.gxd1kq1=r.gxd1kq1,s.gxd1kq2=r.gxd1kq2,"
        f" s.vlnganh=r.vlnganh,s.ncnganh=r.ncnganh,s.mtcnganh=r.mtcnganh,s.gxd2kq1=r.gxd2kq1,s.gxd2kq2=r.gxd2kq2,"
        f" s.gxd=r.gxd,s.dautucty=r.dautucty,s.dautukhach=r.dautukhach,s.ghichu=r.ghichu,s.tinhtrang=r.tinhtrang,"
        f" s.nguoilap=r.nguoilap,s.ngaylap=r.ngaylap,s.inok=r.inok,s.ngaygan=r.ngaygan,s.ngayhoancong=r.ngayhoancong,"
        f" s.sodhn=r.sodhn,s.hieudhn=r.hieudhn,s.chisodhn=r.chisodhn,s.madshc=r.madshc,s.hesothauid=r.hesothauid,"
        f" s.tvlcai=r.tvlcai,s.tnccai=r.tnccai,s.tmtccai=r.tmtccai,s.tvlnganh=r.tvlnganh,s.tncnganh=r.tncnganh,"
        f" s.tmtcnganh=r.tmtcnganh,s.tgxd1kq1=r.tgxd1kq1,s.tgxd1kq2=r.tgxd1kq2,"
        f" s.sldh=r.sldh,s.dhn15=r.dhn15,s.dhn25=r.dhn25,s.dhn50=r.dhn50,s.dhn80=r.dhn80,s.dhn100=r.dhn100,"
        f" s.slong=r.slong,s.ong25=r.ong25,s.ong34=r.ong34,s.ong50=r.ong50,s.ong100=r.ong100,"
        f" s.ong125=r.ong125,s.ong150=r.ong150,s.ong200=r.ong200,s.ong250=r.ong250,"
        f" s.slcat=r.slcat,s.tiencat=r.tiencat,s.slcatnhua=r.slcatnhua,s.tiencatnhua=r.tiencatnhua,"
        f" s.tienvlk=r.tienvlk,s.nc=r.nc,s.tiennc=r.tiennc,s.mtc=r.mtc,s.tienmtc=r.tienmtc,s.cptt=r.cptt,"
        f" s.cong=r.cong,s.thuevat=r.thuevat,s.trigiaqtt=r.trigiaqtt,s.ghichuqtt=r.ghichuqtt,s.tinhtrangqtt=r.tinhtrangqtt,"
        f" s.lastupdate=Isnull(r.lastupdate,getdate())"
        f" WHEN NOT MATCHED BY SOURCE THEN DELETE"
        f" WHEN NOT MATCHED BY TARGET THEN"
        f" INSERT (maqt,baogiaid,hesoid,plgia,madot,hosoid,tt,soho,"
        f"vlcai,nccai,mtccai,gxd1kq1,gxd1kq2,vlnganh,ncnganh,mtcnganh,gxd2kq1,gxd2kq2,"
        f"gxd,dautucty,dautukhach,ghichu,tinhtrang,nguoilap,ngaylap,ngaygan,ngayhoancong,"
        f"sodhn,hieudhn,chisodhn,madshc,hesothauid,"
        f"tvlcai,tnccai,tmtccai,tvlnganh,tncnganh,tmtcnganh,tgxd1kq1,tgxd1kq2,"
        f"sldh,dhn15,dhn25,dhn50,dhn80,dhn100,"
        f"slong,ong25,ong34,ong50,ong100,ong125,ong150,ong200,ong250,"
        f"slcat,tiencat,slcatnhua,tiencatnhua,tienvlk,nc,tiennc,mtc,tienmtc,"
        f"cptt,cong,thuevat,trigiaqtt,ghichuqtt,tinhtrangqtt,lastupdate)"
        f" VALUES (@Maqt,CASE WHEN r.baogiaid>0 THEN r.baogiaid"
        f" ELSE (Select Top 1 baogiaid From dbo.baogiachiphi Order By baogiaid DESC) END,"
        f" CASE WHEN r.hesoid>0 THEN r.hesoid"
        f" ELSE (Select Top 1 hesoid From dbo.hesochiphi Order By hesoid DESC) END,"
        f"Isnull(r.plgia,'dutoan'),r.madot,r.hosoid,r.tt,r.soho,"
        f"r.vlcai,r.nccai,r.mtccai,r.gxd1kq1,r.gxd1kq2,r.vlnganh,r.ncnganh,r.mtcnganh,r.gxd2kq1,r.gxd2kq2,"
        f"r.gxd,r.dautucty,r.dautukhach,r.ghichu,r.tinhtrang,r.nguoilap,r.ngaylap,r.ngaygan,r.ngayhoancong,"
        f"r.sodhn,r.hieudhn,r.chisodhn,r.madshc,r.hesothauid,"
        f"r.tvlcai,r.tnccai,r.tmtccai,r.tvlnganh,r.tncnganh,r.tmtcnganh,r.tgxd1kq1,r.tgxd1kq2,"
        f"r.sldh,r.dhn15,r.dhn25,r.dhn50,r.dhn80,r.dhn100,"
        f"r.slong,r.ong25,r.ong34,r.ong50,r.ong100,r.ong125,r.ong150,r.ong200,r.ong250,"
        f"r.slcat,r.tiencat,r.slcatnhua,r.tiencatnhua,r.tienvlk,r.nc,r.tiennc,r.mtc,r.tienmtc,"
        f"r.cptt,r.cong,r.thuevat,r.trigiaqtt,r.ghichuqtt,r.tinhtrangqtt,Isnull(r.lastupdate,getdate()));")
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def qtgt_nap(xac = "web"):
    # init prog
    sql=(f"DROP PROC {xac}.qtgt_nap")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
        f"CREATE PROC {xac}.qtgt_nap"
        f" @Maqt NVARCHAR(50), @Gxd DECIMAL(38,0)=0.0, @Mauqt NVARCHAR(50)=''"
        f" WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY"
        f" DECLARE @Hesoid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan',"
        f" @Tinhtrang NVARCHAR(50)='',@Napgoc INT=0, @Maq INT=26")
    sql += (
        f" IF Len(Isnull(@Mauqt,''))>0"
        f" Begin SELECT @Gxd=isnull(gxd,0) FROM {xac}.qt WHERE maqt=@Mauqt;"
        f" IF @Gxd<1 begin SET @Napgoc=1;"
        f" SELECT @Gxd=isnull(gxd,0) FROM dbo.qt WHERE maqt=@Mauqt;"
        f" IF @Gxd<1 SET @Napgoc=2;"
        f" end End"
        f" ELSE"
        f" If Isnull(@Gxd,0)>0"
        f" Begin SELECT TOP 1 @Mauqt=maqt FROM {xac}.qt WHERE gxd=@Gxd"
        f" ORDER BY lastupdate DESC, hesoid DESC, baogiaid DESC, maqt DESC;"
        f" IF Len(Isnull(@Mauqt,''))<1 begin SET @Napgoc=1;"
        f" SELECT TOP 1 @Mauqt=maqt FROM dbo.qt WHERE gxd=@Gxd"
        f" ORDER BY lastupdate DESC, hesoid DESC, baogiaid DESC, maqt DESC;"
        f" IF Len(Isnull(@Mauqt,''))<1 SET @Napgoc=2; end End"
        f" Else"
        f" Begin SELECT @Gxd=isnull(gxd,0) FROM {xac}.qt WHERE maqt=@Mauqt;"
        f" IF @Gxd<1 begin SET @Napgoc=1;"
        f" SELECT @Gxd=isnull(gxd,0) FROM dbo.qt WHERE maqt=@Mauqt;"
        f" IF @Gxd<1 SET @Napgoc=2;"
        f" end End;")
    sql_tinh=(
        f" Select Top 1 @Hesoid=hesoid, @Baogiaid=baogiaid, @Plgia=plgia"
        f" From {xac}.tamqt Where maqt=@Maqt;"
        f" EXEC {xac}.tamqt31_tinh @Hesoid,@Baogiaid,@Plgia;"
        f" EXEC {xac}.tamqt32_tinh @Hesoid,@Baogiaid,@Plgia;"
        f" EXEC {xac}.tamqt33_tinh @Hesoid,@Baogiaid,@Plgia;"
        f" EXEC {xac}.tamqt34_tinh @Hesoid,@Baogiaid,@Plgia;"
        f" EXEC {xac}.tamqt35_tinh @Hesoid,@Baogiaid,@Plgia;"
        f" EXEC {xac}.tamqt_tinh @Hesoid,@Baogiaid,@Plgia;")
    sql0=(
        f" IF @Napgoc=2 Begin"
        f" EXEC {xac}.tamqt_napgoc @Maqt;"
        # f" EXEC {xac}.tamqt31_napgoc '2020GMMP000';"
        # f" EXEC {xac}.tamqt32_napgoc '2020GMMP000';"
        # f" EXEC {xac}.tamqt33_napgoc '2020GMMP000';"
        # f" EXEC {xac}.tamqt34_napgoc '2020GMMP000';"
        # f" EXEC {xac}.tamqt35_napgoc '2020GMMP000';"
        # f"{sql_tinh}"
        f" End;"
        f" IF @Napgoc=1 if Len(Isnull(@Mauqt,''))>0"
        f" Begin EXEC {xac}.tamqt_napgoc @Maqt"
        # f" EXEC {xac}.tamqt31_napgoc @Mauqt;"
        # f" EXEC {xac}.tamqt32_napgoc @Mauqt;"
        # f" EXEC {xac}.tamqt33_napgoc @Mauqt;"
        # f" EXEC {xac}.tamqt34_napgoc @Mauqt;"
        # f" EXEC {xac}.tamqt35_napgoc @Mauqt;"
        # f"{sql_tinh}"
        f" End;"
        f" Else Begin EXEC {xac}.tamqt_napgoc @Maqt"
        # f" EXEC {xac}.tamqt31_napgoc @Maqt;"
        # f" EXEC {xac}.tamqt32_napgoc @Maqt;"
        # f" EXEC {xac}.tamqt33_napgoc @Maqt;"
        # f" EXEC {xac}.tamqt34_napgoc @Maqt;"
        # f" EXEC {xac}.tamqt35_napgoc @Maqt;"
        # f"{sql_tinh}"
        f" End;"
        f" IF @Napgoc=0 Begin"
        f" EXEC {xac}.tamqt_nap @Maqt;"
        # f" EXEC {xac}.tamqt31_nap @Maqt;"
        # f" EXEC {xac}.tamqt32_nap @Maqt;"
        # f" EXEC {xac}.tamqt33_nap @Maqt;"
        # f" EXEC {xac}.tamqt34_nap @Maqt;"
        # f" EXEC {xac}.tamqt35_nap @Maqt;"
        # f"{sql_tinh}"
        f" End;"
    )
    sql += f" END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
    try:
        db.core().execute(sql)
    except:
        pass


def load_tamqt(schema = "web"):
    # init prog
    sql=(f"DROP PROC {schema}.load_tamqt")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
        f"CREATE PROC {schema}.load_tamqt"
        f" @Maqt NVARCHAR(50), @Gxd DECIMAL(38,0)=0.0, @Mauqt NVARCHAR(50)=''"
        f" WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY"
        f" DECLARE @Hesoid INT=0,@Baogiaid INT=0,@Plgia NVARCHAR(50)='dutoan',"
        f" @Nguon NVARCHAR(50)='{schema}', @Tinhtrang NVARCHAR(50)='', @Maq INT=26")
    sql += (
        f" IF Isnull(@Gxd,0)>0"
        f" Begin SELECT TOP 1 @Mauqt=maqt FROM {schema}.qt WHERE gxd=@Gxd"
        f" ORDER BY lastupdate DESC, baogiaid DESC, hesoid DESC, maqt DESC;"
        f" IF Len(Isnull(@Mauqt,''))<1 SET @Nguon='dbo';"
        f" SELECT TOP 1 @Mauqt=maqt FROM dbo.qt WHERE gxd=@Gxd"
        f" ORDER BY lastupdate DESC, baogiaid DESC, hesoid DESC, maqt DESC;"
        f" IF Len(Isnull(@Mauqt,''))<1 SET @Mauqt=@Maqt;"
        f" End;"
        # f" ELSE IF Len(Isnull(@Mauqt,''))>0"
        # f" Begin SELECT @Gxd=isnull(gxd,0) FROM @Nguon.qt WHERE maqt=@Mauqt;"
        # f" IF @Gxd<1 SET @Nguon='dbo'; End"
        # f" ELSE Begin SET @Mauqt=@Maqt; SELECT @Gxd=isnull(gxd,0) FROM @Nguon.qt WHERE maqt=@Mauqt;"
        # f" IF @Gxd<1 SET @Nguon='dbo'; End;"
    )
    sql0=(
        f" IF EXISTS (SELECT * FROM {schema}.tamqt) UPDATE {schema}.tamqt SET maqt=@Mauqt"
        f" ELSE INSERT INTO {schema}.tamqt(maqt, lastupdate) VALUES(@Mauqt, getdate()); "
    )
    sql0 += (
        f" MERGE {schema}.tamqt AS s USING @Nguon.qt AS r ON (s.maqt=r.maqt)"
        f" WHEN MATCHED THEN UPDATE SET s.maqt=@maqt,"
        f" s.baogiaid=CASE WHEN r.baogiaid>0 THEN r.baogiaid"
        f" ELSE (Select Top 1 baogiaid From dbo.baogiachiphi Order By baogiaid DESC) END,"
        f" s.hesoid=CASE WHEN r.hesoid>0 THEN r.hesoid"
        f" ELSE (Select Top 1 hesoid From dbo.hesochiphi Order By hesoid DESC) END,"
        f" s.plgia=Isnull(r.plgia,@Plgia),"
        f" s.madot=r.madot,s.hosoid=r.hosoid,s.tt=r.tt,s.soho=r.soho,"
        f" s.vlcai=r.vlcai,s.nccai=r.nccai,s.mtccai=r.mtccai,s.gxd1kq1=r.gxd1kq1,s.gxd1kq2=r.gxd1kq2,"
        f" s.vlnganh=r.vlnganh,s.ncnganh=r.ncnganh,s.mtcnganh=r.mtcnganh,s.gxd2kq1=r.gxd2kq1,s.gxd2kq2=r.gxd2kq2,"
        f" s.gxd=r.gxd,s.dautucty=r.dautucty,s.dautukhach=r.dautukhach,s.ghichu=r.ghichu,s.tinhtrang=r.tinhtrang,"
        f" s.nguoilap=r.nguoilap,s.ngaylap=r.ngaylap,s.inok=r.inok,s.ngaygan=r.ngaygan,s.ngayhoancong=r.ngayhoancong,"
        f" s.sodhn=r.ngayhoancong,s.hieudhn=r.hieudhn,s.chisodhn=r.chisodhn,s.madshc=r.madshc,s.hesothauid=r.hesothauid,"
        f" s.tvlcai=r.tvlcai,s.tnccai=r.tnccai,s.tmtccai=r.tmtccai,s.tvlnganh=r.tvlnganh,s.tncnganh=r.tncnganh,"
        f" s.tmtcnganh=r.tmtcnganh,s.tgxd1kq1=r.tgxd1kq1,s.tgxd1kq2=r.tgxd1kq2,"
        f" s.sldh=r.sldh,s.dhn15=r.dhn15,s.dhn25=r.dhn25,s.dhn50=r.dhn50,s.dhn80=r.dhn80,s.dhn100=r.dhn100,"
        f" s.slong=r.slong,s.ong25=r.ong25,s.ong34=r.ong34,s.ong50=r.ong50,s.ong100=r.ong100,"
        f" s.ong125=r.ong125,s.ong150=r.ong150,s.ong200=r.ong200,s.ong250=r.ong250,"
        f" s.slcat=r.slcat,s.tiencat=r.tiencat,s.slcatnhua=r.slcatnhua,s.tiencatnhua=r.tiencatnhua,"
        f" s.tienvlk=r.tienvlk,s.nc=r.nc,s.tiennc=r.tiennc,s.mtc=r.mtc,s.tienmtc=r.tienmtc,s.cptt=r.cptt,"
        f" s.cong=r.cong,s.thuevat=r.thuevat,s.trigiaqtt=r.trigiaqtt,s.ghichuqtt=r.ghichuqtt,s.tinhtrangqtt=r.tinhtrangqtt,"
        f" s.lastupdate=Isnull(r.lastupdate,getdate())"
        f" WHEN NOT MATCHED BY SOURCE THEN DELETE"
        f" WHEN NOT MATCHED BY TARGET THEN"
        f" INSERT (maqt,baogiaid,hesoid,plgia,madot,hosoid,tt,soho,)"
        f" VALUES (@Maqt,CASE WHEN r.baogiaid>0 THEN r.baogiaid"
        f" ELSE (Select Top 1 baogiaid From dbo.baogiachiphi Order By baogiaid DESC) END,"
        f" CASE WHEN r.hesoid>0 THEN r.hesoid"
        f" ELSE (Select Top 1 hesoid From dbo.hesochiphi Order By hesoid DESC) END,"
        f" Isnull(r.plgia,@Plgia),r.madot,r.hosoid,r.tt,r.soho"
        f");"
    )
    sql0 += (
        f" Select Top 1 @Hesoid=hesoid, @Baogiaid=baogiaid, @Plgia=plgia"
        f" From {schema}.tamqt Where maqt=@Maqt;"
    )
    sql0=(
        f" Select Top 1 @Baogiaid=baogiaid From {schema}.qt Where maqt=@Maqt;"
        f" IF LEN(@Baogiaid)<1 Select Top 1 @Baogiaid=baogiaid From dbo.qt Order By baogiaid Desc;"
        f" Select Top 1 @Hesoid=hesoid From {schema}.qt Where maqt=@Maqt;"
        f" IF LEN(@Hesoid)<1 Select Top 1 @Hesoid=hesoid From dbo.qt Order By baogiaid Desc;"
        f" Select Top 1 @Plgia=isnull(plgia,'dutoan') From {schema}.qt Where maqt=@Maqt;")
    sql0 += (
        f" UPDATE s SET"
        f" s.maqt=@Maqt, s.baogiaid=@Baogiaid, s.hesoid=@Hesoid, s.plgia=@Plgia,"
        f" s.madot=r.madot, s.tt=r.tt, s.hosoid=r.hosoid, s.soho=r.soho,"
        f" s.gxd=r.gxd, s.dautucty=r.dautucty, s.dautukhach=r.dautukhach,"
        f" s.ghichu=.ghichu, s.tinhtrang=r.tinhtrang, s.nguoilap=r.nguoilap,"
        f" s.ngaylap=r.ngaylap, s.inok=r.inok, s.ngaygan=r.ngaygan,"
        f" s.ngayhoancong=r.ngayhoancong, s.sodhn=r.ngayhoancong, s.hieudhn=r.hieudhn,"
        f" s.chisodhn=r.chisodhn, s.madshc=r.madshc, s.hesothauid=r.hesothauid"
        f" FROM {schema}.tamqt s INNER JOIN {schema}.qt r ON s.maqt=r.maqt;")
    sql0 += (
        f" IF @Gxd>0"
        f" Begin SELECT TOP 1 @Mauqt=maqt"
        f" FROM dbo.qt WHERE ((gxd=@Gxd) And (hesoid=@Hesoid)) ORDER BY lastupdate DESC,baogiaid DESC,maqt DESC;"
        f" If len(@Mauqt)<1 SELECT TOP 1 @Mauqt=maqt"
        f" FROM {schema}.qt WHERE ((gxd=@Gxd) And (hesoid=@Hesoid)) ORDER BY lastupdate DESC,baogiaid DESC,maqt DESC;"
        f" End")
    sql0 += (
        f" IF LEN(@Mauqt)>0 Begin EXEC {schema}.load_tamqt31 @Maqt, @Mauqt; EXEC {schema}.load_tamqt32 @Maqt, @Mauqt;"
        f" EXEC {schema}.load_tamqt33 @Maqt, @Mauqt; EXEC {schema}.load_tamqt34 @Maqt, @Mauqt;"
        f" EXEC {schema}.load_tamqt35 @Maqt, @Mauqt; End"
        f" ELSE Begin EXEC {schema}.load_tamqt31 @Maqt; EXEC {schema}.load_tamqt32 @Maqt;"
        f" EXEC {schema}.load_tamqt33 @Maqt; EXEC {schema}.load_tamqt34 @Maqt;"
        f" EXEC {schema}.load_tamqt35 @Maqt; End")
    sql0 += (
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


def creat_tinh_tamqt3x(schema = "web", qt3x = 1):
    # init prog
    if qt3x not in [1, 2, 3, 4]:
        return
    try:
        sql=(f"DROP PROC {schema}.tinh_tamqt3{qt3x}")
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
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


def tinh_tamqt35(schema = "web"):
    # init prog
    sql=(f"DROP PROC {schema}.tinh_tamqt35")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
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


def tinh_tamqt3x(schema = "web"):
    # init prog
    sql=(f"DROP PROC {schema}.tinh_tamqt3x")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
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


def tinh_tamqt(schema = "web"):
    # init prog
    sql=(f"DROP PROC {schema}.tinh_tamqt")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
        f"CREATE PROC {schema}.tinh_tamqt"
        f" @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan'"
        f" WITH ENCRYPTION AS"
        f" BEGIN SET NOCOUNT ON"
        f" BEGIN TRY DECLARE")
    # heso chiphi
    lds=["vl", "nc", "mtc", "tructiepkhac", "chung", "giantiepkhac",
           "thutinhtruoc", "khaosat", "thietke", "giamsat"]
    for heso in lds:
        sql += f" @{heso} DECIMAL(38,9)=1.0000,"
    # tong ket kinh phi
    lds = ["tongxaydung", "tailap", "congtrinh", "congtrinhtruocthue",
           "thuecongtrinh", "dautucty", "dautukhach", "tratruoc"]
    for chiphi in lds:
        sql += f" @{chiphi} DECIMAL(38,9)=1.0000,"
    # kinh phi chi tiet
    lds = [
        "Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Giantiep", "Giantiepkhac", "Chung", "Giaxaydung", "Thutinhtruoc", "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue", "Thuetongxaydung", "Tongxaydung", "Tailap", "Thuetailap", "Tailaptruocthue"]
    # phan ong nganh
    for chiphi in lds:
        sql += (
            f" @on{chiphi} DECIMAL(38,9)=1.0000,"
            f" @oc{chiphi} DECIMAL(38,9)=1.0000,")
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
    ods={"nc": "heso_nc", "mtc": "heso_mtc", "tructiepkhac": "heso_ttpk", "chung": "heso_cpchung",
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


def tinhlai_dotqt(schema = "web"):
    # init prog
    sql=(f"DROP PROC {schema}.tinhlai_dotqt")
    try:
        db.core().execute(sql)
    except:
        pass
    # main prog
    sql=(
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


def spQtgt(schema = "web"):
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


Csdl("pkd")
Qtgt("pkd")
