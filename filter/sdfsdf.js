var siteNameEN = '{{ settings.trn_shop_name_en }}';
var siteNameFR = '{{ settings.trn_shop_name }}';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
/*--------------------
 function gets url info
 and launches the
 wordTranslate function
 with querystring
 params
 ----------------------*/
function prepTitle(){
    var lang = $('html').attr('lang');
    var a = window.location.pathname;
    var b = a.slice( 1 );
    var c = b.split('/');
    var len = c.length;
    for (var i = 0; i < len; i++) {
        var nm = c[0];
    }
    if(nm == 'collections'){
        if(len == 2){
            wordTranslate(c[1],null,null,lang,null);
        }else if(len == 3){
            try{
                if(c[2].indexOf('+') > -1){
                    var d = c[2].split('+');
                    if(d.length == 2){
                        var nm1 = d[0];
                        var nm2 = d[1];
                        if(d[1].indexOf('brand') > -1){
                            var brand = d[1].replace('brands_','').replace('-',' ').capitalize();
                            wordTranslate(c[1],nm1,null,lang,brand)
                        }else{
                            var nm2 = d[1];
                            wordTranslate(c[1],nm1,nm2,lang,null)
                        }
                    }else if(d.length == 3){
                        var nm1 = d[0];
                        var nm2 = d[1];
                        var nm3 = d[2];
                        if(d[2].indexOf('brand') > -1){
                            var brand = d[2].replace('brands_','').replace('-',' ').capitalize();
                            wordTranslate(c[1],nm1,nm2,lang,brand)
                        }else{
                            wordTranslate(c[1],nm1,nm2,lang,null)
                        }
                    }
                }else{
                    wordTranslate(c[1],c[2],null,lang,null);

                }
            }catch(e){
                console.log(e);
            }
        }
    }
}

/*--------------------
 function translates  collection page with
 data pulled from  the  main json file.
 Fired by prepTitle function
 ----------------------*/
function wordTranslate(top,word,second,lang,brand) {
    if(brand !== null && brand !== ''){
        var addBr = brand;
        var aba = addBr.replace(' ','-').toLowerCase();//view ready brand
        var bab = 'brands_'+aba;//link ready brand
    }
    var trn = lang;
    $.getJSON('{{ 'nav.json' | asset_url }}', function( data ) {
        $.each(data.navitems, function (i, data) {
            if(data.href == top){
                lev = i;
                mvl = data.href;
                if(trn == 'fr'){
                    mvf = data.name_fr;
                }else if(trn == 'en'){
                    mvf = data.name_en;
                }
            }
        });
        var ln = data.navitems[lev].level1.length;

        for (var i = 0; i < ln; i++) {
            if(data.navitems[lev].level1[i].href == word){
                var ls = data.navitems[lev].level1[i].level2.length;
                var msl = data.navitems[lev].level1[i].href;
                if(trn == 'fr'){
                    var ms = data.navitems[lev].level1[i].name_fr;
                    var tlt = siteNameFR;
                }else if(trn == 'en'){
                    var ms = data.navitems[lev].level1[i].name_en;
                    var tlt = siteNameEN;
                }
                var qs = lev;
                var rs = i;
                var tt = mvf+' - '+ms.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â");
                if(brand !== null){
                    tt += ' '+brand;
                }
                tt += ' - '+tlt;
                document.title = tt;
                var ff = ' <span class="icon-right-arrow"></span> ';
                var rr = '<a href="/collections/'+mvl+'">'+mvf+'</a> ';
                ff += '<a href="/collections/'+mvl+'/'+msl+'">'+ms.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â")+'</a>';
                rr += '<a href="/collections/'+mvl+'/'+msl+'">'+ms.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â")+'</a> ';
                if(brand !== null && second == null){
                    ff += ' <span class="icon-right-arrow"></span> ';
                    rr += ' <a href="/collections/'+mvl+'/'+msl+'+'+bab+'">'+brand+'</a> ';
                }
            }
        }
        for (var i = 0; i < ls; i++) {
            if(data.navitems[qs].level1[rs].level2[i].href == second){
                var nsl = data.navitems[qs].level1[rs].level2[i].href;
                if(trn == 'fr'){
                    var ns = data.navitems[qs].level1[rs].level2[i].name_fr;
                }else if(trn == 'en'){
                    var ns = data.navitems[qs].level1[rs].level2[i].name_en;
                }
                var uu = mvf+' - '+ms.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â")+' - '+ns.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â");
                if(brand !== null){
                    uu += ' '+brand;
                }
                uu += ' - '+tlt;
                document.title = uu;
                ff += ' <span class="icon-right-arrow"></span> ';
                ff += '<a href="/collections/'+mvl+'/'+msl+'+'+nsl+'">'+ns.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â")+'</a>';
                rr += ' <a href="/collections/'+mvl+'/'+msl+'+'+nsl+'">'+ns.replace(/&amp;/g, "&").replace(/&eacute;/g, "é").replace(/&egrave;/g, "è").replace(/&agrave;/g, "à").replace(/&ecirc;/g, "ê").replace(/&acirc;/g, "â")+'</a>';
                if(brand !== null){
                    ff += ' <span class="icon-right-arrow"></span> ';
                    ff += '<a href="/collections/'+mvl+'/'+msl+'+'+nsl+'+'+bab+'">'+brand+'</a>';
                    rr += ' <a href="/collections/'+mvl+'/'+msl+'+'+nsl+'+'+bab+'">'+brand+'</a>';
                }
            }
        }
        $('.global_tag_holder').empty();//removes existing breadcrumbs
        $(ff).appendTo('.global_tag_holder');//changes the breadcrumbs
        if(rr !== '' && rr !== undefined && rr !== null){
            $('.coll_links').empty();
            $(rr).appendTo('.coll_links');//changes the breadcrumbs
        }
    });
}

