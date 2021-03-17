import json
from ttdl.mssql import Server


db = Server("pkh", "Ph0ngK3H0@ch", "192.168.24.4:1433", "PKHData")
# db.show_views()


class Csdl:
    def __init__(self, xac='pkh'):
        self.xac = xac
        self.kho = 'dbo'
        self.tao()

    def tao(self):
        self.tamqt3x(1)
        self.tamqt3x(2)
        self.tamqt3x(3)
        self.tamqt3x(4)
        self.tamqt3x(5)
        self.tamqt()
        self.tttt_qt01()

    def tamqt(self):
        try:
            sql = (f"DROP TABLE {self.xac}.tamqt")
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE TABLE {self.xac}.tamqt ("
            f"mauqt NVARCHAR(50) NULL DEFAULT '',"
            f"maqt NVARCHAR(50) NOT NULL DEFAULT '',"
            # dot
            f"madot NVARCHAR(50) NULL,"
            f"nam INT NULL,"
            f"quy NVARCHAR(50) NULL,"
            f"plqt NVARCHAR(50) NULL,"
            f"sodot NVARCHAR(50) NULL,"
            f"nhathauid INT NULL,"
            # qt
            f"tt INT NULL,"
            f"soho INT NULL,"
            f"baogiaid INT NULL,"
            f"plgia NVARCHAR(50) DEFAULT 'dutoan',"
            f"hesoid INT NULL,"
            f"vlcai DECIMAL(28,6) NULL,"
            f"nccai DECIMAL(28,6) NULL,"
            f"mtccai DECIMAL(28,6) NULL,"
            f"vlnganh DECIMAL(28,6) NULL,"
            f"ncnganh DECIMAL(28,6) NULL,"
            f"mtcnganh DECIMAL(28,6) NULL,"
            f"gxd1kq1 DECIMAL(28,6) NULL,"
            f"gxd1kq2 DECIMAL(28,6) NULL,"
            f"gxd2kq1 DECIMAL(28,6) NULL,"
            f"gxd2kq2 DECIMAL(28,6) NULL,"
            f"tca DECIMAL(28,6) NULL,"
            f"tcb DECIMAL(28,6) NULL,"
            f"gxd DECIMAL(28,6) NULL,"
            f"dautucty DECIMAL(28,6) NULL,"
            f"dautukhach DECIMAL(28,6) NULL,"
            f"ghichu NVARCHAR(255), "
            f"tinhtrang NVARCHAR(50) NULL,"
            f"nguoilap NVARCHAR(50) NULL,"
            f"ngaylap DATETIME NULL,"
            f"inok BIT,"
            # hoancong
            f"ngaygan DATETIME NULL,"
            f"ngayhoancong DATETIME NULL,"
            f"sodhn NVARCHAR(50) NULL,"
            f"hieudhn NVARCHAR(50) NULL,"
            f"chisodhn DECIMAL(28,6) NULL,"
            f"madshc NVARCHAR(50) NULL,"
            # qtt
            f"hesothauid INT NULL,"
            f"tvlcai DECIMAL(28,6) NULL,"
            f"tnccai DECIMAL(28,6) NULL,"
            f"tmtccai DECIMAL(28,6) NULL,"
            f"tvlnganh DECIMAL(28,6) NULL,"
            f"tncnganh DECIMAL(28,6) NULL,"
            f"tmtcnganh DECIMAL(28,6) NULL,"
            f"tgxd1kq1 DECIMAL(28,6) NULL,"
            f"tgxd1kq2 DECIMAL(28,6) NULL,"
            f"sldh INT NULL,"
            f"dhn15 INT NULL,"
            f"dhn25 INT NULL,"
            f"dhn50 INT NULL,"
            f"dhn80 INT NULL,"
            f"dhn100 INT NULL,"
            f"slong DECIMAL(28,6) NULL,"
            f"ong25 DECIMAL(28,6) NULL,"
            f"ong34 DECIMAL(28,6) NULL,"
            f"ong50 DECIMAL(28,6) NULL,"
            f"ong100 DECIMAL(28,6) NULL,"
            f"ong125 DECIMAL(28,6) NULL,"
            f"ong150 DECIMAL(28,6) NULL,"
            f"ong200 DECIMAL(28,6) NULL,"
            f"ong250 DECIMAL(28,6) NULL,"
            f"slcat DECIMAL(28,6) NULL,"
            f"tiencat DECIMAL(28,6) NULL,"
            f"slcatnhua DECIMAL(28,6) NULL,"
            f"tiencatnhua DECIMAL(28,6) NULL,"
            f"tienvlk DECIMAL(28,6) NULL,"
            f"nc DECIMAL(28,6) NULL,"
            f"tiennc DECIMAL(28,6) NULL,"
            f"mtc DECIMAL(28,6) NULL,"
            f"tienmtc DECIMAL(28,6) NULL,"
            f"cptt DECIMAL(28,6) NULL,"
            f"cong DECIMAL(28,6) NULL,"
            f"thuevat DECIMAL(28,6) NULL,"
            f"trigiaqtt DECIMAL(28,6) NULL,"
            f"ghichuqtt NVARCHAR(255),"
            f"tinhtrangqtt NVARCHAR(50) NULL,"
            # hoso
            f"hosoid INT NULL,"
            f"mahoso NVARCHAR(50) NULL,"
            f"sohoso NVARCHAR(50) NULL,"
            f"khachhang NVARCHAR(255),"
            f"diachikhachhang NVARCHAR(255),"
            f"maq INT NULL,"
            f"maqp INT NULL,"
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
            f"maqtgt NVARCHAR(50) NULL,"
            f"tt INT NULL,"
            f"chiphiid INT NULL,")
        if id in [5]:
            sql += (
                f"oc_sl DECIMAL(28,6) NULL,"
                f"on_sl DECIMAL(28,6) NULL,"
                f"gia DECIMAL(28,6) NULL,"
                f"oc_tien DECIMAL(28,6) NULL,"
                f"on_tien DECIMAL(28,6) NULL,")
        else:
            sql += (
                f"soluong DECIMAL(28,6) NULL,"
                f"giavl DECIMAL(28,6) NULL,"
                f"gianc DECIMAL(28,6) NULL,"
                f"giamtc DECIMAL(28,6) NULL,"
                f"tienvl DECIMAL(28,6) NULL,"
                f"tiennc DECIMAL(28,6) NULL,"
                f"tienmtc DECIMAL(28,6) NULL,")
        sql += (
            f"maqt NVARCHAR(50) NULL,"
            f"mauqtgt NVARCHAR(50) NOT NULL DEFAULT '',"
            f"CONSTRAINT {self.xac}_tamqt3{id}_pk PRIMARY KEY (mauqtgt));"
        )
        try:
            db.core().execute(sql)
        except:
            pass

    def tttt_qt01(self):
        sql = (f"DROP VIEW {self.xac}.tttt_qt01")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE VIEW {self.xac}.tttt_qt01 AS "
            f"SELECT Sum(t.soluong) AS sl, Sum(t.tienvl) AS vl, Sum(t.tiennc) AS nc, Sum(t.tienmtc) AS mtc,"
            f"t.tinhtrang, t.phanloai, t.giatripl, t.maqt, Sum(t.tiennc) + Sum(t.tienmtc) AS ncmtc FROM ("
            f"SELECT qt.maqt, qt.soluong, qt.tienvl, qt.tiennc, qt.tienmtc,pl.tinhtrang, pl.phanloai, pl.giatripl "
            f"FROM {self.xac}.tamqt31 qt RIGHT JOIN {self.kho}.plchiphi pl ON qt.chiphiid = pl.chiphiid "
            f"WHERE qt.chiphiid>0 UNION ALL "
            f"SELECT qt.maqt, qt.soluong, qt.tienvl, qt.tiennc, qt.tienmtc,pl.tinhtrang, pl.phanloai, pl.giatripl "
            f"FROM {self.xac}.tamqt32 qt RIGHT JOIN {self.kho}.plchiphi pl ON qt.chiphiid = pl.chiphiid "
            f"WHERE qt.chiphiid>0 UNION ALL "
            f"SELECT qt.maqt, qt.soluong, qt.tienvl, qt.tiennc, qt.tienmtc,pl.tinhtrang, pl.phanloai, pl.giatripl "
            f"FROM {self.xac}.tamqt33 qt RIGHT JOIN {self.kho}.plchiphi pl ON qt.chiphiid = pl.chiphiid "
            f"WHERE qt.chiphiid>0 UNION ALL "
            f"SELECT qt.maqt, qt.soluong, qt.tienvl, qt.tiennc, qt.tienmtc,pl.tinhtrang, pl.phanloai, pl.giatripl "
            f"FROM {self.xac}.tamqt34 qt RIGHT JOIN {self.kho}.plchiphi pl ON qt.chiphiid = pl.chiphiid "
            f"WHERE qt.chiphiid>0) AS t GROUP BY t.tinhtrang, t.phanloai, t.giatripl, t.maqt; ")
        try:
            db.core().execute(sql)
        except:
            pass


