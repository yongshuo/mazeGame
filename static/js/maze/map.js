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
                var wrapper = $('<div>',{class: "map_thumbnail"});
                var thumbnail = $('<div>',{class: "thumbnail"});
                var map = $('<div>', {class: "map_"+e.details[i].map_id})
                var caption = $('<div>',{class: "caption"});
                
                caption.append('<h4>'+ e.details[i].map_title +'</h4>');
                caption.append('<p>'+ e.details[i].map_description +'</p>');
                caption.append('<p><a href="javascript:edit_map('+e.details[i].map_id+')" class="btn btn-sm btn-primary" role="button">'+gettext("Edit")+'</a> <a href="javascript:play('+e.details[i].map_id+')" class="btn btn-sm btn-success" role="button">'+gettext('Play')+'</a></p>');
                thumbnail.append(map).append(caption);
                wrapper.append(thumbnail);
                $('div#map_row').append(wrapper);
                set_map('map_'+e.details[i].map_id, e.details[i].map_text, e.details[i].map_width, e.details[i].map_height);
                
            }
            
        },
        error: function(e){
            console.log(e);
        }
    })
}

function set_map(classname, map_text, map_width, map_height) {

    for (var i = 0; i < map_height; i++){
        var row = $('<div>',{class: "block_row"});
        for(var j = 0; j < map_width; j++){
            
            row.append('<div class="block '+map_text[i * map_width + j]+'">');
        }
        $('div.'+classname).append(row);
    }
}