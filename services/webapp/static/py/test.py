def lamtronso(sothapphan="0.000", phanle=2):
    from decimal import Decimal
    try:
        somoi = round(Decimal(sothapphan),phanle)
        print('type of somoi=',type(somoi))
    except:
        somoi = None
    return somoi
a=4
b=0.05
c=a * b
print("c=",c)
print("lamtronso=",lamtronso(a * b,2))