class Qtgt:
    def __init__(self, xac='pkh'):
        self.xac = xac
        self.kho = 'dbo'
        # self.tao()

    def tao(self):
        self.lamtronso()
        self.giavl()
        self.gianc()
        self.giamtc()
        self.giatl()
        self.nap_qt3x(1)
        self.nap_qt3x(2)
        self.nap_qt3x(3)
        self.nap_qt3x(4)
        self.nap_qt3x(5)
        self.nap_qtgt()
        self.tinh_qt3x(1)
        self.tinh_qt3x(2)
        self.tinh_qt3x(3)
        self.tinh_qt3x(4)
        self.tinh_qt3x(5)
        self.tinh_qtgt()
        self.luu_qt3x(1)
        self.luu_qt3x(2)
        self.luu_qt3x(3)
        self.luu_qt3x(4)
        self.luu_qt3x(5)
        self.luu_qtgt()
        self.tinhlai_dot_qtgt()

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

    def nap_qt3x(self, i=1):
        if i not in [1, 2, 3, 4, 5]:
            return
        sql = (f"DROP PROC {self.xac}.nap_qt3{i}")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.nap_qt3{i} "
            f"@Maqt NVARCHAR(255),@Mauqt NVARCHAR(255)='' "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Set @Maqt=Isnull(CAST(@Maqt as NVARCHAR(255)),''); "
            f"IF DataLength(@Maqt)<1 RETURN; "
            f"Set @Mauqt=Isnull(CAST(@Mauqt as NVARCHAR(255)),''); ")
        if i in [1, 2, 3, 4]:
            cs = ['tt', 'maqt', 'mauqtgt', 'tienvl', 'tiennc', 'tienmtc',
                  'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc']
            cr = ['(ROW_NUMBER() OVER(ORDER BY tt,chiphiid))', '@Maqt', 'maqtgt',
                  'trigiavl', 'trigianc', 'trigiamtc', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc']
        else:
            cs = ['tt', 'maqt', 'mauqtgt', 'gia',
                  'oc_sl', 'on_sl', 'oc_tien', 'on_tien', 'chiphiid']
            cr = ['(ROW_NUMBER() OVER(ORDER BY tt,chiphiid))', '@Maqt', 'maqtgt',
                  'dongia', 'sl1', 'sl2', 'trigia1', 'trigia2', 'chiphiid']
        cs = ','.join(cs.copy())
        cr = ','.join(cr.copy())
        sql += (
            f"IF OBJECT_ID('tempdb..#bdl') IS NOT NULL DROP TABLE #bdl; "
            f"SELECT top 1 maqtgt,{cs} INTO #bdl FROM {self.xac}.tamqt3{i} "
            f"WHERE maqt='sao ma co'; "
            # load Mauqt
            f"IF DataLength(@Mauqt)>0 Begin "
            f"INSERT INTO #bdl ({cs}) SELECT {cr} FROM {self.xac}.qt3{i} "
            f"WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl ({cs}) SELECT {cr} FROM {self.kho}.qt3{i} "
            f"WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; End "
            # load Maqt
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl ({cs}) SELECT {cr} FROM {self.xac}.qt3{i} "
            f"WHERE maqt=@Maqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl ({cs}) SELECT {cr} FROM {self.kho}.qt3{i} "
            f"WHERE maqt=@Maqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            # load default
            f"If Not Exists (Select * From #bdl) "
            f"Begin INSERT INTO #bdl ({cs}) SELECT {cs} FROM {self.xac}.tamqt3{i} "
            f"WHERE chiphiid>0 ORDER BY tt,chiphiid; Set @Mauqt='moi'; End "
            f"If Not Exists (Select * From #bdl) "
            f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{i} Order By lastupdate Desc; "
            f"INSERT INTO #bdl ({cs}) SELECT {cr} FROM {self.kho}.qt3{i} "
            f"WHERE chiphiid>0 AND maqt=@Mauqt ORDER BY tt,chiphiid; Set @Mauqt='moi'; End "
            f"If Not Exists (Select * From #bdl) RETURN; ")
        if i in [1, 2, 3, 4]:
            sql += f"IF @Mauqt='moi' UPDATE #bdl SET soluong=0; "
        else:
            sql += f"IF @Mauqt='moi' UPDATE #bdl SET oc_sl=0,on_sl=0; "
        # up maqtgt
        sql += (
            f"UPDATE #bdl SET maqt=@Maqt,"
            f"maqtgt=Case When tt<10 Then CONCAT(@Maqt,{i}0,tt) Else CONCAT(@Maqt,{i},tt) End "
            f"WHERE tt>0; ")
        # up to tamqt3x
        if i in [1, 2, 3, 4]:
            cs = ['tt', 'maqt', 'maqtgt', 'mauqtgt', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'tienvl', 'tiennc', 'tienmtc']
        else:
            cs = ['tt', 'maqt', 'maqtgt', 'mauqtgt', 'chiphiid',
                  'gia', 'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
        du = ','.join(map(lambda k: f"s.{k}=r.{k}", cs))
        cr = ','.join(map(lambda k: f"r.{k}", cs))
        cs = ','.join(cs.copy())
        sql += (
            f"MERGE {self.xac}.tamqt3{i} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
            f"WHEN MATCHED THEN UPDATE SET {du} "
            f"WHEN NOT MATCHED THEN INSERT ({cs}) VALUES ({cr}) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END; "
        try:
            db.core().execute(sql)
        except:
            pass

    def nap_qtgt(self):
        sql0 = ''
        sql = (f"DROP PROC {self.xac}.nap_qtgt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.nap_qtgt "
            f"@Maqt NVARCHAR(255),@Mauqt NVARCHAR(255)='',@Gxd DECIMAL(38,9)=0.0 "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Set @Maqt=Isnull(CAST(@Maqt as NVARCHAR(255)),''); "
            f"IF DataLength(@Maqt)<1 RETURN; "
            f"Set @Mauqt=Isnull(CAST(@Mauqt as NVARCHAR(255)),''); "
            f"Set @Gxd=Isnull(CAST(@Gxd as DECIMAL(38,9)),0.0); "
            f"Declare @Maq INT=26,@Status NVARCHAR(255); ")
        # data init
        refs = ['madot', 'hosoid', 'tt', 'soho', 'tinhtrang', 'ghichu',
                'hesothauid', 'tinhtrangqtt', 'ghichuqtt']
        cs = ['baogiaid', 'hesoid', 'plgia', 'sodhn', 'hieudhn', 'chisodhn', 'madshc',
              'vlcai', 'nccai', 'mtccai', 'gxd1kq1', 'gxd1kq2', 'vlnganh', 'ncnganh', 'mtcnganh', 'gxd2kq1', 'gxd2kq2',
              'gxd', 'dautucty', 'dautukhach', 'nguoilap', 'ngaylap', 'ngaygan', 'ngayhoancong',
              'tvlcai', 'tnccai', 'tmtccai', 'tvlnganh', 'tncnganh', 'tmtcnganh', 'tgxd1kq1', 'tgxd1kq2',
              'sldh', 'dhn15', 'dhn25', 'dhn50', 'dhn80', 'dhn100',
              'slong', 'ong25', 'ong34', 'ong50', 'ong100', 'ong125', 'ong150', 'ong200', 'ong250',
              'slcat', 'tiencat', 'slcatnhua', 'tiencatnhua', 'tienvlk', 'nc', 'tiennc', 'mtc', 'tienmtc',
              'cptt', 'cong', 'thuevat', 'trigiaqtt']
        cr = ','.join(refs+cs)
        sql += (
            f"IF OBJECT_ID('tempdb..#bdl') IS NOT NULL DROP TABLE #bdl; "
            f"SELECT top 1 maqt,mauqt,{cr} INTO #bdl FROM {self.xac}.tamqt WHERE maqt='Sao ma co'; "
            # load gxd
            f"IF @Gxd>0 Begin "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl (maqt,mauqt,{cr}) SELECT TOP 1 @Maqt,maqt,{cr} "
            f"FROM {self.xac}.qt WHERE gxd=@Gxd Order By lastupdate Desc, maqt Desc; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl (maqt,mauqt,{cr}) SELECT TOP 1 @Maqt,maqt,{cr} "
            f"FROM {self.kho}.qt WHERE gxd=@Gxd Order By lastupdate Desc, maqt Desc; End "
            # load mauqt
            f"IF DataLength(@Mauqt)>0 Begin "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl (maqt,mauqt,{cr}) SELECT TOP 1 @Maqt,maqt,{cr} "
            f"FROM {self.xac}.qt WHERE maqt=@Mauqt; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl (maqt,mauqt,{cr}) SELECT TOP 1 @Maqt,maqt,{cr} "
            f"FROM {self.kho}.qt WHERE maqt=@Mauqt; End "
            # load maqt
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl (maqt,mauqt,{cr}) SELECT TOP 1 @Maqt,'moi',{cr} "
            f"FROM {self.xac}.qt WHERE maqt=@Maqt; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl (maqt,mauqt,{cr}) SELECT TOP 1 @Maqt,'moi',{cr} "
            f"FROM {self.kho}.qt WHERE maqt=@Maqt; "
            f"If Not Exists (Select * From #bdl) RETURN; "
            # up maqt
            f"UPDATE #bdl SET maqt=@Maqt,"
            f"baogiaid=Case When Isnull(baogiaid,0)<1 Then (Select Top 1 baogiaid From {self.kho}.baogiachiphi "
            f"Order By baogiaid DESC) Else baogiaid End,"
            f"hesoid=Case When Isnull(hesoid,0)<1 Then (Select Top 1 hesoid From {self.kho}.hesochiphi "
            f"Order By hesoid DESC) Else hesoid End,"
            f"plgia=Isnull(plgia,'dutoan'); ")
        # up qtgt ref
        du = ','.join(map(lambda k: f"s.{k}=r.{k}", refs))
        sql += (
            f"UPDATE #bdl SET {du} "
            f"FROM #bdl s INNER JOIN {self.xac}.qt r ON s.maqt=r.maqt; ")
        # up to tamqt
        cs += ['maqt', 'mauqt'] + refs
        du = ','.join(map(lambda k: f"s.{k}=r.{k}", cs))
        cr = ','.join(map(lambda k: f"r.{k}", cs))
        cs = ','.join(cs.copy())
        sql0 += (
            f"MERGE {self.xac}.tamqt AS s USING #bdl AS r ON s.maqt=r.maqt "
            f"WHEN MATCHED THEN UPDATE SET {du} "
            f"WHEN NOT MATCHED THEN INSERT ({cs}) VALUES ({cr}) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; "
            # up hoso
            f"UPDATE s SET "
            f"s.sohoso=r.sohoso,s.khachhang=r.khachhang,s.diachikhachhang=r.diachikhachhang,"
            f"s.maq=r.maq,s.maqp=r.maqp "
            f"FROM {self.xac}.tamqt s INNER JOIN {self.kho}.hoso r ON s.hosoid=r.hosoid; "
            # up dot
            f"UPDATE s SET "
            f"s.nam=r.nam,s.plqt=r.plqt,s.quy=r.quy,s.sodot=r.sodot,s.nhathauid=r.nhathauid "
            f"FROM {self.xac}.tamqt s INNER JOIN {self.kho}.dot r ON s.madot=r.madot; ")
        # nap qt3x
        sql0 += (
            f"Select top 1 @Mauqt=Isnull(mauqt,''), @Status=Isnull(tinhtrang,'') From {self.xac}.tamqt; "
            f"EXEC {self.xac}.nap_qt31 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt32 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt33 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt34 @Maqt, @Mauqt; "
            f"EXEC {self.xac}.nap_qt35 @Maqt, @Mauqt; ")
        # up chiphikhuvuc
        sql0 += (
            f"IF @Status Not Like '%fin%' BEGIN "
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
            f"FROM {self.xac}.tamqt34 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; "
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt35 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; END ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def tinh_qt3x(self, i=1):
        if i not in [1, 2, 3, 4, 5]:
            return
        sql = (f"DROP PROC {self.xac}.tinh_qt3{i}")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.tinh_qt3{i} "
            f"@Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(255)='dutoan' "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Set @Plgia=Isnull(CAST(@Plgia as NVARCHAR(255)),''); "
            f"Set @Hesoid=Isnull(CAST(@Hesoid as INT),0); "
            f"Set @Baogiaid=Isnull(CAST(@Baogiaid as INT),0); "
            f"IF (@Baogiaid<1) OR (@Hesoid<1) OR (DataLength(@Plgia)<1) RETURN; "
            f"Declare @Maqt NVARCHAR(255)=''; "
            f"Select Top 1 @Maqt=maqt From {self.xac}.tamqt; "
            f"IF DataLength(Isnull(@Maqt,''))<1 Return; ")
        if i in [1, 2, 3, 4]:
            sql += (
                f"IF OBJECT_ID('tempdb..#bdl') IS NOT NULL DROP TABLE #bdl; "
                f"SELECT maqt,maqtgt,chiphiid,giavl,gianc,giamtc,tienvl,tiennc,tienmtc, "
                f"IDENTITY(INT, 1, 1) AS tt,abs(isnull(soluong,0)) as soluong "
                f"INTO #bdl FROM {self.xac}.tamqt3{i} WHERE chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) RETURN; "
                # tinh toan lai gia
                f"UPDATE #bdl SET "
                f"giavl=dbo.giavl(chiphiid,@Baogiaid,@Plgia),"
                f"gianc=dbo.gianc(chiphiid,@Baogiaid,@Plgia),"
                f"giamtc=dbo.giamtc(chiphiid,@Baogiaid,@Plgia),"
                f"maqt=@Maqt,"
                f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{i}0,tt) Else CONCAT(@Maqt,{i},tt) End); "
                # lam tron
                f"UPDATE #bdl SET "
                f"soluong=dbo.lamtronso(soluong,6),"
                f"giavl=dbo.lamtronso(giavl,3),"
                f"gianc=dbo.lamtronso(gianc,3),"
                f"giamtc=dbo.lamtronso(giamtc,3); "
                # tinh tien
                f"UPDATE #bdl SET "
                f"tienvl=dbo.lamtronso(soluong*giavl,0),"
                f"tiennc=dbo.lamtronso(soluong*gianc,0),"
                f"tienmtc=dbo.lamtronso(soluong*giamtc,0); ")
        else:
            sql += (
                f"SELECT maqt,maqtgt,chiphiid,gia,oc_tien,on_tien, "
                f"IDENTITY(INT, 1, 1) AS tt,abs(isnull(oc_sl,0)) as oc_sl,abs(isnull(on_sl,0)) as on_sl "
                f"INTO #bdl FROM {self.xac}.tamqt3{i} WHERE chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) RETURN; "
                # tinh toan lai gia
                f"UPDATE #bdl SET "
                f"gia=dbo.giatl(chiphiid,@Baogiaid,@Plgia),"
                f"maqt=@Maqt,"
                f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{i}0,tt) Else CONCAT(@Maqt,{i},tt) End); "
                # lam tron
                f" UPDATE #bdl SET "
                f" oc_sl=dbo.lamtronso(oc_sl,3),"
                f" on_sl=dbo.lamtronso(on_sl,3),"
                f" gia=dbo.lamtronso(gia,0); "
                # tinh tien
                f"UPDATE #bdl SET "
                f"oc_tien=(Case When @Hesoid<20200827 Then (dbo.lamtronso(oc_sl*gia/1000,0)*1000) Else dbo.lamtronso(oc_sl*gia,0) End),"
                f"on_tien=(Case When @Hesoid<20200827 Then (dbo.lamtronso(on_sl*gia/1000,0)*1000) Else dbo.lamtronso(on_sl*gia,0) End); ")
        # test
        sql += f"Select 'qt3{i} bdl' as test,* from #bdl; "
        # up to tami
        if i in [1, 2, 3, 4]:
            cs = ['tt', 'maqt', 'maqtgt', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'tienvl', 'tiennc', 'tienmtc']
        else:
            cs = ['tt', 'maqt', 'maqtgt', 'chiphiid',
                  'gia', 'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        cr = map(lambda k: f"r.{k}", cs)
        sql += (
            f"MERGE {self.xac}.tamqt3{i} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
            f"WHEN MATCHED THEN UPDATE SET {','.join(du)} "
            f"WHEN NOT MATCHED THEN INSERT ({','.join(cs)}) VALUES ({','.join(cr)}) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def tinh_qtgt(self):
        sql = (f"DROP PROC {self.xac}.tinh_qtgt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.tinh_qtgt "
            f"@Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(255)='dutoan' "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Set @Plgia=Isnull(CAST(@Plgia as NVARCHAR(255)),''); "
            f"Set @Hesoid=Isnull(CAST(@Hesoid as INT),0); "
            f"Set @Baogiaid=Isnull(CAST(@Baogiaid as INT),0); "
            f"IF (@Baogiaid<1) OR (@Hesoid<1) OR (DataLength(@Plgia)<1) RETURN; "
            f"DECLARE ")
        # heso chiphi
        lds = [
            "vl", "nc", "mtc", "tructiepkhac", "chung", "giantiepkhac",
            "thutinhtruoc", "khaosat", "thietke", "giamsat",
            "tongxaydung", "tailap", "congtrinh", "congtrinhtruocthue",
            "thuecongtrinh", "dautucty", "dautukhach", "tratruoc"]
        for chiphi in lds:
            sql += f"@{chiphi} DECIMAL(38,9),"
        # kinh phi chi tiet
        lds = [
            "Zvl", "Znc", "Zmtc", "Vl", "Nc", "Mtc", "Zvlncmtc", "Tructiepkhac", "Tructiep", "Giantiep", "Giantiepkhac",
            "Chung", "Giaxaydung", "Thutinhtruoc", "Xaydungtruocthue", "KhaosatThietke", "Giamsat", "Tongxaydungtruocthue",
            "Thuetongxaydung", "Tongxaydung", "Tailap", "Thuetailap", "Tailaptruocthue"]
        # phan ong nganh
        for chiphi in lds:
            sql += f"@on{chiphi} DECIMAL(38,9),@oc{chiphi} DECIMAL(38,9),"
        sql += f"@Plqt NVARCHAR(50); "
        # tinh tamqtx
        sql += (
            f"EXEC {self.xac}.tinh_qt31 @Baogiaid, @Hesoid, @Plgia; "
            f"EXEC {self.xac}.tinh_qt32 @Baogiaid, @Hesoid, @Plgia; "
            f"EXEC {self.xac}.tinh_qt33 @Baogiaid, @Hesoid, @Plgia; "
            f"EXEC {self.xac}.tinh_qt34 @Baogiaid, @Hesoid, @Plgia; "
            f"EXEC {self.xac}.tinh_qt35 @Baogiaid, @Hesoid, @Plgia; ")
        # load Zvl, Znc, Zmtc, Tailap
        sql += (
            f"SELECT @ocZvl=Sum(zVl), @ocZnc=Sum(zNc), @ocZmtc=Sum(zMtc) FROM "
            f"(Select Isnull(sum(tienvl),0) As zVl, Isnull(sum(tiennc),0) As zNc, Isnull(sum(tienmtc),0) As zMtc "
            f"From {self.xac}.tamqt31 UNION ALL "
            f"Select Isnull(sum(tienvl),0) As zVl, Isnull(sum(tiennc),0) As zNc, Isnull(sum(tienmtc),0) As zMtc "
            f"From {self.xac}.tamqt32) AS U; "
            f"SELECT @ocTailap=Isnull(sum(oc_tien),0) From {self.xac}.tamqt35; ")
        sql += (
            f"SELECT @onZvl=Sum(zVl), @onZnc=Sum(zNc), @onZmtc=Sum(zMtc) FROM "
            f"(Select Isnull(sum(tienvl),0) As zVl, Isnull(sum(tiennc),0) As zNc, Isnull(sum(tienmtc),0) As zMtc "
            f"From {self.xac}.tamqt33 UNION ALL "
            f"Select Isnull(sum(tienvl),0) As zVl, Isnull(sum(tiennc),0) As zNc, Isnull(sum(tienmtc),0) As zMtc "
            f"From {self.xac}.tamqt34) AS U; "
            f"SELECT @onTailap=Isnull(sum(on_tien),0) From {self.xac}.tamqt35; ")
        # load hesochiphi
        ods = {
            "nc": "heso_nc", "mtc": "heso_mtc", "tructiepkhac": "heso_ttpk", "chung": "heso_cpchung",
            "giantiepkhac": "giantiepkhac", "thutinhtruoc": "heso_thunhaptt",
            "khaosat": "heso_khaosat", "thietke": "heso_thietke", "giamsat": "heso_gstc"}
        sql += f"Select "
        for heso in ods:
            sql += f"@{heso}=Isnull({ods[heso]},0),"
        sql += f"@vl=1.0000 From {self.kho}.hesochiphi Where hesoid=@Hesoid; "
        # tinh chi phi
        lds = ["on", "oc"]
        for phui in lds:
            sql += (
                f"Set @{phui}Vl= {self.kho}.lamtronso(@{phui}Zvl * @vl,0); "
                f"Set @{phui}Nc= {self.kho}.lamtronso(@{phui}Znc * @nc,0); "
                f"Set @{phui}Mtc= {self.kho}.lamtronso(@{phui}Zmtc * @mtc,0); "
                f"Set @{phui}Zvlncmtc= (@{phui}Vl + @{phui}Nc + @{phui}Mtc); "
                f"Set @{phui}Tructiepkhac= {self.kho}.lamtronso(@{phui}Zvlncmtc * @tructiepkhac,0); "
                f"Set @{phui}Tructiep= (@{phui}Zvlncmtc + @{phui}Tructiepkhac); "
                f"Set @{phui}Chung= {self.kho}.lamtronso(@{phui}Tructiep * @chung,0); "
                f"Set @{phui}Giantiepkhac= {self.kho}.lamtronso(@{phui}Tructiep * @giantiepkhac,0); "
                f"Set @{phui}Giantiep= (@{phui}Chung + @{phui}Giantiepkhac); "
                f"Set @{phui}Giaxaydung= (@{phui}Giantiep + @{phui}Tructiep); "
                f"Set @{phui}Thutinhtruoc= {self.kho}.lamtronso(@{phui}Giaxaydung * @thutinhtruoc,0); "
                f"Set @{phui}Xaydungtruocthue= (@{phui}Giaxaydung + @{phui}Thutinhtruoc); "
                f"Set @{phui}KhaosatThietke= {self.kho}.lamtronso(@{phui}Xaydungtruocthue * @khaosat * @thietke,0); "
                f"Set @{phui}Giamsat= {self.kho}.lamtronso(@{phui}Xaydungtruocthue * @giamsat,0); "
                f"Set @{phui}Tongxaydungtruocthue= (@{phui}Xaydungtruocthue + @{phui}KhaosatThietke + @{phui}Giamsat); "
                f"Set @{phui}Thuetongxaydung= {self.kho}.lamtronso(@{phui}Tongxaydungtruocthue * 0.1,0); "
                f"Set @{phui}Tongxaydung= (@{phui}Tongxaydungtruocthue + @{phui}Thuetongxaydung); "
                # Tailap
                f"Set @{phui}Tailaptruocthue= {self.kho}.lamtronso(@{phui}Tailap * 100/110,0); "
                f"Set @{phui}Thuetailap= (@{phui}Tailap - @{phui}Tailaptruocthue); ")
        sql += (
            f"Set @tongxaydung= (@onTongxaydung + @ocTongxaydung); "
            f"Set @tailap= (@onTailap + @ocTailap); "
            f"Set @congtrinh= (@tongxaydung + @tailap); "
            f"Set @congtrinhtruocthue= {self.kho}.lamtronso(@congtrinh*100/110,0); "
            f"Set @thuecongtrinh= (@congtrinh-@congtrinhtruocthue); "
            f"Select @Plqt=Isnull(maqt, ''), @Dautucty=dautucty From {self.xac}.tamqt; "
            f"IF @Plqt LIKE '%MP%' Set @dautucty= {self.kho}.lamtronso(@congtrinh, 0); "
            f"ELSE If @dautucty is null Set @dautucty= (@onTongxaydung + @onTailap); "
            f"Set @dautukhach= (@congtrinh - @dautucty); ")
        sql += (
            f"UPDATE {self.xac}.tamqt SET "
            f"plgia = Isnull(@Plgia, 'dutoan'),"
            f"vlcai=@ocZvl,"
            f"nccai=@ocZnc,"
            f"mtccai=@ocZmtc,"
            f"vlnganh=@onZvl,"
            f"ncnganh=@onZnc,"
            f"mtcnganh=@onZmtc,"
            f"gxd1kq1=@ocTongxaydung,"
            f"gxd2kq1=@ocTailap,"
            f"gxd1kq2=@onTongxaydung,"
            f"gxd2kq2=@onTailap,"
            f"gxd=@congtrinh,"
            f"dautucty= @dautucty,"
            f"dautukhach= @dautukhach,"
            # tttt_qt01 viev
            f"dhn15= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=15),0),"
            f"dhn50= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=50),0),"
            f"dhn80= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=80),0),"
            f"dhn100= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=100),0),"
            f"sldh= Isnull((Select sum(sl) From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='DHN'),0),"
            # tong hop ong
            f"ong25= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=25),0),"
            f"ong34= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=34),0),"
            f"ong50= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=50),0),"
            f"ong100= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=100),0),"
            f"ong125= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=125),0),"
            f"ong150= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=150),0),"
            f"ong200= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=200),0),"
            f"ong250= Isnull((Select sl From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=250),0),"
            f"slong= Isnull((Select sum(sl) From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Ong'),0),"
            # tong hop cat
            f"slcat= Case When @Hesoid>=20200827"
            f"Then Isnull((Select sum(sl) From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
            f"Else Isnull((Select sum(sl) From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Cat'),0) End,"
            f"tiencat= Case When @Hesoid>=20200827"
            f"Then Isnull((Select sum(vl) From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
            f"Else Isnull((Select sum(vl) From {self.xac}.tttt_qt01 "
            f"Where tinhtrang='Moi' AND phanloai='Cat'),0) End; ")
        sql += (
            f"If @Baogiaid>0 Update {self.xac}.tamqt SET baogiaid=@Baogiaid; "
            f"If @Hesoid>0 Update {self.xac}.tamqt SET hesoid=@Hesoid; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def luu_qt3x(self, i=1):
        if i not in [1, 2, 3, 4, 5]:
            return
        sql = (f"DROP PROC {self.xac}.luu_qt3{i}")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.luu_qt3{i} "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Declare @Maqt NVARCHAR(255)='',@Status NVARCHAR(255)='',@Soluong DECIMAL(38,9); "
            f"Select Top 1 @Maqt=maqt,@Status=tinhtrang From {self.xac}.tamqt; "
            f"Set @Maqt=Isnull(CAST(@Maqt as NVARCHAR(255)),''); "
            f"Set @Status=Isnull(CAST(@Status as NVARCHAR(255)),''); "
            f"IF (DataLength(@Maqt)<1) OR (@Status like '%fin%') RETURN; "
            f"IF OBJECT_ID('tempdb..#bdl') IS NOT NULL DROP TABLE #bdl; ")
        # load tamdulieu
        if i in [1, 2, 3, 4]:
            cr = ['IDENTITY(INT, 1, 1) AS tt', 'maqt', 'maqtgt', 'chiphiid',
                  'soluong', 'giavl', 'gianc', 'giamtc', 'tienvl', 'tiennc', 'tienmtc']
            sql += (
                f"SELECT {','.join(cr)} INTO #bdl FROM {self.xac}.tamqt3{i} "
                f"WHERE maqt=@Maqt And chiphiid>0 ORDER BY tt,chiphiid; "
                f"Select @Soluong=Isnull(sum(soluong),0) From #bdl; "
                f"If @soluong<=0 DELETE FROM #bdl; "
                f"If Exists (Select * From #bdl) UPDATE #bdl SET maqt=@Maqt,"
                f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{i}0,tt) Else CONCAT(@Maqt,{i},tt) End); ")
        else:
            cr = ['IDENTITY(INT, 1, 1) AS tt', 'maqt', 'maqtgt', 'chiphiid',
                  'gia', 'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
            sql += (
                f"SELECT {','.join(cr)} INTO #bdl FROM {self.xac}.tamqt3{i} "
                f"WHERE maqt=@Maqt And chiphiid>0 And (oc_sl>0 Or on_sl>0) ORDER BY tt,chiphiid; "
                f"If Exists (Select * From #bdl) UPDATE #bdl SET maqt=@Maqt,"
                f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{i}0,tt) Else CONCAT(@Maqt,{i},tt) End); ")
        # luu i
        if i in [1, 2, 3, 4]:
            cr = ['tt', 'maqt', 'maqtgt', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'tienvl', 'tiennc', 'tienmtc']
            cs = ['tt', 'maqt', 'maqtgt',  'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'trigiavl', 'trigianc', 'trigiamtc']
        else:
            cr = ['tt', 'maqt', 'maqtgt', 'chiphiid',
                  'gia', 'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
            cs = ['tt', 'maqt', 'maqtgt', 'chiphiid',
                  'dongia', 'sl1', 'sl2', 'trigia1', 'trigia2']
        # xoa rec thua
        sql += (
            f"If Exists (Select * From #bdl) DELETE FROM {self.xac}.qt3{i} "
            f"WHERE maqt=@Maqt AND maqtgt NOT IN (Select maqtgt From #bdl) "
            f"ELSE DELETE FROM {self.xac}.qt3{i} WHERE maqt=@Maqt; ")
        # update rec co san
        du = map(lambda s, r: f"s.{s}=r.{r}", cs, cr)
        sql += (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate() "
            f"FROM {self.xac}.qt3{i} s INNER JOIN #bdl r ON s.maqtgt=r.maqtgt; ")
        # add rec chua co
        cr = map(lambda s: f"r.{s}", cr.copy())
        sql += (
            f"INSERT INTO {self.xac}.qt3{i} ({','.join(cs)},lastupdate) "
            f"SELECT {','.join(cr)},getdate() as lastupdate "
            f"FROM {self.xac}.qt3{i} s RIGHT JOIN #bdl r ON s.maqtgt=r.maqtgt "
            f"WHERE s.maqtgt Is Null ORDER BY r.maqtgt; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def luu_qtgt(self):
        sql = (f"DROP PROC {self.xac}.luu_qtgt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.luu_qtgt "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Declare @Maqt NVARCHAR(255)='',@Status NVARCHAR(255)=''; "
            f"Select Top 1 @Maqt=maqt,@Status=tinhtrang From {self.xac}.tamqt; "
            f"Set @Maqt=Isnull(CAST(@Maqt as NVARCHAR(255)),''); "
            f"Set @Status=Isnull(CAST(@Status as NVARCHAR(255)),''); "
            f"IF (DataLength(@Maqt)<1) OR (@Status like '%fin%') RETURN; ")
        # init data
        cs = [
            'maqt', 'baogiaid', 'hesoid', 'plgia', 'madot', 'hosoid', 'tt', 'soho',
            'vlcai', 'nccai', 'mtccai', 'gxd1kq1', 'gxd1kq2', 'vlnganh', 'ncnganh', 'mtcnganh', 'gxd2kq1', 'gxd2kq2',
            'gxd', 'dautucty', 'dautukhach', 'ghichu', 'nguoilap', 'ngaylap', 'ngaygan', 'ngayhoancong',
            'sodhn', 'hieudhn', 'chisodhn', 'madshc',
            'hesothauid', 'tvlcai', 'tnccai', 'tmtccai', 'tvlnganh', 'tncnganh', 'tmtcnganh', 'tgxd1kq1', 'tgxd1kq2',
            'sldh', 'dhn15', 'dhn25', 'dhn50', 'dhn80', 'dhn100',
            'slong', 'ong25', 'ong34', 'ong50', 'ong100', 'ong125', 'ong150', 'ong200', 'ong250',
            'slcat', 'tiencat', 'slcatnhua', 'tiencatnhua', 'tienvlk', 'nc', 'tiennc', 'mtc', 'tienmtc',
            'cptt', 'cong', 'thuevat', 'trigiaqtt', 'ghichuqtt', 'tinhtrangqtt']
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        cr = map(lambda k: f"r.{k}", cs)
        sql += (
            f"MERGE {self.xac}.qt AS s USING {self.xac}.tamqt AS r ON s.maqt=r.maqt "
            f"WHEN MATCHED THEN UPDATE SET {','.join(du)},s.lastupdate=getdate(),s.tinhtrang=N'OK' "
            f"WHEN NOT MATCHED THEN INSERT ({','.join(cs)},lastupdate,tinhtrang) "
            f"VALUES ({','.join(cr)},getdate(),N'OK'); ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def tinhlai_dot_qtgt(self):
        sql = (f"DROP PROC {self.xac}.tinhlai_dot_qtgt ")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.tinhlai_dot_qtgt "
            f"@Madot NVARCHAR(255)='' "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON "
            f"Set @Madot=Isnull(CAST(@Madot as NVARCHAR(255)),''); "
            f"IF DataLength(@Madot)<1 RETURN; "
            f"DECLARE @Maqt NVARCHAR(255)='', @Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(255)='dutoan'; "
            f"DECLARE mCursor CURSOR FOR "
            f"Select maqt,baogiaid,hesoid,plgia From {self.xac}.qt "
            f"Where madot=@Madot AND Left(Isnull(tinhtrang, ''), 2) Not In ('Fi', 'TN', 'OK', 'oK'); "
            f"OPEN mCursor; "
            f"BEGIN TRY ")
        # mo cursor
        sql += (
            f"Fetch Next From mCursor INTO @Maqt, @Baogiaid, @Hesoid, @Plgia; "
            f"WHILE @@FETCH_STATUS=0 Begin Begin "
            f"EXEC {self.xac}.nap_qtgt @Maqt; "
            f"EXEC {self.xac}.tinh_qtgt @Baogiaid, @Hesoid, @Plgia; "
            f"EXEC {self.xac}.luu_qtgt; End "
            f"Fetch Next From mCursor INTO @Maqt, @Baogiaid, @Hesoid, @Plgia; End ")
        sql += (
            f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH "
            f"CLOSE mCursor; DEALLOCATE mCursor; END; ")
        try:
            db.core().execute(sql)
        except:
            pass


class Qtgt_thau:
    def __init__(self, xac='pkh'):
        self.xac = xac
        self.kho = 'dbo'
        self.tao()

    def tao(self):
        self.giavl()
        self.gianc()
        self.giamtc()

    def baogiathau(self):
        sql = (f"DROP PROC {self.kho}.baogiathau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.kho}.baogiathau"
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY ")
        sql += (
            f" UPDATE s SET "
            f"s.giavl1=(Case When r.koqtt like '%VL%' Then 0 Else s.giavl End), "
            f"s.gianc1=(Case When r.koqtt like '%NC%' Then 0 Else s.gianc End), "
            f"s.giamtc1=(Case When r.koqtt like '%MTC%' Then 0 Else s.giamtc End), "
            f"s.tinhtrang=N'OK-QTT'"
            f"FROM {self.kho}.baogiachiphi s LEFT JOIN {self.kho}.chiphi r ON s.chiphiid=r.chiphiid"
            f"WHERE Isnull(s.tinhtrang,'') <> N'OK-QTT'; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END; "
        try:
            db.core().execute(sql)
        except:
            pass

    def giavl(self):
        # init prog
        sql = (f"DROP FUNCTION {self.kho}.giavl_thau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
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
        sql = (f"DROP FUNCTION {self.kho}.gianc_thau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
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
        sql = (f"DROP FUNCTION {self.kho}.giamtc_thau")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
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


class Upkho:
    def __init__(self, xac='pkh'):
        self.xac = xac
        self.kho = 'dbo'
        self.tao()

    def tao(self):
        self.dot()
        self.qtvt()
        self.qtgt()
        self.qt3x(1)
        self.qt3x(2)
        self.qt3x(3)
        self.qt3x(4)
        self.qt3x(5)

    def dot(self):
        if self.xac in ['pkh', 'pna']:
            cs = [
                'madot', 'hop', 'nam', 'plqt', 'quy', 'sodot', 'nhathauid', 'ngaylendot', 'ngaydshc', 'ngaythicong',
                'khuvuc', 'tonghs', 'qt_tong', 'qt_ok', 'qt_tn', 'qt_thieu', 'trigiaqt', 'dautucty', 'dautukhach',
                'trigianc', 'trigiavl', 'ngaylap', 'nguoilap', 'tinhtrang',
                'sophieunhap', 'sophieuxuat', 'tinhtrangqtvt']
        else:
            cs = [
                'quy', 'ngaydshc', 'ngaythicong', 'khuvuc', 'tonghs', 'qt_tong', 'qt_ok', 'qt_tn', 'qt_thieu', 'trigiaqt',
                'dautucty', 'dautukhach', 'trigianc', 'trigiavl', 'ngaylap', 'nguoilap', 'tinhtrang',
                'sophieunhap', 'sophieuxuat', 'tinhtrangqtvt']
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        sql = (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate(), "
            f"s.ghichu=Case When s.ghichu=r.ghichu then s.ghichu "
            f"Else Concat(s.ghichu,r.ghichu) End, "
            f"s.ghichuqtvt=Case When s.ghichuqtvt=r.ghichuqtvt then s.ghichuqtvt "
            f"Else Concat(s.ghichuqtvt,r.ghichuqtvt) End "
            f"FROM {self.kho}.dot s INNER JOIN {self.xac}.dot r ON s.madot=r.madot "
            f"WHERE s.lastupdate<r.lastupdate And s.tinhtrang not like '%fin%'; ")
        try:
            db.core().execute(sql)
        except:
            pass

    def qtvt(self):
        cs = [
            'madot', 'maqtvt', 'tt', 'mavattu', 'chiphiid', 'dvt', 'ghichu',
            'soluongcap', 'soluongsudung', 'soluongtainhap', 'soluongbosung']
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        sql = (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate() "
            f"FROM ({self.kho}.qtvt s INNER JOIN {self.xac}.qtvt r ON s.maqtvt=r.maqtvt) "
            f"LEFT JOIN {self.kho}.dot dot ON s.madot=r.madot "
            f"WHERE s.lastupdate<r.lastupdate And dot.tinhtrang not like '%fin%'; ")
        try:
            db.core().execute(sql)
        except:
            pass

    def qtgt(self):
        if self.xac in ['pkh', 'pna']:
            cs = [
                'maqt', 'baogiaid', 'hesoid', 'plgia', 'madot', 'hosoid', 'tt', 'soho',
                'vlcai', 'nccai', 'mtccai', 'gxd1kq1', 'gxd1kq2', 'vlnganh', 'ncnganh', 'mtcnganh', 'gxd2kq1', 'gxd2kq2',
                'gxd', 'dautucty', 'dautukhach', 'tinhtrang', 'nguoilap', 'ngaylap', 'ngaygan', 'ngayhoancong',
                'sodhn', 'hieudhn', 'chisodhn', 'madshc',
                'hesothauid', 'tvlcai', 'tnccai', 'tmtccai', 'tvlnganh', 'tncnganh', 'tmtcnganh', 'tgxd1kq1', 'tgxd1kq2',
                'sldh', 'dhn15', 'dhn25', 'dhn50', 'dhn80', 'dhn100',
                'slong', 'ong25', 'ong34', 'ong50', 'ong100', 'ong125', 'ong150', 'ong200', 'ong250',
                'slcat', 'tiencat', 'slcatnhua', 'tiencatnhua', 'tienvlk', 'nc', 'tiennc', 'mtc', 'tienmtc',
                'cptt', 'cong', 'thuevat', 'trigiaqtt', 'tinhtrangqtt']
        else:
            cs = [
                'baogiaid', 'hesoid', 'plgia', 'tt', 'soho',
                'vlcai', 'nccai', 'mtccai', 'gxd1kq1', 'gxd1kq2', 'vlnganh', 'ncnganh', 'mtcnganh', 'gxd2kq1', 'gxd2kq2',
                'gxd', 'dautucty', 'dautukhach', 'tinhtrang', 'nguoilap', 'ngaylap', 'ngaygan', 'ngayhoancong',
                'sodhn', 'hieudhn', 'chisodhn', 'madshc',
                'sldh', 'dhn15', 'dhn25', 'dhn50', 'dhn80', 'dhn100',
                'slong', 'ong25', 'ong34', 'ong50', 'ong100', 'ong125', 'ong150', 'ong200', 'ong250',
                'slcat', 'tiencat', 'slcatnhua', 'tiencatnhua', 'tienvlk', 'nc', 'tiennc', 'mtc', 'tienmtc',
                'cptt', 'cong', 'thuevat', 'trigiaqtt', 'tinhtrangqtt']
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        sql = (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate(), "
            f"s.ghichu=Case When s.ghichu=r.ghichu then s.ghichu "
            f"Else Concat(s.ghichu,r.ghichu) End, "
            f"s.ghichuqtt=Case When s.ghichuqtt=r.ghichuqtt then s.ghichuqtt "
            f"Else Concat(s.ghichuqtt,r.ghichuqtt) End "
            f"FROM {self.kho}.qt s INNER JOIN {self.xac}.qt r ON s.maqt=r.maqt "
            f"WHERE s.lastupdate<r.lastupdate And s.tinhtrang not like '%fin%'; ")
        try:
            db.core().execute(sql)
        except:
            pass

    def qt3x(self, i=1):
        if i in [1, 2, 3, 4]:
            cs = ['tt', 'maqt', 'maqtgt',  'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'trigiavl', 'trigianc', 'trigiamtc']
        else:
            cs = ['tt', 'maqt', 'maqtgt', 'chiphiid',
                  'dongia', 'sl1', 'sl2', 'trigia1', 'trigia2']
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        sql = (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate() "
            f"FROM ({self.kho}.qt3{i} s INNER JOIN {self.xac}.qt3{i} r ON s.maqtgt=r.maqtgt) "
            f"LEFT JOIN {self.kho}.qt qt ON qt.maqt=r.maqt "
            f"WHERE s.lastupdate<r.lastupdate And qt.tinhtrang not like '%fin%'; ")
        # add rec chua co
        cr = map(lambda k: f"r.{k}", cs)
        sql += (
            f"INSERT INTO {self.kho}.qt3{i} ({','.join(cs)},lastupdate) "
            f"SELECT {','.join(cr)},getdate() as lastupdate "
            f"FROM {self.xac}.qt3{i} r LEFT JOIN {self.kho}.qt3{i} s ON s.maqtgt=r.maqtgt "
            f"WHERE s.maqtgt Is Null ")
        try:
            db.core().execute(sql)
        except:
            pass


class Upxac:
    def __init__(self, xac='pkh', nam=2020):
        self.kho = 'dbo'
        self.nam = nam
        self.xac = f"{xac}".lower()
        self.donvithicong()
        self.dot()
        self.qtgt()

    def donvithicong(self):
        if self.xac in ['qlmlq2']:
            self.dvtc = ['2']
        elif self.xac in ['qlmltd', 'qlmlqtd']:
            self.dvtc = ['4']
        elif self.xac in ['pkh']:
            self.dvtc = ['2', '3', '4', '5']
        elif self.xac in ['pkd']:
            self.dvtc = ['2', '3', '4']
        else:
            self.dvtc = None

    def dot(self):
        cs = [
            'madot', 'hop', 'nam', 'plqt', 'quy', 'sodot', 'nhathauid', 'ngaylendot', 'ngaydshc', 'ngaythicong',
            'khuvuc', 'tonghs', 'qt_tong', 'qt_ok', 'qt_tn', 'qt_thieu', 'trigiaqt', 'dautucty', 'dautukhach',
            'trigianc', 'trigiavl', 'ngaylap', 'nguoilap', 'ghichu', 'tinhtrang',
            'sophieunhap', 'sophieuxuat', 'ghichuqtvt', 'tinhtrangqtvt']
        # xoa rec thua
        sql = (
            f"DELETE FROM {self.xac}.dot "
            f"WHERE madot IN (Select r.madot "
            f"FROM {self.xac}.dot s LEFT JOIN {self.kho}.dot r ON s.madot=r.madot "
            f"WHERE s.madot Is Null); ")
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        sql = (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate() "
            f"FROM {self.kho}.dot r INNER JOIN {self.xac}.dot s ON s.madot=r.madot "
            f"WHERE s.lastupdate<r.lastupdate And s.tinhtrang not like '%fin%'; ")
        # add rec chua co
        cr = map(lambda k: f"r.{k}", cs)
        sql += (
            f"INSERT INTO {self.xac}.dot ({','.join(cs)},lastupdate) "
            f"SELECT {','.join(cr)},getdate() as lastupdate "
            f"FROM {self.kho}.dot r LEFT JOIN {self.xac}.dot s ON s.madot=r.madot "
            f"WHERE s.madot Is Null ")
        if self.dvtc:
            sql += f"And r.nhathauid in ({','.join(self.dvtc)}) "
        if self.nam:
            sql += f"And r.nam={self.nam} ORDER BY r.madot; "
        else:
            sql += f"ORDER BY r.madot; "
        try:
            db.core().execute(sql)
        except:
            pass

    def qtgt(self):
        cs = [
            'maqt', 'baogiaid', 'hesoid', 'plgia', 'madot', 'hosoid', 'tt', 'soho',
            'vlcai', 'nccai', 'mtccai', 'gxd1kq1', 'gxd1kq2', 'vlnganh', 'ncnganh', 'mtcnganh', 'gxd2kq1', 'gxd2kq2',
            'gxd', 'dautucty', 'dautukhach', 'ghichu', 'tinhtrang', 'nguoilap', 'ngaylap', 'ngaygan', 'ngayhoancong',
            'sodhn', 'hieudhn', 'chisodhn', 'madshc',
            'hesothauid', 'tvlcai', 'tnccai', 'tmtccai', 'tvlnganh', 'tncnganh', 'tmtcnganh', 'tgxd1kq1', 'tgxd1kq2',
            'sldh', 'dhn15', 'dhn25', 'dhn50', 'dhn80', 'dhn100',
            'slong', 'ong25', 'ong34', 'ong50', 'ong100', 'ong125', 'ong150', 'ong200', 'ong250',
            'slcat', 'tiencat', 'slcatnhua', 'tiencatnhua', 'tienvlk', 'nc', 'tiennc', 'mtc', 'tienmtc',
            'cptt', 'cong', 'thuevat', 'trigiaqtt', 'ghichuqtt', 'tinhtrangqtt']
        # xoa rec thua
        sql = (
            f"DELETE FROM {self.xac}.qt "
            f"WHERE maqt IN (Select r.maqt "
            f"FROM {self.xac}.qt s LEFT JOIN {self.kho}.qt r ON s.maqt=r.maqt "
            f"WHERE s.maqt Is Null); ")
        # update rec co san
        du = map(lambda k: f"s.{k}=r.{k}", cs)
        sql = (
            f"UPDATE s SET {','.join(du)},s.lastupdate=getdate() "
            f"FROM {self.kho}.qt r INNER JOIN {self.xac}.qt s ON s.maqt=r.maqt "
            f"WHERE s.lastupdate<r.lastupdate And s.tinhtrang not like '%fin%'; ")
        # add new rec
        cr = map(lambda k: f"r.{k}", cs)
        sql += (
            f"INSERT INTO {self.xac}.qt ({','.join(cs)},lastupdate) "
            f"SELECT {','.join(cr)},getdate() as lastupdate "
            f"FROM ({self.kho}.qt r LEFT JOIN {self.xac}.qt s ON s.maqt=r.maqt) "
            f"INNER JOIN {self.xac}.dot dot ON dot.madot=r.madot "
            f"WHERE s.maqt Is Null ")
        if self.dvtc:
            sql += f"And dot.nhathauid in ({','.join(self.dvtc)}) "
        if self.nam:
            sql += f"And dot.nam={self.nam} ORDER BY r.madot; "
        else:
            sql += f"ORDER BY r.madot; "
        try:
            db.core().execute(sql)
        except:
            pass


def updulieu():
    Upkho("qlmlq2")
    Upkho("qlmltd")
    Upkho("pkh")
    Upxac('qlmlq2', 2021)
    Upxac('qlmltd', 2021)
    Upxac('qlmltd', 2019)
    Upxac('pkh', 2021)
# Csdl("pkh")
# Qtgt("pkh").nap_qtgt()

updulieu()
