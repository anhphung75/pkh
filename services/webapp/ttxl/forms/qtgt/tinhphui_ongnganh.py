import datetime
import decimal
import arrow
import json

#from sqlalchemy import func, desc
from ttdl import Maychu, run_mssql
from utils import lamtronso


class Phui_Nd68_2019:
    def __init__(self, phui):
        # phui=[{macptl,dai,rong,sau}]
        self.phui = phui
        self.cat_matnhua_btxm_gach = 0
        self.dao_boc_matnhua_thucong = 0
        self.dao_boc_btxm_thucong = 0
        self.pha_do_nen_gach = 0
        self.dao_phui_dat_cap3_thucong = 0
        self.dao_phui_dat_cap2_thucong = 0
        self.cong_traicat = 0
        self.cong_traican_dadam4x6 = 0
        self.dao_boc_gach_vua = 0
        self.vanchuyen_dat_cap3_thucong = 0
        self.vanchuyen_dat_cap2_thucong = 0
        self.cpxd = []
        self.cpvl = []
        self.catsanlap = 0
        self.dadam4x6 = 0
        self.luoicatbeton365mm = 0
        self.tinhphui()

    def tinhphui(self):
        self.tinh_phui_hinhhoc()
        self.tinh_cat_matnhua_btxm_gach()
        self.tinh_dao_boc_matnhua_thucong()
        self.tinh_dao_boc_btxm_thucong()
        self.tinh_pha_do_nen_gach()
        self.tinh_dao_phui_dat_cap3_thucong()
        self.tinh_dao_phui_dat_cap2_thucong()
        self.tinh_cong_traicat()
        self.tinh_cong_traican_dadam4x6()
        self.tinh_dao_boc_gach_vua()
        self.tinh_vanchuyen_dat_cap3_thucong()
        self.tinh_vanchuyen_dat_cap2_thucong()
        self.tinh_cpxd()
        self.tinh_cpvl()

    def tinh_phui_hinhhoc(self):
        dl = []
        for cp in self.phui:
            if not cp['dai']:
                cp['dai'] = 0
            if not cp['rong']:
                cp['rong'] = 0
            if not cp['sau']:
                cp['sau'] = 0
            cp['dientich'] = cp['dai']*cp['rong']
            cp['chuvi'] = (cp['dai']+cp['rong'])*2
            cp['thetich'] = cp['dai']*cp['rong']*cp['sau']
            if cp['thetich'] > 0:
                dl.append(cp)
        self.phui = dl

    def tinh_cat_matnhua_btxm_gach(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm', 'nhua_10cm']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                pass
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                pass
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                kl += cp['chuvi']
            elif cp['macptl'] in ['le_daxe']:
                kl += cp['chuvi']
            else:
                pass
        self.cat_matnhua_btxm_gach = lamtronso(kl, 3)

    def tinh_dao_boc_matnhua_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.12
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.1
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_matnhua_thucong = lamtronso(kl, 3)

    def tinh_dao_boc_btxm_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['hem_btxm', 'duong_btxm']:
                heso = 0.1
            elif cp['macptl'] in ['le_btxm', 'le_ximang', 'le_daxe']:
                heso = 0.1
            elif cp['macptl'] in ['le_dagranit', 'le_gachterrazzo']:
                heso = 0.05
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_boc_btxm_thucong = lamtronso(kl, 3)

    def tinh_pha_do_nen_gach(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_dagranit', 'le_gachterrazzo']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                kl += cp['dientich']
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400', 'le_daxe']:
                kl += cp['dientich']
            else:
                pass
        self.pha_do_nen_gach = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap3_thucong(self):
        kl = 0
        self.dat_cap3_khongvanchuyen = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.25
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.25
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = 0.2
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = 0.35
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.35
                self.dat_cap3_khongvanchuyen = lamtronso(cp['dientich']*0.1, 3)
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.1
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_phui_dat_cap3_thucong = lamtronso(kl, 3)

    def tinh_dao_phui_dat_cap2_thucong(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = cp['sau'] - 0.37
            elif cp['macptl'] in ['nhua_10cm']:
                heso = cp['sau'] - 0.35
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = cp['sau'] - 0.3
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = cp['sau'] - 0.35
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.35
            elif cp['macptl'] in ['le_dagranit']:
                heso = cp['sau'] - 0.2
            elif cp['macptl'] in ['le_gachterrazzo']:
                heso = cp['sau'] - 0.195
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = cp['sau'] - 0.4 + 0.3
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = cp['sau'] - 0.2
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = cp['sau'] - 0.35 + 0.05
            elif cp['macptl'] in ['le_daxe']:
                heso = cp['sau'] - 0.245
            else:
                heso = 0
            kl += cp['dientich'] * heso
        self.dao_phui_dat_cap2_thucong = lamtronso(kl, 3)

    def tinh_cong_traicat(self):
        kl = self.dao_phui_dat_cap2_thucong
        self.cong_traicat = lamtronso(kl, 3)

    def tinh_cong_traican_dadam4x6(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['nhua_12cm']:
                heso = 0.25
            elif cp['macptl'] in ['nhua_10cm']:
                heso = 0.25
            elif cp['macptl'] in ['duong_btxm', 'hem_btxm']:
                heso = 0.2
            elif cp['macptl'] in ['duong_daxanh', 'duong_datda']:
                heso = 0.25
            elif cp['macptl'] in ['le_datda', 'le_datthuong']:
                heso = 0.25
            elif cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0
            elif cp['macptl'] in ['le_btxm', 'le_ximang']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.1
            else:
                heso = 0
            kl += (cp['dientich'] * heso)
            print(f"cong dadam ={kl}")
        print(f"cong_traican_dadam4x6 kl={kl} x heso={heso}")
        self.cong_traican_dadam4x6 = lamtronso(kl, 3)
        print(f"cong_traican_dadam4x6 ={self.cong_traican_dadam4x6}")

    def tinh_dao_boc_gach_vua(self):
        kl = 0
        for cp in self.phui:
            if cp['macptl'] in ['le_gachterrazzo', 'le_dagranit']:
                heso = 0.03 + 0.015
            elif cp['macptl'] in ['le_gachconsau', 'le_gachhinhsin']:
                heso = 0.1
            elif cp['macptl'] in ['le_gachbeton_tuchen_M400']:
                heso = 0.1
            elif cp['macptl'] in ['le_daxe']:
                heso = 0.03 + 0.015
            else:
                heso = 0
            kl += cp['dientich'] * heso
            print(f"dao_boc_gach_vua[{cp['macptl']}]={cp['dientich'] * heso}")
        self.dao_boc_gach_vua = lamtronso(kl, 3)

    def tinh_vanchuyen_dat_cap3_thucong(self):
        kl = self.dao_phui_dat_cap3_thucong
        kl += self.dao_boc_matnhua_thucong
        kl += self.dao_boc_btxm_thucong
        kl += self.dao_boc_gach_vua
        self.vanchuyen_dat_cap3_thucong = lamtronso(
            kl, 3) - self.dat_cap3_khongvanchuyen

    def tinh_vanchuyen_dat_cap2_thucong(self):
        kl = self.dao_phui_dat_cap2_thucong
        self.vanchuyen_dat_cap2_thucong = lamtronso(kl, 3)

    def tinh_cpxd(self):
        cpxd = []
        cpxd.append({'macpxd': '01', 'soluong': self.cat_matnhua_btxm_gach})
        cpxd.append({'macpxd': '02', 'soluong': self.dao_boc_matnhua_thucong})
        cpxd.append({'macpxd': '03', 'soluong': self.dao_boc_btxm_thucong})
        cpxd.append({'macpxd': '04', 'soluong': self.pha_do_nen_gach})
        cpxd.append(
            {'macpxd': '05', 'soluong': self.dao_phui_dat_cap3_thucong})
        cpxd.append(
            {'macpxd': '06', 'soluong': self.dao_phui_dat_cap2_thucong})
        cpxd.append(
            {'macpxd': '07', 'soluong': self.vanchuyen_dat_cap3_thucong})
        cpxd.append(
            {'macpxd': '08', 'soluong': self.vanchuyen_dat_cap2_thucong})
        cpxd.append({'macpxd': '09', 'soluong': self.cong_traicat})
        cpxd.append({'macpxd': '10', 'soluong': self.cong_traican_dadam4x6})
        self.cpxd = cpxd

    def tinh_cpvl(self):
        dm = 1.22
        self.catsanlap = lamtronso(self.cong_traicat*dm, 3)
        dm = 1.32
        self.dadam4x6 = lamtronso(self.cong_traican_dadam4x6*dm, 3)
        dm = 0.0035 + 0.0025
        self.luoicatbeton365mm = lamtronso(self.cat_matnhua_btxm_gach*dm, 3)
        cpvl = []
        cpvl.append({'macpvl': '01', 'soluong': self.catsanlap})
        cpvl.append({'macpvl': '02', 'soluong': self.dadam4x6})
        self.cpvl = cpvl


def test_phui():
    phui = [{'macptl': 'nhua_10cm', 'dai': 0.5, 'rong': 0.5, 'sau': 1},
            {'macptl': 'nhua_12cm', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'nhua_10cm', 'dai': 5, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'le_gachterrazzo', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'duong_datda', 'dai': 0, 'rong': 0.3, 'sau': 0.6},
            {'macptl': 'hem_btxm', 'dai': 0, 'rong': 0.3, 'sau': 0.6}
            ]
    kq = vars(Phui_Nd68_2019(phui))
    del kq['cpxd']
    del kq['cpvl']
    print(json.dumps(kq, indent=4, sort_keys=False))
