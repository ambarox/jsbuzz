Session.set("postid","");

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

            $(".wrapper").removeClass("posts-only")

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
                        user: Meteor.user().profile.name,
                        message: newpost.value,
                        time: Date.now(),
                        id: Meteor.user()._id,
                        profileImage: Meteor.user().services.google.picture
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
                        user: Meteor.user().profile.name,
                        post_id : Session.get("postid"),
                        comment: newcomment.value,
                        time: Date.now(),
                        profileImage: Meteor.user().services.google.picture
                    });

                    newcomment.value = '';
                }
            }
        },
        'click #remove-this-thread':function(){

                //return Meteor.call('removePostsAndComments');

        },
        'click .editable-message':function(e){

            var newcomment = document.getElementById(e.target);
            e.target.setAttribute('contenteditable',true);
            return true;

        },
        'focusout .editable-message':function(e){

            var newcomment = $(e.target).text();
            e.target.setAttribute('contenteditable',false);
            Comments.update({_id: this._id}, {$set: {comment: newcomment}});
            return true;

        }
    }

})



