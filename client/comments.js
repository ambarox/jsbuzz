//LIST THREADS
Template.posts = function () {
	return Posts.find({}, { sort: { time: -1 }});
}

Template.post.events({
	'click .clickable': function () {
		Posts.update(this._id, {$inc: {
			time: Date.now()
		}});
	}
});


//ADD NEW POST
Template.input.events = {
	'keydown input#newpost' : function (event) {
		if (event.which == 13) { // 13 is the enter key event

			//CHECK USER AUTHENTICATION
			var user = 'User';

			var newpost = document.getElementById('newpost');

			if (newpost.value != '') {

				//ADD DATA TO MONGODB
				Posts.insert({
					user: user,
					content: newpost.value,
					time: Date.now()
				});

				newpost.value = '';
			}
		}
	}
}
