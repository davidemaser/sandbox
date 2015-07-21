/**
 * Created by david-maser on 10/02/15.
 */
/**
 * Created by david-maser on 29/12/14.
 */
(function( $ ){
    $.fn.filterBlocks = function (options) {
        var defaults = {
            parent: 'body',
            buttons: {
                buttonSectionId: 'filter_buttons',
                buttonGroupClass: 'btn-group',
                buttonTop: 'All',
                buttonClass: 'btn btn-primary',
                filterClass: 'filter',
                sortMethod: 'id',
                last: null
            },
            list: {
                listTags: [],
                listNum: [],//number of elements to show per each listTag
                listColor: [],
                listLimit: 0 //limits the number of elements to be shown when page loads - 0 shows all
            },
            items: {
                itemSectionId: 'filter_content',
                itemClass: 'item-element',
                itemWidth:'',
                itemHeight:'',
                itemMargin: 5
            },
            animation: {
                method:'show', //can also be slide
                speed:500,
                easing:'linear',//for extra easing methods, see http://gsgd.co.uk/sandbox/jquery/easing/
                easingPlugin:false,
                easingPluginPath:'assets/js/jquery.easing.1.3.js'
            },
            display: '',
            jsonData : ''
        };

        var settings = $.extend( true, {}, defaults, options),
            n = 0,
            nn = 0,
            nnn= 0,
            topMost = settings.parent;
        if(settings.animation.easingPlugin == true){
            var scr = '<script src="'+defaults.animation.easingPluginPath+'"></script>';
            $(scr).appendTo('head');

        }


        function createCore(){
            var htmlStructure = '<section id="'+defaults.items.itemSectionId+'"></section>';
            $(htmlStructure).insertAfter('#'+defaults.buttons.buttonSectionId);

            $.each(settings.list.listNum, function(key, value) {
                var n=0;
                while (n < settings.list.listNum[key]) {
                    var divSet = '<div style="width:'+settings.items.itemWidth+';height:'+settings.items.itemHeight+';';
                    if(settings.list.listColor) {
                        divSet += 'background:' + settings.list.listColor[key] + ';';
                    }
                    if(settings.itemMargin) {
                        divSet += 'margin:' + settings.items.itemMargin + 'px;';
                    }else{
                        divSet += 'margin:' + defaults.items.itemMargin + 'px;';
                    }
                    if(settings.display){
                        divSet += 'display:'+settings.display+'" ';
                    }else{
                        divSet += '" ';
                    }
                    divSet += 'class="' + defaults.items.itemClass + ' '+settings.list.listTags[key].replace(/'/,"")+'">'+settings.list.listTags[key]+'</div>';
                    $('#' + defaults.items.itemSectionId).append(divSet);
                    n++;
                }
            });
        }

        function loadJSON(){
            $.getJSON(settings.jsonData, function(data){
                for (var i=0, len=data.length; i < len; i++) {
                    //console.log(data[i]);
                    var items = [];
                    items.push(data.label[i]);
                }
            });
        }

        function applyLimit(limit) {
            if(limit !== 0) {
                var ob = settings.items.itemSectionId,
                    oba = limit,
                    obj = $('#' + ob + ' div:not(:hidden)'),
                    objs = $(obj).length;
                if (objs >= oba) {
                    $('#' + ob + ' div:not(:hidden):gt(' + (oba - 1) + ')').hide();
                }
            }
        }
        loadJSON();
        //createCore();

        applyLimit(settings.list.listLimit);
        //-----
        //click handlers
        //-----
        $('#'+settings.buttons.buttonTop.toLowerCase()).bind('click', function () {
            if(settings.animation.method == 'show'){
                $('.'+defaults.items.itemClass).show(settings.animation.speed,settings.animation.easing);
            }else if(settings.animation.method === 'slide'){
                $('.'+defaults.items.itemClass).slideDown(settings.animation.speed,settings.animation.easing);
            }
            $('#'+defaults.buttons.buttonSectionId+' button').removeClass('current');
            $(this).addClass('current');
            return false;
        });

        $('.'+defaults.buttons.filterClass).bind('click', function () {
            var thisFilter = $(this).attr('id');
            if(settings.animation.method === 'show'){
                $('.'+defaults.items.itemClass).hide(settings.animation.speed,settings.animation.easing);
                $("."+ thisFilter).show(settings.animation.speed,settings.animation.easing);
            }else if(settings.animation.method === 'slide'){
                $('.'+defaults.items.itemClass).slideUp(settings.animation.speed,settings.animation.easing);
                $("."+ thisFilter).slideDown(settings.animation.speed,settings.animation.easing);
            }
            $('#'+defaults.buttons.buttonSectionId+' button').removeClass('current');
            $(this).addClass('current');
            return false;
        });

    };
})( jQuery );