/**
 * Created by david-maser on 26/12/14.
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
            topMost = settings.parent;
        if(settings.animation.easingPlugin == true){
            var scr = '<script src="'+defaults.animation.easingPluginPath+'"></script>';
            $(scr).appendTo('head');

        }

        function createButtons(){
            var htmlStructure = '<section id="'+defaults.buttons.buttonSectionId+'"><div class="'+defaults.buttons.buttonGroupClass+'" role="group"></div></section>';
            $(topMost).prepend(htmlStructure);
                if(settings.buttons.buttonTop !== null || defaults.buttons.buttonTop !== ''){
                    $('.'+defaults.buttons.buttonGroupClass).append('<button type="button" class="'+defaults.buttons.buttonClass+'" '+defaults.buttons.sortMethod+'="'+settings.buttons.buttonTop.toLowerCase()+'">'+settings.buttons.buttonTop.toUpperCase()+'</button>');
                }
                $.each(settings.list.listTags, function(key, value) {
                    $('.'+defaults.buttons.buttonGroupClass).append('<button type="button" class="'+defaults.buttons.buttonClass+' '+defaults.buttons.filterClass+'" '+defaults.buttons.sortMethod+'="'+value.replace(/'/,"")+'">'+value.toUpperCase()+'</button>');
                });
                if(settings.buttons.last){
                    $('.'+defaults.buttons.buttonGroupClass).append('<button type="button" class="'+defaults.buttons.buttonClass+'" '+defaults.buttons.sortMethod+'="'+settings.buttons.last.toLowerCase()+'">'+settings.buttons.last.toUpperCase()+'</button>');
                }
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
            var buildBlock = '<div></div>',
                elems = $('.'+defaults.items.itemClass).length;
            $.getJSON(settings.jsonData, function (data) {
                //get json data from the file declared
                //in variable h
                /*var items = [];
                $.each(data, function (key, val) {
                    items.push(val);
                });*/
                var items = [];
                 for (var i in data.titles) {
                 items.push(data.titles[i].label+' '+data.titles[i].children);
                     console.log(data.titles.length);
                 }
                //----
                //recurse and append the blocks
                //----
                while (n < elems) {
                    $('#'+defaults.items.itemSectionId).find('div:nth-child('+(n+1)+')').html(items[n]);
                    n++;
                }
            }).done(function() {
                console.log( "success" );
            }).fail(function() {
                $('<div id="ajaxError">Unable to connect to the JSON file.</div>').prependTo(settings.parent);
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

        createButtons();
        createCore();
        loadJSON();
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