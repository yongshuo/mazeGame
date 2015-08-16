var text = '';
var width = 1;
var height = 1;
var current_row = 1;
var current_col = 1;
var window_height = 1;
var steps_spend = 0;

$(document).ready(function(e){
    text = $('#map_text').val();
    width = $('#map_width').val();
    height = $('#map_height').val();
    
    window_height = $(window).height() - 100;;
    
    load_map();	
    document.addEventListener("keydown", detect_move, false);
    
});

function save_game_history(){
    $.ajax({
	url: '/save_game_history_ajax/',
	dataType :'json',
	type: 'post',
	data: {
	    'map_id': $('#map_id').val(),
	    'steps' : steps_spend,
	},
	success: function(e){
	    console.log('Saved success');
	},
	error : function(e){
	    console.log('Error');
	}
    });    
}

function restart_game(){
    window.location.reload();    
}

function load_map(){

    for (var i = 0; i < height; i++){
        var row = $('<div>',{class: "row"});
        for(var j = 0; j < width; j++){
            row.append('<div class="block '+text[i * width + j]+'" style="width:'+window_height/width+'px;height:'+window_height/width+'px;">');
            if (text[i * width + j] == 'G'){
            	current_row = i;
                current_col = j;
            }
        }
        $('div#map').append(row);
    }
    
    set_vision();
    set_player();
}

function set_player(){
    var row = current_row + 1;
    var col = current_col + 1;
    
    $('div#map').find('.row:nth-child('+row+')').find('div:nth-child('+col+')').append('<div class="object" style="width:'+(window_height/width-(window_height/width/5))+'px;height:'+(window_height/width-(window_height/width/5))+'px;margin:'+(window_height/width/10)+'px;"></div>');
    
    $('#step_spend').val(steps_spend);
    steps_spend += 1;
    
    if (text[(current_row) * width + current_col] == 'E'){
    	$('#win_game').show();
	save_game_history();
    }
}

function set_vision(){

    //hide vision to all block
    $('.block').addClass('unvisible');
    
    $('.E').removeClass('unvisible');
    //check on right of current position
    var wall_showed_right = false;
    for (var i = current_col; i < width; i++){
    	if (text[current_row * width + i] == 'W' && wall_showed_right == false){
        	$('div#map').find('.row:nth-child('+(current_row+1)+')').find('div:nth-child('+(i+1)+')').removeClass('unvisible');
            wall_showed_right = true;
        }
        if ((text[current_row * width + i] == 'G' || 
            text[current_row * width + i] == 'P' || 
            text[current_row * width + i] == 'E' || 
            text[current_row * width + i] == 'W') && wall_showed_right == false){
            
            $('div#map').find('.row:nth-child('+(current_row+1)+')').find('div:nth-child('+(i+1)+')').removeClass('unvisible');
        }
    }
    
    //check on left of current position
    var wall_showed_left = false;
    for (var i = current_col; i >= 0; i--){
    	if (text[current_row * width + i] == 'W' && wall_showed_left == false){
        	$('div#map').find('.row:nth-child('+(current_row+1)+')').find('div:nth-child('+(i+1)+')').removeClass('unvisible');
            wall_showed_left = true;
        }
        if ((text[current_row * width + i] == 'G' || 
            text[current_row * width + i] == 'P' || 
            text[current_row * width + i] == 'E' || 
            text[current_row * width + i] == 'W') && wall_showed_left == false){
            
            $('div#map').find('.row:nth-child('+(current_row+1)+')').find('div:nth-child('+(i+1)+')').removeClass('unvisible');
        }
    }
    
    //check on top of current position
    var wall_showed_top  = false;
    console.log(wall_showed_top);
    for (var i = current_row; i >= 0; i--){
    	if (text[i * width + current_col] == 'W' && wall_showed_top == false){
        	$('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
            wall_showed_top = true;
        }
        if ((text[i * width + current_col] == 'G' || 
            text[i * width + current_col] == 'P' || 
            text[i * width + current_col] == 'E' || 
            text[i * width + current_col] == 'W') && wall_showed_top == false){
            
            $('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
        }
    }
    
     //check on top of current position
    var wall_showed_down = false;
    for (var i = current_row; i < height; i++){
    	if (text[i * width + current_col] == 'W' && wall_showed_down == false){
        	$('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
            wall_showed_down = true;
        }
        if ((text[i * width + current_col] == 'G' || 
            text[i * width + current_col] == 'P' || 
            text[i * width + current_col] == 'E' || 
            text[i * width + current_col] == 'W') && wall_showed_down == false){
            
            $('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
        }
    }
}

function handle_move_up(){
    
    if (current_row <= 0 || text[(current_row-1) * width + current_col] == 'W'){
    	return;
    }else{
        current_row = current_row - 1;
        $('.object').remove();
        set_vision();
        set_player();
    }
}

function handle_move_down(){
    
    if ((current_row+1) >= height || text[(current_row+1) * width + current_col] == 'W'){
    	return;
    }else{
        current_row = current_row + 1;
        $('.object').remove();
        set_vision();
        set_player();
    }
}
function handle_move_left(){
  
    if (current_col <= 0  || text[(current_row) * width + current_col-1] == 'W'){
    	return;
    }else{
        current_col = current_col - 1;
        $('.object').remove();
        set_vision();
        set_player();
    }
}
function handle_move_right(){
    
    if ((current_col+1) >= width || text[(current_row) * width + current_col+1] == 'W'){
    	return;
    }else{
        current_col = current_col + 1;
        $('.object').remove();
        set_vision();
        set_player();
    }
}
function detect_move(e){
    
    if (e.keyIdentifier == 'Left'){
    	handle_move_left();
    }else if(e.keyIdentifier == 'Right'){
    	handle_move_right();
    }else if(e.keyIdentifier == 'Up'){
    	handle_move_up();
    }else if(e.keyIdentifier == 'Down'){
    	handle_move_down();
    }else{
    	console.log('Invalid key');
    }
}
