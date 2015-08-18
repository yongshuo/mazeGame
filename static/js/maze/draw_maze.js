
var selected_val = 'W';
var key_pressed = false;

$(document).ready(function(e){
   $("input[name='brush']").click(function(){
        selected_val = $('input:radio[name=brush]:checked').val();
    });
   
});

function load_map(){
   var width = $('#map_width option:selected').val();
   var height = $('#map_height option:selected').val();
   var map_text = $('#map_text').val();
   
   $('#create_map').html('');
   
   for (var i = 0; i < parseInt(height); i++){
       var row = $('<div>',{class: "block_row"});
       for(var j = 0; j < parseInt(width); j++){
           var block = $('<div>', {class: "block "+map_text.charAt(i * width + j)});
           
           row.append(block);
       }
       $('#create_map').append(row);
   }

   $(document).keypress(function(e){
       if (e.keyCode == 32) {
           key_pressed = true;
       }
   });
  
   $(document).keyup(function(e){
        if (e.keyCode == 32) {
            key_pressed = false;
        }
    });
        
    $("div.block").mouseover(function(e){
        
        if(key_pressed) {
            toggle_draw(this);
        }
    });
    
    $("div.block").click(function(){
        toggle_draw(this);
    });
}

function draw_map() {
    var width = $('#map_width option:selected').val();
    var height = $('#map_height option:selected').val();
    $('#create_map').html('');
    
    for (var i = 0; i < parseInt(height); i++){
        var row = $('<div>',{class: "block_row"});
        for(var j = 0; j < parseInt(width); j++){
            var block = $('<div>', {class: "block D"});
            
            row.append(block);
        }
        $('#create_map').append(row);
    }

    $(document).keypress(function(e){
        if (e.keyCode == 32) {
            key_pressed = true;
        }
    });
   
   $(document).keyup(function(e){
        if (e.keyCode == 32) {
            key_pressed = false;
        }
    });
        
    $("div.block").mouseover(function(e){
        
        if(key_pressed) {
            console.log("the  key is pressed");
            toggle_draw(this);
        }
    });
    
    $("div.block").click(function(){
        toggle_draw(this);
    });
}

function toggle_draw(e){
    var classname = $(e).prop('class');
    if (classname == 'block D'){
        $(e).removeClass('D').addClass(selected_val);
    }else{
        $(e).removeClass(classname).addClass('block D');
    }
}

function auto_create_map(){
    $('#create_map').children('div.block_row').each(function(e){
        $(this).children('div.block').each(function(e){
            //random number 1 or 2
            var x = Math.floor((Math.random() * 2) + 1);
            
            //x = 1 stand for generate wall
            if (x == 1 && $(this).hasClass('D')) {
                $(this).removeClass('D').addClass('W');
            }else if (x == 2 && $(this).hasClass('D')) {
                $(this).removeClass('D').addClass('P');
            }
        });
    });
}

function save_map(){
    var map_text = '';
    
    $('#create_map').children('div.block_row').each(function(e){
        $(this).children('div.block').each(function(e){
            if ($(this).hasClass('D') || $(this).hasClass('W')) {
                map_text = map_text + 'W';     
            }else if ($(this).hasClass('E')) {
                map_text = map_text + 'E';
            }else if ($(this).hasClass('G')) {
                map_text = map_text + 'G';
            }else if ($(this).hasClass('P')) {
                map_text = map_text + 'P';
            }
        });
    });
    
    var map_title = $('#map_title').val();
    var map_width = $('#map_width option:selected').val();
    var map_height = $('#map_height option:selected').val();
    var map_description = $('#map_description').val();
    
    $.ajax({
        url : '/save_map_ajax/',
        dataType: 'json',
        type: 'post',
        data: {
            'map_title' : map_title,
            'map_width' : map_width,
            'map_height' : map_height,
            'map_description' : map_description,
            'map_text' : map_text,
        },
        beforeSend: function(e){
            $('#save_info').show();
        },
        success: function(e){
            $('#save_info').hide();
            $('#save_success').show();
        },
        error : function(e){
            $('#save_info').hide();
            $('#save_error').show();
        }
    });
}

function update_map(){
   var map_text = '';
    
    $('#create_map').children('div.block_row').each(function(e){
        $(this).children('div.block').each(function(e){
            if ($(this).hasClass('D') || $(this).hasClass('W')) {
                map_text = map_text + 'W';     
            }else if ($(this).hasClass('E')) {
                map_text = map_text + 'E';
            }else if ($(this).hasClass('G')) {
                map_text = map_text + 'G';
            }else if ($(this).hasClass('P')) {
                map_text = map_text + 'P';
            }
        });
    });
    
    var map_title = $('#map_title').val();
    var map_width = $('#map_width option:selected').val();
    var map_height = $('#map_height option:selected').val();
    var map_description = $('#map_description').val();
    var map_id = $('#map_id').val();
    
    $.ajax({
        url : '/save_map_ajax/',
        dataType: 'json',
        type: 'post',
        data: {
            'map_id' : map_id,
            'map_title' : map_title,
            'map_width' : map_width,
            'map_height' : map_height,
            'map_description' : map_description,
            'map_text' : map_text,
        },
        beforeSend: function(e){
            $('#save_info').show();
        },
        success: function(e){
            $('#save_info').hide();
            $('#save_success').show();
        },
        error : function(e){
            $('#save_info').hide();
            $('#save_error').show();
        }
    });
}