function gbCollect(origin,length,page,limit) {
    /*custom overflow mechanism by Dave Maser */
    var a = Math.random(0,length);
    var b = a*1000;
    var c = Math.round(b);
    var d = Array(7800,150,800,125,40);
    var e = d[Math.floor(Math.random()*d.length)];
    var f = Math.max.apply( Math, d );
    var g = new Date();
    var h = g.getFullYear();
    var i = g.getMilliseconds();
    var j = g.getMonth()+1;
    var k = Math.round((h+i+j)/1.6);
    if(c > 0 && c < 150){
        var l = 'a[0]['+k+']['+origin+']';
    }else if(c > 150 && c < 300){
        var l = 'a[1]['+k+']['+origin+']';
    }else if(c > 300 && c < 450){
        var l = 'a[2]['+k+']['+origin+']';
    }else if(c > 450 && c < 600){
        var l = 'a[3]['+k+']['+origin+']';
    }else if(c > 600 && c < 900){
        var l = 'a[4]['+k+']['+origin+']';
    }else if(c > limit){
        var l = 'a[5]['+k+']['+origin+']';
    }else{
        var l = null;
    }
    if(l !== null){
        var m = l.split('][');
        var n = m[0]+'['+page+']'+m[2];
        try{
            l.sync[src] = 'window';
            l.sync[data] = 'body';
            l.sync[set] = this;
        }catch(e){
        }
    }
    var o = Array(c,e,f,k,l);
    return o;
}

function reposFilters() {
    /*function reposition the filter panel in a new
    off canvas gutter for mobile use*/
    $('#filter-options').appendTo('.bigblob');
    $('.bigblob').css('height',$(window).height()-$('#header').height()).css('margin-top',$('#header').height());
    $('.bigblob').find('#filter-options').css('display','block');
}

function hideRelatedProds(check,hide) {
    /*hides the related products section
     if there are no products to show*/
    if($(check).length == 0){
        $(hide).css('display','none');
    }
}

function mobileTabManager(){
    /*adds active tab and sub tab functionalities
    to the mobile off canvas menu*/
    var a = window.location.pathname;
    var b = a.slice( 1 );
    var c = b.split('/');

    if(c.length > 2 && c[2].length){
        if(c[2].indexOf('+' > -1)){
            var d = c[2].split('+');
            var e = d[0].replace('&comma;','');
            var f = d[1].replace('&comma;','');
        }else{
            var d = c[2].replace('&comma;','');
            var e = d.replace('&comma;','');
            var f = null;
        }
    }
    if($('.clint').hasClass(c[1])) {
        $('.clint.'+c[1]).find('a.sub-menu:not(.top-el)').addClass('link-active');
        $('.clint.'+c[1]).addClass('lfe-open').find('.menu_line_element').css('display','inline-block');
    }
    if(e !== undefined){
        try{
            if($('li.nav-parent').hasClass(e)) {
                $('li.nav-parent.'+c[1]+'.'+e.replace('&comma;','')).find('a.sub-menu.top-el').addClass('link-active').find('span.disp').removeClass('icon-right-arrow').addClass('icon-down-arrow');
                $('li.nav-parent.'+c[1]+'.'+e).find('ul').css('display','block');
            }
        }catch(e){
            alert('This page has encountered an error. Please reload or try another page');
        }
    }
    if(f !== undefined && f !== '#' && f !== '' && f !== null && f !== ','){
        try{
            if($('li.sub-menu').hasClass(f) && f !== '#' && f !== '' && f !== null && f !== ',') {
                $('li.sub-menu.'+c[1]+'.'+e+'.'+f).find('a.thrd-el').addClass('link-active');
            }
        }catch(e){
            alert('This page has encountered an error. Please reload or try another page');
        }
    }
}

