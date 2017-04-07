define(function(require, exports, module) {
	require("zepto");
	require("common");
	var template = require("template");
	var $ = Zepto;

	var app = {

		initNews: function() {
			var news = "/index/news!indexlist.action";
			//大会新闻
			var dahuiNews = news + "?page=1&rows=20&inxshow=0&mid=confnews";
			//行业新闻
			var hangyeNews = news + "?page=1&rows=20&inxshow=0&mid=industnews";
			//单位动态
			var danweiNews = news + "?page=1&rows=20&inxshow=0&mid=exhibitdynamic";

			function getNewsList(newsurl) {
				var newsList = getAjax(newsurl);
				var html = template('news_list', newsList);
				$("#dahuixinwen_list").html(html);
			}

			function getAjax(url) {
				var $value;
				$.ajax({
					type: "get",
					url: Util.CiepUrl + url,
					async: false,
					dataType: 'json',
					timeout: '300',
					contentType: 'text/json',
					success: function(data) {
						$value = data.data;
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert('Ajax error!')
					}
				});
				return $value;
			}

			getNewsList(dahuiNews);

			var dahuixinwen = $("#dahuixinwen");
			var hangyexinwen = $("#hangyexinwen");
			var danweidongtai = $("#danweidongtai");
			var dahuishipin = $("#dahuishipin");
			var dahuixinwen_list = $("#dahuixinwen_list");
			var hangyexinwen_list = $("#hangyexinwen_list");
			var danwendongtai_list = $("#danweidongtai_list");
			var dahuishipin_list = $("#dahuishipin_list");
			dahuixinwen.on("click", function() {
				totalclass();
				dahuixinwen.addClass("current");
				totalnone();
				dahuixinwen_list.css("display", "block");
				getNewsList(dahuiNews);
			});
			hangyexinwen.on('click', function() {
				totalclass();
				hangyexinwen.addClass("current");
				totalnone();
				dahuixinwen_list.css("display", "block");
				getNewsList(hangyeNews);
			});
			danweidongtai.on('click', function() {
				totalclass();
				danweidongtai.addClass("current");
				totalnone();
				dahuixinwen_list.css("display", "block");
				getNewsList(danweiNews);
			});
			dahuishipin.on('click', function() {
				totalclass();
				dahuishipin.addClass("current");
				totalnone();
				dahuishipin_list.css("display", "block");

				$.get(Util.CiepUrl + "/video/vod/vod!vodlist.action", function(data) {
					console.log(data);
					var htmlvideo = template("JS_dahuishipin_item", data.data);
					$(".bonus-ad").html(htmlvideo);
				})

			});

			function totalclass() {
				dahuixinwen.removeClass("current");
				hangyexinwen.removeClass("current");
				danweidongtai.removeClass("current");
				dahuishipin.removeClass("current");
			}

			function totalnone() {
				dahuixinwen_list.css("display", "none");
				dahuishipin_list.css("display", "none");
			}

			$(".notice_return").on("click", function() {
				window.localStorage.setItem("returnPage", "newsCenter.html");
			})

			template.helper('imgsrc', function(item) {
				if(item) {
					var src = item;
					src = Util.CiepUrl + src;
					return src;
				}
			});

			$(".zhutifayan").on("click", function() {
				$(this).addClass("current");
				$(".wangluozhibo").removeClass("current");
			})
			$(".wangluozhibo").on("click", function() {
				$(this).addClass("current");
				$(".zhutifayan").removeClass("current");
			})
		},

		initNotice: function() {
			var arrlist = {};
			//arrlist = Util.getAjax(Util.Interface['historyAchievement'].params(0, 0));

			$.get(Util.CiepUrl + "/index/news!indexlist.action?mid=confnotice", function(data) {
				console.log(data)
				$(".zhengwen-qdzg>.tongzhi-list").empty();
				$.each(data.data.rows, function(index, item) {
					var li = "<li class='tongzhi-list-item'><a href='detail.html?id=" + item.id + "'>" +
						//"<div class='image'><img src='" + Util.CiepUrl + item.imageUrl + "' width='100%' height='100%' /></div>"+
						"<div class='image'><img src='../img/icon/notice_Icon@2x.png' width='100%' height='100%' /></div>" +
						"<div class='info'><div class='title'><span>" + item.title + "</span></div>" +
						"<div class='content'><span>" + item.introduction + "</span>" +
						"<a href='javascript:void(0);' class='more'>更多</a></div>" +
						"<div class='time'>" + item.createtime + "</div></div></a></li>";
					$(".zhengwen-qdzg>.tongzhi-list").append(li);
				})
			})
		},
		
		initSearch:function(){
			$("#danwei").on("click", function() {
					$(this).addClass('current');
					$("#news").removeClass('current');
					$(".canzhandanwei").css("display", "block");
					$(".xinwenxinxi").css("display", "none");
				})
				$("#news").on("click", function() {
					$(this).addClass('current');
					$("#danwei").removeClass('current');
					$(".canzhandanwei").css("display", "none");
					$(".xinwenxinxi").css("display", "block");
				})

				$(".search").on("click", function() {

					var dataInfo = "?keyword=" + $("#JS_searchContent").val(); //+"&enterprisePage=&enterpriseRows=&enterpriseSort=&enterpriseOrder=";

					console.log(Util.Interface['searchList'].params(dataInfo));
					var result = Util.getAjax(Util.Interface['searchList'].params(dataInfo));
					console.log(result);
					if(result.code == 0) {	
						if(result.enterprise && result.enterprise.rows.length>0){
							var danweihtml = template("JS_danwei", result.enterprise);
							$("#danwei_list").html(danweihtml);
							$("#danwei_list").css("display","block");
							$("#JS_danwei_empty").css("display","none");
						}else{
							var danweihtml = template("JS_danwei", result.enterprise);
							$("#danwei_list").html(danweihtml);
							$("#danwei_list").css("display","none");
							$("#JS_danwei_empty").css("display","block");
						}
						
						if(result.news && result.news.rows.length > 0) {
							var newshtml = template("JS_news_detail", result.news);
							$("#news_detail_list").html(newshtml);
							$("#news_detail_list").css("display","block");
							$("#JS_news_empty").css("display", "none");
						} else {
							var newshtml = template("JS_news_detail", result.news);
							$("#news_detail_list").html(newshtml);
							$("#news_detail_list").css("display","none");
							$("#JS_news_empty").css("display", "block");
						}
						
					}

				})

				template.helper('imgsrc', function(item) {
					if(item) {
						var src = item;
						src = Util.CiepUrl + src;
						return src;
					} else {
						return "../img/news-default.jpg";
					}
				});
				template.helper('href', function(item) {
					if(item) {
						var hre = item;
						hre = Util.CiepUrl + "/CiepMobile/secondPage/newsDetail.html?id=" + hre;
						return hre;
					}
				});
				template.helper('showitem', function(item) {
					if(item == false) {
						return "none";
					} else {
						return "block";
					}
				});
				template.helper('showitem2', function(item) {
					if(item == false) {
						return "block";
					} else {
						return "none";
					}
				});
				$(".search").click();
		}
	}

	module.exports = app;
})