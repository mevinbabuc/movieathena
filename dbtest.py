import MySQLdb as mdb

shortfilm=""
con=""
try:
    con = mdb.connect('localhost', 'root','hello123', 'movieathena')
    cur = con.cursor()
    cur.execute("select * from shortfilms")
    shortfilm = cur.fetchone()
    print "SHortfilm : %s " % shortfilm[3]

except mdb.Error, e:
    con=""
    print "Error %d: %s" % (e.args[0],e.args[1])
finally:
    con.close()