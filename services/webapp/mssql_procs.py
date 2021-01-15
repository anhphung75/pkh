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
            f"mauqt NVARCHAR(50) NOT NULL DEFAULT '',"
            f"maqt NVARCHAR(50) NULL,"
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
            f"CONSTRAINT {self.xac}_tamqt_pk PRIMARY KEY (mauqt));"
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
        self.tao()

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
        self.nap_qt()
        self.tinh_qt3x(1)
        self.tinh_qt3x(2)
        self.tinh_qt3x(3)
        self.tinh_qt3x(4)
        self.tinh_qt3x(5)
        self.tinh_qt()
        self.luu_qt3x(1)
        self.luu_qt3x(2)
        self.luu_qt3x(3)
        self.luu_qt3x(4)
        self.luu_qt3x(5)
        self.luu_qt()

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
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"IF DataLength(Isnull(@Maqt,''))<1 Return; ")
        if qt3x in [1, 2, 3, 4]:
            cs = ['tt', 'maqt', 'mauqtgt', 'tienvl', 'tiennc', 'tienmtc']
            cr = ['(ROW_NUMBER() OVER(ORDER BY tt,chiphiid)) as tt', '@Maqt as maqt', 'maqtgt as mauqtgt',
                  'trigiavl', 'trigianc', 'trigiamtc']
            du = ['maqtgt', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc']
        else:
            cs = ['tt', 'maqt', 'mauqtgt', 'gia',
                  'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
            cr = ['(ROW_NUMBER() OVER(ORDER BY tt,chiphiid)) as tt', '@Maqt as maqt', 'maqtgt as mauqtgt',
                  'dongia', 'sl1', 'sl2', 'trigia1', 'trigia2']
            du = ['maqtgt', 'chiphiid']
        sql += (
            f"SELECT top 1 {','.join(cs)},{','.join(du)} INTO #bdl FROM {self.xac}.tamqt3{qt3x}; "
            f"DELETE FROM #bdl; "
            # load Mauqt
            f"IF DataLength(Isnull(@Mauqt,''))>0 Begin "
            f"INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) SELECT {','.join(cr)},{','.join(du)} "
            f"FROM {self.xac}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) SELECT {','.join(cr)},{','.join(du)} "
            f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Not Exists (Select * From #bdl) If Not Exists (Select * From {self.xac}.tamqt3{qt3x}) "
            f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{qt3x} Order By lastupdate; "
            f"INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) SELECT {','.join(cr)},{','.join(du)} "
            f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"UPDATE #bdl SET soluong=0; End End "
            # load normal
            f"IF DataLength(Isnull(@Mauqt,''))<1 Begin "
            f"INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) SELECT {','.join(cr)},{','.join(du)} "
            f"FROM {self.xac}.qt3{qt3x} WHERE maqt=@Maqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Not Exists (Select * From #bdl) "
            f"INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) SELECT {','.join(cr)},{','.join(du)} "
            f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Maqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Not Exists (Select * From #bdl) If Not Exists (Select * From {self.xac}.tamqt3{qt3x}) "
            f"Begin Select Top 1 @Mauqt=maqt From {self.kho}.qt3{qt3x} Order By lastupdate; "
            f"INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) SELECT {','.join(cr)},{','.join(du)} "
            f"FROM {self.kho}.qt3{qt3x} WHERE maqt=@Mauqt AND chiphiid>0 ORDER BY tt,chiphiid; "
            f"UPDATE #bdl SET soluong=0; End End "
            # up maqtgt
            f"UPDATE #bdl SET "
            f"maqtgt=Case When tt<10 Then CONCAT(@Maqt,{qt3x}0,tt) Else CONCAT(@Maqt,{qt3x},tt) End "
            f"WHERE tt>0; ")
        # test
        sql += f"Select 'qt3{qt3x} bdl' as test,* from #bdl; "
        # Up to tamqt3x
        if qt3x in [1, 2, 3, 4]:
            cs = ['maqt', 'mauqtgt', 'tt', 'maqtgt', 'chiphiid', 'soluong',
                  'giavl', 'gianc', 'giamtc', 'tienvl', 'tiennc', 'tienmtc']
        else:
            cs = ['maqt', 'mauqtgt', 'tt', 'maqtgt', 'chiphiid',
                  'gia', 'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
        cr = []
        for k in cs:
            cr.append(f"r.{k}")
        du = []
        for k in cs:
            du.append(f"s.{k}=r.{k}")
        sql += (
            f"MERGE {self.xac}.tamqt3{qt3x} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
            f"WHEN MATCHED THEN UPDATE SET {','.join(du)} "
            f"WHEN NOT MATCHED THEN INSERT ({','.join(cs)}) VALUES ({','.join(cr)}) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
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
        sql = (
            f"CREATE PROC {self.xac}.nap_qt "
            f"@Maqt NVARCHAR(50),@Mauqt NVARCHAR(50)='',@Gxd DECIMAL(38,9)=0.0 "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"IF DataLength(Isnull(@Maqt,''))<1 Return; "
            f"Declare @Maq INT=26; ")
        # init data
        cs = ['mauqt', 'baogiaid', 'hesoid', 'plgia']
        cr = ['maqt as mauqt', 'baogiaid', 'hesoid', 'plgia']
        du = [
            'madot', 'hosoid', 'tt', 'soho',
            'vlcai', 'nccai', 'mtccai', 'gxd1kq1', 'gxd1kq2', 'vlnganh', 'ncnganh', 'mtcnganh', 'gxd2kq1', 'gxd2kq2',
            'gxd', 'dautucty', 'dautukhach', 'ghichu', 'tinhtrang', 'nguoilap', 'ngaylap', 'ngaygan', 'ngayhoancong',
            'sodhn', 'hieudhn', 'chisodhn', 'madshc',
            'hesothauid', 'tvlcai', 'tnccai', 'tmtccai', 'tvlnganh', 'tncnganh', 'tmtcnganh', 'tgxd1kq1', 'tgxd1kq2',
            'sldh', 'dhn15', 'dhn25', 'dhn50', 'dhn80', 'dhn100',
            'slong', 'ong25', 'ong34', 'ong50', 'ong100', 'ong125', 'ong150', 'ong200', 'ong250',
            'slcat', 'tiencat', 'slcatnhua', 'tiencatnhua', 'tienvlk', 'nc', 'tiennc', 'mtc', 'tienmtc',
            'cptt', 'cong', 'thuevat', 'trigiaqtt', 'ghichuqtt', 'tinhtrangqtt']
        sql += (
            f"SELECT top 1 maqt,{','.join(cs)},{','.join(du)} INTO #bdl FROM {self.xac}.tamqt; "
            f"DELETE FROM #bdl; "
            # load gxd
            f"IF Isnull(@Gxd,0)>0 "
            f"Begin If Not Exists (Select * From #bdl) INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) "
            f"SELECT TOP 1 {','.join(cr)},{','.join(du)} FROM {self.xac}.qt WHERE gxd=@Gxd; "
            f"If Not Exists (Select * From #bdl) INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) "
            f"SELECT TOP 1 {','.join(cr)},{','.join(du)} FROM {self.kho}.qt WHERE gxd=@Gxd; End "
            # load mauqt
            f"IF DataLength(Isnull(@Mauqt,''))>0 "
            f"Begin If Not Exists (Select * From #bdl) INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) "
            f"SELECT TOP 1 {','.join(cr)},{','.join(du)} FROM {self.xac}.qt WHERE maqt=@Mauqt; "
            f"If Not Exists (Select * From #bdl) INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) "
            f"SELECT TOP 1 {','.join(cr)},{','.join(du)} FROM {self.kho}.qt WHERE maqt=@Mauqt; End "
            # load normal
            f"IF Not Exists (Select * From #bdl) INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) "
            f"SELECT TOP 1 {','.join(cr)},{','.join(du)} FROM {self.xac}.qt WHERE maqt=@Maqt; "
            f"IF Not Exists (Select * From #bdl) INSERT INTO #bdl ({','.join(cs)},{','.join(du)}) "
            f"SELECT TOP 1 {','.join(cr)},{','.join(du)} FROM {self.kho}.qt WHERE maqt=@Maqt; "
            # load default
            f"IF Not Exists (Select * From #bdl) Begin Set @Mauqt=@Maqt; "
            f"INSERT INTO #bdl (maqt,mauqt) VALUES (@Maqt,@Mauqt); End "
            f"UPDATE #bdl SET maqt=@Maqt,"
            f"baogiaid=Isnull(baogiaid,(Select Top 1 baogiaid From {self.kho}.baogiachiphi Order By baogiaid DESC)),"
            f"hesoid=Isnull(hesoid,(Select Top 1 hesoid From {self.kho}.hesochiphi Order By hesoid DESC)),"
            f"plgia=Isnull(plgia,'dutoan'); ")
        # up to tamqt
        cs += du
        cs.append('maqt')
        cr = []
        for k in cs:
            cr.append(f"r.{k}")
        du = []
        for k in cs:
            du.append(f"s.{k}=r.{k}")
        sql += (
            f"MERGE {self.xac}.tamqt AS s USING #bdl AS r ON s.maqt=r.maqt "
            f"WHEN MATCHED THEN UPDATE SET {','.join(du)} "
            f"WHEN NOT MATCHED THEN INSERT ({','.join(cs)}) VALUES ({','.join(cr)}) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; "
            # up hoso
            f"UPDATE s SET "
            f"s.sohoso=r.sohoso,s.khachhang=r.khachhang,s.diachikhachhang=r.diachikhachhang,s.maq=r.maq,s.maqp=r.maqp "
            f"FROM {self.xac}.tamqt s INNER JOIN {self.kho}.hoso r ON s.hosoid=r.hosoid; "
            # up dot
            f"UPDATE s SET "
            f"s.nam=r.nam,s.plqt=r.plqt,s.quy=r.quy,s.sodot=r.sodot,s.nhathauid=r.nhathauid "
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
            f"FROM {self.xac}.tamqt34 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; "
            f"UPDATE s SET "
            f"s.chiphiid=Case When @Maq=2 then r.q2 When @Maq=9 then r.q9 Else r.td End "
            f"FROM {self.xac}.tamqt35 s INNER JOIN {self.kho}.chiphikhuvuc r ON s.chiphiid=r.chiphiid; END ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def tinh_qt3x(self, qt3x=1):
        if qt3x not in [1, 2, 3, 4, 5]:
            return
        sql = (f"DROP PROC {self.xac}.tinh_qt3{qt3x}")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.tinh_qt3{qt3x} "
            f"@Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan' "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"IF ((Isnull(@Baogiaid,0)<1) OR (Isnull(@Hesoid,0)<1) OR (DataLength(Isnull(@Plgia,''))<1)) RETURN; "
            f"Declare @Maqt NVARCHAR(50)=''; "
            f"Select Top 1 @Maqt=maqt From {self.xac}.tamqt; "
            f"IF DataLength(Isnull(@Maqt,''))<1 Return; ")
        if qt3x in [1, 2, 3, 4]:
            sql += (
                f"SELECT maqt,maqtgt,mauqtgt,chiphiid,giavl,gianc,giamtc,tienvl,tiennc,tienmtc, "
                f"IDENTITY(INT, 1, 1) AS tt,abs(isnull(soluong,0)) as soluong "
                f"INTO #bdl FROM {self.xac}.tamqt3{qt3x} WHERE chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) RETURN; "
                # tinh toan lai gia
                f"UPDATE #bdl SET "
                f"giavl=dbo.giavl(chiphiid,@Baogiaid,@Plgia),"
                f"gianc=dbo.gianc(chiphiid,@Baogiaid,@Plgia),"
                f"giamtc=dbo.giamtc(chiphiid,@Baogiaid,@Plgia),"
                f"maqt=@Maqt,"
                f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{qt3x}0,tt) Else CONCAT(@Maqt,{qt3x},tt) End); "
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
            # test
            sql += f"Select 'qt3{qt3x} bdl' as test,* from #bdl; "
            # up to tamqt3x
            sql += (
                f"MERGE {self.xac}.tamqt3{qt3x} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
                f"WHEN MATCHED THEN UPDATE SET "
                f"s.maqt=r.maqt,s.maqtgt=r.maqtgt,s.mauqtgt=r.mauqtgt,s.tt=r.tt,s.chiphiid=r.chiphiid,"
                f"s.soluong=r.soluong,s.giavl=r.giavl,s.gianc=r.gianc,s.giamtc=r.giamtc,"
                f"s.tienvl=r.tienvl,s.tiennc=r.tiennc,s.tienmtc=r.tienmtc "
                f"WHEN NOT MATCHED THEN "
                f"INSERT (maqt,maqtgt,mauqtgt,tt,chiphiid,soluong,giavl,gianc,giamtc,tienvl,tiennc,tienmtc) "
                f"VALUES (r.maqt,r.maqtgt,r.mauqtgt,r.tt,r.chiphiid,r.soluong,r.giavl,r.gianc,r.giamtc,"
                f"r.tienvl,r.tiennc,r.tienmtc) "
                f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        else:
            sql += (
                f"SELECT maqt,maqtgt,mauqtgt,chiphiid,gia,oc_tien,on_tien, "
                f"IDENTITY(INT, 1, 1) AS tt,abs(isnull(oc_sl,0)) as oc_sl,abs(isnull(on_sl,0)) as on_sl "
                f"INTO #bdl FROM {self.xac}.tamqt3{qt3x} WHERE chiphiid>0 ORDER BY tt,chiphiid; "
                f"If Not Exists (Select * From #bdl) RETURN; "
                # tinh toan lai gia
                f"UPDATE #bdl SET "
                f"gia=dbo.giatl(chiphiid,@Baogiaid,@Plgia),"
                f"maqt=@Maqt,"
                f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{qt3x}0,tt) Else CONCAT(@Maqt,{qt3x},tt) End); "
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
            sql += f"Select 'qt3{qt3x} bdl' as test,* from #bdl; "
            # up to tamqt3x
            sql += (
                f"MERGE {self.xac}.tamqt3{qt3x} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
                f"WHEN MATCHED THEN UPDATE SET "
                f"s.maqt=r.maqt,s.maqtgt=r.maqtgt,s.mauqtgt=r.mauqtgt,s.tt=r.tt,s.chiphiid=r.chiphiid,"
                f"s.oc_sl=r.oc_sl,s.on_sl=r.on_sl,s.gia=r.gia,s.oc_tien=r.oc_tien,s.on_tien=r.on_tien "
                f"WHEN NOT MATCHED THEN "
                f"INSERT (maqt,maqtgt,mauqtgt,tt,chiphiid,oc_sl,on_sl,gia,oc_tien,on_tien) "
                f"VALUES (r.maqt,r.maqtgt,r.mauqtgt,r.tt,r.chiphiid,r.oc_sl,r.on_sl,r.gia,r.oc_tien,r.on_tien) "
                f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def tinh_qt(self):
        sql = (f"DROP PROC {self.xac}.tinh_qt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.tinh_qt "
            f"@Baogiaid INT=0, @Hesoid INT=0, @Plgia NVARCHAR(50)='dutoan' "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"IF ((Isnull(@Baogiaid,0)<1) OR (Isnull(@Hesoid,0)<1) OR (DataLength(Isnull(@Plgia,''))<1)) RETURN; "
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

    def luu_qt3x(self, qt3x=1):
        if qt3x not in [1, 2, 3, 4, 5]:
            return
        sql = (f"DROP PROC {self.xac}.luu_qt3{qt3x}")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.luu_qt3{qt3x} "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Declare @Maqt NVARCHAR(50)='',@Status NVARCHAR(50)=''; "
            f"Select Top 1 @Maqt=maqt,@Status=tinhtrang From {self.xac}.tamqt; "
            f"IF DataLength(Isnull(@Maqt,''))<1 RETURN; "
            f"IF Isnull(@Status,'') like '%fin%' RETURN; ")
        # load tamdulieu
        if qt3x in [1, 2, 3, 4]:
            cr = ['IDENTITY(INT, 1, 1) AS tt', 'tienvl', 'tiennc', 'tienmtc']
            cs = ['tt', 'trigiavl', 'trigianc', 'trigiamtc']
            du = ['maqt', 'maqtgt', 'chiphiid',
                  'soluong', 'giavl', 'gianc', 'giamtc']
        else:
            cr = ['IDENTITY(INT, 1, 1) AS tt', 'gia', 'oc_sl',
                  'on_sl', 'oc_tien', 'on_tien']
            cs = ['tt', 'dongia', 'sl1', 'sl2', 'trigia1', 'trigia2']
            du = ['maqt', 'maqtgt', 'chiphiid']
        sql += (
            f"SELECT {','.join(cr)},{','.join(du)} INTO #bdl FROM {self.xac}.tamqt3{qt3x} "
            f"WHERE chiphiid>0 ORDER BY tt,chiphiid; "
            f"If Exists (Select * From #bdl) UPDATE #bdl SET maqt=@Maqt,"
            f"maqtgt=(Case When tt<10 Then CONCAT(@Maqt,{qt3x}0,tt) Else CONCAT(@Maqt,{qt3x},tt) End); ")
        # luu qt3x
        if qt3x in [1, 2, 3, 4]:
            cr = ['maqt', 'maqtgt', 'tt', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'tienvl', 'tiennc', 'tienmtc']
            cs = ['maqt', 'maqtgt', 'tt', 'chiphiid', 'soluong', 'giavl', 'gianc', 'giamtc',
                  'trigiavl', 'trigianc', 'trigiamtc']
        else:
            cr = ['maqt', 'maqtgt', 'tt', 'chiphiid',
                  'gia', 'oc_sl', 'on_sl', 'oc_tien', 'on_tien']
            cs = ['maqt', 'maqtgt', 'tt', 'chiphiid',
                  'dongia', 'sl1', 'sl2', 'trigia1', 'trigia2']
        du = []
        for k in range(len(cs)):
            du.append(f"s.{cs[k]}=r.{cr[k]}")
        sql += (
            f"MERGE {self.xac}.qt3{qt3x} AS s USING #bdl AS r ON s.maqtgt=r.maqtgt "
            f"WHEN MATCHED THEN UPDATE SET {','.join(du)},s.lastupdate=getdate() "
            f"WHEN NOT MATCHED THEN INSERT ({','.join(cs)},lastupdate) VALUES ({','.join(cr)},getdate()) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
        try:
            db.core().execute(sql)
        except:
            pass

    def luu_qt(self):
        sql = (f"DROP PROC {self.xac}.luu_qt")
        try:
            db.core().execute(sql)
        except:
            pass
        # main prog
        sql = (
            f"CREATE PROC {self.xac}.luu_qt "
            f"WITH ENCRYPTION AS BEGIN SET NOCOUNT ON BEGIN TRY "
            f"Declare @Maqt NVARCHAR(50)='',@Status NVARCHAR(50)=''; "
            f"Select Top 1 @Maqt=maqt,@Status=tinhtrang From {self.xac}.tamqt; "
            f"IF DataLength(Isnull(@Maqt,''))<1 RETURN; "
            f"IF Isnull(@Status,'') like '%fin%' RETURN; ")
        # init data
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
        cr = []
        du = []
        for k in cs:
            cr.append(f"r.{k}")
            du.append(f"s.{k}=r.{k}")
        sql += (
            f"MERGE {self.xac}.qt AS s USING {self.xac}.tamqt AS r ON s.maqt=r.maqt "
            f"WHEN MATCHED THEN UPDATE SET {','.join(du)},s.lastupdate=getdate() "
            f"WHEN NOT MATCHED THEN INSERT ({','.join(cs)},lastupdate) VALUES ({','.join(cr)},getdate()) "
            f"WHEN NOT MATCHED BY SOURCE THEN DELETE; ")
        sql += f"END TRY BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH END;"
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


def creat_tinh_tamqt3x(schema="web", qt3x=1):
    # init prog
    if qt3x not in [1, 2, 3, 4]:
        return
    sql = (f"DROP PROC {schema}.tinh_tamqt3{qt3x}")
    try:
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
        f" INTO #bdl"
        f" FROM {schema}.tamqt3{qt3x}"
        f" WHERE chiphiid>0"
        f" ORDER BY tt,chiphiid;")
    # tinh toan lai gia
    sql += (
        f" UPDATE #bdl SET"
        f" giavl=dbo.giavl(chiphiid,@Baogiaid,@Plgia),"
        f" gianc=dbo.gianc(chiphiid,@Baogiaid,@Plgia),"
        f" giamtc=dbo.giamtc(chiphiid,@Baogiaid,@Plgia)"
        f" WHERE chiphiid>0;")
    # lam tron
    sql += (
        f" UPDATE #bdl SET"
        f" soluong=dbo.lamtronso(soluong,6),"
        f" giavl=dbo.lamtronso(giavl,3),"
        f" gianc=dbo.lamtronso(gianc,3),"
        f" giamtc=dbo.lamtronso(giamtc,3)"
        f" WHERE chiphiid>0;"
        # test
        f" Select 'qt35 tamdulieu' as test,* from #bdl;")
    sql += (
        f" UPDATE s SET"
        f" s.maqt=(Select Top 1 maqt From {schema}.tamqt),"
        f" s.maqtgt=(Case When r.id<10 Then CONCAT(maqt,{qt3x}0,r.id) Else CONCAT(maqt,{qt3x},r.id) End),"
        f" s.tt=r.id,s.chiphiid=r.chiphiid,s.ghichu=r.ghichu,s.lastupdate=r.lastupdate,"
        f" s.soluong=r.soluong,s.giavl=r.giavl,s.gianc=r.gianc,s.giamtc=r.giamtc"
        f" FROM {schema}.tamqt3{qt3x} s INNER JOIN #bdl r ON s.chiphiid=r.chiphiid;")
    sql += (f" DELETE FROM {schema}.tamqt3{qt3x} WHERE tt Not In (Select id From #bdl Where id>0);")
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
        f" INTO #bdl"
        f" FROM {schema}.tamqt35"
        f" WHERE chiphiid>0"
        f" ORDER BY tt,chiphiid;")
    # tinh toan lai gia
    sql += (
        f" UPDATE #bdl SET"
        f" gia=dbo.giatl(chiphiid,@Baogiaid,@Plgia)"
        f" WHERE chiphiid>0;")
    # lam tron
    sql += (
        f" UPDATE #bdl SET"
        f" sl1=dbo.lamtronso(sl1,3),"
        f" sl2=dbo.lamtronso(sl2,3),"
        f" gia=dbo.lamtronso(gia,3)"
        f" WHERE chiphiid>0;"
        # test
        f" Select 'qt35 tamdulieu' as test,* from #bdl;")
    sql += (
        f" UPDATE s SET"
        f" s.maqt=(Select Top 1 maqt From {schema}.tamqt),"
        f" s.maqtgt=(Case When r.id<10 Then CONCAT(maqt,50,r.id) Else CONCAT(maqt,5,r.id) End),"
        f" s.tt=r.id,s.chiphiid=r.chiphiid,s.ghichu=r.ghichu,s.lastupdate=r.lastupdate,"
        f" s.sl1=r.sl1,s.sl2=r.sl2,s.dongia=r.gia"
        f" FROM {schema}.tamqt35 s INNER JOIN #bdl r ON s.chiphiid=r.chiphiid;")
    sql += (f" DELETE FROM {schema}.tamqt35 WHERE tt Not In (Select id From #bdl Where id>0);")
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
        f" dhn15= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=15),0),"
        f" dhn50= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=50),0),"
        f" dhn80= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=80),0),"
        f" dhn100= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='DHN' AND giatripl=100),0),"
        f" sldh= Isnull((Select sum(sl) From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='DHN'),0),"
        # tong hop ong
        f" ong25= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=25),0),"
        f" ong34= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=34),0),"
        f" ong50= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=50),0),"
        f" ong100= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=100),0),"
        f" ong125= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=125),0),"
        f" ong150= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=150),0),"
        f" ong200= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=200),0),"
        f" ong250= Isnull((Select sl From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong' AND giatripl=250),0),"
        f" slong= Isnull((Select sum(sl) From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Ong'),0),"
        # tong hop cat
        f" slcat= Case When @Hesoid>=20200827"
        f" Then Isnull((Select sum(sl) From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
        f" Else Isnull((Select sum(sl) From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Cat'),0) End,"
        f" tiencat= Case When @Hesoid>=20200827"
        f" Then Isnull((Select sum(vl) From {schema}.tamthqt01 "
        f" Where tinhtrang='Moi' AND phanloai='Cat20200827'),0)"
        f" Else Isnull((Select sum(vl) From {schema}.tamthqt01 "
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


# Csdl("pkh").tttt_qt01()
Qtgt("pkh")
