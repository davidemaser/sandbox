/**
 * Created by david-maser on 26/12/14.
 */
(function( $ ){
    $.fn.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            qs = regex.exec(location.search);
        return qs === null ? "" : decodeURIComponent(qs[1].replace(/\+/g, " "));
    }
})( jQuery );

(function( $ ){
    $.fn.filterBlocks = function (options) {
        var defaults = {
            parent: 'body',
            filterMethod: 'buttons',
            allowQsFilter: false,
            buttons: {
                buttonSectionId: 'filter_buttons',
                buttonGroupClass: 'btn-group',
                buttonTop: 'All',
                buttonClass: 'btn btn-primary',
                filterClass: 'filter',
                sortMethod: 'id',
                last: null
            },
            menu: {
                menuSectionId: 'filter_menu',
                menuGroupClass: 'menu-group',
                menuTop: 'All',
                menuId: 'menu-primary',
                filterClass: 'filter',
                sortMethod: 'value',
                last: null
            },
            list: {
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
        if(settings.allowQsFilter === true && $(this).getParameterByName('filter')){
            var xUri = $(this).getParameterByName('filter');
            if(xUri =='buttons'){
                var xMethod = 'buttons';
            }else if(xUri =='menu'){
                xMethod = 'menu';
            }else{
                alert('The accepted filter variables are buttons or menu');
                xMethod = settings.filterMethod;
            }
        }else{
            xMethod = settings.filterMethod;
            console.log('allowQsFilter may be set to false or no querystring has been found');
        }
        //----+
        //build structure from json file
        //----+
        function loadJSON(type,cache,async){
            var ajx = $.ajax({
                url: settings.jsonData,
                dataType: type,
                cache: cache,
                async: async,
                statusCode: {
                    404: function() {
                        $('body').prepend('<div class="ajax-404">The file this script is trying to connect to doesn\'t exist</div>');
                    }
                }
            }).done(function(data) {
                //----+
                //get basic data from the json file
                //----+
                var items = [];
                for (var i in data.entry) {
                    items.push(data.entry[i].children);
                    var iL = data.entry.length;
                }
                if(xMethod === 'buttons') {
                    //----+
                    //build button structure
                    //----+
                    var buttonStructure = '<section id="' + defaults.buttons.buttonSectionId + '"><div class="' + defaults.buttons.buttonGroupClass + '" role="group"></div></section>';
                    $(topMost).prepend(buttonStructure);
                    //----+
                    //add first button if required
                    //----+
                    if (settings.buttons.buttonTop !== null || defaults.buttons.buttonTop !== '') {
                        $('.' + defaults.buttons.buttonGroupClass).append('<button type="button" class="' + defaults.buttons.buttonClass + '" ' + defaults.buttons.sortMethod + '="' + settings.buttons.buttonTop.toLowerCase() + '">' + settings.buttons.buttonTop.toUpperCase() + '</button>');
                    }
                }else if(xMethod === 'menu') {
                    //----+
                    //build button structure
                    //----+
                    var menuStructure = '<section id="' + defaults.menu.menuSectionId + '"><div class="' + defaults.menu.menuGroupClass + '"><select id="'+settings.menu.menuId+'"></select></div></section>';
                    $(topMost).prepend(menuStructure);
                    //----+
                    //add first button if required
                    //----+
                    if (settings.menu.menuTop !== null || defaults.menu.menuTop !== '') {
                        $('#' + defaults.menu.menuId).append('<option '+ defaults.menu.sortMethod + '="' + settings.menu.menuTop.toLowerCase() + '">' + settings.menu.menuTop.toUpperCase() + '</button>');
                    }
                }
                //----+
                //build html structure
                //----+
                var htmlStructure = '<section id="'+defaults.items.itemSectionId+'"></section>';
                if(xMethod === 'buttons') {
                    $(htmlStructure).insertAfter('#' + defaults.buttons.buttonSectionId);
                }else if(xMethod === 'menu') {
                    $(htmlStructure).insertAfter('#' + defaults.menu.menuSectionId);
                }
                //----+
                //recurse through json data and build page elements
                //----+
                while (n < iL) {
                    if(xMethod === 'buttons') {
                        $('.' + defaults.buttons.buttonGroupClass).append('<button type="button" class="' + defaults.buttons.buttonClass + ' ' + defaults.buttons.filterClass + '" ' + defaults.buttons.sortMethod + '="' + data.entry[n].label.replace(/'/, "") + '">' + data.entry[n].label.toUpperCase() + '</button>');
                    }else if(xMethod === 'menu') {
                        $('#' + defaults.menu.menuId).append('<option class="' + defaults.menu.filterClass + '" ' + defaults.menu.sortMethod + '="' + data.entry[n].label.replace(/'/, "") + '">' + data.entry[n].label.toUpperCase() + '</option>');
                    }
                    var divSet = '<div style="width:'+settings.items.itemWidth+'px;height:'+settings.items.itemHeight+'px;';
                    if(data.entry[n].color) {
                        divSet += 'background:' + data.entry[n].color + ';';
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
                    divSet += 'class="' + defaults.items.itemClass + ' '+data.entry[n].label.replace(/'/,"")+'">'+data.entry[n].label;
                    divSet += '</div>';
                    for (var j=0;j<data.entry[n].children;++j) {
                        $('#' + defaults.items.itemSectionId).append(divSet);
                        /*var obj = data.entry[n].display;
                        $.each( obj, function( key, value ) {
                            var innerDiv = '<div>'+value.id+'<img src="'+value.image+'" /></div>';
                            $('#' + defaults.items.itemSectionId).find('div').html(innerDiv);
                        });*/
                    }
                    n++;
                }
                //----+
                //if button last is required, add it here.
                //----+
                if(settings.buttons.last){
                    if(xMethod === 'buttons') {
                        $('.' + defaults.buttons.buttonGroupClass).append('<button type="button" class="' + defaults.buttons.buttonClass + '" ' + defaults.buttons.sortMethod + '="' + settings.buttons.last.toLowerCase() + '">' + settings.buttons.last.toUpperCase() + '</button>');
                    }else if(xMethod === 'menu') {
                        $('#' + defaults.menu.menuId).append('<option ' + defaults.menu.sortMethod + '="' + settings.menu.last.toLowerCase() + '">' + settings.menu.last.toUpperCase() + '</button>');
                    }
                }
            }).fail(function(){
                $('<div id="ajaxError">Unable to connect to the JSON file.</div>').prependTo(settings.parent);
            }).always(function(){
                //-----
                //add click handlers once json data is formatted
                //-----
                if(xMethod === 'buttons') {
                    $('#' + settings.buttons.buttonTop.toLowerCase()).bind('click', function () {
                        if (settings.animation.method == 'show') {
                            $('.' + defaults.items.itemClass).show(settings.animation.speed, settings.animation.easing);
                        } else if (settings.animation.method === 'slide') {
                            $('.' + defaults.items.itemClass).slideDown(settings.animation.speed, settings.animation.easing);
                        }
                        $('#' + defaults.buttons.buttonSectionId + ' button').removeClass('current');
                        $(this).addClass('current');
                        return false;
                    });
                    $('.' + defaults.buttons.filterClass).bind('click', function () {
                        var thisFilter = $(this).attr('id');
                        if (settings.animation.method === 'show') {
                            $('.' + defaults.items.itemClass).hide(settings.animation.speed, settings.animation.easing);
                            $("." + thisFilter).show(settings.animation.speed, settings.animation.easing);
                        } else if (settings.animation.method === 'slide') {
                            $('.' + defaults.items.itemClass).slideUp(settings.animation.speed, settings.animation.easing);
                            $("." + thisFilter).slideDown(settings.animation.speed, settings.animation.easing);
                        }
                        $('#' + defaults.buttons.buttonSectionId + ' button').removeClass('current');
                        $(this).addClass('current');
                        return false;
                    });
                }else if(xMethod === 'menu') {
                    //-----
                    //add change event handler if filter method is menu
                    //-----
                    $('#' + defaults.menu.menuId).bind('change', function () {
                        if($(this).children('option:selected').attr('value') == 'all'){
                            if (settings.animation.method == 'show') {
                                $('.' + defaults.items.itemClass).show(settings.animation.speed, settings.animation.easing);
                            } else if (settings.animation.method === 'slide') {
                                $('.' + defaults.items.itemClass).slideDown(settings.animation.speed, settings.animation.easing);
                            }
                        }else {
                            var thisFilter = $(this).children('option:selected').attr('value');
                            if (settings.animation.method === 'show') {
                                $('.' + defaults.items.itemClass).hide(settings.animation.speed, settings.animation.easing);
                                $("." + thisFilter).show(settings.animation.speed, settings.animation.easing);
                            } else if (settings.animation.method === 'slide') {
                                $('.' + defaults.items.itemClass).slideUp(settings.animation.speed, settings.animation.easing);
                                $("." + thisFilter).slideDown(settings.animation.speed, settings.animation.easing);
                            }
                        }
                        return false;
                    });
                }
            });
        }
        //----+
        //block limit function
        //show number of blocks specified in options
        //----+
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
        loadJSON('json',false,true);
        applyLimit(settings.list.listLimit);
    };
})( jQuery );