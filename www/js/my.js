
jQuery(function($){

    $("#login_submit").click(function(event) {
        event.preventDefault();
        var credentials = { screenName: $('#screenName').val(), password: $('#password').val() };
        
        if( credentials.screenName === '' || credentials.password === '' ){
            
            $('<div>').simpledialog2({
                mode: 'blank',
                headerText: 'Sign In Error',
                headerClose: true,
                blankContent : 
                  "<ul data-role='listview'><li>Please complete the login form.</li></ul>"+
                  "<a rel='close' data-role='button' href='#'>OK</a>"
            });

            return false;
        }

        $.ajax({
            url: $('#login_form').attr('action'),
            type: "POST",
            data: credentials,
            cache: false,
            //complete: function() {},
            success: function(data) {
                // Validated
                $.mobile.changePage( $('#capture-page') );

                return true;
            },
            error: function() {
                
                $('<div>').simpledialog2({
                    mode: 'blank',
                    headerText: 'Sign In Error',
                    headerClose: true,
                    blankContent : 
                      "<ul data-role='listview'><li>Please correct your username / password.</li></ul>"+
                      "<a rel='close' data-role='button' href='#'>OK</a>"
                });

                return false;
            }
        });
    });

});