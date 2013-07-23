from flask import Flask,render_template ,request,abort
import MySQLdb as mdb

app = Flask(__name__)      

####
##### App configurations
####

app.secret_key = 'aplha_pressure_cooker_omega'

####
##### App view 
####

@app.route('/')
def landingPage():
    values = {}
    values["body_prop"] =  "id=landingPage"
    return render_template('landingpage.html',values=values)

@app.route('/showcase')
def showcase():
    values = {}
    values["body_prop"] =  "id=showcase"
    return render_template('newmovie.html',values=values)
@app.route('/testing')
def testings():
    values = {}
    return render_template('facebook.html',values=values)
@app.route('/user/<username>')
def show_user_profile(username=None):
    # show the user profile for that user
    artist=""
    shortfilms=""
    con=""
    values = {}

    values["body_prop"] =  "id=profile"

    try:
        con = mdb.connect('127.0.0.1', 'root','hello123', 'movieathena')
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

@app.route('/<urlmoviename>')
def show_movie(urlmoviename):
    moviename=urlmoviename.lower().replace("-"," ")
    shortfilm="boo"
    con=""
    artists=""

    try:
        con = mdb.connect('127.0.0.1', 'root','hello123', 'movieathena')
        cur = con.cursor()

        cur.execute("select * from shortfilms where name=%s",moviename)
        shortfilm=cur.fetchone()
        if shortfilm == None:
            abort(404)
        else:
            cur.execute("SELECT * FROM artistlist where shortfilm=%s",shortfilm[0])
            artists=cur.fetchall()


    except mdb.Error, e:
        print "Error %d: %s" % (e.args[0],e.args[1])
    finally:
        if con:    
            con.close()

    values={}
    values['shortfilm']=shortfilm
    values['artists']=artists
    values["body_prop"] =  "id=moviePage"
    # return 'Movie %s %s' % (str(shortfilm),str(artists))
    return render_template('moviepage.html', values=values)

@app.route('/<moviename>/about')
def show_movie_about(moviename):
    return 'Movie %s analytics, cast and other details' % moviename

@app.route('/browse')
def browse_movies():
    values = {}
    values["body_prop"] =  "id=explore"
    con=""

    try:
        con = mdb.connect('127.0.0.1', 'root','hello123', 'movieathena')
        cur = con.cursor()

        cur.execute("select * from shortfilms")
        shortfilms=cur.fetchall()

        #shortfilms
        movies={}
        i=-1
        for shortfilm in shortfilms:
            movies[i]={"id_shortfilm":shortfilm[0],"name":shortfilm[1],"youtube_link":shortfilm[3],"category":shortfilm[5]}
            i=i+1

        values["shortfilms"]=movies
        values["count"]=i


    except mdb.Error, e:
        print "Error %d: %s" % (e.args[0],e.args[1])
    finally:
        if con:    
            con.close()


    return render_template('explore.html', values=values)

@app.route('/browse/<category>')
def browse_movies_category(category):
    values = {}
    con=""

    try:
        con = mdb.connect('127.0.0.1', 'root','hello123', 'movieathena')
        cur = con.cursor()

        cur.execute("select * from shortfilms where category=%s",category)
        shortfilms=cur.fetchall()

        #shortfilms
        movies={}
        i=-1
        for shortfilm in shortfilms:
            movies[i]={"id_shortfilm":shortfilm[0],"name":shortfilm[1],"youtube_link":shortfilm[3],"category":shortfilm[5]}
            i=i+1

        values["shortfilms"]=movies
        values["count"]=i


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
	login_manager = Login_Manager()
	login_manager.init_app(app)


    # email = "testing"
    # password = "testing"

    # if request.method == 'POST':
    #     if "email" in request.form:
    #         email = request.form['email']
    #     if "password" in request.form:
    #         password = request.form['password']

    # return 'Login succesfull'

@app.route('/signup')
def sign_up():
    name=""
    email=""

    if request.method=='POST':
        if "name" in request.form:
            name=request.form['name']
        if "email" in request.form:
            email = request.form['email']
        if "work_field" in request.form:
            work_field = request.form['work_field']

    return 'Signup succesfully proceed to login'

@app.route('/add/shortfilm')
def add_shortfilm():
    return "shortfilm added"

####
##### Error handlers
####

@app.errorhandler(404)
def not_found(error):
    return "Signup to get that url !", 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8123)
