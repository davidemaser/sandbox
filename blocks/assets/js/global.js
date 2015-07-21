/**
 * Created by david-maser on 15/12/14.
 */
;(function ($) {
    $.fn.blockOut = function (options) {
        var obj = {
            pageEnc: $('html').attr('enctype'),
            pageLang: $('head').attr('lang'),
            nodeCount: $('*').length,
            scriptCount: $('script').length,
            styleCount: $('style').length,
            metaCount: $('meta').length,
            linkCount: $('link').length,
            metaView: $('meta[name="viewport"]').attr('content').split(2),
            mobileReady : $('meta[name="HandheldFriendly"]').attr('content'),
            mobileOpt : $('meta[name="MobileOptimized"]').attr('content'),
            /*metaStates:obj.metaView.split(2),
            metaStateCount:obj.metaStates.length,*/
            start: false,
            stop: false
        };

        var metaLn = new Array();
        metaLn = obj.metaView;
        metaLn += obj.mobileReady;
        metaLn += obj.mobileOpt;
        var index;
        var aa = metaLn;
        for (index = 0; index < aa.length; ++index) {
            console.log(aa[index]);
        }
        $.each( obj, function(key, value) {
            console.log( key + ": " + value );
        });
        var a = options.array || null || {},
            b = options.async || false || '',
            c = options.callback || null || '',
            d = options.recall || null || '',
            e = options.block || null || 0,
            f = options.limiter || 10 || null,
            g = options.maxlength || 300 || '',
            h = options.parent || null || 'wrapper';
        $('.product:nth-child(n+'+f+')').hide();
        $(h).html().content();
    }
})(jQuery);