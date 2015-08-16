from django.shortcuts import render, render_to_response, redirect
from django.template import RequestContext
from django.utils.translation import ugettext_lazy
from django.utils import translation
from users.models import EntityLogin
from maze.models import GameHistory, Map

from django.http import HttpResponse
import json

def map(request):
    
    if request.session.has_key('EMAIL') == False:
        return redirect('/login/')
    
    context = {}
    
    context['TAB'] = 'MAZEMAP'
    context['NAME'] = request.session['NAME']
    
    return render_to_response(
            'maze/map.html',
            context,
            context_instance = RequestContext(request)
        )

def get_my_maps_ajax(request):
    if request.session.has_key('EMAIL') == False:
        return redirect('/login/')
        
    return_data = {}
    details = []
    
    try:
        entity_login = EntityLogin.objects.get(email = request.session['EMAIL'])
    except Exception as e:
        raise Exception(e.args[0])
    else:
        maps = Map.objects.filter(creator = entity_login)
        for m in maps:
            details.append({
                'map_id' : str(m.id),
                'map_title' : m.map_title.encode('utf-8'),
                'map_text' : m.map_text,
                'map_width' : str(m.map_width),
                'map_height' : str(m.map_height),
                'map_description' : m.map_description.encode('utf-8'),
            })
            
    return_data['details'] = details
        
    return HttpResponse(json.dumps(return_data), content_type = 'application/json')
        
def create_map(request):
    if request.session.has_key('EMAIL') == False:
        return redirect('/login/')
        
    context = {}
    
    context['TAB'] = 'MAZEMAP'
    context['NAME'] = request.session['NAME']
    
    return render_to_response(
            'maze/create_map.html',
            context,
            context_instance = RequestContext(request)
        )

def save_map_ajax(request):
    if request.session.has_key('EMAIL') == False:
        return redirect('/login/')
    
    map_title = request.POST.get('map_title', '')
    map_width = request.POST.get('map_height', '')
    map_height = request.POST.get('map_height', '')
    map_description = request.POST.get('map_description', '')
    map_text = request.POST.get('map_text', '')
    map_id = request.POST.get('map_id','')
    
    try:
        entity_login = EntityLogin.objects.get(email = request.session['EMAIL'])
    except Exception as e:
        raise Exception(e.args[0])
    else:
        if map_id:
            try:
                maze_map = Map.objects.get(id = int(map_id))
            except Exception as e:
                raise Exception(e.args[0])
            else:
                maze_map.map_title = map_title
                maze_map.map_width = int(map_width)
                maze_map.map_height = int(map_height)
                maze_map.map_description = map_description
                maze_map.map_text = map_text
                maze_map.save()
        else:
            maze_map = Map(creator = entity_login, map_title = map_title,
                           map_height = int(map_height),map_width = int(map_width),
                           map_description = map_description, map_text = map_text)
            maze_map.save()
    
    return_data = {}
    
    return HttpResponse(json.dumps(return_data), content_type = 'application/json')
    
def delete_map_ajax(request):
    if request.session.has_key('EMAIL') == False:
        return redirect('/login/')
    
    map_id = request.POST.get('id', '')
    
    try:
        maps = Map.objects.get(id = int(map_id))
    except Exception as e:
        raise Exception(e.args[0])
    else:
        maps.delete()
    
    return_data = {}
    
    return HttpResponse(json.dumps(return_data), content_type = 'application/json')

def edit_map(request):
    if request.session.has_key('EMAIL') == False:
        return redirect('/login/')
            
    context = {}
    
    context['TAB'] = 'MAZEMAP'
    context['NAME'] = request.session['NAME']
    
    map_id = request.GET.get('id','')
    
    try:
        m = Map.objects.get(id = int(map_id))
    except Exception as e:
        context['Error'] = e.args[0]
    else:
        context['map_id'] = str(m.id)
        context['map_title'] = m.map_title.encode('utf-8')
        context['map_width'] = str(m.map_width)
        context['map_height'] = str(m.map_height)
        context['map_text'] = m.map_text
        context['map_description'] = m.map_description
    
    return render_to_response(
        'maze/edit_map.html',
        context,
        context_instance = RequestContext(request)
    )

def mazegame(request):
    
    context = {}
    context['TAB'] = 'MAZEGAME'
    context['NAME'] = request.session['NAME'] if request.session.has_key('NAME') else ''
    
    return render_to_response(
        'maze/mazegame.html',
        context,
        context_instance = RequestContext(request)
    )

def load_all_maps(request):
  
    return_data = {}
    details = []
    maps = Map.objects.all()
    for m in maps:
        details.append({
            'map_id' : str(m.id),
            'map_title' : m.map_title.encode('utf-8'),
            'map_text' : m.map_text,
            'map_width' : str(m.map_width),
            'map_height' : str(m.map_height),
            'map_description' : m.map_description.encode('utf-8'),
        })
        
    return_data['details'] = details
        
    return HttpResponse(json.dumps(return_data), content_type = 'application/json')

def play_game(request):
    context = {}
    context['TAB'] = 'MAZEGAME'
    context['NAME'] = request.session['NAME'] if request.session.has_key('NAME') else ''
    
    map_id = request.GET.get('id','')
    
    try:
        m = Map.objects.get(id = int(map_id))
    except Exception as e:
        context['Error'] = e.args[0]
    else:
        context['map_id'] = str(m.id)
        context['map_title'] = m.map_title.encode('utf-8')
        context['map_width'] = str(m.map_width)
        context['map_height'] = str(m.map_height)
        context['map_text'] = m.map_text
        context['map_description'] = m.map_description
    
    return render_to_response(
        'maze/playgame.html',
        context,
        context_instance = RequestContext(request)
    )

def save_game_history_ajax(request):
    map_id = request.POST.get('map_id','')
    steps = request.POST.get('steps','')
    
    try:
        entity_login = EntityLogin.objects.get(email = request.session['EMAIL'])
    except Exception as e:
        print e
        return HttpResponse(json.dumps({}), content_type = 'application/json')
    else:
        try:
            maps = Map.objects.get(id = int(map_id))
        except Exception as e:
            print e
            return HttpResponse(json.dumps({}), content_type = 'application/json')
        else:
            try:
                history = GameHistory(player = entity_login, game_map = maps, steps_spend = steps)
                history.save()
            except Exception as e:
                print e
                return HttpResponse(json.dumps({}), content_type = 'application/json')
    
    return HttpResponse(json.dumps({}), content_type = 'application/json')