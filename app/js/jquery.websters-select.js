( function(){

    $( function(){
        $( 'select' ).each( function(){
            new WebstersSelect( {
                obj: $( this ),
                optionType: 1,
                showType: 2
            } );
        } );
    } );

    var WebstersSelect = function( params ){

        //private properties
        var _self = this,
            _obj = params.obj,
            _optionType = params.optionType || 0,
            _showType = params.showType || 0,
            _visible = params.visible || 5,
            _device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ),
            _text = $( '<span class="websters-select__item"></span>' ),
            _wrap = $( '<div class="websters-select"></div>' ),
            _window = $( window ),
            _body = $( 'body' ),
            _opened = false,
            _popup, _scroll;

        //private methods
        var _addWrap = function(){
                var curText = '';

                _obj.css( {
                    opacity: 0
                } );

                _obj.wrap( _wrap );
                _wrap = _obj.parent();
                _obj.before( _text );
                _obj.find( 'option' ).each( function(){
                    var curItem = $( this );

                    if( curItem.attr( 'selected' ) == 'selected' ){
                        curText = curItem.text();
                    }
                } );

                if( curText == '' ){
                    curText =  _obj.find( 'option').eq( 0 ).text();
                }
                _text.text( curText );
            },
            _hidePopup = function(){
                _opened = false;

                if( !_showType ){
                    _popup.css( {
                        display: 'none'
                    } );
                } else if( _showType == 1 ){
                    _popup.stop( true, false ).slideUp( 300, function(){
                        _popup.remove();
                    } );
                } else if( _showType == 2 ) {
                    _popup.stop( true, false ).fadeOut( 300, function(){
                        _popup.remove();
                    } );
                }
            },
            _init = function(){
                _obj[ 0 ].obj = _self;

                _addWrap();
                _selectViewType();
                _onEvents();
            },
            _onEvents = function(){
                _obj.on( 'change', function() {
                    _text.text( $( this ).find( 'option:selected' ).text() );
                } );

                if( _optionType == 1 && !_device ){
                    _wrap.on( {
                        'click': function( e ){
                            e.stopPropagation();

                            if( _opened ){
                                _hidePopup();
                            } else {
                                _showPopup();
                            }

                        }
                    } );

                    _window.on( {
                        'click': function(){
                            if( _opened ){
                                _hidePopup();
                            }
                        }
                    } );
                }
            },
            _selectViewType = function(){

                if( !_optionType || _device ){
                    _setMobileView();
                } else if( _optionType == 1 ){
                    _setCustom1();
                }
            },
            _setCustom1 = function(){
                _wrap.addClass( 'websters-select_custom' );
            },
            _setMobileView = function(){
                _wrap.addClass( 'websters-select_mobile' );
            },
            _showPopup = function(){
                var list = $( '<ul></ul>'),
                    curScroll = _window.scrollTop(),
                    offset = _wrap.offset(),
                    maxHeight = 0,
                    curIndex = _obj.find( 'option:selected' ).index(),
                    id = Math.round( Math.random() * 1000 );

                if( _opened ){
                    _popup.remove();
                }
                _opened = true;

                _popup = $( '<div class="websters-select__popup" id="websters-select__popup' + id + '"></div>' );

                _obj.find( 'option' ).each( function( i ){
                    var curItem = $( this );

                    if( i == curIndex ){
                        list.append( '<li class="active">' + curItem.text() + '</li>' );
                    } else {
                        list.append( '<li>' + curItem.text() + '</li>' );
                    }

                } );

                _popup.append( list );
                _body.append( _popup );

                _popup.css( {
                    width: _wrap.outerWidth(),
                    left: offset.left,
                    top: offset.top + _wrap.outerHeight()
                } );

                maxHeight = _popup.outerHeight();
                if( maxHeight > _popup.find( 'li' ).eq( 0 ).outerHeight() * _visible ){
                    _popup.height( _popup.find( 'li' ).eq( 0 ).outerHeight() * _visible );
                    _scroll = _popup.niceScroll( {
                        horizrailenabled: false
                    } );
                }

                if( _showType == 1 ){
                    _popup.css( {
                        display: 'none'
                    } );
                    _popup.slideDown( 300 );
                } else if( _showType == 2 ) {
                    _popup.css( {
                        opacity: 0.1
                    } );
                    _popup.animate( { opacity: 1 }, 300);
                }

                _popup.find( 'li' ).on( {
                    'click': function( e ){
                        var index = $( this ).index();

                        e.stopPropagation();

                        _obj.val( _obj.find( 'option' ).eq( index ).attr( 'value' ) );
                        _obj.trigger( 'change' );
                        _core.hidePopup();
                    }
                } );

            };

        //public properties

        //public methods


        _init();
    };
} )();


