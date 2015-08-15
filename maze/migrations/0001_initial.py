# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameHistory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('steps_spend', models.SmallIntegerField(null=True, verbose_name=b'Steps used', blank=True)),
                ('start_time', models.DateTimeField(null=True, verbose_name=b'Start Time', blank=True)),
                ('finish_time', models.DateTimeField(null=True, verbose_name=b'Finish Time', blank=True)),
            ],
            options={
                'db_table': 'maze_gamehistory',
            },
        ),
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('map_title', models.CharField(max_length=128, null=True, verbose_name=b'Map Title', blank=True)),
                ('map_description', models.TextField(null=True, verbose_name=b'Description', blank=True)),
                ('map_text', models.TextField(null=True, verbose_name=b'Map Text', blank=True)),
                ('map_width', models.SmallIntegerField(null=True, verbose_name=b'Map Width', blank=True)),
                ('map_height', models.SmallIntegerField(null=True, verbose_name=b'Map Height', blank=True)),
                ('create_time', models.DateTimeField(auto_now=True)),
                ('creator', models.ForeignKey(blank=True, to='users.EntityLogin', null=True)),
            ],
            options={
                'db_table': 'maze_map',
            },
        ),
        migrations.AddField(
            model_name='gamehistory',
            name='game_map',
            field=models.ForeignKey(blank=True, to='maze.Map', null=True),
        ),
        migrations.AddField(
            model_name='gamehistory',
            name='player',
            field=models.ForeignKey(blank=True, to='users.EntityLogin', null=True),
        ),
    ]
