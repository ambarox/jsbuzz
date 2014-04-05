Session.set("postid","");
Session.set("user","User");

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
        /*'click #remove-all-thread': function () {

            Posts.remove({});
            return SomeOtherItems.remove({});

        },*/
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
            Comments.remove({post_id: Session.get("postid")},1);
            //Posts.remove(Session.get("postid"));
            return true;
        }
    }

})



