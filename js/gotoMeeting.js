define(function(require, exports, module) {
	require("zepto");
	require("common");
	require("select");
	var template = require("template");
	var $ = Zepto;

	var app = {
		initGotoMeeting: function() {
			var haslogin = Util.getAjax(Util.Interface['checkuser'].params());
			if(haslogin.code != 0) {
				window.location.href = "../login/login.html";
				return;
			}

			var selectArr = [];
			var html = "";
			var visitStr = '';

			$(".icon-clear").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			/*行业领域数据绑定*/
			$.each(Opt.industryAreas, function(i, value) {
				$("#JS_industry_areas").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*单位性质数据绑定*/
			$.each(Opt.unitProperty, function(i, value) {
				$("#JS_unit_property").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*单位规模数据绑定*/
			$.each(Opt.unitSize, function(i, value) {
				$("#JS_unit_size").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*学历学位数据绑定*/
			$.each(Opt.educationDegree, function(i, value) {
				$("#JS_education_degree").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*所学专业数据绑定*/
			$.each(Opt.learnMajor, function(i, value) {
				$("#JS_learn_major").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*来访目的*/
			$.each(Opt.visitObj, function(i, value) {
				//html += "<div><label><input type='checkbox' name='visit' value='" + value + "'/>" + value + "</label></div>";				
				html += "<input type='checkbox' id='visit"+i+"' name='visit' class='regular-radio big-radio' value='" + value + "'/>"
				+"<label for='visit"+i+"' class='label-radio'></label><label style='margin-right: 1.5rem;' for='visit"+i+"'>" + value + "</label>";
				
			})
			$("#itemselect").html(html);

			//自定义选择事件
			$(".select-area .select-value").each(function() {
				if($(this).next("select").find("option").not(function() { return !this.selected }).length != 0) {
					$(this).text($(this).next("select").find("option").not(function() { return !this.selected }).text());
				}
			});
			$(".select-area select").change(function() {
				var value = $(this).find("option").not(function() { return !this.selected }).text();
				$(this).parent(".select-area").find(".select-value").text(value);

			});

			/*国家*/
			for(var key in Opt.country) {
				if(Opt.country[key] == "中国") {
					$("#JS_country").append("<option selected='selected' name='visit' value='" + Opt.country[key] + "'>" + Opt.country[key] + "</option>");
				} else {
					$("#JS_country").append("<option name='visit' value='" + Opt.country[key] + "'>" + Opt.country[key] + "</option>");
				}
			}

			/*下一步（第一步）*/
			$("#JS_gotoMeeting_next_secondStep").click(function() {
				if($("#chinaName").val() == "" || $("#chinaName").val().length == 0) {
					alert("真实姓名不能为空！");
					$("#chinaName").focus();
					return;
				}
				if($("#telphone").val() == "" || $("#telphone").val().length == 0) {
					alert("联系电话不能为空！");
					$("#telphone").focus();
					return;
				}
				if($("#email").val() == "" || $("#email").val().length == 0) {
					alert("电子邮箱不能为空！");
					$("#email").focus();
					return;
				}

				$(".step2").addClass("step1");
				$(".first-step").css("display", "none");
				$(".second-step").css("display", "block");

			})

			/*下一步（第二步）*/
			$("#JS_gotoMeeting_next_thirdStep").click(function() {
				if($("#workunit").val() == "" || $("#workunit").val().length == 0) {
					alert("工作单位不能为空！");
					$("#workunit").focus();
					return;
				}
				if($("#position").val() == "" || $("#position").val().length == 0) {
					alert("职位不能为空！");
					$("#position").focus();
					return;
				}
				/*if($("#university").val()==""||$("#university").val().length==0){
					alert("毕业院校不能为空！");
					$("#university").focus(); 
					return;
				}*/

				$("input[name='visit']:checked").each(function(n) {
					visitStr += $(this).val() + ',';
				})
				visitStr = visitStr.substring(0, visitStr.length - 1);

				$(".step3").addClass("step1");
				$(".second-step").css("display", "none");
				$(".third-step").css("display", "block");
				$(".remarks").text("注：板块下会议及论坛都为多选项");

				var plateList = Util.getAjax(Util.Interface['allSectionList'].params('meeting'));
				var list = { rows: plateList };
				var html = template("JS_plate_list", list);
				$('.plate-list').html(html);

				$(".nav_select_run").click(function() {
					if($(this).hasClass("mob-navigate-right")) {
						$(this).removeClass("mob-navigate-right");
						$(this).addClass("mob-navigate-down");
					} else {
						$(this).removeClass("mob-navigate-down");
						$(this).addClass("mob-navigate-right");						
					}
					$(this).parent().siblings('.choice').toggle();
				})
			})

			//查看选择的会议板块
			$("#JS_check_meeting").click(function() {
				var sehtml = "";
				selectArr = [];
				$(".choice-project").css("display", "block");

				$("[name='item']:checked").each(function() {
					console.log($(this).val());
					selectArr.push($(this).val());
				})
				$.each(selectArr, function(n, value) {
					sehtml += "<div class='postion'><span class='term-name'>" + value + "</span><a href='javascript:void(0);' class='del'><span class='icon-del'></span></a></div>";
				})
				$(".content").html(sehtml);

				//删除选中会议
				$(".del").click(function() {
					console.log("删除项：" + $(this).siblings("span").text());
					var cur = $(this).siblings("span").text();
					$("[name='item']:checked").each(function() {
						if($(this).val() == cur) {
							$(this).prop("checked", false);
						}
					})

					$(this).parent().remove();
				})
			})
			//关闭查看
			$("#JS_meeting_close").click(function() {
				$(".choice-project").css("display", "none");
			})

			/*提交按钮事件*/
			$("#JS_submit_meeting").click(function() {
				console.log("选择项：" + visitStr);
				var data = {
					'participant.name': $("#chinaName").val(),
					'participant.nationality': $("#JS_country").val(),
					'participant.gender': $("input[name='sex']:checked").val(),
					'participant.phoneNum': $("#telphone").val(),
					'participant.email': $("#email").val(),
					'participant.company': $("#workunit").val(),
					'participant.position': $("#position").val(),
					'participant.comType': $("#JS_unit_property").val(),
					'participant.comSize': $("#JS_unit_size").val(),
					'participant.graduated': $("#university").val(),
					'participant.educationlevel': $("#JS_education_degree").val(),
					'participant.major': $("#JS_learn_major").val(),
					'participant.comIndustry': $("#JS_industry_areas").val(),
					'participant.needReception': $("input[name='service']:checked").val(),
					'participant.purpose': visitStr
				};

				//提交个人才会信息
				var urldata = Util.Interface["editPersonalInfo"].params(data);
				console.log(urldata);
				$.post(urldata.url, urldata.data, function(data) {
					console.log(data);
				})

				//提交我的参会列表
				var consid = "";
				$("input[name='item']:checked").each(function(n) {
					consid += $(this).attr("id") + ',';
				})
				consid = consid.substring(0, consid.length - 1);
				console.log("提交的参会列表：" + consid);
				var meetingdata = Util.Interface["meetingListSubmit"].params(consid);
				$.post(meetingdata.url, meetingdata.data, function(data) {
					console.log("提交的参会列表返回" + data.code);
					if(data.code == 0) {
						//alert(data.msg);
						window.location.href = "enterSuccess.html";
					} else {
						alert(data.msg);
						window.location.href = "../index.html";
					}
				})

			})
		}
	}

	module.exports = app;
})