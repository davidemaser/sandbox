/**
 * Created by david-maser on 31/12/14.
 */
(function( $ ) {
    $.fn.organizr = function (options) {
        var defaults = {
            parent: 'body',
            margin: 0,
            padding: 0,
            dataType: 'json',
            jsonData: 'assets/ajax/bones.json' || null,
            dataCache: false,
            dataAsync: true,
            jsFiles : false,
            jsFileRoot : 'assets/js/vendor' || null,
            cssFiles: false,
            cssFileRoot : 'assets/css' || null
        };

        var settings = $.extend(true, {}, defaults, options),
            n = 0,
            o = 0;

        function buildBones(opt,errors){
            try {
                //----
                //build the html structure of the page
                //----
                var ajax = $.ajax({
                    url: settings.jsonData,
                    dataType: settings.dataType,
                    cache: settings.dataCache,
                    async: settings.dataAsync,
                    statusCode: {
                        404: function () {
                            $('body').prepend('<div class="ajax-404">The file this script is trying to connect to doesn\'t exist</div>');
                        }
                    }
                }).done(function (data) {
                    var items = [];
                    for (var i in data.element) {
                        items.push(data.element[i].children);
                        iL = data.element.length;
                    }
                    if (settings.jsFiles === true) {
                        var jsItems = [];
                        for (var ii in data.jsFiles) {
                            jsItems.push(data.jsFiles[ii].children);
                            $('head').append('<script src="' + settings.jsFileRoot + '/' + data.jsFiles[ii].lib + '"></script>');
                        }
                    }
                    if (settings.cssFiles === true) {
                        var cssItems = [];
                        for (var iii in data.cssFiles) {
                            cssItems.push(data.cssFiles[iii].children);
                            $('head').append('<link href="' + settings.cssFileRoot + '/' + data.cssFiles[iii].lib + '" rel="stylesheet" type="text/css" media="all"></script>');
                        }
                    }
                    while (n < iL) {
                        var builder = '<' + data.element[n].tag;
                        if (data.element[n].id) {
                            builder += ' id="' + data.element[n].id + '"';
                        }
                        if (data.element[n].class) {
                            builder += ' class="' + data.element[n].class + '"';
                        }
                        builder += '>';
                        builder += '</' + data.element[n].tag + '>';
                        for (var i = 0; i < data.element[n].count; ++i) {
                            if (data.element[n].parent) {
                                if (data.element[n].parentMap === 'id') {
                                    pTagPre = '#';
                                } else if (data.element[n].parentMap === 'class') {
                                    pTagPre = '.';
                                }
                                var pTag = pTagPre + data.element[n].parent;
                                if (data.element[n].parentChild && data.element[n].parentChild !== 0) {
                                    var pChild = ':nth-child(' + data.element[n].parentChild + ')';
                                    pTag += pChild;
                                }
                            } else {
                                pTag = settings.parent;
                            }
                            $(pTag).append(builder);
                        }
                        n++
                    }
                });
                if (opt === true) {
                    buildGuts();
                }
            }catch(err) {
                if(errors === true) {
                    $('body').prepend('<div id="scriptErrors">' + err + '</div>');
                }
            }
        }

        function buildGuts(){
            //----
            //build the content of the page
            //----
            var ajax = $.ajax({
                url: settings.jsonData,
                dataType: settings.dataType,
                cache: settings.dataCache,
                async: settings.dataAsync,
                statusCode: {
                    404: function() {
                        $('body').prepend('<div class="ajax-404">The file this script is trying to connect to doesn\'t exist</div>');
                    }
                }
            }).done(function(data) {
                var elItems = [];
                for (var j in data.elementContent) {
                    elItems.push(data.elementContent[j].children);
                    icL = data.elementContent.length;

                }
                while (o < icL) {
                    if(data.elementContent[o].parentType === 'id'){
                        var tagPrefix = '#';
                    }else if(data.elementContent[o].parentType === 'class'){
                        tagPrefix = '.';
                    }else if(data.elementContent[o].parentType === 'tag'){
                        tagPrefix = '';
                    }

                        var elemContent = '<span';
                        if(data.elementContent[o].bgColor !== '' && data.elementContent[o].font !== ''){
                            elemContent += ' style="background:'+data.elementContent[o].bgColor+';'+'font-family:'+data.elementContent[o].font+'"';
                        }else if(data.elementContent[o].bgColor !== '' && data.elementContent[o].font === ''){
                            elemContent += ' style="background:'+data.elementContent[o].bgColor+';"';
                        }else if(data.elementContent[o].bgColor === '' && data.elementContent[o].font !== ''){
                            elemContent += ' style="font-family:'+data.elementContent[o].font+'"';
                        }
                        elemContent += '>';
                        elemContent += data.elementContent[o].content;
                        elemContent += '</span>';
                    //----
                    //check if there is more than one occurence of the tag we are appending to
                    //----
                    var tagCheck = $(tagPrefix+data.elementContent[o].parent).length;
                    if(tagCheck === 1){
                        var hasChildren = false;
                    }else{
                        hasChildren = true;
                    }
                    //----
                    //add :nth-child element if tag has children or not if no children found
                    //----
                    if(hasChildren === true){
                        $(tagPrefix+data.elementContent[o].parent+':nth-child('+data.elementContent[o].parentCount+')').append(elemContent);
                    }else if(hasChildren === false){
                        $(tagPrefix+data.elementContent[o].parent).append(elemContent);
                    }
                    o++;
                }
            });
        }

        buildBones(true,true);
    }
})( jQuery );