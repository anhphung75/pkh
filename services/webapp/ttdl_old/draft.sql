ALTER PROC web.tinh_tamqt
  @Baogiaid INT=0,
  @Plgia NVARCHAR(50)='dutoan',
  @Hesoid INT=0
WITH
  ENCRYPTION
AS
BEGIN
  SET NOCOUNT ON
  BEGIN TRY
DECLARE @vl DECIMAL(19,5)=1.0000, @nc DECIMAL(19,5)=1.0000, @mtc DECIMAL(19,5)=1.0000, @tructiepkhac DECIMAL(19,5)=1.0000, @chung DECIMAL(19,5)=1.0000, @giantiepkhac DECIMAL(19,5)=1.0000, @thutinhtruoc DECIMAL(19,5)=1.0000, @khaosat DECIMAL(19,5)=1.0000, @thietke DECIMAL(19,5)=1.0000, @giamsat DECIMAL(19,5)=1.0000, @tongxaydung DECIMAL(19,5)=1.0000, @tongtailap DECIMAL(19,5)=1.0000, @tongcongtrinh DECIMAL(19,5)=1.0000, @dautucty DECIMAL(19,5)=1.0000, @dautukhach DECIMAL(19,5)=1.0000, @tratruoc DECIMAL(19,5)=1.0000, @onZvl DECIMAL(19,5)=1.0000, @ocZvl DECIMAL(19,5)=1.0000, @onZnc DECIMAL(19,5)=1.0000, @ocZnc DECIMAL(19,5)=1.0000, @onZmtc DECIMAL(19,5)=1.0000, @ocZmtc DECIMAL(19,5)=1.0000, @onVl DECIMAL(19,5)=1.0000, @ocVl DECIMAL(19,5)=1.0000, @onNc DECIMAL(19,5)=1.0000, @ocNc DECIMAL(19,5)=1.0000, @onMtc DECIMAL(19,5)=1.0000, @ocMtc DECIMAL(19,5)=1.0000, @onZvlncmtc DECIMAL(19,5)=1.0000, @ocZvlncmtc DECIMAL(19,5)=1.0000, @onTructiepkhac DECIMAL(19,5)=1.0000, @ocTructiepkhac DECIMAL(19,5)=1.0000, @onTructiep DECIMAL(19,5)=1.0000, @ocTructiep DECIMAL(19,5)=1.0000, @onGiantiep DECIMAL(19,5)=1.0000, @ocGiantiep DECIMAL(19,5)=1.0000, @onGiantiepkhac DECIMAL(19,5)=1.0000, @ocGiantiepkhac DECIMAL(19,5)=1.0000, @onChung DECIMAL(19,5)=1.0000, @ocChung DECIMAL(19,5)=1.0000, @onGiaxaydung DECIMAL(19,5)=1.0000, @ocGiaxaydung DECIMAL(19,5)=1.0000, @onThutinhtruoc DECIMAL(19,5)=1.0000, @ocThutinhtruoc DECIMAL(19,5)=1.0000, @onXaydungtruocthue DECIMAL(19,5)=1.0000, @ocXaydungtruocthue DECIMAL(19,5)=1.0000, @onKhaosatThietke DECIMAL(19,5)=1.0000, @ocKhaosatThietke DECIMAL(19,5)=1.0000, @onGiamsat DECIMAL(19,5)=1.0000, @ocGiamsat DECIMAL(19,5)=1.0000, @onTongxaydungtruocthue DECIMAL(19,5)=1.0000, @ocTongxaydungtruocthue DECIMAL(19,5)=1.0000, @onVattongxaydung DECIMAL(19,5)=1.0000, @ocVattongxaydung DECIMAL(19,5)=1.0000, @onTongxaydung DECIMAL(19,5)=1.0000, @ocTongxaydung DECIMAL(19,5)=1.0000, @onTailap DECIMAL(19,5)=1.0000, @ocTailap DECIMAL(19,5)=1.0000, @onVattailap DECIMAL(19,5)=1.0000, @ocVattailap DECIMAL(19,5)=1.0000, @onTailaptruocthue DECIMAL(19,5)=1.0000, @ocTailaptruocthue DECIMAL(19,5)=1.0000, @Plqt NVARCHAR(50);
IF((@Baogiaid>0) OR (Len(@Plgia)>0)) EXEC web.tinh_tamqt3x @Baogiaid, @Plgia;
SELECT @ocZvl=Sum(zVl), @ocZnc=Sum(zNc), @ocZmtc=Sum(zMtc)
  FROM
    (      Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc
      From web.tamqtt31
    UNION
      Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc
      From web.tamqtt32) AS U;
SELECT @ocTailap=Isnull(sum(trigia1),0)
  From web.tamqtt35;

