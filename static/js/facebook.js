
            
            // window.fbAsyncInit = function() {
            //     FB.init({ appId: '173786519447935', //change the appId to your appId
            //         status: true, 
            //         cookie: true,
            //         xfbml: true,
            //         oauth: true});

            //    showLoader(true);
               
//                function updateButton(response) {
//                     button       =   document.getElementById('fb-auth');
//                     userInfo     =   document.getElementById('user-info');
                    
//                     if (response.authResponse) {
//                         //user is already logged in and connected
//                         FB.api('/me', function(info) {
//                             login(response, info);
//                         });
                        
//                         button.onclick = function() {
//                             FB.logout(function(response) {
//                                 logout(response);
//                             });
//                         };
//                     } else {
//                         //user is not connected to your app or logged out
//                         button.innerHTML = 'Login';
//                         button.onclick = function() {
//                             showLoader(true);
//                             FB.login(function(response) {
//                                 if (response.authResponse) {
//                                     FB.api('/me', function(info) {
//                                         login(response, info);
//                                     });	   
//                                 } else {
//                                     //user cancelled login or did not grant authorization
//                                     showLoader(false);
//                                 }
//                             }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me'});  	
//                         }
//                     }
//                 }
                
//                 // run once with current status and whenever the status changes
//                 FB.getLoginStatus(updateButton);
//                 FB.Event.subscribe('auth.statusChange', updateButton);	
          
// };

 window.fbAsyncInit = function() {
  FB.init({
    appId      : '173786519447935', // App ID
    channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.

      fetchname();
      user_details();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 

  function fetchname() {
    var userName = $('#username');
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
            if(response.name)
              userName.text(response.name);
            else
              userName.text("Welcome Guest");
    });
  }

 function logout(response){
               
                FB.logout(function(response) {
                // user is now logged out
                });
                fetchname();
            }

            
            function user_details(){
                if (response.authResponse) {
                    var accessToken                                 =   response.authResponse.accessToken;
                    
                    userInfo.innerHTML                             = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name
                                                                     + "<br /> Your Access Token: " + accessToken;
                    showLoader(false);
                  
                }
            }
        
           

            //stream publish method
            function streamPublish(name, description, hrefTitle, hrefLink, userPrompt){
                showLoader(true);
                FB.ui(
                {
                    method: 'stream.publish',
                    message: '',
                    attachment: {
                        name: name,
                        caption: '',
                        description: (description),
                        href: hrefLink
                    },
                    action_links: [
                        { text: hrefTitle, href: hrefLink }
                    ],
                    user_prompt_message: userPrompt
                },
                function(response) {
                    showLoader(false);
                });

            }
            function showStream(){
                FB.api('/me', function(response) {
                    //console.log(response.id);
                    streamPublish(response.name, 'I like the articles of my work', 'hrefTitle', 'http://in30mins.tk/', "Share in30mins.tk");
                });
            }

            function share(){
                showLoader(true);
                var share = {
                    method: 'stream.share',
                    u: 'http://in30mins.tk/'
                };

                FB.ui(share, function(response) { 
                    showLoader(false);
                    console.log(response); 
                });
            }

            function graphStreamPublish(){
                showLoader(true);
                
                FB.api('/me/feed', 'post', 
                    { 
                        message     : "I love in30mins.tk for facebook app development tutorials",
                        link        : 'http://in30mins.tk/',
                        picture     : 'http://thinkdiff.net/iphone/lucky7_ios.jpg',
                        name        : 'iOS Apps & Games',
                        description : 'Checkout iOS apps and games from in30mins.tk. I found some of them are just awesome!'
                        
                }, 
                function(response) {
                    showLoader(false);
                    
                    if (!response || response.error) {
                        alert('Error occured');
                    } else {
                        alert('Post ID: ' + response.id);
                    }
                });
            }

            function fqlQuery(){
                showLoader(true);
                
                FB.api('/me', function(response) {
                    showLoader(false);
                    
                    //http://developers.facebook.com/docs/reference/fql/user/
                    var query       =  FB.Data.query('select name, profile_url, sex, pic_small from user where uid={0}', response.id);
                    query.wait(function(rows) {
                       document.getElementById('debug').innerHTML =  
                         'FQL Information: '+  "<br />" + 
                         'Your name: '      +  rows[0].name                                                            + "<br />" +
                         'Your Sex: '       +  (rows[0].sex!= undefined ? rows[0].sex : "")                            + "<br />" +
                         'Your Profile: '   +  "<a href='" + rows[0].profile_url + "'>" + rows[0].profile_url + "</a>" + "<br />" +
                         '<img src="'       +  rows[0].pic_small + '" alt="" />' + "<br />";
                     });
                });
            }

            function setStatus(){
                showLoader(true);
                
                status1 = document.getElementById('status').value;
                FB.api(
                  {
                    method: 'status.set',
                    status: status1
                  },
                  function(response) {
                    if (response == 0){
                        alert('Your facebook status not updated. Give Status Update Permission.');
                    }
                    else{
                        alert('Your facebook status updated');
                    }
                    showLoader(false);
                  }
                );
            }
            
            function showLoader(status){
                if (status)
                    document.getElementById('loader').style.display = 'block';
                else
                    document.getElementById('loader').style.display = 'none';
            }
            
      