function lsTest(){
    var test = 'tlh-st';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

function setLs(name,val) {
    var a = name;
    var b = val;
    var c = lsTest();
    if(c == true){
        localStorage.setItem(a, b);
    }
}

function dimSoldOut(val){
    /*adds an opacity value to products
     that are sold out*/
    if($('.soldout').length){
        $('.soldout').parent().animate({
            opacity: val
        })
    }
}

function indexNav(){
    var topLink = '/collections/';
    $.getJSON('{{ 'nav.json' | asset_url }}',function(data)
    {
        var div_data = '<div id="filter-options">';
        $.each(data.navitems, function (i, data) {
            div_data += '<div class="filtermenu level-one-items '+data.href.replace(/'/g, '').toLowerCase()+ '"><a href="' +topLink+ data.href + '" class="sub-menu">' + data.name_en + '</a></div>';

        });
        div_data += '</div>';
        $(div_data).appendTo('#mm-0');
    });
}

function bMobileMenu() {
    /*rearranges the dom elements to create a
     movile friendly gutter menu*/
    $('#mm-0').find('ul:first').wrap('<div class="ftt">');
    $('#mm-0').find('.ftt').find('ul:first').contents().unwrap();
    $('.ftt').contents().unwrap();
    $('.dropdown.animated').contents().unwrap();
    $('.menu_line_element').removeClass('dropdown_links').removeClass('clearfix');
    $('.menu_line_element').attr('id','');
}

function regExReplace(element,replacer) {
    /*basic regex replacement function*/
    var a = element;
    var b = replacer;
    var c = new RegExp(b, 'g');
    var d = a.replace(c, '');

    return d;
}

function siteIsOpen(){
    /*function to redirect to maintenance page
     if site has been placed in maintenance mode
     see settings for values*/
    var checkPage = regExReplace(window.location.pathname,'/');
    var maintPage = 'pages{{settings.site_access_maintenance_page}}';
    if(checkPage == maintPage){
        var pReset = false;
    }else{
        pReset = true;
    }
    var siteStat = '{{settings.site_access_available}}';
    if(siteStat == 'closed' && pReset == true){
        window.location.replace("/pages/{{settings.site_access_maintenance_page}}");
    }else{
        return false;
    }
}

function setCart() {
    /*deprecated function*/
    var cart = $.cookie('cart');
    var shop = '3392785';
    var ga = $.cookie('_shopify_ga');
    var loc = $.cookie('tlh_site');
    var link = 'https://checkout.shopify.com/'+shop+'/checkouts/'+cart+'?'+ga+'&locale='+loc;
    return link;
}

function itemListSet() {
    /*deprecated function*/
    $('.sidebar').find('div:not(:first)').find('ul').hide(function () {
        pageHeightSet();
        $(this).parent().find('h4').find('.side_elem_toggle').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    });
    $('.sidebar').find('div:first').find('.side_elem_toggle').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
}
function pageHeightSet() {
    /*reformats page height once all
     dynamic elements are loaded into
     the dom*/
    var he = $('.mm-page').height();
    $('body').css('height', he);
}
function resizePad(){
    $('#filt-zone').removeClass('twelve').addClass('sixteen');
    $('#filt-zone').find('.thumbnail').removeClass('three').addClass('four');
    $('.container.main.content').find('.page').removeClass('offset-by-three');
    setTimeout('pageHeightSet()',800);
}
function doPercent(origP,newP,showMode,lang){
    /*calculates the reduction percentage and
     places it in a span. Can be used with the
     countdown timer*/
    data_render = true;
    var aVal = (newP-origP);
    var bVal = (aVal/origP);
    var pPc = Math.floor((bVal*100)*-1);
    if(showMode == 'extended'){
        if(lang == 'en'){
            var preLine = 'Extra<br />';
            var postLine = ' % off';
        }else if(lang == 'fr'){
            var preLine = 'R&eacute;duction de<br /> ';
            var postLine = ' % en plus';
        }
    }else{
        var preLine = '-';
        var postLine = '%';
    }
    document.write('<span>'+preLine+pPc+postLine+'</span>');
}


$(document).ready(function () {
    prepTitle();
    var wWidth = $( window ).width();
    if(wWidth <= 1024){
        if(wWidth >= 768){
            resizePad();
        }
        /*-------mobile nav menu functions
         overrides native theme event handlers
         on mobile gutter a-----------------*/
        $( document ).on( "click", ".clint a", function(e) {
            if($(this).parent().find('.menu_line_element').css('display') == 'none'){
                e.preventDefault();
                $(this).parent().siblings().find('.menu_line_element').css('display','none');
                $('.lfe-open').find('a').removeClass('link-active');
                $(this).addClass('link-active');
                $(this).parent().addClass('lfe-open');
                $(this).parent().siblings().removeClass('lfe-open');
                $(this).parent().find('span:not(.disp)').removeClass('icon-right-arrow').addClass('icon-down-arrow');
                $(this).parent().find('.menu_line_element').css('display','inline-block');
                //$(this).parent().find('.sub-menu:not(.menu_line_element)').css('font-weight','bold');
            }else if($(this).parent().find('.menu_line_element').css('display') == 'inline-block'){
                e.preventDefault();
                $(this).removeClass('link-active');
                $(this).parent().removeClass('lfe-open');
                $(this).parent().find('span:not(.disp)').addClass('icon-right-arrow').removeClass('icon-down-arrow');
                $(this).parent().find('.menu_line_element').css('display','none');
                //$(this).parent().find('.sub-menu').css('font-weight','normal');
            }
        });
        $( document ).on( "click", ".nav-parent a", function(e) {
            if($(this).parent().find('ul').css('display') == 'none'){
                e.preventDefault();
                $(this).addClass('link-active');
                $(this).parent().find('ul').css('display','block');
                $(this).parent().parent().siblings().find('ul').css('display','none')
                $(this).parent().parent().siblings().find('a').removeClass('link-active').find('span.disp').addClass('icon-right-arrow').removeClass('icon-down-arrow');
                $(this).parent().find('.disp').removeClass('icon-right-arrow').addClass('icon-down-arrow');
            }else if($(this).parent().find('ul').css('display') == 'block'){
                e.preventDefault();
                $(this).removeClass('link-active');
                $(this).parent().find('ul').css('display','none');
                $(this).parent().find('.disp').addClass('icon-right-arrow').removeClass('icon-down-arrow');
            }
        });
        //-------end mobile nav menu functions
        $('.clint').find('span').removeClass('icon-down-arrow').addClass('icon-right-arrow');
        $("#filter-options").css('display','none');
        $("#filter-options").appendTo("#mm-0");
        $('.mm-page').find('.container').attr('style','');
        var a = $('.menu.right').find('li:first');
        var b = $('.menu.right').find('li:nth-child(3)');
        $('#mm-0').prepend(a,b);
        $('#mm-0').find('li:lt(3)').addClass('vignette');
        $('<div class="clearfix"></div>').insertAfter('.vignette:nth-child(3)');
        var c = $('.menu:not(.right)').html();
        $('.menu:not(.right)').appendTo('#mm-0');
        setTimeout('bMobileMenu()', 1000);
    }
    /*-----------------
     filter menu functions
     -----------------*/
    $('.child_level:not(.subitems)').hide();
    $('.top_level .subitems:not(.child_level)').click(function(){
        var clickEL = $(this).attr('id');
        if($('.child_level.'+clickEL+':not(.subitems)').hasClass('isActive')){
            $('.child_level.'+clickEL+':not(.subitems)').hide().removeClass('isActive');
        }else{
            $('.child_level.'+clickEL+':not(.subitems)').show().addClass('isActive');
        }
    })
    //----translator
    //var translator = $('body').translate({lang: "en", t: dict}); //use English
    function menuEval(action) {
        if(action == 'hide'){
            $('.menu:not(.right)').find('.no-view').parent().hide();
        }else if(action == 'show'){
            $('.menu:not(.right)').find('.no-view').parent().show();
        }
    }

    function splitSubmenu(maxNumItems) {
        $(".menu_line_element ul").each(function () {

            // get all child li tags
            var list$ = $(this).children("li");
            var num, nextAfter$, after$ = $(this);

            // as long as the current list is too long, loop
            while (list$.length > maxNumItems) {
                // decide how many to remove this iteration
                num = Math.min(maxNumItems, list$.length - maxNumItems);
                // create new UL tag, append num items to it 
                // and insert it into the DOM
                nextAfter$ = $('<ul class="submenu">')
                    .append(list$.slice(maxNumItems, maxNumItems + num))
                    .insertAfter(after$);
                // update insertion point for next loop iteration
                after$ = nextAfter$;
                // remove the items we just took out from the current jQuery object
                list$ = list$.filter(function(index) {
                    return(index < maxNumItems || index >= 2 * maxNumItems);
                });
            }
        });
    }
    setTimeout('dimSoldOut(0.6)',1500);
    siteIsOpen();
    if(wWidth >1024){
        splitSubmenu(25);
    }
    pageHeightSet();
    menuEval('hide');

    if($( window ).width() <= 1024){
        var lowLevel = true;
    }else{
        lowLevel = false;
    }
    clickable = true;
    var pageClass = $('body').attr('class');
    //disable buttons in upcoming events box
    $('.bt_disabled .action_button').click(function(e){
        e.preventDefault();
        $(this).html('coming soon');
    });
    /*desktop sidebar click handlers and
     hierarchy manager*/
    if ($('.sidebar').length) {
        itemListSet();
        $('#side_elem_one h4,#side_elem_two,#side_elem_three,#side_elem_four,#side_elem_five,#side_elem_six').find('h4').click(function () {
            var clickElem = $(this).parent().attr('id');
            $('.sidebar_item:not(#' + clickElem + ')').find('ul').hide('500', function () {
                $(this).parent().find('h4').find('.side_elem_toggle').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            });

            if ($(this).parent().find('ul').is(':visible')) {
                $(this).parent().find('ul').hide('500', function () {
                    pageHeightSet();
                    $(this).parent().find('.side_elem_toggle').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                });
            } else if ($(this).parent().find('ul').is(':hidden')) {
                $(this).parent().find('ul').show('500', function () {
                    pageHeightSet();
                    $(this).parent().find('.side_elem_toggle').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
                });
            }
        });
    }

    if ($('#loaded-deals').length) {
        $('#loaded-deals .thumbnail').matchHeight();
        $('#loaded-deals').css('display', 'block');
    }

    var open = false;
    $('.sale_banner').mouseover(function () {
        if (open == false) {
            $(this).find('.it_ends_when').show(200);
            open = true;
        }
    });
    $('.sale_banner').mouseout(function () {
        if (open == true) {
            $(this).find('.it_ends_when').hide(200, function () {
                open = false;
            });
        }
    });

    /*front page one shot, events
     and upcoming sales attribute
     handler also linked to swipe
     events*/
    var curPos = 0;
    if(lowLevel == true){
        var visPanes = 1;
    }else{
        var visPanes = 3;
    }
    var divNum = $('#sales_wrapper').find('.homepage_content').length,
        divWid = $('#sales_wrapper').find('.homepage_content').width(),
        divMar = ((divNum - 1) * 10) * 2;
    if(wWidth < 768){
        var totWid = divWid;
    }else{
        totWid = divWid + (divMar / (divNum - 1));
    }
    var maxMove = divNum - 3,
        slidOp = visPanes + 1;

    if (divNum <= visPanes) {
        $('#slides_nav').hide();
    }

    function alphasize(direction, pin) {
        if (direction == false) {
            $("#sales_wrapper .homepage_content:nth-child(n+" + (pin+2) + ")").animate({
                opacity: '0.2'
            }, 200);
        }
        if (direction == true) {
            $("#sales_wrapper .homepage_content:lt(" + (pin - 1) + ")").animate({
                opacity: '1'
            }, 200);
        }
    }

    if (curPos == 0) {
        $('#slides_nav_left').hide();
    }
    /*front page one shot, events
     and upcoming sales function.
     handles events by passing
     attribute dir that corresponds
     to the direction user swipes
     or directional button clicked*/
    function slideMotion(dir) {
        if (dir == 'right') {
            clickable = false;
            if (curPos < maxMove) {
                slidOp += 1;
                $("#sales_wrapper").animate({
                    left: '-=' + totWid
                }, 500, function () {
                    curPos += 1;
                    if (curPos == maxMove) {
                        $('#slides_nav_right').hide();
                    } else {
                        $('#slides_nav_right').show();
                    }
                    if (curPos > 0) {
                        $('#slides_nav_left').show();
                    }
                    //alphasize(true, slidOp);
                    clickable = true;
                });
            }
        } else if (dir == 'left') {
            clickable = false;
            if (curPos > 0) {
                slidOp -= 1;
                $("#sales_wrapper").animate({
                    left: '+=' + totWid
                }, 500, function () {
                    curPos -= 1;
                    if (curPos == 0) {
                        $('#slides_nav_left').hide();
                        $('#slides_nav_right').show();
                    } else {
                        $('#slides_nav_left').show();
                    }
                    //alphasize(false, slidOp);
                    clickable = true;
                });
            }
        }

    }

    $("#slides_nav_right").click(function () {
        if(clickable == true){
            slideMotion('right');
        }
    });
    $("#slides_nav_left").click(function () {
        if(clickable == true){
            slideMotion('left');
        }
    });
    /*end front page scrolling function*/
    /*click handler for see more button
     on one shot products*/
    $(".see_more.ss-icon,.buy_now_cta").click(function () {
        if ($(this).closest('.one_shot').find('.subElement').is(":hidden")) {
            $(this).closest('.one_shot').find('.subElement').show(300);
            $(this).parent().find('.see_more.ss-icon').css('top','-10px').html('␡');
            $(this).parent().find('.see_more.ss-icon').removeClass('show-more-closed');
            $(this).parent().find('.percentage_value.sale_banner').addClass('overlayed');
            $(this).parent().find('.reduction_value').addClass('hidden');
            $(this).parent().find('.buy_now_cta').hide(200);
            $('#slides_nav').hide();
        } else if ($(this).closest('.one_shot').find('.subElement').is(":visible")) {
            $(this).closest('.one_shot').find('.subElement').hide(300);
            $(this).attr('style','').html('+');
            $(this).addClass('show-more-closed');
            $(this).parent().find('.percentage_value.sale_banner').removeClass('overlayed');
            $(this).parent().find('.reduction_value').removeClass('hidden');
            $(this).parent().find('.buy_now_cta').show(200);
            $('#slides_nav').show();
        }

    });

    /*swiping function that shows
     hides gutter when user swipes
     across page footer*/
    $(function () {
        //Enable swiping...
        $(".footer").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    console.log('left');
                    //slideMotion('right');
                    $('#nav').trigger("close");
                } else if (direction == 'right') {
                    console.log('right');
                    //slideMotion('left');
                    $('#nav').trigger("open");
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 100,
            excludedElements:$.fn.swipe.defaults.excludedElements+", #sales_wrapper"
        });
    });
    /*swiping function linked to
     slideMotion function*/
    $(function () {
        //Enable swiping...
        $("#sales_wrapper").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    slideMotion('right');
                } else if (direction == 'right') {
                    slideMotion('left');
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 100,
            excludedElements:$.fn.swipe.defaults.excludedElements+", #slides_nav"
        });
    });

    /*add all products button
     to the front page product
     loop*/
    function allProds(lang) {
        var cHtml = '<div class="three columns  thumbnail odd"><a href="/collections/all"><div class="relative link_all">';
        if(lang == 'en') {
            cHtml += 'See All Products';
        }else if(lang == 'fr') {
            cHtml += 'Tous Les Produits';
        }
        cHtml += '</div></a></div>';
        document.write(cHtml);
    }
});
$(window).load(function () {
    var wWidth = $( window ).width();
    if(wWidth <= 1024){
        reposFilters();
        hideRelatedProds('.rel_cls','.cls_show_bar');
        $('.flash_sale_notice').removeClass('animate_down');
        $('.clint').find('span').removeClass('icon-down-arrow').addClass('icon-right-arrow');
        $('.sub-menu.top-el').append('<span class="disp icon-right-arrow"></span>');
        setTimeout('mobileTabManager()',800);
    }
    if ($('#initial_sales').length) {
        $('#initial_sales .flash_sale_notice').delay(1000).matchHeight();
    }
    if(wWidth >1024){
        /* Menu level 1 positionning on desktop - marjolaine */
        /* edite par DAVID - place dans une condition if(wWidth >768){
         car cette fonction ne doit pas s'appliquer a la version mobile */
        function menuPosition() {
            var linkPosition = $(this).position();
            var height = $(".header").height() - ($(this).outerHeight() + linkPosition.top);
            var margin = height + 200;
            $(this).find(".dropdown_links").css("margin-top", margin + "px");
            $('.dropdown_links').css("display", "block");
        }
        $(".clint").each(menuPosition);
        $(window).resize(function(){
            $(".clint").each(menuPosition);
        });
    }
});
$(window).resize(function(){
    var wWidth = $( window ).width();
});