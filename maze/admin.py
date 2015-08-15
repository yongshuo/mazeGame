from django.contrib import admin
from models import GameHistory, Map

class MapAdmin(admin.ModelAdmin):
    pass

admin.site.register(Map, MapAdmin)

class GameHistoryAdmin(admin.ModelAdmin):
    pass

admin.site.register(GameHistory, GameHistoryAdmin)
