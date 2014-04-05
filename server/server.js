if (Meteor.isServer) {
    Meteor.startup(function() {
        return Meteor.methods({

            removeAllPosts: function() {

                return Comments.remove({});

            },
            removeAllComments: function() {

                return Posts.remove({});

            },
            removePostsAndComments : function(){
                Comments.remove({});
                return Posts.remove({});
            }

        });
    });
}