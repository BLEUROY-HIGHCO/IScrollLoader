/*=============TEST=======================*/

jQuery.fn.outerScrollHeight = function(includeMargin, includeBorder) {
    var element = this[0];
    var jElement = $(element);
    var totalHeight = element.scrollHeight; //includes padding
    totalHeight += parseInt(jElement.css("border-top-width"), 10) + parseInt(jElement.css("border-bottom-width"), 10);
    if(includeMargin) totalHeight += parseInt(jElement.css("margin-top"), 10) + parseInt(jElement.css("margin-bottom"), 10);
    if(includeBorder) totalHeight += jElement.outerHeight(includeMargin) - jElement.innerHeight();
    return totalHeight;
};
jQuery.fn.outerScrollWidth = function(includeMargin, includeBorder) {
    var element = this[0];
    var jElement = $(element);
    var totalWidth = element.scrollWidth; //includes padding
    totalWidth += parseInt(jElement.css("border-left-width"), 10) + parseInt(jElement.css("border-right-width"), 10);
    if(includeMargin) totalWidth += parseInt(jElement.css("margin-left"), 10) + parseInt(jElement.css("margin-right"), 10);
    if(includeBorder) totalWidth += jElement.outerWidth(includeMargin) - jElement.innerWidth();
    return totalWidth;
};

/*==================END TEST===============*/

$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
};

function IS(){
    //window.plugins.is = this;
}

IS.prototype.initPageScroll = function(){
    /*$('[data-role="page"][data-iscroll="enable"]').live("pageshow", function() {
     fixed($(this));
     });*/
    /*    $('[data-role="page"][data-iscroll="enable"]').bind('touchmove', function (e) { e.preventDefault(); });
     $('[data-role="page"][data-iscroll="enable"] div[data-role="header"]').bind('touchmove', function (e) { e.preventDefault(); });
     $('[data-role="page"][data-iscroll="enable"] div[data-role="footer"]').bind('touchmove', function (e) { e.preventDefault(); });*/
    
    
    var $header = $('[data-role="header"]');
	if ($header.length) {
		$header.css({
            "z-index": 1000,
            padding: 0, margin: 0,
            width: "100%"
        });
    }
    
    var $footer = $('[data-role="footer"]');
	if ($footer.length) {
		$footer.css({
            "z-index": 1000,
            padding: 0,
            width: "100%"
        });
    }
    
    
    /*    alert($('div[data-role="footer"]').height());*/
    
    $('div[data-iscroll="scroller"]').css({
        'z-index':1,
    });
    
    
    
    if($('div[data-iscroll="scroller"]').hasAttr('iscroll-height')){
        height=$('div[data-iscroll="scroller"]').attr('iscroll-height');
    }
    else{
        var height = $(window).height();
        console.log(height);
        /*if(specialHeight != undefined && specialHeight != null){
         height+=specialHeight;
         specialHeight=0;
         }*/
        if($('div[data-iscroll="scroller"]')){
            
            var el = $('div[data-iscroll="scroller"]');
            el=$(el[0]).prev();
            while(el.length){
                console.log(el.outerScrollHeight(true, true));
                height -= el.outerScrollHeight(true, true);
                console.log(height);
                el.css({'z-index':1000, 'background-color':'white'});
                el = el.prev();
            }
            el = $('div[data-iscroll="scroller"]');
            el = el[0];
            el = $(el).next();
            while(el.length){   
                console.log(el.outerScrollHeight(true, true));
                height -= el.outerScrollHeight(true, true);
                console.log(height);
                el.css({'z-index':1000, 'background-color':'white'});
                el = el.next();
            }
            console.log('margins : '+($('div[data-iscroll="scroller"]').outerScrollHeight(true) - $('div[data-iscroll="scroller"]').height()));
            height -= ($('div[data-iscroll="scroller"]').outerScrollHeight(true, true) - $('div[data-iscroll="scroller"]').height());
        }
        $('div[data-iscroll="scroller"]').attr('iscroll-height',height);
        
    }
    
    $('div[data-iscroll="scroller"]').height(height);
    /* ----- SECURITY ----*/
    
    if($('div[data-role="footer"]')){
        var footerbottom = $(window).height() - ($('div[data-role="footer"]').position().top + $('div[data-role="footer"]').outerScrollHeight(true));
        console.log('adding for footer : '+footerbottom);
        if(footerbottom != 0){
            height+= footerbottom;
            $('div[data-iscroll="scroller"]').attr('iscroll-height',height);
            $('div[data-iscroll="scroller"]').height(height);
        }
    }
    
    /* ----- SECURITY ----*/
    console.log('setted : '+height+' so its : '+$('div[data-iscroll="scroller"]').height());
    var myScroll = new iScroll($('div[data-iscroll="scroller"]').get(0), {momentum: false, hScrollbar: false, vScrollbar: false});//, {bounce: false});
    
    var allSelects = $('select');
    allSelects.each(function(index, item) {
        item.addEventListener('touchstart' /*'mousedown'*/, function(e) { e.stopPropagation(); }, false);
    });

    var allInputs = $('input');
    allInputs.each(function(index, item) {
        item.addEventListener('touchstart' /*'mousedown'*/, function(e) { e.stopPropagation(); }, false);
    });
    
    var allTextareas = $('textarea');
    allTextareas.each(function(index, item) {
        item.addEventListener('touchstart' /*'mousedown'*/, function(e) { e.stopPropagation(); }, false);
    });

    /*$('input').bind('touchstart' 'mousedown', function(e) {
        e.stopPropagation();
    }, false);*/
    //$('[data-role="page"][data-iscroll="enable"]').bind('touchmove', function (e) { e.preventDefault(); });
    $('[data-role="page"][data-iscroll="enable"] div[data-role="header"]').bind('touchmove', function (e) { e.preventDefault(); });
    $('[data-role="page"][data-iscroll="enable"] div[data-role="footer"]').bind('touchmove', function (e) { e.preventDefault(); });
    //$(document).bind('touchmove', function (e) { e.preventDefault(); }, false);
    
}