/**
 * Created by mactec on 4/6/14.
 */

Handlebars.registerHelper('timeago', function(date) {
    if(date) {
        dateObj = new Date(date);
        return $.timeago(dateObj);
    }
    return 'a long long time ago in a galaxy far away';
});

Handlebars.registerHelper('checkuser', function(email) {

    if(email != Meteor.user().services.google.email) {
       return false;
    } else {
        return true;
    }

});
