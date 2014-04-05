//LIST THREADS
Template.comment.comments = function () {
    return Comments.find({}, { sort: { time: -1 }}); // @TODOD return comments for the specific id
}

Template.post.events({
    'click .clickable': function () {
        Comments.update(this._id, {$inc: {
            time: Date.now()
	        // @TODO attach comment with the thread
        }});
    }
});


//ADD NEW POST
Template.input.events = {
    'keydown input#newcomment' : function (event) {
        if (event.which == 13) { // 13 is the enter key event

            //CHECK USER AUTHENTICATION
            var user = 'User';

            var newcomment = document.getElementById('newcomment');

            if (newcomment.value != '') {

                //ADD DATA TO MONGODB
                Comments.insert({
                    user: user,
                    content: newcomment.value,
                    time: Date.now()
                });

                newcomment.value = '';
            }
        }
    }
}