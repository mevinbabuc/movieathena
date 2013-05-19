from flask import Flask, render_template
 
app = Flask(__name__)      
 
@app.route('/')
def landingPage():
    return render_template('landingPage.html')

@app.route('/user/<username>')
def show_user_profile(username=None):
    # show the user profile for that user
    return render_template('user.html',username=username)

@app.route('/<moviename>')
def show_post(moviename):
    return 'Movie %s' % moviename
 
@app.errorhandler(404)
def not_found(error):
    return "Better luck next time :P", 404


if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8123)