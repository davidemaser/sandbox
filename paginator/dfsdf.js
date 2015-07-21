function itemListSet() {
    $('.sidebar').find('div:not(:first)').find('ul').hide(function () {
        pageHeightSet();
        $(this).parent().find('h4').find('.side_elem_toggle').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    });
    $('.sidebar').find('div:first').find('.side_elem_toggle').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
}
function pageHeightSet() {
    var he = $('.mm-page').height();
    $('body').css('height', he);
}
$(document).ready(function () {
    var pageClass = $('body').attr('class');
    console.log(pageClass);
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
    }
    $.fn.matchHeight._afterUpdate = function (event, groups) {
        $('#loaded-deals').css('display', 'block');
    };
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

//front page scrolling//
    var curPos = 0,
        visPanes = 3,
        divNum = $('#sales_wrapper').find('.homepage_content').length,
        divWid = $('#sales_wrapper').find('.homepage_content').width(),
        divMar = ((divNum - 1) * 10) * 2,
        totWid = divWid + (divMar / (divNum - 1)),
        maxMove = divNum - 3,
        slidOp = visPanes + 1;

    if (divNum <= visPanes) {
        $('#slides_nav').hide();
    }

    function alphasize(direction, pin) {
        if (direction == false) {
            $("#sales_wrapper .homepage_content:nth-child(n+" + pin + ")").animate({
                opacity: '0.2'
            }, 200);
        }
        if (direction == true) {
            $("#sales_wrapper .homepage_content:lt(" + (pin - 1) + ")").animate({
                opacity: '1'
            }, 200);
        }
    }

    alphasize(false, slidOp);
    if (curPos == 0) {
        $('#slides_nav_left').hide();
    }

    function slideMotion(dir) {
        if (dir == 'right') {
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
                    alphasize(true, slidOp);
                    console.log(slidOp);
                });
            }
        } else if (dir == 'left') {
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
                    alphasize(false, slidOp);
                });
            }
        }

    }

    $("#slides_nav_right").click(function () {
        slideMotion('left');
    });
    $("#slides_nav_left").click(function () {
        slideMotion('right');
    });
    //end front page scrolling//
    $(".desc-toggle").click(function () {
        if ($(this).closest('.one_shot').find('.subElement').is(":hidden")) {
            $(this).closest('.one_shot').find('.subElement').show(300);
            $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        } else if ($(this).closest('.one_shot').find('.subElement').is(":visible")) {
            $(this).closest('.one_shot').find('.subElement').hide(300);
            $(this).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }

    });

    //swiping
    $(function () {
        //Enable swiping...
        $("#sales_wrapper").swipe({
            //Generic swipe handler for all directions
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == 'left') {
                    slideMotion('left');
                } else if (direction == 'right') {
                    slideMotion('right');
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold: 100
        });
    });
});
$(document).load(function () {
    if ($('#initial_sales').length) {
        $('#initial_sales .flash_sale_notice').delay(1000).matchHeight();
    }
});