var AresSelect = function( params ){
    this.obj = params.obj;
    this.optionType = params.optionType || 0;
    this.showType = params.showType || 0;
    this.visible = params.visible || 5;

    this.init();
};
AresSelect.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.start();
                self.core.controls();
            },
            start: function(){
                self.device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                self.text = $( '<span class="ares-select__item"></span>' );
                self.wrap = $( '<div class="ares-select"></div>' );
                self.window = $( window );
                self.opened = false;

                self.core.addWraper();
                if( !self.optionType || self.device ){
                    self.core.setMobileView();
                } else if( self.optionType == 1 ){
                    self.core.setCustom1();
                }

                self.obj[ 0 ].customSelect = this;
            },
            setMobileView: function(){
                self.wrap.addClass( 'ares-select_mobile' );
            },
            setCustom1: function(){
                self.wrap.addClass( 'ares-select_custom' );
            },
            destroy: function(){
                self.text.remove();
                self.wrap.unwrap();
            },
            addWraper: function(){
                var curText = '';

                self.obj.css( {
                    opacity: 0
                } );

                self.obj.wrap( self.wrap );
                self.wrap = self.obj.parent();
                self.obj.before( self.text );
                self.obj.find( 'option' ).each( function(){
                    var curItem = $( this );

                    if( curItem.attr( 'selected' ) == 'selected' ){
                        curText = curItem.text();
                    }
                } );

                if( curText == '' ){
                    curText =  self.obj.find( 'option').eq( 0 ).text();
                }
                self.text.text( curText );
            },
            showPopup: function(){
                var list = $( '<ul></ul>'),
                    curScroll = self.window.scrollTop(),
                    offset = self.wrap.offset(),
                    maxHeight = 0,
                    curIndex = self.obj.find( 'option:selected' ).index(),
                    id = Math.round( Math.random() * 1000 );

                if( self.opened ){
                    self.popup.remove();
                }
                self.opened = true;

                self.popup = $( '<div class="ares-select__popup" id="ares-select__popup' + id + '"></div>' );

                self.obj.find( 'option' ).each( function(i){
                    var curItem = $( this );

                    if( i == curIndex ){
                        list.append( '<li class="active">' + curItem.text() + '</li>' );
                    } else {
                        list.append( '<li>' + curItem.text() + '</li>' );
                    }

                } );

                self.popup.append( list );
                $( 'body' ).append( self.popup );

                self.popup.css( {
                    width: self.wrap.outerWidth(),
                    left: offset.left,
                    top: offset.top + self.wrap.outerHeight()
                } );

                maxHeight = self.popup.outerHeight();
                if( maxHeight > self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible ){
                    self.popup.height(self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible);
                    self.scroll = new IScroll('#ares-select__popup' + id, {
                        scrollX: false,
                        scrollY: true,
                        click: true,
                        zoom:true,
                        mouseWheel: true,
                        scrollbars: 'custom',
                        probeType: 3,
                        interactiveScrollbars: true
                    });
                }

                if( self.showType == 1 ){
                    self.popup.css( {
                        display: 'none'
                    } );
                    self.popup.slideDown( 300, function(){
                        if( self.scroll ) {
                            self.scroll.refresh();
                        }
                    } );
                } else if( self.showType == 2 ) {
                    self.popup.css( {
                        opacity: 0.1
                    } );
                    self.popup.animate( { opacity: 1 },300, function(){
                        if( self.scroll ) {
                            self.scroll.refresh();
                        }
                    } );
                }

                self.popup.find( 'li' ).on( {
                    'click': function( event ){
                        var event = event || window.event,
                            index = $( this ).index();

                        if (event.stopPropagation) {
                            event.stopPropagation()
                        } else {
                            event.cancelBubble = true
                        }

                        self.obj.val( self.obj.find( 'option' ).eq( index).attr( 'value' ) );
                        self.obj.trigger( 'change' );
                        self.core.hidePopup();

                    }
                } );

            },
            hidePopup: function(){
                self.opened = false;
                if( !self.showType ){
                    self.popup.css( {
                        display: 'none'
                    } );
                } else if( self.showType == 1 ){
                    self.popup.stop( true, false ).slideUp( 300, function(){
                        self.popup.remove();
                    } );
                } else if( self.showType == 2 ) {
                    self.popup.stop( true, false ).fadeOut( 300, function(){
                        self.popup.remove();
                    } );
                }
            },
            controls: function() {
                self.obj.on( 'change', function() {
                    self.text.text( $( this ).find( 'option:selected' ).text() );
                } );

                if( self.optionType == 1 && !self.device ){
                    self.wrap.on( {
                        'click': function(event){
                            var event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation()
                            } else {
                                event.cancelBubble = true
                            }

                            if( self.opened ){
                                self.core.hidePopup();
                            } else {
                                self.core.showPopup();
                            }

                        }
                    } );
                    $( 'body' ).on( {
                        'click': function(){
                            if( self.opened ){
                                self.core.hidePopup();
                            }
                        }
                    } );
                }
            }
        };
    }
};