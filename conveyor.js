/**
* ConveryorBelt jQuery plug-in
* Rollin'up images on the conveyor belt - keep on truckin...it's just another slideshow carosel
*
* @author Jean-Christophe Nicolas <mrjcnicolas@gmail.com>
* @homepage http://bite-software.co.uk/conveyor/
* @version 1.0.0
* @license MIT http://opensource.org/licenses/MIT
* @date 16-07-2013
*/
(function($) {

$.fn.conveyor = function(options){
    
    var el = $(this),
    	mobile = isMobile.any();
        conveyor = new Plugin(el,options);

    window.addEventListener( 'resize', conveyor.resize, false );

    return el;  
};

var Plugin = function(me,options){
    
    this.config = {
        ul:'#images',
        fit:'cover',
        auto:true,
        countdown:(~~(Math.random()*2000)+500),
        speed:400,
        startPosition:1,
        transition:'blend',
        ease:'normal',
        direction:'forward',
        overflow:true,
        html:false,
        htmlbg:null,
        controls:false
    };
    $.extend(this.config,options);

    this.el = me;
    this.width = this.el.width();
    this.height = this.el.height();
    this.total = this.el.find('li').length;
    this.current = this.order(this.config.startPosition);
    this.ulwidth = this.total * this.width;
    this.ulheight = this.total * this.height;
    this.ease = this.easeSwitch();
    this.tweening = true;
    this.ul = $(this.el).find(this.config.ul);
        
    this.init();
}
Plugin.prototype.init = function(){

    this.slides = [],
        $this = this;

    this.setup(); // constructs html & css styles
    
    this.el.find('li').each(function(i){
        $this.slides[i] = {
            item: $(this),
            path: $(this).children().attr('src'),
            orient: $this.orientation($(this).children('img')),
            i:i
        };
        if(!$this.config.html) $(this).html('');
        $this.cssemble($this.slides[i]);
    });
    if($this.config.transition != 'blend') $(this.ul).css(this.prefixer());
    if(this.config.auto) this.autoslide();
    if(this.config.controls) this.addControls();
}
Plugin.prototype.setup = function(){

    var type = this.config.transition;
    
    if(this.config.overflow)this.el.css('overflow','hidden');

    $(this.ul).css({
        'position':'relative',
        'list-style':'none'
    });
    switch(type){
        case 'horizontal':     
            this.xpos = -(this.current * this.width);
            $(this.ul).css({
                'width':this.ulwidth + 'px',
                'left':this.xpos+'px'
            });
        break;
        case 'vertical':
            this.ypos =  -(this.current * this.height);
            $(this.ul).css({
                'top':this.ypos+'px'
            });        
        break;
        case 'blend':
            $(this).css(this.prefixer());
        break;
    }
}
Plugin.prototype.cssemble = function(item){
           
    var $li = item.item,
        $path = item.path,
        $this = this,
        $ize = this.sizer();
    
    $li.css(this.stacking()); // stacking types dependant on transition choice
    if(this.config.html) $path = this.config.htmlbg;
    // $path = 'img/7.jpg'
    $li.css({
        'width':$this.width+'px',
        'height':$this.height+'px',
        'background-image':'url('+ $path +')',
        'background-color': 'transparent',
        'background-repeat':'no-repeat',
        'background-position':'center center',
        'background-size':$ize
    });
    if(this.config.transition == 'blend'){
        $li.css(this.prefixer()); // css3 transitions on individual images
        var value = (this.current == item.i)? 1 : 0;
        $li.css('opacity',value)
    }
}
Plugin.prototype.order = function(num){
    if(num == 'random'){
        return Math.floor(Math.random()*this.total);
    }
    else if(num == 'last'){
        return this.total-1;
    }else{
        return num-1;
    }
}
Plugin.prototype.stacking = function(){
    var stack;
    switch(this.config.transition){
        case 'horizontal':
            stack = {'float':'left'}
            return stack;
        break;
        case 'vertical':
            stack = {'float':'left'}
            return stack;
        break;
        case 'blend':
            stack = {'position':'absolute'}
            return stack;
        break;
    }
}
Plugin.prototype.slide = function(direction){

    var $this = this,
        $type = this.config.transition,
        $previous = this.slides[this.current].item;

    if(direction == 'forward'){
        if(this.current == this.total-1){        
            this.current = 0;
            this.transition($type,'forward','reset')
        }else{
            this.current++;
            this.transition($type,'forward','normal')             
        }
    }
    else{
        if(this.current >= 1){
            this.current--;  
            this.transition($type,'backward','normal') 
        }else{
            this.current = this.total-1;
            this.transition($type,'backward','reset')     
        }
    }
    var $selected = this.slides[this.current].item;

    // administer effect
    switch($type){
        case 'horizontal':
            this.el.children(this.ul).css({
                left: $this.xpos+'px'
            })
        break;
        case 'vertical':
            this.el.children(this.ul).css({
                top: $this.ypos+'px'
            })
        break;
        case 'blend':
            $previous.css('opacity',0);
            $selected.css('opacity',1);
        break;
    }   
}
Plugin.prototype.transition = function(trans,dir,set){

    switch(trans){
        case 'horizontal':
            this.transit.slide(dir,set,this)
            // if(!this.tweening) this.toggleTween();
        break;
        case 'vertical':
            this.transit.vertical(dir,set,this)
        break;
        case 'blend':
            this.transit.alpha(dir,set,this)
        break;
    }
}
Plugin.prototype.transit = {
    
    slide:function(dir,set,$this){
        
        if(dir == 'forward'){
            if(set == 'reset'){
                // $this.toggleTween();
                $this.xpos = 0;
            }else{
                $this.xpos -= $this.width;
            }
        }else{
            if(set == 'reset'){
                // $this.toggleTween();
                $this.xpos = -$this.ulwidth + $this.width;
            }else{
                $this.xpos += $this.width;
            }
        }
    },
    vertical:function(dir,set,$this){
        if(dir == 'forward'){
            if(set == 'reset'){
                // $this.toggleTween();
                $this.ypos = 0;
            }else{
                $this.ypos -= $this.height;
            }
        }else{
            if(set == 'reset'){
                // $this.toggleTween();
                $this.ypos = -$this.ulwidth + $this.height;
            }else{
                $this.ypos += $this.height;
            }
        }
    },
    alpha:function(dir,set,$this){
        if(dir == 'forward'){
            if(set == 'reset'){
                // $this.toggleTween();
                $this.ypos = 0;
            }else{
                $this.ypos -= $this.height;
            }
        }else{
            if(set == 'reset'){
                // $this.toggleTween();
                $this.ypos = -$this.ulwidth + $this.height;
            }else{
                $this.ypos += $this.height;
            }
        }
    }
    
}
Plugin.prototype.toggleTween = function(){
    
    this.tweening = (this.tweening)? false : true;

    if(this.config.transition == 'slide'){
        $(this.ul).css(this.prefixer())
    }else{

    }

}
Plugin.prototype.autoslide = function(){
    var $this = this;
    this.auto = setInterval(function(){     
        
        this.random = true; // for plugin site only
        if(this.random){
            var d = (Math.random() > .5)? 'forward' : 'reverse';
            $this.slide(d);    
        }else{
            $this.slide($this.config.direction);    
        }
        
                 
    },this.config.countdown);
}
Plugin.prototype.addControls = function(){

    var $$this = this;

    this.el.parent().append('<div class="cb-next"/>');
    this.el.parent().append('<div class="cb-prev"/>');

    $('.cb-next').css({
        'float':'right',
        'position':'relative',
        'top':'-450px',
        'right':'-20px',
        'margin-top':'10px',
        'margin-left':'10px',
        'width':'20px',
        'height':'20px',
        'border-left':'15px solid rgb(255,255,255)',
        'border-top':'15px solid rgb(255,255,255)',
        '-webkit-transform':'rotate(135deg)',
        '-webkit-transition':'all .3s',
        'opacity':'.5'
    })
    $('.cb-next').on('click',function(){
        $this.slide($this.config.direction);
    }).on('mouseover',function(){
        $(this).css({
            'opacity':'1',
            'cursor':'pointer'
        })
    }).on('mouseout',function(){
        $(this).css('opacity','.5')
    })

    $('.cb-prev').css({
        'float':'left',
        'position':'relative',
        'top':'-450px',
        'left':'-20px',
        'margin-top':'10px',
        'margin-left':'10px',
        'width':'20px',
        'height':'20px',
        'border-left':'15px solid rgb(255,255,255)',
        'border-top':'15px solid rgb(255,255,255)',
        '-webkit-transform':'rotate(-45deg)',
        '-webkit-transition':'all .3s',
        'opacity':'.5'
    })
    $('.cb-prev').on('click',function(){
        var way = ($this.config.direction == 'forward')? 'backward' : 'forward';
        $this.slide(way);
    }).on('mouseover',function(){
        $(this).css({
            'opacity':'1',
            'cursor':'pointer'
        })
    }).on('mouseout',function(){
        $(this).css('opacity','.5')
    })

}
Plugin.prototype.orientation = function(img){
    var w = img.width(),
        h = img.height(),
        o = (w > h)? true : false;
        
    return o // true for landscape
}
Plugin.prototype.prefixer = function(){
    var prefix = {};
    if(this.tweening){
        prefix = {
            '-webkit-transition':'all '+this.config.speed+'ms '+this.ease, 
            '-moz-transition':'all '+this.config.speed+'ms '+this.ease, 
            '-ms-transition':'all '+this.config.speed+'ms '+this.ease,
            '-o-transition':'all '+this.config.speed+'ms '+this.ease,
            'transition':'all '+this.config.speed+'ms '+this.ease
        }
    }else{
        prefix = {
            '-webkit-transition':'all 0',
            '-moz-transition':'all 0',
            '-ms-transition':'all 0',
            '-o-transition':'all 0',
            'transition':'all 0'
        }
    }
    return prefix;
}
Plugin.prototype.sizer = function(){

    var size = this.config.fit,
        percent;

    if(typeof(size) != 'string'){
        percent = (size*100) + '%';
        size = 'percent';
    };

    switch(size){

        case 'portrait':
            size = 'auto 100%'
            return size;
        break;
        case 'landscape':
            size = '100% auto'
            return size;
        break;
        case 'cover':
            size = 'cover'
            return size;
        break;
        case 'percent':
            return percent;
        break;
    }
}
Plugin.prototype.easeSwitch = function(){
    var ease = this.config.ease,
        type = ease.charAt(0);

    switch(type){
        case 'n':
            return ''
        break;
        case 'i':
            return 'ease-in'
        break;
        case 'o':
            return 'cubic-bezier(0.230, 1.000, 0.320, 1.000)'
        break;
        case '$':
            return ease.substring(1).toString();
        break
    }
}
Plugin.prototype.resize = function(){

}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

})(jQuery);