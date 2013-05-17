from uuid import uuid4

import web
from couchdb.client import Server, PermanentView



urls = ('/', 'main'
        )

app = web.application(urls, globals())
render = web.template.render('templates/')

session = web.session.Session(app, web.session.DiskStore('sessions'), initializer={'count': 0})
#DATABASE
#sql_db = web.database(dbn='mysql', host="127.0.0.1", db='tweet_stream_db', port=3306, user='root', pw='hello123')


# connect to the database
s = Server()

class user:
    def GET(self):
        values ={}
        web.header('Content-Type', 'text/html')
        return render.user(values);

if __name__ == '__main__':
    app.run()

    