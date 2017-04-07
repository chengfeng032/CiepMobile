define(function(require, exports, module) {
	require("zepto");
	require("common");
	require("select");
	var template = require("template");
	var $ = Zepto;

	var app = {

		initTalentDockingSearch: function() {
			/*期望薪资*/
			$.each(Opt.salaryRanges, function(i, value) {
				$("#JS_expect_salary").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*工作年限*/
			$.each(Opt.workExperience, function(i, value) {
				$("#JS_work_year").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*学历学位数据绑定*/
			$.each(Opt.educationDegree, function(i, value) {
				$("#JS_education_degree").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*工作性质数据绑定*/
			$.each(Opt.workProperty, function(i, value) {
				$("#JS_work_property").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*所学专业数据绑定*/
			$.each(Opt.learnMajor, function(i, value) {
				$("#JS_learn_major").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*行业领域数据绑定*/
			$.each(Opt.industryAreas, function(i, value) {
				$("#JS_industry_areas").append("<option value='" + value + "'>" + value + "</option>");
			});
			
			this.selectValueToSpan();

			$.post(Util.Interface['positionList'].params().url, Util.Interface['positionList'].params(),function(result){
				var html = template("JS_resume_item", result.data);
				$(".resume-list").html(html);
			})
			
			//筛选
			$(".filtrate").on("click", function() {
				$("#JS_talent_list").css("display", "none");
				$(".resume").css("display", "none");
				$("#JS_position_search").css("display", "block");
				$(".search").css("display", "block");
			})

			//返回人才对接列表页面
			$("#JS_comeback_list").on("click", function() {
				$("#JS_position_search").css("display", "none");
				$(".search").css("display", "none");
				$("#JS_talent_list").css("display", "block");
				$(".resume").css("display", "block");
			})
			//完成
			$("#JS_search").on("click", function() {
				$("#JS_position_search").css("display", "none");
				$(".search").css("display", "none");
				$("#JS_talent_list").css("display", "block");
				$(".resume").css("display", "block");

				var talentInfo = {
					"title": $("#position").val(), //"职位名称",
					"entName": $("#workunit").val(), //"企业名称",
					"salRange": $("#JS_expect_salary").val() == "不限" ? "" : $("#JS_expect_salary").val(), //"薪水范围",
					"experience": $("#JS_work_year").val(), //"经验要求"
					"education": $("#JS_education_degree").val(), //"教育程度要求"
					"major": $("#JS_learn_major").val(), //"专业"
					"industry": $("#JS_industry_areas").val(), //"行业"
					"jobType": $("#JS_work_property").val() == "不限" ? "" : $("#JS_work_property").val() //"职位类型"
				}
				console.log(talentInfo);
				$.post(Util.CiepUrl + "/position/position!list.action", talentInfo, function(data) {
					var html = template("JS_resume_item", data.data);
					$(".resume-list").html(html);
					console.log(data);
				})
			})
		},

		initProjectDockingSearch: function() {
			var type = "";
			/*发布者角色*/
			$.each(Opt.publisherRole, function(i, value) {
				$("#JS_publisher_role").append("<option value='" + value + "'>" + value + "</option>");
			});
			/*行业领域数据绑定*/
			$.each(Opt.industryAreas, function(i, value) {
				$("#JS_industry_areas").append("<option value='" + value + "'>" + value + "</option>");
			});

			/*项目引进*/
			$("#JS_project_import").on('click', function() {
				/*项目类别(需求)*/
				type = "需求";
				$("#JS_project_type").empty();
				$("#JS_project_type").append("<option value=''>不限</option>")
				$.each(Opt.projectNeed, function(i, value) {
					$("#JS_project_type").append("<option value='" + value + "'>" + value + "</option>");
				});
				reClass();
				$("#JS_project_import").addClass("current");
				var xiangmuguanliList = Util.getAjax(Util.Interface['projectduijie'].params("需求", '', '', '', ''));
				var html = template('xiangmuguanli_list', xiangmuguanliList);
				document.getElementById("xiangmuguanli").innerHTML = html;
			})

			/*项目推介*/
			$("#JS_project_extension").on('click', function() {
				/*项目类别(推介)*/
				type = "推介";
				$("#JS_project_type").empty();
				$("#JS_project_type").append("<option value=''>不限</option>")
				$.each(Opt.projectRecommend, function(i, value) {
					$("#JS_project_type").append("<option value='" + value + "'>" + value + "</option>");
				});
				reClass();
				$("#JS_project_extension").addClass("current");
				var xiangmuguanliList = Util.getAjax(Util.Interface['projectduijie'].params("推介", '', '', '', ''));
				var html = template('xiangmuguanli_list', xiangmuguanliList);
				$("#xiangmuguanli").html(html);
			})
			
			this.selectValueToSpan();

			function reClass() {
				$("#JS_project_import").removeClass("current");
				$("#JS_project_extension").removeClass("current");
			}
			$("#JS_project_import").click();

			//筛选
			$(".filtrate").on("click", function() {
				$("#JS_project_list").css("display", "none");
				$(".project").css("display", "none");
				$("#JS_project_search").css("display", "block");
				$(".search").css("display", "block");
			})

			//返回人才对接列表页面
			$("#JS_comeback_list").on("click", function() {
				$("#JS_project_search").css("display", "none");
				$(".search").css("display", "none");
				$("#JS_project_list").css("display", "block");
				$(".project").css("display", "block");
			})
			//完成
			$("#JS_search").on("click", function() {
				$("#JS_project_search").css("display", "none");
				$(".search").css("display", "none");
				$("#JS_project_list").css("display", "block");
				$(".project").css("display", "block");

				var projectInfo = {
					"project.name": $("#projectName").val(), //项目名
					"project.type": $("#JS_project_type").val(), //项目类型
					"project.sector": $("#JS_industry_areas").val(), //行业领域
					"releasetype": $("#JS_publisher_role").val(), //发布者角色（单位，个人）					
					"searchType": type
				}
				console.log(projectInfo);
				$.post(Util.CiepUrl + "/project/list.action", projectInfo, function(data) {
					var html = template('xiangmuguanli_list', data);
					$("#xiangmuguanli").html(html);
					console.log(data);
				})
			})
		},

		initPositionInformation: function() {
			var delivery = "";
			var id = window.location.href.split('=')[1];
			var str = window.location.href.split('?')[1];
			if(str.split("=")[0] == "hideid") {
				$(".chakan").remove();
			}

			var positionDetaiInfo = Util.getAjax(Util.Interface['positionDetail'].params(id)).data;
			$(".positionname").html(positionDetaiInfo.title);
			$(".time").html(positionDetaiInfo.publishDate);
			$(".companyname").html(positionDetaiInfo.enterprise.name);
			$(".unit-property").html(positionDetaiInfo.enterprise.enttype);
			$(".unit-category").html(positionDetaiInfo.enterprise.industry);
			$(".work-experience").html(positionDetaiInfo.experience);

			$(".unit-scale").html(positionDetaiInfo.enterprise.entsize);
			$(".unit-number").html(positionDetaiInfo.num);
			$(".work-education").html(positionDetaiInfo.education);

			var miaoshuContent = positionDetaiInfo.jobDesc;
			var zhizeContent = positionDetaiInfo.otherRequirement;
			$(".miaoshu-content").html(miaoshuContent.replace(/\n/g,'<br>'));
			
			$(".zhize-content").html(zhizeContent.replace(/\n/g,'<br>'));

			$(".chakan").attr("href", "unitInformation.html?id=" + positionDetaiInfo.enterprise.id);

			//个人用户查询是否已对某职位投递简历
			$.post(Util.CiepUrl + "/common/resume-deliver/isDelivered.action", {
				"resumeDeliver.positionId": id
			}, function(data) {
				if(data.code == 0 && data.data == true) {
					//alert(data.msg);
					$("#JS_delivery").html("已申请");
					delivery = data.data;
					$("#JS_delivery").attr("disabled", "false");
					$("#JS_delivery").css("background-color", "#BBBBBB");
				}
				if(data.code == -1 && data.data == false) {
					$("#JS_delivery").html("申请职位");
					delivery = data.data;
				}
			})

			$("#JS_delivery").on("click", function() {
				if(delivery == false) {
					$.post(Util.CiepUrl + "/common/resume-deliver/deliver.action", {
						"resumeDeliver.positionId": id
					}, function(data) {
						if(data.code == 0) {
							alert("职位申请成功");
							$("#JS_delivery").html("已申请");
							$("#JS_delivery").attr("disabled", "false");
							$("#JS_delivery").css("background-color", "#BBBBBB");
						} else {
							alert(data.msg);
							if(data.code == -1 && data.msg == "请先登录") {
								window.location.href = "../login/login.html";
							}
						}
					})
				}
				/*else if(delivery == true) {
					$.post(Util.CiepUrl + "/common/resume-deliver/delete.action", {"resumeDeliver.positionId": id},function(data) {
						if(data.code == 0) {
							alert(data.msg);
							delivery = false;
							$("#JS_delivery").html("投递");
						} else {
							alert(data.msg);
							if(data.code==-1&&data.msg=="请先登录"){
								window.location.href = "../login/login.html";
							}
						}
					})
				}*/
			})
		},

		initUnitInformation: function() {
			var id = window.location.href.split('=')[1];
			
			$.get(Util.Interface['unitInfo'].params(id), function(result){
				if(result.code==0){
					
					$("#JS_company_name").html(result.data.name);					
					if(result.data.regionProv==result.data.regionCity){
						$("#JS_company_address").html(result.data.regionCity+result.data.regsiterAddress);						
					}else{
						$("#JS_company_address").html(result.data.regionProv+result.data.regionCity+result.data.regsiterAddress);
					}
					$(".danwei-property").html(result.data.enttype);
					$(".danwei-scale").html(result.data.entsize);
					$(".danwei-category").html(result.data.industry);
		
					$(".miaoshu-content").html(result.data.profile);
					//项目对接
					$("#JS_project_docking").attr("href", "projectDocking.html?id=" + result.data.userId);
					//人才对接
					$("#JS_talent_docking").attr("href", "talentDocking.html?id=" + result.data.id);					
				}
			})
			
			var focused = "";

			//检测登录状态
			$.get(Util.CiepUrl + "/login/login!checkuser.action", function(data) {
				//判断企业是否被关注
				$.get(Util.CiepUrl + "/focus/focus!focused.action?entId=" + id, function(data) {
					//console.log("企业是否关注："+data);
					if(data.code == 0) {
						focused = data.data.focused;
						if(data.data.focused == false) {
							$("#JS_collection_unit").find("span").removeClass("focused");
						} else {
							$("#JS_collection_unit").find("span").addClass("focused");
						}
					}
				})
			});

			//关注
			$("#JS_collection_unit").on("click", function() {
				$.get(Util.CiepUrl + "/login/login!checkuser.action", function(data) {
					if(data.code == 0) {
						if(focused == false) {
							//关注
							$.get(Util.CiepUrl + "/focus/focus!addFocus.action?entId=" + id, function(data) {
								if(data.code == 0) {
									$("#JS_collection_unit").find("span").addClass("focused");
									focused = true;
								} else {
									alert(data.msg);
								}
							});
						} else {
							//取消关注
							$.get(Util.CiepUrl + "/focus/focus!cancelFocus.action?entId=" + id, function(data) {
								if(data.code == 0) {
									$("#JS_collection_unit").find("span").removeClass("focused");
									focused = false;
								} else {
									alert(data.msg);
								}
							});
						}
					} else {
						alert("未登录");
						window.location.href = "../login/login.html";
						return;
					}
				})
			})
		},

		initTalentDocking: function() {
			var id = window.location.href.split('=')[1];
			console.log(id);
			$.post(Util.CiepUrl + "/position/position!entPositions.action", { "entId": id }, function(data) {
				console.log(data);
				if(data.code == 0) {
					var html = template('talent_list', data.data.positions);
					$("#talent_docking").html(html);
				}
			})
		},

		initProjectDocking: function() {
			var id = window.location.href.split('=')[1];
			$.post(Util.CiepUrl + "/project/list.action", { "project.releaseid": id }, function(data) {
				console.log(data);
				if(data.code == 0) {
					var html = template('xiangmuguanli_list', data);
					$("#xiangmuguanli").html(html);
				}
			})
		},

		initProjectDetail: function() {
			var id = window.location.href.split('=')[1];
			$.get(Util.Interface['projectDetail'].params(id),function(result){
				if(result.code==0){
					
					$(".project-name").html(result.project.name);
	
					$(".project-category").html(result.project.type);
					$(".hangye-lingyu").html(result.project.sector);
	
					$(".contacts").html(result.project.contacts);
					$(".zhiwu").html(result.project.contactstitle);
	
					$(".phone").html(result.project.mobile);
					$(".zuoji").html(result.project.phone);
					$(".email").html(result.project.email);
					$(".chuanzhen").html(result.project.fax);
	
					$(".miaoshu-content").html(result.project.orgintroduction);
	
					var projectintr = result.project.introduction;
					$(".zhize-content").html(projectintr.replace(/\n/g,'<br>'));
					
					if(result.project.org==null){
						$(".positionname").html(result.project.person.company);
						
						if(result.project.person.nationality!="中国"){
							$(".companyaddress").html(result.project.person.nationality);
						}else{
							if(result.project.person.regionProv==result.project.person.regionCity){
								$(".companyaddress").html(result.project.person.regionCity);
							}else{
								$(".companyaddress").html(result.project.person.regionProv+result.project.person.regionCity);
							}	
						}
												
						$(".unit-property").html(result.project.person.comType);
						$(".unit-scale").html(result.project.person.comSize);
						$(".unit-category-item").html(result.project.person.comIndustry);
						
					}else{
						$(".positionname").html(result.project.org.name);	
						if(result.project.org.country!="中国"){
							$(".companyaddress").html(result.project.org.country);
						}else{
							if(result.project.org.regionProv==result.project.org.regionCity){
								$(".companyaddress").html(result.project.org.regionCity+result.project.org.regsiterAddress);
							}else{
								$(".companyaddress").html(result.project.org.regionProv+result.project.org.regionCity+result.project.org.regsiterAddress);
							}	
						}
															
						$(".unit-property").html(result.project.org.enttype);
						$(".unit-scale").html(result.project.org.entsize);
						$(".unit-category-item").html(result.project.org.industry);
					}
				}
					
					
				
			});
			
		},
		
		selectValueToSpan:function(){
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
		}
	}

	module.exports = app;
})