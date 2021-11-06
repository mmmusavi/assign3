
function get_data(){

    $('ul').html('');

    $.ajax({
        url:"http://127.0.0.1:3000/data",
        success:function(data){

            data.terms.forEach((element,i) => {
                
                $('ul').append('<li data-id="'+i+'">'+
                    '<button class="btn">'+element.term+'</button> '+
                    '<span>'+element.description+'</span> '+
                    '<a href="'+element.url+'">look here</a> '+
                    '<meter min="1" max="3" value="'+element.importance+'"></meter>'+
                '</li>');

            });

        }
    });
}

$(document).ready(function(){

    get_data();

    $(document).on('click','.btn',function(){
        
        var parent = $(this).parent();

        var meter = parent.children('meter');

        var val = parseFloat(meter.attr('value'));

        var new_val = val+1;

        if(new_val>3)new_val=1;

        meter.attr('value',new_val);
        
    });

    $(document).on('focusout','.btn',function(){
        
        var parent = $(this).parent();

        var id = parent.attr('data-id');

        var meter = parent.children('meter');

        var val = parseFloat(meter.attr('value'));

        $.ajax({
            url:"http://127.0.0.1:3000/upload",
            method:'post',
            data:{"id":id,"val":val}
        });
        
    });

    $('.refresh').click(function(){
        
        get_data();
        
    });

});