SELECT @onZvl=Sum(zVl), @onZnc=Sum(zNc), @onZmtc=Sum(zMtc)
  FROM (      Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc
      From web.tamqtt33
    UNION
      Select Isnull(sum(trigiavl),0) As zVl, Isnull(sum(trigianc),0) As zNc, Isnull(sum(trigiamtc),0) As zMtc
      From web.tamqtt34) AS U;
SELECT @onTailap=Isnull(sum(trigia2),0)
  From web.tamqtt35;

Select @nc=Isnull(heso_nc,0), @mtc=Isnull(heso_mtc,0), @tructiepkhac=Isnull(heso_ttpk,0), @chung=Isnull(heso_cpchung,0), @giantiepkhac=Isnull(giantiepkhac,0), @thutinhtruoc=Isnull(heso_thunhaptt,0), @khaosat=Isnull(heso_khaosat,0), @thietke=Isnull(heso_thietke,0), @giamsat=Isnull(heso_gstc,0), @vl=1.0000
  From dbo.hesochiphi
  Where hesoid=@Hesoid;
Set @onGiaxaydung= (@onGiantiep + @onTructiep);
Set @onThutinhtruoc= dbo.lamtronso(@onGiaxaydung * @thutinhtruoc,0);
Set @onXaydungtruocthue= (@onGiaxaydung + @onThutinhtruoc);
Set @onKhaosatThietke= dbo.lamtronso(@onXaydungtruocthue * @khaosat * @thietke,0);
Set @onGiamsat= dbo.lamtronso(@onXaydungtruocthue * @giamsat,0);
Set @onTongxaydungtruocthue= (@onXaydungtruocthue + @onKhaosatThietke + @onGiamsat);
Set @onVattongxaydung= dbo.lamtronso(@onTongxaydungtruocthue * 0.1,0);
Set @onTongxaydung= (@onTongxaydungtruocthue + @onVattongxaydung); Set @onTailaptruocthue= dbo.lamtronso(@onTailap * 100/110,0);
Set @onVattailap= (@onTailap - @onTailaptruocthue); Set @ocGiaxaydung= (@ocGiantiep + @ocTructiep); Set @ocThutinhtruoc= dbo.lamtronso(@ocGiaxaydung * @thutinhtruoc,0); Set @ocXaydungtruocthue= (@ocGiaxaydung + @ocThutinhtruoc); Set @ocKhaosatThietke= dbo.lamtronso(@ocXaydungtruocthue * @khaosat * @thietke,0); Set @ocGiamsat= dbo.lamtronso(@ocXaydungtruocthue * @giamsat,0); Set @ocTongxaydungtruocthue= (@ocXaydungtruocthue + @ocKhaosatThietke + @ocGiamsat); Set @ocVattongxaydung= dbo.lamtronso(@ocTongxaydungtruocthue * 0.1,0); Set @ocTongxaydung= (@ocTongxaydungtruocthue + @ocVattongxaydung);
Set @ocTailaptruocthue= dbo.lamtronso(@ocTailap * 100/110,0); Set @ocVattailap= (@ocTailap - @ocTailaptruocthue); Set @tongxaydung= (@onTongxaydung + @ocTongxaydung);
Set @tongtailap= (@onTailap
+ @ocTailap);
Set @tongcongtrinh= (@tongxaydung + @tongtailap);
Select @Plqt=Isnull(maqt, ''), @Dautucty=dautucty
  From web.tamqt;
IF @Plqt LIKE '%MP%'
	Set @dautucty= dbo.lamtronso(@tongcongtrinh, 0);
ELSE
	If @dautucty is null
		Set @dautucty= (@onTongxaydung + @onTailap);
Set @dautukhach= (@tongcongtrinh - @dautucty);

UPDATE web.tamqt SET
plgia = Isnull(@Plgia, 'dutoan'),
vlcai=@ocZvl, nccai=@ocZnc,
mtccai=@ocZmtc, vlnganh=@onZvl,
ncnganh=@onZnc, mtcnganh=@onZmtc,
gxd1kq1=@ocTongxaydung,
gxd2kq1=@ocTailap,
gxd1kq2=@onTongxaydung, gxd2kq2=@onTailap, gxd=@tongcongtrinh, dautucty= @dautucty, dautukhach= @dautukhach;
IF @baogiaid>0 THEN Begin
    UPDATE web.tamqt SET baogiaid=@baogiaid
  End;
IF @hesoid>0 THEN Bengin UPDATE web.tamqt SET hesoid=@hesoid End;
END TRY
BEGIN CATCH PRINT 'Error: ' + ERROR_MESSAGE(); END CATCH
END;