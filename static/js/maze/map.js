$(document).ready(function(e){
    get_my_maps();
});

function get_my_maps(){
    $.ajax({
        url: '/get_my_maps_ajax/',
        dataType: 'json',
        type: 'post',
        beforeSend: function(e){
            console.log(e);
        },
        success: function(e){
            for (var i = 0; i < e.details.length; i++) {
                var wrapper = $('<div>',{class: "col-xs-6 col-md-3 wrapper"});
                var thumbnail = $('<div>',{class: "thumbnail"});
                var map = $('<div>', {class: "map_"+e.details[i].map_id})
                var caption = $('<div>',{class: "caption"});
                
                caption.append('<h4>'+ e.details[i].map_title +'</h4>');
                caption.append('<p>'+ e.details[i].map_description +'</p>');
                caption.append('<p><a href="javascript:edit_map('+e.details[i].map_id+')" class="btn btn-sm btn-primary" role="button">'+gettext("Edit")+'</a> <a href="javascript:play('+e.details[i].map_id+')" class="btn btn-sm btn-success" role="button">'+gettext('Play')+'</a></p>');
                thumbnail.append(map).append(caption);
                wrapper.append(thumbnail);
                $('div#map_row').append(wrapper);
                console.log($('.wrapper').width());
                
                //calculate the width for each small block
                var block_width = $('.map_'+e.details[i].map_id).width() / parseInt(e.details[i].map_width);
                
                set_map(block_width, 'map_'+e.details[i].map_id, e.details[i].map_text, e.details[i].map_width, e.details[i].map_height);
            }
            
        },
        error: function(e){
            console.log(e);
        }
    })
}

function set_map(size, classname, map_text, map_width, map_height) {
    
    for (var i = 0; i < map_height; i++){
        //set each row's height and width
        var row = $('<div style="height:'+size+'px;width:'+size*map_width+'px;">',{class: "block_row"});
        for(var j = 0; j < map_width; j++){
            //set the block size
            row.append('<div style="width:'+size+'px;height:'+size+'px"class="block '+map_text[i * map_width + j]+'">');
        }
        $('div.'+classname).append(row);
    }
}