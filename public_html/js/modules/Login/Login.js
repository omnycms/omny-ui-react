define(["utilities/QueryStringReader","utilities/ModuleManager"],
    function(queryStringReader, moduleManager) {
      function Login(data, editable) {
          this.render = function(element) {
              var button = document.createElement("button");
              $(button).html("Login");
              $(button).attr("id","signinButton");
              if(editable) {
                  moduleManager.setSaveFunction(button,function() {
                    return {"omnyClass":"Omny.Login","data":{}};
                  });
              }
              element.appendChild(button);

              (function() {
                  var po = document.createElement('script');
                  po.type = 'text/javascript';
                  po.async = true;
                  po.src = 'https://apis.google.com/js/client:plusone.js?onload=renderLogin';
                  var s = document.getElementsByTagName('script')[0];
                  s.parentNode.insertBefore(po, s);
              })();

          };
      }

      //from w3schools http://www.w3schools.com/js/js_cookies.asp
      window.setCookie=function(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+d.toGMTString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
      }

      window.signinCallback=function(authResult) {
          if(typeof authResult=="undefined") {
              return;
          }
          if (authResult['status']&&authResult['status']['signed_in']) {
              console.log(authResult);
              requirejs(['utilities/OmnyApiRequester'],
              function(apiRequester) {

                  apiRequester.apiRequest("auth","login/google",{
                      data : {
                          "oauth_token": authResult['access_token']
                      },
                      success: function(sessionId) {
                          console.log(sessionId);
                          setCookie('access_token',sessionId,20*365);
                          window.location = window.location.origin+"/dashboard.html";
                      }
                  });
              });
              // Update the app to reflect a signed in user
              // Hide the sign-in button now that the user is authorized, for example:
              //document.getElementById('signinButton').setAttribute('style', 'display: none');
          } else {
              // Update the app to reflect a signed out user
              // Possible error values:
              //   "user_signed_out" - User is signed-out
              //   "access_denied" - User denied access to your app
              //   "immediate_failed" - Could not automatically log in the user
              console.log('Sign-in state: ' + authResult['error']);
          }
      };

      /* Executed when the APIs finish loading */
      window.renderLogin=function() {

          // Additional params including the callback, the rest of the params will
          // come from the page-level configuration.
          var additionalParams = {
              'callback': signinCallback,
              'cookiepolicy': 'single_host_origin',
              'clientid' : '226511320189-cknddk13mq96m3a6gncq3dhav3qht10v.apps.googleusercontent.com',
              'scope': 'email'
          };

          // Attach a click listener to a button to trigger the flow.
          var signinButton = document.getElementById('signinButton');
          signinButton.addEventListener('click', function() {
              gapi.auth.signIn(additionalParams); // Will use page level configuration
          });
      };


      return Login;
    }
);
