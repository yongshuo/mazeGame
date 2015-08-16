from django.conf.urls import include, url, patterns
from django.contrib import admin
import settings, os

admin.autodiscover()

js_info_dict = {
    'packages': (os.path.join(settings.APP_ROOT,'config'),)
}

urlpatterns = [
    url(r'^jsi8n/$', 'django.views.i18n.javascript_catalog', js_info_dict),
    
    url(r'^change_language_ajax/$', 'users.views.change_language_ajax'),
    url(r'^$', 'maze.views.mazegame'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^home/$', 'maze.views.mazegame'),
    url(r'^register/$', 'users.views.register'),
    url(r'^register_action/$', 'users.views.register_action'),
    url(r'^login/$', 'users.views.login'),
    url(r'^login_action/$', 'users.views.login_action'),
    url(r'^account/$', 'users.views.account'),
    url(r'^logout/$', 'users.views.logout'),
    url(r'^update_account/$', 'users.views.update_account'),
    url(r'^map/$', 'maze.views.map'),
    url(r'^get_my_maps_ajax/$', 'maze.views.get_my_maps_ajax'),
    url(r'^create_map/$', 'maze.views.create_map'),
    url(r'^save_map_ajax/$', 'maze.views.save_map_ajax'),
    url(r'^delete_map_ajax/$', 'maze.views.delete_map_ajax'),
    url(r'^edit_map/$', 'maze.views.edit_map'),
    url(r'^mazegame/$', 'maze.views.mazegame'),
    url(r'^load_all_maps/$', 'maze.views.load_all_maps'),
    url(r'^play_game/$', 'maze.views.play_game'),
    url(r'^save_game_history_ajax/$', 'maze.views.save_game_history_ajax'),
]

if settings.DEBUG == False:
    urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root' : settings.STATIC_ROOT}),
    )