from django.contrib import admin
from models import EntityLogin

class EntityLoginAdmin(admin.ModelAdmin):
    pass

admin.site.register(EntityLogin, EntityLoginAdmin)