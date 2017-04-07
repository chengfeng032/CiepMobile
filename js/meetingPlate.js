define(function(require, exports, module) {
	require("zepto");
	var template = require("template");
	require("common");
	var $ = Zepto;

	var plate = "/system/section/getAllSectionList.action";

	var app = {
		initMeeting: function() {
			this.getNewsList(plate);
		},
		getNewsList: function(newsurl) {
			var newsList = this.getAjax(newsurl);
			var list = { rows: newsList };
			var html = template('meeting_list', list);
			document.getElementById("JS_meeting_list").innerHTML = html;
		},
		getAjax: function(url) {
			var $value;
			$.ajax({
				type: "get",
				url: Util.CiepUrl + url,
				async: false,
				dataType: 'json',
				timeout: '300',
				contentType: 'text/json',
				success: function(data) {
					$value = data
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert('Ajax error!')
				}
			});
			return $value;
		},

		plateDetail: function() {
			var id = document.location.href.split('=')[1];
			$.get(Util.Interface['plateDetail'].params(id),function(plateDetailInfo){
				$("#JS_plateName").html(plateDetailInfo.section.name);
				$(".content").html(plateDetailInfo.section.description);
	
				var html = template('intro_list', plateDetailInfo.section);
				document.getElementById("area_list").innerHTML = html;
				$(".content>p>span").css("font-size", "0.5rem");
				$(".content>p").css("line-height", "normal");
				$("img").each(function(){
					$(this).closest("p").css("text-indent","0");
					$(this).css({"width":"100%","height":"auto"});
				})
				$("table").each(function(){					
					$(this).css({"width":"100%","height":"auto"});
				})
				
				if(plateDetailInfo.section.areaList.length==0){
					$(".platedetail-container").css("display","none");
				}
				
			});
		}

	}

	module.exports = app;
})