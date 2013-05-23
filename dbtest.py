import MySQLdb as mdb

shortfilm=""
con=""
try:
    con = mdb.connect('127.0.0.1', 'root','123', 'movieathena')
    cur = con.cursor()
    cur.execute("select * from shortfilms")
    shortfilm = cur.fetchone()
    print "SHortfilm : %s " % shortfilm[3]

except mdb.Error, e:
    print "Error %d: %s" % (e.args[0],e.args[1])
finally:
    if con:    
        con.close()