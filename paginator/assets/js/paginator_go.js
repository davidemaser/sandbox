/**
 * Created by david-maser on 24/12/14.
 * david.maser@altitude-sports.com
 *
 * jQuery plugin to create dynamic pagination
 * component for navigating between pages.
 */
(function( $ ){
    $.fn.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
})( jQuery );


(function ($) {
    $.fn.paginator = function (options) {
        var a = options.total || 10,
            b = options.visible || 5,
            c = options.start || 1,
            ca = options.getURI || false,
            cb = options.uriStart || 'start',
            cc = options.uriOffset || 'offset',
            cd = options.uriTotal || 'n',
            d = options.speed || 'slow' || 500,
            e = options.previous || '<',
            f = options.next || '>',
            g = options.parent || '#paginator',
            h = options.margin || 0,
            i = options.padding || 0,
            j = options.display || 'horizontal',
            k = options.link || '',
            l = options.offset || 20,
            m = options.ellipsis || false,
            n = options.bootstrap || false,
            o = options.scope || 'both', //bootstrap scope can be script, style or both
            p = options.color || '#fff',
            q = options.border || '#ccc',
            r = '',
            s = '';

        function setURI(link,setter) {
            if(ca === true){
                oVar = [];
                if($(this).getParameterByName(cb)){
                    oVar.push($(this).getParameterByName(cb));
                }else{
                    oVar.push(c);
                }
                if($(this).getParameterByName(cc)){
                    oVar.push($(this).getParameterByName(cc));
                }else{
                    oVar.push(l);
                }
                if($(this).getParameterByName(cd)){
                    oVar.push($(this).getParameterByName(cd));
                }else{
                    oVar.push(a);
                }
                var dyn = [];
                dyn.push(oVar[0],oVar[1],oVar[2]);
                var lnk = '<a href="'+k+'?'+cb+'='+dyn[0]+'&'+cc+'='+(dyn[1]*setter)+'&'+cd+'='+dyn[2]+'">'+link+'</a>';
            }
            return lnk;
        }

        function addBoot(scope) {
            var style = '<link rel="stylesheet" href="assets/css/bootstrap.min.css" type="text/css" />',
                script = '<script src="assets/js/bootstrap.min.js"></script>';
            if(scope == 'style'){
                $('head').append(style);
            }else if(scope == 'script'){
                $('head').append(script);
            }else if(scope == 'both'){
                $('head').append(script,style);
            }
        }

        if(n == true){
            addBoot(o);
            if(o == 'both' || o == 'style') {
                e = '<span class="glyphicon glyphicon-chevron-left"></span>';
                f = '<span class="glyphicon glyphicon-chevron-right"></span>';
                r = '<span class="glyphicon glyphicon-backward"></span>';
                s = '<span class="glyphicon glyphicon-forward"></span>';
            }else{
                e = '<';
                f = '>';
                r = '...';
                s = '...';
            }
            pgTag = 'pagination-sm';
        }else if(n == false){
            e = '<';
            f = '>';
            r = '...';
            s = '...';
        }
        //---
        //define the top most tag
        //---
        var capTag = 'section',
        //---
        //define the list base tag (can be ol or ul)
        //---
        baseTag = 'ul';
        //---
        //append the base structure to the page
        //---
        if(g !== 'body') {
            $(g).prepend('<'+capTag+' id="paginator"><'+baseTag+'></'+baseTag+'></'+capTag+'>');
        }else{
            $('body').prepend('<'+capTag+' id="paginator"><'+baseTag+'></'+baseTag+'></'+capTag+'>');
        }
        //---
        //add bootstrap pagination class to ul tag
        //---
        if(n == true){
            $('#paginator').find('ul').addClass(pgTag);
        }
        //---
        //define some variables used in our while loop
        //---
        var z = c,
            y = 1;
        //---
        //append a previous paginator button
        //---
        $('<p class="nvo-pag prev">'+e+'</p>').insertBefore(baseTag);
        //---
        //if ellipsis option is set to true, let's append the ellipsis
        //---
        if(m == true) {
            $('<p class="nvo-ell less">'+r+'</p>').insertAfter('.prev');
        }
        //---
        //Recurse through our total to build our list
        //---
        while(z<=a){
            if(ca === true){
                var buildTheLink = '<li>';
                buildTheLink += setURI(y,z);
                buildTheLink += '</li>';
                $(baseTag).append(buildTheLink);
            }else{
                $(baseTag).append('<li><a href="'+k+'?offset='+(z*l)+'">'+y+'</a></li>');
            }
            z++;
            y++;
            numLc = z;
        }
        //---
        //hide the list items that are greater than the visible limit
        //---
        $(baseTag+' li:gt('+(b-1)+')').hide();
        //---
        //append a next paginator and ellipsis if visible items is less than total items
        //---
        if(a > b) {
            $('<p class="nvo-pag next">' + f + '</p>').insertAfter(baseTag);
            if (m == true) {
                $('<p class="nvo-ell more">'+s+'</p>').insertBefore('.next');
                fItem = $('li:visible:first').text();
                lItem = $('li:visible:last').text();
                //---
                //show or hide ellipsis and previous button on load depending on how many
                //items we have
                //---
                if (fItem <= c) {
                    $('.less,.prev').hide();
                }
                if (lItem >= a) {
                    $('.more,.next').hide();
                }
            }
        }
        //---
        //style definitions
        //---
        var styles = '<style type="text/css">';
        styles += '#paginator '+baseTag+' li,#paginator p {margin:'+h+'px;padding:'+i+'px;background-color:'+p+';border:1px solid '+q;
        if(j == 'vertical'){
            styles += ';clear:left}';
            styles += '#paginator '+baseTag+'{float:none}'
        }else{
            styles += '}';
        }
        $('head').append(styles);

        fItem = $('li:visible:first').text();
        lItem = $('li:visible:last').text();

        //---
        //click handlers
        //---
        $('.less').click(function() {
            var first = $(baseTag).children('li:visible:first:not(p)');
            first.prevAll(':lt('+b+')').show(d);
            first.prev().nextAll().hide(d);
            fItem = $('li:visible:first').text();
            lItem -= b;
            if(m == true) {
                if (lItem == a) {
                    $('.more,.next').hide(d);
                } else if (lItem < a) {
                    $('.more,.next').show(d);
                }
                if (fItem <= c) {
                    $('.less,.prev').hide(d);
                } else if (fItem > c) {
                    $('.less,.prev').show(d);
                }
            }
        });

        $('.more').click(function() {
            var last = $(baseTag).children('li:visible:last:not(p)');
            last.nextAll(':lt('+b+')').show(d);
            last.next().prevAll().hide(d);
                fItem += b;
                lItem = $('li:visible:last').text();
            if(m == true) {
                if (lItem == a) {
                    $('.more,.next').hide(d);
                } else if (lItem < a) {
                    $('.more,.next').show(d);
                }
                if (fItem < b) {
                    $('.less,.prev').hide(d);
                } else if (fItem > b) {
                    $('.less,.prev').show(d);
                }
            }
        });

        $('.next').click(function() {
            $('li:visible:first').hide(d);
            $('li:visible:last').next().show(d);
            fItem = $('li:visible:first').text();
            lItem = $('li:visible:last').text();
            console.log(lItem+' : '+a);
            if(fItem >= c){
                $('.prev').show(d);
            }
            if(fItem >= b){
                $('.less').show(d);
            }
            if(lItem >= (a-b)){
                $('.more').hide(d);
            }
            if(lItem == a){
                $('.more,.next').hide(d);
            }
        });

        $('.prev').click(function() {
            $('li:visible:first').prev().show(d);
            $('li:visible:last').hide(d);
            fItem = $('li:visible:first').text();
            lItem = $('li:visible:last').text();
            if(fItem <= b){
                $('.less').hide(d);
            }
            if(fItem <= c){
                $('.less,.prev').hide(d);
            }
            if(lItem < a+1){
                $('.more,.next').show(d);
            }

        });
    }
})(jQuery)
;