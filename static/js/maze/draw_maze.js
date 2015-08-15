
var selected_val = 'W';
var key_pressed = false;

$(document).ready(function(e){
   $("input[name='brush']").click(function(){
        selected_val = $('input:radio[name=brush]:checked').val();
    });
   
});

function draw_map() {
    var width = $('#map_width').val();
    var height = $('#map_height').val();
    $('#create_map').html('');
    
    for (var i = 0; i < parseInt(width); i++){
        var row = $('<div>',{class: "block_row"});
        for(var j = 0; j < parseInt(height); j++){
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
