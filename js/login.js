define(function(require, exports, module) {
	require("zepto");
	require("common");
	require("select");
	require("userStorage");
	var template = require("template");
	var $ = Zepto;

	var app = {

		initLogin: function() {
			//判断当前是否登录
			$.get(Util.Interface['checkuser'].params(), function(data) {
				if(data.code == 0) {
					window.location.href = "../userCenter.html";
					return;
				}
			});

			$(".del-icon").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			$(".JS-show-password-icon").on("click", function(e) {
				e.preventDefault();
				if($(this).siblings("input").attr("type") == "text") {
					$(this).siblings("input").attr("type", "password");
				} else {
					$(this).siblings("input").attr("type", "text");
				}
			})

			$("#login").click(function() {
				if($(".input-name").val() == "" || $(".input-name").val().length == 0) {
					alert("请输入用户名");
					$(".input-name").focus();
					return;
				}
				if($(".input-password").val() == "" || $(".input-password").val().length == 0) {
					alert("请输入密码");
					$(".input-password").focus();
					return;
				}

				var login_info = Util.Interface['login'].params($(".input-name").val(), $(".input-password").val())

				$.post(login_info.url, login_info.param, function(data) {
					if(data.code == 0) {

						//保存登录信息到localStorage
						//window.localStorage.setItem($(".input-name").val(), $(".input-password").val());
						//登录信息保存到cookie中
						Cookie.set("username", $(".input-name").val(), 300);

						window.location.href = "../userCenter.html";
					} else {
						alert(data.msg);
						$(".input-password").focus();
						return;
					}
					//alert(data.code+data.msg);
				})
			})
		},

		initRegister: function() {
			var custtype = "personalReg";

			$(".del-icon").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			$(".JS-show-password-icon").on("click", function(e) {
				e.preventDefault();
				if($(this).siblings("input").attr("type") == "text") {
					$(this).siblings("input").attr("type", "password");
				} else {
					$(this).siblings("input").attr("type", "text");
				}
			})

			/*$(".select-list-item").on("click", function(e){
				e.preventDefault();
				$(this).siblings("li").removeClass("current");
				$(this).addClass("current");
				if($(this).attr("id") == "personalReg"){
					custtype = "personalReg";
				}else{
					custtype = "";
				}
			})*/

			function isEmail(str) {
				var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
				return reg.test(str);
			}

			$("#JS_register_button").click(function() {
				if($(".input-name").val() == "" || $(".input-name").val().length == 0) {
					alert("用户名不能为空");
					return;
				} else if(!isEmail($(".input-name").val())) {
					alert("您输入的邮箱有误,请重新核对后再输入!");
					$(".input-name").focus();
					return;
				}

				if($(".input-password").val() == "" || $(".input-password").val().length == 0) {
					alert("密码不能为空");
					$(".input-password").focus();
					return;
				}

				var regdata = {
					'custtype': custtype == "personalReg" ? "P" : "I", //P:个人，I:机构
					'custname': $(".input-name").val(), //"用户名”,
					'password': $(".input-password").val(), //"密码”,
					'passconfirm': $(".input-password").val() //"确认密码”
				};
				var checkAcount_data = Util.Interface['checkAcount'].params($(".input-name").val());
				console.log(regdata);
				var register_data = Util.Interface['register'].params(regdata);

				$.post(checkAcount_data.url, checkAcount_data.params, function(data) {
					if(data.code != 0) {
						alert(data.msg);
						$(".input-name").focus();
						return;
					} else {
						$.post(register_data.url, register_data.param, function(data) {
							alert("提示：" + data.msg);
							window.location.href = "login.html";
						});
					}
				});

			})
		},

		initRegistrationAgreement: function() {
			$.get(Util.Interface['article'].params('xieyishezhi'), function(result) {
				$(".content").html(result.data.content);
			});
		},

		initRetrieverPassword: function() {
			var authkey = "";

			$(".del-icon").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			$.ajax({
				type: "get",
				url: Util.CiepUrl + "/captcha",
				async: false,
				headers: {
					"Content-Type": "image/jpg"
				},
				success: function(data, status, xhr) {
					authkey = xhr.getResponseHeader('authkey');
					console.log(data);
					console.log(status);
					console.log(xhr);
					$("#yzImg").attr("src", xhr.responseURL);
				}
			});

			$("#JS_getpwd_next_secondStep").on('click', function() {
				if($("#JS_username").val() == "") {
					alert("请输入登录账号");
					$("#JS_username").focus();
					return;
				}
				if($("#JS_accunt_code").val() == "") {
					alert("请输入验证码");
					$("#JS_accunt_code").focus();
					return;
				}
				console.log("authkey:" + authkey);
				var firstInfo = {
					"userEmail": $("#JS_username").val(),
					"authkey": authkey,
					"vailcode": $("#JS_accunt_code").val()
				}

				$.post(Util.CiepUrl + "/system/pwdrest!getVailCode.action", firstInfo, function(data) {
					if(data.code == 0) {
						$(".step2").addClass("step1");
						$(".first-step").css("display", "none");
						$(".second-step").css("display", "block");
					} else {
						alert(data.msg);
					}
				});
			});
			$("#JS_getpwd_next_thirdStep").on('click', function() {
				if($("#JS_validate_email").val() == "") {
					alert("请输入验证邮箱");
					$("#JS_validate_email").focus();
					return;
				}
				if($("#JS_validate_code").val() == "") {
					alert("请输入验证码");
					$("#JS_validate_code").focus();
					return;
				}

				var secondInfo = {
					"userEmail": $("#JS_username").val(),
					"code": $("#JS_validate_code").val()
				}

				$.post(Util.CiepUrl + "/system/pwdrest!vaildation.action", secondInfo, function(data) {
					if(data.code == 0) {
						$(".step3").addClass("step1");
						$(".second-step").css("display", "none");
						$(".third-step").css("display", "block");
					} else {
						alert(data.msg);
					}
				});

			});

			$("#JS_getpwd_next_fourStep").on('click', function() {

				if($("#JS_new_pass").val() == "") {
					alert("请输入新密码");
					$("#JS_new_pass").focus();
					return;
				}
				if($("#JS_new_pass").val() == "") {
					alert("请再次输入新密码");
					$("#JS_new_repass").focus();
					return;
				}
				console.log($("#JS_new_pass").val() + "=" + $("#JS_new_repass").val())
				if($("#JS_new_pass").val() != $("#JS_new_repass").val()) {
					alert("输入的新密码不一致");
					$("#JS_new_repass").focus();
					return;
				}

				var thirdInfo = {
					"userEmail": $("#JS_username").val(),
					"code": $("#JS_validate_code").val(),
					"password": $("#JS_new_repass").val()
				}

				$.post(Util.CiepUrl + "/system/pwdrest!changePwd.action", thirdInfo, function(data) {
					if(data.code == 0) {
						$(".hd").css("display", "none");
						$(".first-step").css("display", "none");
						$(".second-step").css("display", "none");
						$(".third-step").css("display", "none");
						$(".four-step").css("display", "block");
					} else {
						alert(data.msg);
					}
				});
			});

			//第二步：获取验证码
			$("#JS_get_code").on("click", function() {
				var firstInfo2 = {
					"userEmail": $("#JS_username").val(),
					"authkey": authkey,
					"vailcode": $("#JS_accunt_code").val()
				}

				$.post(Util.CiepUrl + "/system/pwdrest!getVailCode.action", firstInfo2, function(data) {
					if(data.code == 0) {
						alert(data.msg);
					} else {
						alert(data.msg);
					}
				});
			})
		}

	}

	module.exports = app;
})