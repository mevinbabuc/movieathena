from flask import Flask, render_template , request
import MySQLdb as mdb
 
app = Flask(__name__)      

####
##### App configurations
####

 
####
##### App structure
####

@app.route('/')
def landingPage():
    values = {}
    values["body_prop"] =  "id=landingPage"
    return render_template('landingpage.html',values=values)

@app.route('/user/<username>')
def show_user_profile(username=None):
    # show the user profile for that user
    artist=""
    shortfilms=""
    con=""
    values = {}

    values["body_prop"] =  "id=profile"

    try:
        con = mdb.connect('127.0.0.1', 'root','123', 'movieathena')
        cur = con.cursor()
        cur.execute("select * from artists")
        artist = cur.fetchone()

        #artist data
        values["id_artist"] =  artist[0]
        values["name"] =  artist[1]
        values["email"] =  artist[2]
        values["work_field"] =  artist[3]
        values["fb_link"] =  artist[4]
        values["twitter_link"] =  artist[5]

        cur.execute("select * from shortfilms where id_artist=%s",artist[0])
        shortfilms=cur.fetchall()

        #shortfilms
        movies={}
        i=0
        for shortfilm in shortfilms:
            movies[i]={"id_shortfilm":shortfilm[0],"name":shortfilm[1],"youtube_link":shortfilm[3]}
            i=i+1

        values["shortfilms"]=movies
        values["count"]=i-1


    except mdb.Error, e:
        print "Error %d: %s" % (e.args[0],e.args[1])
    finally:
        if con:    
            con.close()

    return render_template('user.html', values=values)

@app.route('/<moviename>')
def show_movie(moviename):
    return 'Movie %s' % moviename

@app.route('/<moviename>/about')
def show_movie_about(moviename):
    return 'Movie %s analytics, cast and other details' % moviename

@app.route('/browse')
def browse_movies():
    values = {}
    values["body_prop"] =  "id=explore"


    try:
        con = mdb.connect('127.0.0.1', 'root','123', 'movieathena')
        cur = con.cursor()

        cur.execute("select * from shortfilms")
        shortfilms=cur.fetchall()

        #shortfilms
        movies={}
        i=0
        for shortfilm in shortfilms:
            movies[i]={"id_shortfilm":shortfilm[0],"name":shortfilm[1],"youtube_link":shortfilm[3],"category":shortfilm[5]}
            i=i+1

        values["shortfilms"]=movies
        values["count"]=i-1


    except mdb.Error, e:
        print "Error %d: %s" % (e.args[0],e.args[1])
    finally:
        if con:    
            con.close()


    return render_template('explore.html', values=values)

@app.route('/browse/<category>')
def browse_movies_category(category):

    try:
        con = mdb.connect('127.0.0.1', 'root','123', 'movieathena')
        cur = con.cursor()

        cur.execute("select * from shortfilms where category=%s",category)
        shortfilms=cur.fetchall()

        #shortfilms
        movies={}
        i=0
        for shortfilm in shortfilms:
            movies[i]={"id_shortfilm":shortfilm[0],"name":shortfilm[1],"youtube_link":shortfilm[3],"category":shortfilm[5]}
            i=i+1

        values["shortfilms"]=movies
        values["count"]=i-1


    except mdb.Error, e:
        print "Error %d: %s" % (e.args[0],e.args[1])
    finally:
        if con:    
            con.close()

    return ' Browse %s movies here' % category
 

####
##### Form submit urls
####

@app.route('/login', methods=['POST'])
def login():
    email = "testing"
    password = "testing"

    if request.method == 'POST':
        if "email" in request.form:
            email = request.form['email']
        if "password" in request.form:
            password = request.form['password']

    return 'Login succesfull'

@app.route('/signup')
def sign_up():
    return 'Signup succesfully proceed to login'

####
##### Error handlers
####

@app.errorhandler(404)
def not_found(error):
    return "Better luck next time :P", 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8123)
