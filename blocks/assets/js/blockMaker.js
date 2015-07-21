/**
 * Created by david-maser on 18/12/14 - david.maser@altitude-sports.com
 *
 * jQuery plugin that creates a responsive block
 * structure (ideally for images or blog posts)
 * into which data can loaded by ajax.
 * See options (lines 11-24 to explore the extensible
 * features of this plugin.
 *
 * Requires jQuery plugin 1.4+
 */

(function($) {
    $.fn.sorthThis = function() {
        $('#blockLayout').html(localStorage.getItem("divorder"))
    }
})( jQuery);

(function( $ ){
    $.fn.arrSort= function(prefix, lst) {
        for (var x=0; x<lst.length; x++)
            $(this).append($('#'+prefix+lst[x]));
        $('#block')
    };
})( jQuery );

(function ($) {
    $.fn.blockMaker = function (options) {
        var a = options.count,
            b = options.type || 'div',
            c = options.float || 'none',
            d = options.width || 100 || null,
            dd = options.draggable || false,
            e = options.height || 100 || 'auto',
            f = options.background || 'fff',
            fg = options.border || null,
            g = options.opacity || '1' || 'random',
            h = options.data || null,
            i = options.clear || 'none' || null,
            j = options.margin || 0 || null,
            jj = options.padding || 0 || null,
            k = options.parentItem || 'body' || null,
            padding = options.display || 0 || null,
            lm = options.displayAtOnce,
            m = $(options.parentItem).width(),
            n = 0;
        //check local storage and propose to user to order the elements to the last state the left
        var ls = localStorage.getItem("divorder");
        if(ls !== null){
            $('body').prepend('<div>Would you like to reorder the blocks like they were the last time you left?</div><input type="button" value="YES" id="reorderBlocks" /></div>');
            $("#reorderBlocks").bind("click", function () {
                $(this).sorthThis();
            });
        }
        //----
        //create the block container
        //----
        var structure = '<section id="blockLayout"></section>';
        //----
        //append to parentItem
        //----
        if(k.indexOf("#") >= 0 || k.indexOf(".") >= 0){
            $(structure).prependTo(k);
        } else {
            $('body').prepend(structure);
        }
        //----
        //create the tag layout
        //----
        var buildBlock = '<' + b + '></' + b + '>';
        //----
        //load the json data
        //----
        if(h !== '' || h !== null ) {
            $.getJSON(h, function (data) {
                //get json data from the file declared
                //in variable h
                var items = [];
                $.each(data, function (key, val) {
                    items.push(val);
                });
                //----
                //recurse and append the blocks
                //----
                while (n < a) {
                    var block = $(buildBlock).attr('id', 'block' + (n + 1)).html(items[n]);
                    $('#blockLayout').append(block);
                    n++;
                }
            }).done(function () {
                console.log("success");
            }).fail(function () {
                $('<div id="ajaxError">Unable to connect to the JSON file.</div>').prependTo(k);
            });
        }

        if (l !== null || 0) {
            var overrideSize = true;
        } else {
            overrideSize = false;
        }
        //----
        //math calculations to determine width and height of each block
        //----
        if (overrideSize == true) {
            if(d !== 'modular') {
                var marginCalc = (((j * 2) + (jj * 2)) * l) + (j * 4);
                var o = 'width:' + Math.floor((m - marginCalc) / l) + 'px';
            }else{
                o = 'width:auto';
            }
            var p = 'height:' + e + 'px';
        } else if (overrideSize == false) {
            if(d !== 'modular') {
                o = 'width:' + d + 'px';
            }else{
                o = 'width:auto';
            }
            p = 'height:auto';
        }

        var q = 'background:#' + f + ';';
        var r = 'opacity:' + g + ';';
        if (fg !== null){
            if (fg.indexOf("rgb") >= 0) {
                var s = 'border:1px solid ' + fg + ';';
            }else{
                s = 'border:1px solid #' + fg + ';';
            }

        }else{
            s = '';
        }

        //----
        //build the css with option values
        //----
        var cssStructure = '<style type="text/css" id="blockStyle">';
        cssStructure += '#blockLayout {display:inline-block}';
        cssStructure += '#blockLayout '+b+' {float:'+c+';'+o+';'+p+';'+q+';'+r+';clear:'+i+';margin:'+j+'px;padding:'+jj+'px;'+s+'}';
        cssStructure += '#blockLayout '+b+':nth-child('+l+'n+'+l+') {clear:right}';
        if(lm !== null) {
            cssStructure += '#blockLayout div:nth-child(n+' + (lm+1) + ') {display: none;}';
        }
        cssStructure += '</style>';

        $('head').append(cssStructure);

        //----
        //add drag sortable capabilities
        //----
        if(dd == true) {
            $(function () {
                $("#blockLayout").sortable({
                    revert: true,
                    cursor: "move",
                    stop: function(event,ui){
                        //----
                        //get sorted elements info once we stop dragging
                        //----
                        var sortedIDs = $(this).sortable( "toArray" );
                        var obj = sortedIDs;
                        var arr = [];

                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                arr.push(obj[key]);
                            }
                        }
                        if (typeof(Storage) != "undefined") {
                            //----
                            //store the page html in local storage
                            //----
                            localStorage.setItem("divorder", $('#blockLayout').html());
                        }
                    }
                }).disableSelection();
            });
        }
        if(lm < a){
            $('<div id="toggleMore">See More</div>').insertAfter('#blockLayout');
        }
        //----
        //add see more
        //----
        if(lm !== null) {
            $("#toggleMore").bind("click", function () {
                var sma = $('#blockLayout div:hidden').length;
                if(sma < a && sma !== 0){
                    $('#toggleMore').html('See Less');
                    $('#blockLayout div:hidden').toggle(500);
                }else if(sma == 0){
                    $('#toggleMore').html('See More');
                    $('#blockLayout div[style]').toggle(500,function(){
                        $(this).removeAttr('style');
                    });
                }
            });
        }
    }
})(jQuery);


/** usage
 * $(this).blockMaker({
 *      count:10,
 *      type:'div',
 *      float:'left',
 *      width:100
 * });
 */


