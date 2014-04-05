var clicked_post = 'q527t2p2T4czEQ7EK';

//LIST THREADS
Template.threads.helpers({
    posts : function () {
	    return Posts.find({}, { sort: { time: -1 }});
    },
    events : {
        'click .thread': function () {
            clicked_post = this._id;

            console.log(clicked_post)


        },
        'keydown input#newpost':function(event){
            if (event.which == 13) { // 13 is the enter key event

                //CHECK USER AUTHENTICATION
                var user = 'User';

                var newpost = document.getElementById('newpost');

                if (newpost.value != '') {

                    //ADD DATA TO MONGODB
                    Posts.insert({
                        user: user,
                        message: newpost.value,
                        time: Date.now()
                    });

                    newpost.value = '';
                }
            }
        }
    }
})


Template.postfull.post = function() {
    if(clicked_post){
        return Posts.find({_id : clicked_post});
    }
}

