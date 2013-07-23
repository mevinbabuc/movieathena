            var button;
            var userInfo;
            
            window.fbAsyncInit = function() {
                FB.init({ appId: '173786519447935', //change the appId to your appId
                    status: true, 
                    cookie: true,
                    xfbml: true,
                    oauth: true});

               showLoader(true);
               
               function updateButton(response) {
                    button       =   document.getElementById('fb-auth');
                    userInfo     =   document.getElementById('user-info');
                    
                    if (response.authResponse) {
                        //user is already logged in and connected
                        FB.api('/me', function(info) {
                            login(response, info);
                        });
                        
                        button.onclick = function() {
                            FB.logout(function(response) {
                                logout(response);
                            });
                        };
                    } else {
                        //user is not connected to your app or logged out
                        button.innerHTML = 'Login';
                        button.onclick = function() {
                            showLoader(true);
                            FB.login(function(response) {
                                if (response.authResponse) {
                                    FB.api('/me', function(info) {
                                        login(response, info);
                                    });	   
                                } else {
                                    //user cancelled login or did not grant authorization
                                    showLoader(false);
                                }
                            }, {scope:'email,user_birthday,status_update,publish_stream,user_about_me,read_friendlists,'});  	
                        }
                    }
                }
                
                // run once with current status and whenever the status changes
                FB.getLoginStatus(updateButton);
                FB.Event.subscribe('auth.statusChange', updateButton);	
            };
            (function() {
                var e = document.createElement('script'); e.async = true;
                e.src = document.location.protocol 
                    + '../static/js/all.js';
                document.getElementById('fb-root').appendChild(e);
            }());
            
            
            function login(response, info){
                if (response.authResponse) {
                    var accessToken                                 =   response.authResponse.accessToken;
                    
                    userInfo.innerHTML                             = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name
                                                                    // + "<br /> Your Access Token: " + accessToken;
                    button.innerHTML                               = 'Logout';
                    showLoader(false);
                    document.getElementById('other').style.display = "block";
                }
            }
        
            function logout(response){
                userInfo.innerHTML                             =   "";
                document.getElementById('debug').innerHTML     =   "";
                document.getElementById('other').style.display =   "none";
                showLoader(false);
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
                        message     : "I love using 'in30mins.tk' ",
                        link        : 'http://in30mins.tk/',
                        picture     : 'http://thinkdiff.net/iphone/lucky7_ios.jpg',
                        name        : 'name',
                        description : 'descriptionufwhoewrfpoerijkjf  owifowefweofiu wefpweirp'
                        
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
       

           function sendRequestToRecipients() {
                FB.ui({method: 'apprequests',
                message: 'try out movieathena',
                }, requestCallback);
            }



(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=173786519447935";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

