$(document).ready(function(e){
    //Global varibales
    var current_row = 1;
    var current_col = 1;
   
	load_map();	
    document.addEventListener("keydown", detect_move, false);
    
});

function load_map(){
    var text = "WWWEPPPPGWWW";
    var width = 4;
	var height = 3;
    
    
    for (var i = 0; i < height; i++){
        var row = $('<div>',{class: "row"});
        for(var j = 0; j < width; j++){
            row.append('<div class="block '+text[i * width + j]+'">');
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
    var text = "WWWEPPPPGWWW";
    var width = 4;
	var height = 3;
    
    var row = current_row + 1;
    var col = current_col + 1;
    
	$('div#map').find('.row:nth-child('+row+')').find('div:nth-child('+col+')').append('<div class="object"></div>');
    
    if (text[(current_row) * width + current_col] == 'E'){
    	alert('You are win');
    }
}

function set_vision(){
	var text = "WWWEPPPPGWWW";
    var width = 4;
	var height = 3;
    
    //hide vision to all block
	$('.block').addClass('unvisible');
    
    //check on right of current position
    var wall_showed_right = false;
    for (var i = current_col; i < width; i++){
    	if (text[current_row * width + i] == 'W' && wall_showed_right == false){
        	$('div#map').find('.row:nth-child('+(current_row+1)+')').find('div:nth-child('+(i+1)+')').removeClass('unvisible');
            wall_showed_right = true;
        }
        if (text[current_row * width + i] == 'G' || 
            text[current_row * width + i] == 'P' || 
            text[current_row * width + i] == 'E' || 
            (text[current_row * width + i] == 'W' && wall_showed_right == false)){
            
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
        if (text[current_row * width + i] == 'G' || 
            text[current_row * width + i] == 'P' || 
            text[current_row * width + i] == 'E' || 
            (text[current_row * width + i] == 'W' && wall_showed_left == false)){
            
        	$('div#map').find('.row:nth-child('+(current_row+1)+')').find('div:nth-child('+(i+1)+')').removeClass('unvisible');
        }
    }
    
    //check on top of current position
    var wall_showed_top = false;
    for (var i = current_row; i >= 0; i--){
    	if (text[i * height + current_col] == 'W' && wall_showed_top == false){
        	$('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
            wall_showed_top = true;
        }
        if (text[i * height + current_col] == 'G' || 
            text[i * height + current_col] == 'P' || 
            text[i * height + current_col] == 'E' || 
            (text[i * height + current_col] == 'W' && wall_showed_top == false)){
            
        	$('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
        }
    }
    
     //check on top of current position
    var wall_showed_down = false;
    for (var i = current_row; i < height; i++){
    	if (text[i * height + current_col] == 'W' && wall_showed_down == false){
        	$('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
            wall_showed_down = true;
        }
        if (text[i * height + current_col] == 'G' || 
            text[i * height + current_col] == 'P' || 
            text[i * height + current_col] == 'E' || 
            (text[i * height + current_col] == 'W' && wall_showed_down == false)){
            
        	$('div#map').find('.row:nth-child('+(i+1)+')').find('div:nth-child('+(current_col+1)+')').removeClass('unvisible');
        }
    }
}

function handle_move_up(){
    var text = "WWWEPPPPGWWW";
    var width = 4;
	var height = 3;
    
    console.log('row '+(current_row -1));
    console.log('col '+current_col);
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
    var text = "WWWEPPPPGWWW";
    var width = 4;
	var height = 3;
    console.log('row '+(current_row +1));
    console.log('col '+current_col);
    
    if (current_row >= height || text[(current_row+1) * width + current_col] == 'W'){
    	return;
    }else{
        current_row = current_row + 1;
        $('.object').remove();
        set_vision();
        set_player();
    }
}
function handle_move_left(){
    var text = "WWWEPPPPGWWW";
    var width = 4;
	var height = 3;
    
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
    var width = 4;
	var height = 3;
    var text = "WWWEPPPPGWWW";
    
    if (current_row >= width || text[(current_row) * width + current_col+1] == 'W'){
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
