from django.core.handlers.wsgi import WSGIHandler
import django
import os, sys

class WSGIEnvironment(WSGIHandler):

    def __call__(self, environ, start_response):
	sys.path.append('/home/yongshuo/mazeGame')
	sys.path.append('/home/yongshuo/mazeGame/mazegameenv/lib/python2.7/site-packages/django')
	sys.path.append('/home/yongshuo/mazeGame/config')
	
        os.environ['MAZE_PROJECT_ROOT'] = environ['MAZE_PROJECT_ROOT']
	os.environ['MAZE_PROJECT_ENV'] = environ['MAZE_PROJECT_ENV']
	os.environ['MAZEDB_NAME'] = environ['MAZEDB_NAME']
	os.environ['MAZEDB_USER'] = environ['MAZEDB_USER']
	os.environ['MAZEDB_PASSWORD'] = environ['MAZEDB_PASSWORD']
	os.environ['MAZEDB_HOST'] = environ['MAZEDB_HOST']
	
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
        django.setup()

        return super(WSGIEnvironment, self).__call__(environ, start_response)

application = WSGIEnvironment()