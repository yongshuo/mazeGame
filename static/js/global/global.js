function change_language(language){
    $.ajax({
        url : '/change_language_ajax/',
        data : {
            'lang' : language,
        },
        type : 'post',
        dataType:'json',
        success:function(e){
            window.location.reload();
        }
    });
}