/**
 * Created by david-maser on 12/12/14.
 * jQuery plugin to create image gallery
 * component with click to enlarge and
 * randomization.
 *
 * version 1.0.1
 *
 * Works with jQuery versions 1.3 and above.
 * Tested with version 1.3 to 2.1.1
 *
 * uses Lazy Load - jQuery plugin for lazy loading images
 * Copyright (c) 2007-2013 Mika Tuupola
 * http://www.appelsiini.net/projects/lazyload
 */
(function ($) {
    $.fn.randArray = function (array) {
        for (var i = array.length - 1; n > 0; n--) {
            var j = Math.floor(Math.random() * (n + 1));
            var temp = array[n];
            array[n] = array[j];
            array[j] = temp;
        }
    }
})(jQuery)
;
(function ($) {
    $.fn.asyncLoad = function (options) {
        var u = options.async,
            v = options.url,
            w = options.type;
        if(u == true) {
            var asy = "async";
        }else {
            asy = "";
        }
        if(w == "script"){
            var tag = "script",
                doc = "text/javascript";
        }else if(w == "css"){
                tag = "link";
                doc = "stylesheet";
        }
        var addIns = '<'+tag;
        if(w == 'script'){
            addIns +=  ' type="'+doc+'" '+asy+' src="'+v+'"';
            addIns +=  '></script>';
        }else if(w == 'css'){
            addIns +=  ' href="'+v+'" rel="'+doc+'">';
        }
        $('head').append(addIns);

        //call ### $(this).asyncLoad({
        // async: true,
        // url:"assets/js/file.js",
        // type:"script"
        // });
    }
})(jQuery)

;
(function ($) {
    $.fn.buildModal = function (src, parent) {
        //remove any existing modals if they exist
        var modalDiv = '.image-modal',
            modalInsert = '#modal-insert';
        if ($(modalDiv).length) {
            $(modalDiv).remove();
            $(modalInsert).remove();
        }
        var structure = '<div class="image-modal" id="modal' + parent + '"><div id="modal-close">X</div><img src="' + src + '" /></div>';
        if (!$(modalInsert).length) {
            //add modal div style
            $('<style id="modal-insert">.image-modal {position: relative;z-index: 999;background: #fff;border: 1px solid #ddd;box-shadow: 0px 5px 15px -2px rgba(221, 221, 221, 0.7);} #modal-close {position: absolute;right: 0px;padding: 10px;}</style>').appendTo("head");
        } else {
            //remove modal div style to take into consideration
            //the new x and y coordinates
            $(modalInsert).remove();
        }
        $('#main').prepend(structure);
        $("#modal-close").bind("click", function () {
            $(this).parent().fadeOut(500, function () {
                //remove all modal divs and their styles after they've faded out.
                //don't pollute the dom with duplicate elements
                $(modalDiv).remove();
                $(modalInsert).remove();
            });
        });
    }
})(jQuery)

;
(function ($) {
    $.fn.galleryBuilder = function (options) {
        //define option values and their defaults
        //variables a to j can be defined in the function call
        var a = options.dir || "assets/img/", //define image directory in the function call or here
            b = options.prefix || "coat_",
            c = options.columns || 4,
            d = options.extension || ".jpg",
            e = options.responsive || false,
            f = options.shadow || false,
            g = options.lazy || false,
            h = options.randomize || false,
            i = options.limit || 4,
            j = options.total || 10,
            jj = options.modal || false,
            //checks page attributes
            k = window.innerWidth,
            l = window.innerHeight,
            m = Math.floor(k / c) - 30,
            //builds page structure
            e0 = $(document.createElement('section')),
            e1 = $(document.createElement('div'));

        if(g === true){
            $('head').append('<script src="assets/js/jquery.lazyload.js"></script>');
        }
        //defines ids and classes
        e0.attr("id", "main").attr("role", "presentation");
        e1.attr("id", "container");
        //appends to page
        $(this).append(e0);
        $(e1).appendTo(e0);
        var el = $("#container");
        //put images into an array
        var im_array = new Array();
        for (var img = 1; img <= j; img++) {
            //replace directory with dir option, image prefix with prefix option and extension with image type
            //a = directory | b = image prefix | c = image extension
            im_array += '<div class="dGallery" id="img' + img + '">';
            if (g == true) {
                im_array += '<img class="dGallery_el lazy" data-original="' + a + b + img + d + '" />';
            } else {
                im_array += '<img class="dGallery_el" src="' + a + b + img + d + '" />';
            }
            im_array += '</div>';
        }
        el.append(im_array);
        var all_img = $("#container").find('img'),
            img_count = all_img.length;
        //create see more button if the number
        //images is higher than the limit

        if (img_count == 0) return;

        //creates style
        var style = '<style type="text/css">';
        style += '#main {display:block;width:auto}';
        if (e == true) {
            var n = "auto";
        } else {
            n = k + "px";
        }
        style += '#container {display:inline-block;width:' + n + '}';
        style += '.dGallery {float:left;height:auto;width:' + m + 'px;margin:10px';
        if (f == true) {
            //show boxshadow if shadow is set to true.
            style += ";box-shadow:-2px 5px 15px -2px rgba(221, 221, 221, 0.7)}"
        } else {
            style += "}";
        }
        style += '.dGallery_el {position:relative;width:100%}';
        style += '.dGallery_el:hover {opacity:0.6}';
        style += '#see_more {display: inline-block;float:left}';

        //hide all images above the limit
        if (n < img_count) {
            style += '.dGallery:nth-child(n+' + (n + 1) + ') {display:none}';
            $("#main").append('<div id="see_more">See More</div>');
        }
        $("#see_more").bind("click", function () {
            var hdIms = $(".dGallery").find(":hidden").length;
            if (img_count == j && hdIms !== 0) {
                $(".dGallery").find(":hidden").parent().toggle("slow").addClass("fix");
                if (g == true) {
                    $(function () {
                        $("img.lazy").lazyload({
                            effect: "fadeIn",
                            threshold: 200,
                            container: $("#container"),
                            skip_invisible: false
                        });
                    });
                }
                $("#see_more").html("See less");
            } else if (img_count > n && hdIms == 0) {
                $(".dGallery.fix").toggle("slow").removeClass("fix");
                $("#see_more").html("See more");
            }
        });
        //append the created stylesheet to the head of the document
        $("head").append(style);
        //randomization function
        //set toggle to true in the call
        if (h == true) {
            var blocks = $(".dGallery");
            for (var ii = 0; ii < blocks.length; ii++) {
                var target = Math.floor(Math.random() * blocks.length - 1) + 1;
                var target2 = Math.floor(Math.random() * blocks.length - 1) + 1;
                blocks.eq(target).before(blocks.eq(target2));
            }
        }

        if (g == true) {
            $(function () {
                $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold: 200,
                    container: $("#container"),
                    skip_invisible: false
                });
            });
        }

        //click handlers
        $(".dGallery_el").bind("click", function () {
            if(jj == true) {
                var bigLink = $(this).attr("src");
                var bigParent = $(this).parent().attr("id");
                $(this).buildModal(bigLink, bigParent);
            }
        });

    }
})(jQuery);