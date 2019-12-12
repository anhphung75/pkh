import pyodbc

server = 'mssql'
database = "master"
username = "sa"
password = "w3b@pkh2019"

dbConnection = pyodbc.connect('DRIVER={FreeTDS};SERVER=' +server+';DATABASE='+database+';UID='+username+';PWD=' + password)
cursor = dbConnection.cursor()
cursor.execute("SELECT * FROM sys.all_objects")
row = cursor.fetchone()
while row:
    print(row[0])
    row = cursor.fetchone()
