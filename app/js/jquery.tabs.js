( function() {

    $( function() {

        $.each( $( '.tabs' ), function() {
            new Tabs ( $( this ) );
        } );

    } );

    var Tabs = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _btn = _obj.find( 'dt'),
            _tabsContent = _obj.find( 'dd'),
            _flag = true;

        //private methods
        var _onEvents = function() {

                _btn.on( {
                    click: function() {
                        if( _window.width() < 992 ) {

                            _slideContent( $( this) );

                        } else {

                            _setClassActive( $( this) );
                            _setMinHeight( $( this) );

                        }
                    }
                } );

                _window.on( {
                    load: function () {
                        if( _window.width() >= 992 ) {

                            _setTopPos();
                            _setFirstActive();
                            _flag = false;

                        } else {

                            _flag = true

                        }
                    },
                    resize: function() {
                        if( _window.width() >= 992 ) {

                            _setTopPos();
                            _setFirstActive();

                            _flag = false;

                        } else {

                            _resetStyle();
                            _flag = true

                        }
                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _setTopPos = function() {
                _tabsContent.css( {
                    top: _btn.eq( -1 ).position().top + _btn.eq( -1 ).innerHeight()
                } );
            },
            _setClassActive = function( elem ) {

                var curItem = elem,
                    nextElem = curItem.next(),
                    content = nextElem.find( '.tabs__content' );

                if( !curItem.hasClass( 'active' ) ) {
                    _btn.removeClass( 'active' );
                    _tabsContent.height( 0 );

                    curItem.addClass( 'active' );
                    nextElem.innerHeight( content.innerHeight() );
                }

            },
            _setFirstActive = function() {
                if( _flag ) {

                    _btn.eq( 0 ).addClass( 'active' );
                    _setMinHeight( _btn.eq( 0 ) );

                }
            },
            _setMinHeight = function( elem ) {

                var nextElem = elem.next();

                _obj.css( {
                    'min-height': nextElem.find( '.tabs__content' ).height() + nextElem.position().top
                } );

            },
            _slideContent = function( elem ) {

                var curItem = elem,
                    nextElem = curItem.next(),
                    content = nextElem.find( '.tabs__content' );

                if( !curItem.hasClass( 'active' ) ) {
                    _btn.removeClass( 'active' );
                    _tabsContent.removeAttr( 'style' );

                    curItem.addClass( 'active' );
                    nextElem.height( content.innerHeight() );
                } else {
                    curItem.removeClass( 'active' );
                    nextElem.removeAttr( 'style' );
                }

            },
            _resetStyle = function() {
                _obj.removeAttr( 'style' );
                _btn.removeClass( 'active' );
                _tabsContent.removeAttr( 'style' );
            };

        _init();
    };

} )();

