Session.set("postid","");
if(Meteor.user()){
    Session.set("user", Meteor.user().profile.name);
}


//db.Posts.remove()
//db.Comments.remove()


//LIST THREADS
Template.threads.helpers({
    posts : function () {
	    return Posts.find({}, { sort: { time: -1 }});
    },
    events : {
        'click .thread': function () {

            Session.set("postid", this._id);

        },
        'click #remove-all-thread':function(){

            return Meteor.call('removePostsAndComments');

        },
        'keydown input#newpost':function(event){
            if (event.which == 13) { // 13 is the enter key event

                //CHECK USER AUTHENTICATION

                var newpost = document.getElementById('newpost');

                if (newpost.value != '') {

                    //ADD DATA TO MONGODB
                    Posts.insert({
                        user: Session.get("user"),
                        message: newpost.value,
                        time: Date.now()
                    });

                    newpost.value = '';
                }
            }
        }
    }
})


Template.postfull.helpers({
    post : function(){
        if(Session.get("postid")){
            return Posts.find({_id : Session.get("postid")});
        }
    },
    comments : function(){
        if(Session.get("postid")){
            return Comments.find({post_id : Session.get("postid")});
        }
    },
    events : {
        'keydown input#newcomment':function(event){
            if (event.which == 13) { // 13 is the enter key event

                //CHECK USER AUTHENTICATION

                var newcomment = document.getElementById('newcomment');

                if (newcomment.value != '') {

                    //ADD DATA TO MONGODB
                    Comments.insert({
                        user: Session.get("user"),
                        post_id : Session.get("postid"),
                        comment: newcomment.value,
                        time: Date.now()
                    });

                    newcomment.value = '';
                }
            }
        },
        'click #remove-this-thread':function(){

                //return Meteor.call('removePostsAndComments');

        }
    }

})



