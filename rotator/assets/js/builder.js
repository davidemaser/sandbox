/**
 * Created by david-maser on 12/12/14.
 * jQuery plugin to create image gallery
 * page dom structure.
 */
;(function($) {
    $.fn.builder = function(options) {
        console.log(options.dir+ " / "+options.prefix);
        if(!options) {
            var a = "assets/img/";
            var b = "myImg_";
        }else {
            var a = options.dir;
            var b = options.prefix;
        }

        //builds page structure
        var e0 = $(document.createElement('nav')),
            e1 = $(document.createElement('header')),
            e2 = $(document.createElement('section')),
            e3 = $(document.createElement('div'));
        //defines ids and classes
        e0.attr("id","nav1").attr("role","navigation");
        e1.attr("id","site-header").attr("role","header");
        e2.attr("id","sub-head").attr("role","section");
        e3.attr("id","sequencer").addClass("container");
        //appends to page
        $("body").append(e0);
        $(e1).insertAfter(e0);
        $(e2).insertAfter(e1);
        $(e3).appendTo(e2);
        $("<ul>").appendTo("#sequencer");
        var el = $("#sequencer ul");
        //pulls images into an array
        var im_array = [];
        for (var img=1; img<= 10; img++)
            //im_array.push("assets/img/coat_" +img + ".jpg");
            //replace directory with dir option and image prefix with prefix option
            el.append('<li><img src="' + a + b + img + '.jpg" /></li>');
        //creates style
        var style = '<style type="text/css">';
        style += '#nav1 {display:block;width:100%}';
        style += '#site-header {display:block;width:100%}';
        style += '#sub-head {display:block;width:100%}';
        style += '#sub-head {display:block;width:100%}';
        $("head").append(style);
    }
})(jQuery);

$(document).ready(function(){
    $(this).builder({dir:'assets/img/', prefix:'coat_'});
    $(this).sequencer();
    //$('#sequence').each(function(){$(this).sequencer()});
    //$('#sequencer').each(function(){$(this).sequencer()});
});
