/**
 * Created by david-maser on 30/12/14.
 *
 * jQuery Parallax plugin that creates a parallax enabled
 * page from data pulled from an external json file.
 * The json file (elements.json) contains all information
 * for the section blocks.
 */
(function( $ ){
    $.fn.parallax = function (options) {
        var defaults = {
            parent: 'body',
            margin: 0,
            padding: 0,
            animation: {
                easing:'linear',//for extra easing methods, see http://gsgd.co.uk/sandbox/jquery/easing/
                easingPlugin:false,
                easingPluginPath:'assets/js/jquery.easing.1.3.js'
            },
            dataType: 'background',
            jsonData:'assets/ajax/elements.json'
        };

        var settings = $.extend( true, {}, defaults, options),
            n=0;
    // Cache the Window object
    $window = $(window);
       var ajx = $.ajax({
            url: settings.jsonData,
            dataType: 'json',
            cache: false,
            async: true,
            statusCode: {
                404: function() {
                    $('body').prepend('<div class="ajax-404">The file this script is trying to connect to doesn\'t exist</div>');
                }
            }
        }).done(function(data) {
           var css = '<style type="text/css" id="myStyle">body{margin:'+settings.margin+';padding:'+settings.padding+'}</style>';
           $('head').append(css);
           var items = [];
           for (var i in data.image) {
               items.push(data.image[i].children);
               iL = data.image.length;
           }
           while (n < iL) {
               var pageHtml = '<section id="'+data.image[n].id+'" ';
               pageHtml += 'data-speed="'+data.image[n].speed+'" ';
               pageHtml += 'data-type="'+data.image[n].type+'">';
               pageHtml += '<'+data.image[n].tag+'>'+data.image[n].text+'</'+data.image[n].tag+'>';
               pageHtml += '</section>';
               //css styless

               var pageCss = '#'+data.image[n].id;
               pageCss += '{background: url('+data.image[n].src+') 50% 0 repeat fixed;min-height:'+data.image[n].height+'px;height:'+data.image[n].height+'px;margin: 0 auto;width: 100%;max-width:'+data.image[n].width+'px;position: relative;';
               if(n>0){
                   pageCss += '-webkit-box-shadow: 0 0 50px rgba(0,0,0,0.8);box-shadow: 0 0 50px rgba(0,0,0,0.8);';
               }
               pageCss += '}';
               pageCss += '#'+data.image[n].id+' '+data.image[n].tag;
               pageCss += '{height: 458px;position: absolute;text-align: center;top: 150px;width: 100%;font-size:'+data.image[n].textSize+'px;color:'+data.image[n].textColor+'}';
               $(settings.parent).append(pageHtml);
               $('#myStyle').append(pageCss);
               n++;
            }

        }).always(function(){
           $('section[data-type="'+settings.dataType+'"]').each(function(){
               var $bgobj = $(this); // assigning the object

               $(window).scroll(function() {
                   var yPos = -($window.scrollTop() / $bgobj.data('speed'));
                   var coords = '50% '+ yPos + 'px';
                   $bgobj.css({ backgroundPosition: coords });

               });

           });
       });



};
})( jQuery );
