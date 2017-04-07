define(function(require, exports, module) {
	require("zepto");
	require("common");
	require("select");
	var template = require("template");
	var $ = Zepto;

	var app = {

		inputClear: function() {
			$(".icon-clear").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})
		},

		checkLoginState: function() {
			$.get(Util.Interface['checkuser'].params(), function(data) {
				if(data.code != 0) {
					window.location.href = "../login/login.html";
				}
			});
		},

		selectValueToSpan: function() {
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
		},

		initUser: function() {
			$.get(Util.Interface['checkuser'].params(), function(data) {
				if(data.code != 0) {
					window.location.href = "login/login.html";
				}
			});
		},

		initMyCaindidate: function() {
			this.checkLoginState();
			$.post(Util.CiepUrl + "/common/resume-deliver/list.action", {}, function(data) {
				if(data.code == 0) {
					console.log(data);
					var html = template("JS_resume_item", data);
					$(".resume-list").html(html);
				}
			})
		},

		initResumePreview: function() {
			this.checkLoginState();
			template.helper('yearMonth', function(item) {
				var a = "";
				if(item) {
					var str = item.split('-');
					a = str[0] + "." + str[1];
					return a;
				}
			});
			$.get(Util.Interface['myResume'].params(), function(result) {
				console.log(result);
				if(result.code == 0) {

					$("#name").html(result.resume.name);
					$("#sex").html(result.resume.gender);
					$("#birthday").html(result.resume.birthday);
					$("#telphone").html(result.resume.mobile);
					$("#email").html(result.resume.email);
					$("#position").html(result.resume.jobPreferences[0].position);
					$("#salary").html(result.resume.salary);
					$("#worktype").html(result.resume.jobPreferences[0].jobtype);
					$("#address").html(result.resume.country + "-" + result.resume.jobPreferences[0].location);
					$("#comeworktime").html(result.resume.jobPreferences[0].dutytime);

					var eductionhtml = template("JS_education_info", result.resume);
					$("#JS_education_list").html(eductionhtml);

					var workhtml = template("JS_work_info", result.resume);
					$("#JS_work_list").html(workhtml);
				} else {
					alert(result.msg);
					window.location.href = "myCandidate.html";
				}
			});
		},

		initPersonalMessage: function() {
			this.checkLoginState();
			this.inputClear();

			/*目前薪资*/
			$.each(Opt.salaryRanges, function(i, value) {
				$("#JS_present_salary").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*工作年限*/
			$.each(Opt.workExperience, function(i, value) {
				$("#JS_work_year").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*国家*/
			for(var key in Opt.country) {
				if(Opt.country[key] == "中国") {
					$("#JS_country").append("<option selected='selected' name='visit" + key + "' value='" + Opt.country[key] + "'>" + Opt.country[key] + "</option>");
				} else {
					$("#JS_country").append("<option name='visit" + key + "' value='" + Opt.country[key] + "'>" + Opt.country[key] + "</option>");
				}
			}

			//自定义选择事件
			this.selectValueToSpan();
			/*$(".select-area .select-value").each(function() {
				if($(this).next("select").find("option").not(function() { return !this.selected }).length != 0) {
					$(this).text($(this).next("select").find("option").not(function() { return !this.selected }).text());
				}
			});
			$(".select-area select").change(function() {
				var value = $(this).find("option").not(function() { return !this.selected }).text();
				$(this).parent(".select-area").find(".select-value").text(value);

			});*/
			/*当前城市
			$.each(Opt.locationCity, function(i,value){
				$("#JS_current_city").append("<option value='"+value+"'>"+value+"</option>");
			})*/

			var personalInfo_id = "";
			///获取个人信息
			$.get(Util.Interface['myResume'].params(), function(result) {
				console.log(result);
				if(result.code == 0) {
					personalInfo_id = result.resume.id;
					$("#chinese").val(result.resume.name);
					if(result.resume.gender == "男") {
						$("input[name='sex'][value=男]").attr("checked", true);
					} else {
						$("input[name='sex'][value=女]").attr("checked", true);
					}
					$("#birthday").val(result.resume.birthday);
					$("#telphone").val(result.resume.mobile);
					$("#email").val(result.resume.email);
					$("#JS_work_year").val(result.resume.yearsofwork);
					$("#JS_work_year").parent(".select-area").find(".select-value").text(result.resume.yearsofwork);
					$("#JS_current_city").val(result.resume.residency);
					$("#JS_present_salary").val(result.resume.salary);
					$("#JS_present_salary").parent(".select-area").find(".select-value").text(result.resume.salary);
					$("#height").val(result.resume.height);
					$("#JS_country").val(result.resume.country);
					$("#JS_country").parent(".select-area").find(".select-value").text(result.resume.country);

					if(result.resume.maritalstatus == "已婚") {
						$("input[name='married'][value=已婚]").attr("checked", true);
					} else {
						$("input[name='married'][value=未婚]").attr("checked", true);
					}
					$("#weixin").val(result.resume.wechat);
				} else {
					//alert(result.msg);
				}
			});

			//保存个人信息
			$("#JS_personal_info_save").click(function() {
				if($("#chinese").val() == "") {
					alert("请输入真实姓名");
					return;
				}
				if($("#birthday").val() == "") {
					alert("请选择出生年月");
					return;
				}
				if($("#telphone").val() == "") {
					alert("请输入手机号码");
					return;
				}
				if($("#email").val() == "") {
					alert("请输入电子邮箱");
					return;
				}
				if($("#JS_current_city").val() == "") {
					alert("请输入当前城市");
					return;
				}
				if($("#height").val() == "") {
					alert("请输入身高");
					return;
				}
				if($("#weixin").val() == "") {
					alert("请输入微信号");
					return;
				}

				var userinfo = {
					"updateType": "0",
					"resumeInfo.name": $("#chinese").val(),
					"resumeInfo.gender": $("input[name='sex']:checked").val(),
					"resumeInfo.birthday": $("#birthday").val(),
					"resumeInfo.mobile": $("#telphone").val(),
					"resumeInfo.email": $("#email").val(),
					"resumeInfo.yearsofwork": $("#JS_work_year").val(),
					"resumeInfo.residency": $("#JS_current_city").val(),
					"resumeInfo.salary": $("#JS_present_salary").val(),
					"resumeInfo.height": $("#height").val(),
					"resumeInfo.maritalstatus": $("input[name='married']:checked").val(),
					"resumeInfo.wechat": $("#weixin").val(),
					"resumeInfo.country": $("#JS_country").val()
				}
				if(personalInfo_id != "") {
					userinfo["resumeInfo.id"] = personalInfo_id;
				}
				console.log(userinfo);
				var resData = Util.Interface['myResumeUpdate'].params(userinfo);
				$.post(resData.url, resData.data, function(data) {
					if(data.code == 0) {
						alert("保存成功");
						window.location.href = "myResume.html";
					} else {
						alert("保存失败");
					}

				})

			})
		},

		initEducationList: function() {
			this.checkLoginState();
			template.helper('yearMonth', function(item) {
				var a = "";
				if(item) {
					var str = item.split('-');
					a = str[0] + "." + str[1];
					return a;
				}
			});

			var ms = "";
			var result = Util.getAjax(Util.Interface['myResume'].params());
			$.get(Util.Interface['myResume'].params(), function(result) {
				if(result.code == 0) {
					if(result.resume.educationList.length > 0) {
						var html = template("JS_work_Experience_list", result.resume);
						$(".mob-table-view").html(html);
					}

					$(".mob-del").click(function() {

						if(confirm("你确定删除吗？")) {
							var res = Util.Interface['educationDelete'].params($(this).parent().attr("id"));
							$.ajax({
								url: res.url,
								async: false,
								type: "POST",
								dataType: "json",
								data: res.data,
								success: function(data) {
									if(result.code == 0) {
										alert("删除成功");
										ms = "success";
									} else {
										alert("删除失败");
									}
								}
							});

							if(ms == "success") {
								$(this).parent().parent().remove();
								ms = "";
							}
						}
					})
				}
			})

		},

		initEducationEdit: function() {
			this.checkLoginState();
			var personalInfo_id = document.location.href.split('=')[1];
			if(personalInfo_id) {
				$(".text").text("修改教育经历");
			} else {
				$(".text").text("添加教育经历");
			}

			$(".icon-clear").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			/*学历学位数据绑定*/
			$.each(Opt.educationDegree, function(i, value) {
				$("#JS_education_degree").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*所学专业数据绑定*/
			$.each(Opt.learnMajor, function(i, value) {
				$("#JS_learn_major").append("<option value='" + value + "'>" + value + "</option>");
			});

			//自定义选择事件
			this.selectValueToSpan();

			var resumeid = "";

			$.get(Util.Interface['myResume'].params(), function(result) {
				if(result.code == 0) {
					console.log(result);
					resumeid = result.resume.id;
					if(personalInfo_id) {
						for(var i = 0; i < result.resume.educationList.length; i++) {
							if(result.resume.educationList[i].id == personalInfo_id) {
								$("#starttime").val(result.resume.educationList[i].startdate);
								$("#overtime").val(result.resume.educationList[i].enddate);
								$("#school").val(result.resume.educationList[i].school);
								$("#JS_education_degree").val(result.resume.educationList[i].degree);
								$("#JS_education_degree").parent(".select-area").find(".select-value").text(result.resume.educationList[i].degree);
								$("#JS_learn_major").val(result.resume.educationList[i].major);
								$("#JS_learn_major").parent(".select-area").find(".select-value").text(result.resume.educationList[i].major);
								$(".miaoshu").text(result.resume.educationList[i].description);
							}
						}
					}
				}
			});

			$("#JS_education_save").click(function() {

				if($("#starttime").val() == "") {
					alert("请选择入学时间");
					return;
				}
				if($("#overtime").val() == "") {
					alert("请选择毕业时间");
					return;
				}
				if($("#school").val() == "") {
					alert("请填写学校");
					return;
				}
				if($("#JS_education_degree").val() == "") {
					alert("请选择学历");
					return;
				}
				if($("#JS_learn_major").val() == "") {
					alert("请选择专业");
					return;
				}
				if($(".miaoshu").val() == "") {
					alert("请填写专业描述");
					return;
				}

				var educationinfo = {
					"education.resumeid": resumeid,
					"education.startdate": $("#starttime").val(),
					"education.enddate": $("#overtime").val(),
					"education.school": $("#school").val(),
					"education.degree": $("#JS_education_degree").val(),
					"education.major": $("#JS_learn_major").val(),
					"education.description": $(".miaoshu").val()
				}

				if(personalInfo_id != "") {
					educationinfo["education.id"] = personalInfo_id;
				}
				console.log(educationinfo);
				var resData = Util.Interface['educationSave'].params(educationinfo);
				$.post(resData.url, resData.data, function(data) {
					if(data.code == 0) {
						alert("保存成功");
						window.location.href = "educationExperience.html";
					} else {
						alert("保存失败");
					}

				})
			})
		},

		initWorkList: function() {
			this.checkLoginState();
			template.helper('yearMonth', function(item) {
				var a = "";
				if(item) {
					var str = item.split('-');
					a = str[0] + "." + str[1];
					return a;
				}
			});

			var ms = "";
			var result = Util.getAjax(Util.Interface['myResume'].params());
			console.log(result);
			if(result.code == 0) {
				var html = template("JS_work_Experience_list", result.resume);
				$(".mob-table-view").html(html);
			}

			$(".mob-del").click(function() {
				if(confirm("你确定删除吗？")) {
					var res = Util.Interface['workDelete'].params($(this).parent().attr("id"));
					$.ajax({
						url: res.url,
						async: false,
						type: "POST",
						dataType: "json",
						data: res.data,
						success: function(data) {
							if(result.code == 0) {
								alert("删除成功");
								ms = "success";
							} else {
								alert("删除失败");
							}
						}
					});

					if(ms == "success") {
						$(this).parent().parent().remove();
						ms = "";
					}
				}
			})
		},

		initWorkEdit: function() {
			this.checkLoginState();
			var workinfo_id = document.location.href.split('=')[1];
			if(workinfo_id) {
				$(".text").text("修改工作经历");
			} else {
				$(".text").text("添加工作经历");
			}

			$(".icon-clear").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			/*行业领域数据绑定*/
			$.each(Opt.industryAreas, function(i, value) {
				$("#JS_industry_areas").append("<option value='" + value + "'>" + value + "</option>");
			});

			/*单位规模数据绑定*/
			$.each(Opt.unitSize, function(i, value) {
				$("#JS_unit_size").append("<option value='" + value + "'>" + value + "</option>");
			});

			/*单位性质数据绑定*/
			$.each(Opt.unitProperty, function(i, value) {
				$("#JS_unit_property").append("<option value='" + value + "'>" + value + "</option>");
			});

			/*工作性质数据绑定*/
			$.each(Opt.workProperty, function(i, value) {
				$("#JS_work_property").append("<option value='" + value + "'>" + value + "</option>");
			});

			//自定义选择事件
			this.selectValueToSpan();

			var resumeid = "";

			$.get(Util.Interface['myResume'].params(), function(result) {
				if(result.code == 0) {
					resumeid = result.resume.id;
					if(workinfo_id) {
						for(var i = 0; i < result.resume.workExperienceList.length; i++) {
							if(result.resume.workExperienceList[i].id == workinfo_id) {
								$("#starttime").val(result.resume.workExperienceList[i].startdate);
								$("#overtime").val(result.resume.workExperienceList[i].enddate);
								$("#company").val(result.resume.workExperienceList[i].company);
								$("#position").val(result.resume.workExperienceList[i].position);
								$("#department").val(result.resume.workExperienceList[i].department);
								$("#JS_industry_areas").val(result.resume.workExperienceList[i].industry);
								$("#JS_industry_areas").parent(".select-area").find(".select-value").text(result.resume.workExperienceList[i].industry);
								$("#JS_unit_size").val(result.resume.workExperienceList[i].comsize);
								$("#JS_unit_size").parent(".select-area").find(".select-value").text(result.resume.workExperienceList[i].comsize);
								$("#JS_unit_property").val(result.resume.workExperienceList[i].comtype);
								$("#JS_unit_property").parent(".select-area").find(".select-value").text(result.resume.workExperienceList[i].comtype);
								$("#JS_work_property").val(result.resume.workExperienceList[i].jobtype);
								$("#JS_work_property").parent(".select-area").find(".select-value").text(result.resume.workExperienceList[i].jobtype);
								$(".miaoshu").text(result.resume.workExperienceList[i].description);
							}
						}
					}
				}
			});

			$("#JS_work_Experience_save").click(function() {

				if($("#starttime").val() == "") {
					alert("请选择入职时间");
					return;
				}
				if($("#overtime").val() == "") {
					alert("请选择离职时间");
					return;
				}
				if($("#position").val() == "") {
					alert("请填写职位名称");
					return;
				}
				if($("#department").val() == "") {
					alert("请填写部门");
					return;
				}
				if($(".miaoshu").val() == "") {
					alert("请填写工作描述");
					return;
				}

				var workinfo = {
					"workExperience.resumeid": resumeid, //对应简历基础信息ID 必填			
					"workExperience.startdate": $("#starttime").val(), //开始时间
					"workExperience.enddate": $("#overtime").val(), //结束时间
					"workExperience.company": $("#company").val(), //公司
					"workExperience.position": $("#position").val(), //位置
					"workExperience.department": $("#department").val(), //部门
					"workExperience.industry": $("#JS_industry_areas").val(), //行业
					"workExperience.comsize": $("#JS_unit_size").val(), //公司大小
					"workExperience.comtype": $("#JS_unit_property").val(), //公司类型
					"workExperience.jobtype": $("#JS_work_property").val(), //工作类型
					"workExperience.description": $(".miaoshu").val()
				};
				if(workinfo_id) {
					workinfo['workExperience.id'] = workinfo_id; //教育经历ID，有则表示修改，无则表示添加'
				}

				var workdata = Util.Interface['workSave'].params(workinfo);

				$.post(workdata.url, workdata.data, function(data) {
					if(data.code == 0) {
						alert("保存成功");
						window.location.href = "workExperience.html";
					} else {
						alert("保存失败");
					}
				})

			})
		},

		initJobIntension: function() {
			this.checkLoginState();
			this.inputClear();

			/*行业领域数据绑定*/
			$.each(Opt.industryAreas, function(i, value) {
				$("#JS_industry_areas").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*工作性质数据绑定*/
			$.each(Opt.workProperty, function(i, value) {
				$("#JS_work_property").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*期望薪资*/
			$.each(Opt.salaryRanges, function(i, value) {
				$("#JS_expect_salary").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*到岗时间*/
			$.each(Opt.comeworkTime, function(i, value) {
				$("#JS_comework_time").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*当前城市*/
			//$.each(Opt.locationCity, function(i, value) {
			//	$("#JS_location_city").append("<option value='" + value + "'>" + value + "</option>");
			//});

			//自定义选择事件
			this.selectValueToSpan();

			var resumeid = "";

			$.get(Util.Interface['myResume'].params(), function(result) {
				if(result.code==0){
					resumeid = result.resume.id;
					if(result.resume.jobPreferences.length > 0) {
						$("#position").val(result.resume.jobPreferences[0].position);
						$("#JS_location_city").val(result.resume.jobPreferences[0].location);
						$("#JS_work_property").val(result.resume.jobPreferences[0].jobtype);
						$("#JS_work_property").parent(".select-area").find(".select-value").text(result.resume.jobPreferences[0].jobtype);
						$("#JS_expect_salary").val(result.resume.jobPreferences[0].targetsalary);
						$("#JS_expect_salary").parent(".select-area").find(".select-value").text(result.resume.jobPreferences[0].targetsalary);
						$("#JS_comework_time").val(result.resume.jobPreferences[0].dutytime);
						$("#JS_comework_time").parent(".select-area").find(".select-value").text(result.resume.jobPreferences[0].dutytime);
						$("#miaoshu").val(result.resume.jobPreferences[0].selfdesc);
						$("#JS_industry_areas").val(result.resume.jobPreferences[0].industry);
						$("#JS_industry_areas").parent(".select-area").find(".select-value").text(result.resume.jobPreferences[0].industry);
					}
				}			

			});

			$("#JS_jobIntension_save").click(function() {

				if($("#position").val() == "" || $("#position").val().length == 0) {
					alert("职能不能为空！");
					$("#position").focus();
					return;
				}
				if($("#miaoshu").val() == "" || $("#miaoshu").val().length == 0) {
					alert("自我评价不能为空！");
					$("#miaoshu").focus();
					return;
				}

				var jobIntensioninfo = {
					"jobPreferences.resumeid": resumeid, //对应简历基础信息ID 必填			
					"jobPreferences.position": $("#position").val(), //职位
					"jobPreferences.location": $("#JS_location_city").val(), //地点
					"jobPreferences.jobtype": $("#JS_work_property").val(), //工作类型
					"jobPreferences.targetsalary": $("#JS_expect_salary").val(), //期望薪资
					"jobPreferences.dutytime": $("#JS_comework_time").val(), //到岗时间
					"jobPreferences.selfdesc": $("#miaoshu").val(), //自我描述
					"jobPreferences.industry": $("#JS_industry_areas").val() //行业
				}

				var jobdata = Util.Interface['jobPreferencesSave'].params(jobIntensioninfo);
				$.post(jobdata.url, jobdata.data, function(data) {
					if(data.code == 0) {
						alert(data.msg);
						window.location.href = "myResume.html";
					} else {
						alert(data.msg);
					}
				})
			})
		},

		initProjectManage: function() {
			this.checkLoginState();
			var ms = "";
			$.get(Util.Interface['projectList'].params(0, 0), function(result) {
				console.log(result);
				if(result.code == 0) {
					var html = template("JS_project_list", result);
					$(".xiangmuguanli-list").html(html);

					$(".del").click(function() {
						if(confirm("你确定要删除吗？")) {
							var deldata = Util.Interface['projectDel'].params($(this).siblings("#JS_project_id").text());
							$.ajax({
								url: deldata.url,
								async: false,
								type: "POST",
								dataType: "json",
								data: deldata.data,
								success: function(data) {
									if(result.code == 0) {
										alert("项目删除成功");
										ms = "success";
									} else {
										alert(result.msg);
									}
								}
							});

							if(ms == "success") {
								$(this).parent().remove();
								ms = "";
							}
						}

					})

				} else if(result.code == -1) {
					alert(result.msg);
					window.location.href = "../login/login.html";
				}
			});

		},

		initProjectManageEdit: function() {
			this.checkLoginState();
			this.inputClear();
			var project_id = "";

			/*项目类型*/
			$.each(Opt.projectType, function(i, value) {
				$("#JS_project_type").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*行业领域*/
			$.each(Opt.industryAreas, function(i, value) {
				$("#JS_industry_areas").append("<option value='" + value + "'>" + value + "</option>");
			});

			//自定义选择事件
			this.selectValueToSpan();

			//根据当前地址判断是否修改项目	
			var str = String(window.location.href.split("?")[1]).split("=")[0];
			if(str == "project_id") {
				$(".layout-middle>.text").text("编辑项目");

				$.get(Util.Interface['projectDetail'].params(String(window.location.href.split("?")[1]).split("=")[1]), function(projectDetailInfo) {
					$("#projectName").val(projectDetailInfo.project.name);
					$("#JS_project_type").val(projectDetailInfo.project.type);
					$("#JS_project_type").parent(".select-area").find(".select-value").text(projectDetailInfo.project.type);
					$("#JS_industry_areas").val(projectDetailInfo.project.sector);
					$("#JS_industry_areas").parent(".select-area").find(".select-value").text(projectDetailInfo.project.sector);
					$("#contacts").val(projectDetailInfo.project.contacts);
					$("#position").val(projectDetailInfo.project.contactstitle);

					$("#telphone").val(projectDetailInfo.project.mobile);
					$("#landline").val(projectDetailInfo.project.phone);
					$("#email").val(projectDetailInfo.project.email);
					$("#fax").val(projectDetailInfo.project.fax);

					$("#project_jieshao").val(projectDetailInfo.project.introduction);

					project_id = projectDetailInfo.project.id;
				});

			} else {
				$(".layout-middle>.text").text("添加项目");
			}

			$("#JS_project_save").click(function() {

				if($("#projectName").val() == "" || $("#projectName").val().length == 0) {
					alert("项目名称不能为空！");
					$("#projectName").focus();
					return;
				}
				if($("#contacts").val() == "" || $("#contacts").val().length == 0) {
					alert("项目联系人不能为空！");
					$("#contacts").focus();
					return;
				}
				if($("#position").val() == "" || $("#position").val().length == 0) {
					alert("联系人职务不能为空！");
					$("#position").focus();
					return;
				}
				if($("#telphone").val() == "" || $("#telphone").val().length == 0) {
					alert("手机不能为空！");
					$("#telphone").focus();
					return;
				}
				if($("#landline").val() == "" || $("#landline").val().length == 0) {
					alert("座机不能为空！");
					$("#landline").focus();
					return;
				}
				if($("#email").val() == "" || $("#email").val().length == 0) {
					alert("电子邮箱不能为空！");
					$("#email").focus();
					return;
				}
				if($("#fax").val() == "" || $("#fax").val().length == 0) {
					alert("传真不能为空！");
					$("#fax").focus();
					return;
				}
				if($("#project_jieshao").val() == "" || $("#project_jieshao").val().length == 0) {
					alert("项目介绍不能为空！");
					$("#project_jieshao").focus();
					return;
				}

				//此处验证邮箱合法性
				var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //验证邮箱的正则表达式
				if(!reg.test($("#email").val())) {
					alert("邮箱格式不对");
					$("#email").focus();
					return;
				}

				if(String(window.location.href.split("?")[1]).split("=")[0] != "project_id") {
					//添加项目
					var prodata = {
						"project.name": $("#projectName").val(),
						"project.type": $("#JS_project_type").val(),
						"project.sector": $("#JS_industry_areas").val(),
						"project.contacts": $("#contacts").val(),
						"project.contactstitle": $("#position").val(),
						"project.mobile": $("#telphone").val(),
						"project.phone": $("#landline").val(),
						"project.email": $("#email").val(),
						"project.fax": $("#fax").val(),
						"project.introduction": $("#project_jieshao").val()
					};

					var projectdata = Util.Interface['projectAdd'].params(prodata);
					$.post(projectdata.url, projectdata.data, function(data) {
						if(data.code == 0) {
							alert("保存成功");
							window.location.href = "projectManage.html";
						} else {
							alert("保存失败");
							return;
						}
					})
				} else {
					//修改项目
					var prodata = {
						"project.id": project_id,
						"project.name": $("#projectName").val(),
						"project.type": $("#JS_project_type").val(),
						"project.sector": $("#JS_industry_areas").val(),
						"project.contacts": $("#contacts").val(),
						"project.contactstitle": $("#position").val(),
						"project.mobile": $("#telphone").val(),
						"project.phone": $("#landline").val(),
						"project.email": $("#email").val(),
						"project.fax": $("#fax").val(),
						"project.introduction": $("#project_jieshao").val()
					};
					console.log(prodata);
					var projectdata = Util.Interface['projectSave'].params(prodata);
					$.post(projectdata.url, projectdata.data, function(data) {
						if(data.code == 0) {
							alert("保存成功");
							window.location.href = "projectManage.html";
						} else {
							alert("保存失败");
							return;
						}
					})
				}
			})

		},

		initPersonalInformation: function() {
			this.checkLoginState();
			this.inputClear();

			var selecthtml = "";
			var visitStr = '';

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
				selecthtml += "<div><label><input type='checkbox' name='visit' value='" + value + "'/>" + value + "</label></div>";
			});
			$("#itemselect").html(selecthtml);
			/*国家*/
			for(var key in Opt.country) {
				if(Opt.country[key] == "中国") {
					$("#JS_country").append("<option selected='selected' name='visit' value='" + key + "'>" + Opt.country[key] + "</option>");
				} else {
					$("#JS_country").append("<option name='visit' value='" + key + "'>" + Opt.country[key] + "</option>");
				}
			}

			//自定义选择事件
			this.selectValueToSpan();

			//个人参会信息查询
			$.get(Util.Interface['particimedia'].params(), function(result) {
				if(result.code == 0) {
					console.log(result);
					if(result.data) {
						$("#chinese").val(result.data.name);
						//$("#english").val(result.data.name);
						$("#JS_country").val(result.data.nationality);
						$("#JS_country").parent(".select-area").find(".select-value").text(result.data.nationality);

						if(result.data.gender == "男") {
							$("input[name='sex'][value=男]").attr("checked", true);
						} else {
							$("input[name='sex'][value=女]").attr("checked", true);
						}
						//$("#birthday").val(result.data.name);
						$("#telphone").val(result.data.phoneNum);
						$("#email").val(result.data.email);
						$("#workunit").val(result.data.company);
						$("#position").val(result.data.position);
						$("#JS_unit_property").val(result.data.comType);
						$("#JS_unit_property").parent(".select-area").find(".select-value").text(result.data.comType);
						$("#JS_unit_size").val(result.data.comSize);
						$("#JS_unit_size").parent(".select-area").find(".select-value").text(result.data.comSize);
						$("#school").val(result.data.graduated);
						$("#JS_education_degree").val(result.data.educationlevel);
						$("#JS_education_degree").parent(".select-area").find(".select-value").text(result.data.educationlevel);
						$("#JS_learn_major").val(result.data.major);
						$("#JS_learn_major").parent(".select-area").find(".select-value").text(result.data.major);
						$("#JS_industry_areas").val(result.data.comIndustry);
						$("#JS_industry_areas").parent(".select-area").find(".select-value").text(result.data.comIndustry);
						//$("#language").val(result.data.name);
						/*var str = result.data.purpose;
					var arr = str.split(",");
	
					$("input[name='visit']").each(function(n, item) {
						for(var i = 0; i < arr.length; i++) {
							if(item.value == arr[i]) {
								item.checked = true;
							}
						}
					});*/
					} else {
						console.log("无个人资料信息");
					}
				}
			});

			$("#JS_information_save").on("click", function() {
				/*$("input[name='visit']:checked").each(function(n) {
					visitStr += $(this).val() + ',';
				})
				visitStr = visitStr.substring(0, visitStr.length - 1);*/

				if($("#chinese").val() == "" || $("#chinese").val().length == 0) {
					alert("请输入中文姓名");
					return;
				}
				if($("#telphone").val() == "" || $("#telphone").val().length == 0) {
					alert("请输入联系电话");
					return;
				}
				if($("#email").val() == "" || $("#email").val().length == 0) {
					alert("请输入电子邮箱");
					return;
				}
				if($("#workunit").val() == "" || $("#workunit").val().length == 0) {
					alert("请输入工作单位");
					return;
				}
				if($("#position").val() == "" || $("#position").val().length == 0) {
					alert("请输入职位");
					return;
				}

				var data = {
					'participant.name': $("#chinese").val(),
					'participant.nationality': $("#JS_country").val(),
					'participant.gender': $("input[name='sex']:checked").val(),
					'participant.phoneNum': $("#telphone").val(),
					'participant.email': $("#email").val(),
					'participant.company': $("#workunit").val(),
					'participant.position': $("#position").val(),
					'participant.comType': $("#JS_unit_property").val(),
					'participant.comSize': $("#JS_unit_size").val(),
					'participant.graduated': $("#school").val(),
					'participant.educationlevel': $("#JS_education_degree").val(),
					'participant.major': $("#JS_learn_major").val(),
					'participant.comIndustry': $("#JS_industry_areas").val(),
					//'participant.purpose': visitStr
				};

				//提交个人参会信息
				var urldata = Util.Interface["editPersonalInfo"].params(data);
				console.log(urldata);
				$.post(urldata.url, urldata.data, function(data) {
					console.log(data);
					if(data.code == 0) {
						alert("保存成功");
						window.location.href = "../userCenter.html";
					} else {
						alert("保存失败");
					}
				})
			})
		},

		initMyMeeting: function() {
			this.checkLoginState();
			$.get(Util.Interface['personalMeetingList'].params(), function(result) {
				console.log(result);
				if(result.code == 0) {

					var ulHtml = "";

					for(var k = 0; k < result.data.length; k++) {
						var tableCenter = "";
						var li = "<li class='meet-list-item'><div class='border'><div class='bankuai'>板块：<span>" + result.data[k].name + "</span></div>" +
							"<div class='fangshi'><div class='contacts'>联系人：<span>" + result.data[k].contract + "</span></div>" +
							"<div class='phone'>电话：<span>" + result.data[k].phoneNum + "</span></div></div>";

						var tableStart = "<table class='biaoge'><thead><tr><th class='name'>会议名称</th><th class='number'>参会编号</th></tr></thead><tbody>";
						var tableEnd = "</tbody></table></div></li>";
						for(var i = 0; i < result.data[k].meetingList.length; i++) {
							tableCenter += "<tr><td>" + result.data[k].meetingList[i].title + "</td><td>" + result.data[k].meetingList[i].serilNum + "</td></tr>";
						}

						ulHtml += li + tableStart + tableCenter + tableEnd;
					}

					$(".meet-list").html(ulHtml);
				}
			});
		},

		initMyConcern: function() {
			this.checkLoginState();
			$.get(Util.CiepUrl + "/focus/focus!myFocus.action", function(data) {
				console.log(data);
				var html = template("JS_concern_item", data.data);
				$(".concern-list").html(html);
			})
		},

		initMyNotice: function() {
			this.checkLoginState();
			$.get(Util.CiepUrl + "/common/message/list.action", function(data) {
				console.log(data);
				if(data.code == 0) {
					if(data.rows.length > 0) {
						$(".empty").css("display", "none");
					}

					var html = template("JS_messge_item", data);
					$(".notice-list").html(html);

				} else if(data.code == -1) {
					alert(data.msg);
					window.location.href = "../login/login.html";
				}
			})
		},

		initSetup: function() {
			this.checkLoginState();
			$("#JS_loginOut").click(function() {
				var result = Util.getAjax(Util.Interface['loginOut'].params());
				if(result.code == 0) {
					alert(result.msg);
					Cookie.clear("usercode");
					window.location.href = "../login/login.html";
				}
			})
		},

		initModifyPassword: function() {
			this.checkLoginState();
			$(".del-icon").on("click", function(e) {
				e.preventDefault();
				$(this).siblings("input").val("");
				$(this).siblings("input").focus();
			})

			$(".JS-show-password-icon").on("click", function(e) {
				e.preventDefault();
				if($(this).siblings("input").attr("type") == "text") {
					$(this).siblings("input").attr("type", "password");
					$(this).removeClass("close-see");
				} else {
					$(this).siblings("input").attr("type", "text");
					$(this).addClass("close-see");
				}
			})
			$("#JS_submit").on("click", function() {
				if($(".old").val() == "") {
					alert("请输入旧密码！");
					$(".old").focus();
					return;
				}
				if($(".new").val() == "") {
					alert("请输入新密码！");
					$(".new").focus();
					return;
				}
				var passInfo = {
					"password": $(".old").val(),
					"passwordnew": $(".new").val()
				};
				var passdata = Util.Interface['modifyPassword'].params(passInfo);
				$.post(passdata.url, passdata.data, function(data) {
					if(data.code == 0) {
						alert(data.msg);
						var result = Util.getAjax(Util.Interface['loginOut'].params());
						if(result.code == 0) {
							Cookie.clear("usercode");
							window.location.href = "../login/login.html";
						}
					} else if(data.code == -1) {
						alert(data.msg);
						window.location.href = "../login/login.html";
					} else {
						alert(data.msg);
					}
				})
			})
		}

	}

	module.exports = app;
})