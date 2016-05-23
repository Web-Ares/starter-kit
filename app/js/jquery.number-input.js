( function () {
    $( function () {
        new Number();
    } );

    var Number = function () {

        //private properties
        var _body = $( 'body' );

        //private methods
        var _constructor = function () {
                _onEvents();
            },
            _onEvents = function () {
                _body.on( 'keypress', '.number input', function (event) {
                    if ( ( event.which != 46 || $( this ).val().indexOf( '.' ) != -1 ) && ( event.which < 48 || event.which > 57 ) ) {
                        event.preventDefault();
                    }
                } );
            };

        //public properties

        //public methods

        _constructor();
    };

} )();