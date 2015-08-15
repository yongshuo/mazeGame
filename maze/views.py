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
        redirect('/login/')
    
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
        redirect('/login/')
        
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
                'map_text' : m.map_text.strip().replace('\n',''),
                'map_width' : str(m.map_width),
                'map_height' : str(m.map_height),
                'map_description' : m.map_description.encode('utf-8'),
            })
            
    return_data['details'] = details
        
    return HttpResponse(json.dumps(return_data), content_type = 'application/json')
        
def create_map(request):
    if request.session.has_key('EMAIL') == False:
        redirect('/login/')
        
    context = {}
    
    context['TAB'] = 'MAZEMAP'
    context['NAME'] = request.session['NAME']
    
    return render_to_response(
            'maze/create_map.html',
            context,
            context_instance = RequestContext(request)
        )
    