/*
 isProdEnv = function () {
    if (process.env.ROOT_URL == "http://localhost:3000") {
        return false;
    } else {
        return true;
    }
}

Accounts.loginServiceConfiguration.remove({
    service: 'google'
});

 */
/*Accounts.loginServiceConfiguration.remove({
 service: 'facebook'
 });

 Accounts.loginServiceConfiguration.remove({
 service: 'twitter'
 });

 Accounts.loginServiceConfiguration.remove({
 service: 'github'
 });*//*


 if (isProdEnv()) {
 */
/*Accounts.loginServiceConfiguration.insert({
 service: 'github',
     clientId: '00000',
     secret: '00000'
     });
     Accounts.loginServiceConfiguration.insert({
     service: 'twitter',
     consumerKey: '00000',
     secret: '00000'
 });*//*

 Accounts.loginServiceConfiguration.insert({
        service: 'google',
        appId: '898503452336',
        secret: 'yNjwhgowUFPHjeS7n6WM_yLT'
    });
 */
/*Accounts.loginServiceConfiguration.insert({
 service: 'facebook',
     appId: '00000',
     secret: '00000'
 });*//*

 } else {
    // dev environment
 */
/*Accounts.loginServiceConfiguration.insert({
 service: 'github',
     clientId: '11111',
     secret: '11111'
     });
     Accounts.loginServiceConfiguration.insert({
     service: 'twitter',
     consumerKey: '11111',
     secret: '11111'
 });*//*

 Accounts.loginServiceConfiguration.insert({
        service: 'google',
        appId: '898503452336',
        secret: 'yNjwhgowUFPHjeS7n6WM_yLT'
    });
 */
/*Accounts.loginServiceConfiguration.insert({
 service: 'facebook',
     appId: '11111',
     secret: '11111'
 });*//*

 }

Accounts.onCreateUser(function (options, user) {
    if (user.services) {
        if (options.profile) {
            user.profile = options.profile
        }
        var service = _.keys(user.services)[0];
        var email = user.services[service].email;
        if (!email) {
            if (user.emails) {
                email = user.emails.address;
            }
        }
        if (!email) {
            email = options.email;
        }
        if (!email) {
            // if email is not set, there is no way to link it with other accounts
            return user;
        }

        // see if any existing user has this email address, otherwise create new
        var existingUser = Meteor.users.findOne({'emails.address': email});
        if (!existingUser) {
            // check for email also in other services
            //var existingGitHubUser = Meteor.users.findOne({'services.github.email': email});
            var existingGoogleUser = Meteor.users.findOne({'services.google.email': email});
            //var existingTwitterUser = Meteor.users.findOne({'services.twitter.email': email});
            //var existingFacebookUser = Meteor.users.findOne({'services.facebook.email': email});
            var doesntExist = !existingGoogleUser;
            if (doesntExist) {
                // return the user as it came, because there he doesn't exist in the DB yet
                return user;
            } else {
                existingUser = existingGoogleUser;
                if (existingUser) {
                    if (user.emails) {
                        // user is signing in by email, we need to set it to the existing user
                        existingUser.emails = user.emails;
                    }
                }
            }
        }

        // precaution, these will exist from accounts-password if used
        if (!existingUser.services) {
            existingUser.services = { resume: { loginTokens: [] }};
        }

        // copy accross new service info
        existingUser.services[service] = user.services[service];
        existingUser.services.resume.loginTokens.push(
            user.services.resume.loginTokens[0]
        );

        // even worse hackery
        Meteor.users.remove({_id: existingUser._id}); // remove existing record
        return existingUser;              // record is re-inserted
    }
 });*/
