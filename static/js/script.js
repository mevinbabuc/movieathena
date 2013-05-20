/*
 *Author : Anenth
 */

// Login/signup function
var login_signup = function() {
	var div_login = $("#login");
	var div_signup = $("#signup");
	var button_login = $("#button_login");
	button_login.toggle(function() {
		div_signup.hide();
		button_login.text("Sign up");
		div_login.fadeIn();
	}, function() {
		div_login.hide();
		button_login.text("Login");
		div_signup.fadeIn();

	});
};
login_signup();

