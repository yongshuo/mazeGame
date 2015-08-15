from django.db import models
from django.utils.translation import ugettext_lazy
from users.models import EntityLogin

class Map(models.Model):
    creator = models.ForeignKey(EntityLogin, null = True, blank = True)
    map_title = models.CharField('Map Title', max_length = 128, null = True, blank = True)
    map_description = models.TextField('Description', null = True, blank = True)
    map_text = models.TextField('Map Text', null = True, blank = True)
    map_width = models.SmallIntegerField('Map Width', null = True, blank = True)
    map_height = models.SmallIntegerField('Map Height', null = True, blank = True)
    create_time = models.DateTimeField(auto_now = True)
    
    class Meta:
        app_label = 'maze'
        db_table = 'maze_map'
        
    def __unicode__(self):
        return '%s %s' % (self.creator.email, self.map_title)
    
class GameHistory(models.Model):
    game_map = models.ForeignKey(Map, null = True, blank = True)
    player = models.ForeignKey(EntityLogin, null = True, blank = True)
    steps_spend = models.SmallIntegerField('Steps used', null = True, blank = True)
    start_time = models.DateTimeField('Start Time', null = True, blank = True)
    finish_time = models.DateTimeField('Finish Time', null = True, blank = True)
    
    class Meta:
        app_label = 'maze'
        db_table = 'maze_gamehistory'
        
    def __unicode__(self):
        return '%s %s' % (self.player.email, self.game_map.map_title)