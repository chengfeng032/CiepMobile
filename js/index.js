define(function(require, exports, module) {

	require("zepto");
	var template = require("template");
	require("swiper");
	require("common");
	
	var $ = Zepto;

	var indexbanner = "/common/compic!compiclist.action";
	var news = "/index/news!indexlist.action";

	var app = {

		init: function() {
			this.intiTmpFilter();
			this.getIndexBanner();
			this.getNewsBanner();
			this.getNewsList();
			
			this.initEvent();
		},
		getIndexBanner: function() {
			var bannerList = this.getAjax(indexbanner);
			var html = template('tpl-banners', bannerList);
			document.getElementById("JS_banner_swiper_container").innerHTML = html;
			var mySwiper = new Swiper('.swiper-container-horizontal', {
				direction: 'horizontal',
				loop: true,
				initialSlide: 0,
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				// 如果需要分页器
				pagination: '.swiper-pagination',
			})
		},
		getNewsBanner: function() {
			var data = { "page": 1, "rows": 2, "inxshow": 1, "mid": "confnotice" };
			var bannerList = this.postAjax(news, data);
			var html = template('news-banners', bannerList);
			document.getElementById("JS_broadcast_swiper_container").innerHTML = html;
			var mySwiper2 = new Swiper('.swiper-container-vertical', {
				direction: 'vertical',
				loop: true,
				initialSlide: 0,
				autoplay: 5000,
				autoplayDisableOnInteraction: false,
			})
		},
		getNewsList: function() {
			//var data = {"page": 1,"rows": 20,"inxshow": 1,"mid":"newscenter"};
			var newss = news + "?page=1&rows=20&inxshow=1&mid=newscenter";
			var newsList = this.getAjax(newss);
			var html = template('news-list', newsList);
			document.getElementById("JS_news_list").innerHTML = html;
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
					$value = data.data;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert('Ajax error!')
				}
			});
			return $value;
		},
		postAjax: function(url, data) {
			var $value;
			$.ajax({
				type: "post",
				url: Util.CiepUrl + url,
				async: false,
				dataType: 'json',
				timeout: '300',
				contentType: 'text/json',
				data: data,
				success: function(data) {
					$value = data.data;
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert('Ajax error!')
				}
			});
			return $value;
		},
		intiTmpFilter: function() {

			template.helper('imgsrc', function(item) {
				if(item) {
					var src = item;
					src = Util.CiepUrl + src;
					return src;
				}
			});

			template.helper('href', function(item) {
				if(item) {
					var hre = item;
					hre = Util.CiepUrl + "/CiepMobile/secondPage/generalNoticeList.html";
					return hre;
				}
			});
			template.helper('newshref', function(item) {
				if(item) {
					var hre = item;
					hre = Util.CiepUrl + "/CiepMobile/secondPage/newsDetail.html?id=" + hre;
					return hre;
				}
			})
		},
		initEvent: function() {

			//$(".notice_return").on("click",function(){
			//	window.localStorage.setItem("returnPage","../index.html");
			//})

			$("#JS_Attend").on("click", function() {
				//判断用户是否登录
				var haslogin = Util.getAjax(Util.Interface['checkuser'].params());
				if(haslogin.code != 0) {
					window.location.href = "login/login.html";
					return;
				}
				//判断是否已经参会
				console.log(Cookie.get("userid"));
				$.post(Util.CiepUrl + "/partici/participant!getmyconfs.action", "", function(data) {
					if(data.code == 0) {
						if(data.data != "") {
							alert('您已经参会，请在我的展票中查看相关信息');
						} else {
							window.location.href = "secondPage/gotoMeeting.html";
						}
					}
				});
			})

			$("#J_index_downtip").on("click", function(event) {
				event.preventDefault();
				event.stopImmediatePropagation();
				window.location.href = "http://www.ciep.gov.cn:9080/html/home.html";
			})
		},
		
		initZhanpiao:function(){
			var haslogin = Util.getAjax(Util.Interface['checkuser'].params());
			if(haslogin.code != 0) {
				window.location.href = "login/login.html";
				return;
			}

			$("#big").on("click", function() {
				$("#over").css("display", "block");
			})
			$("#over").on("click", function() {
				$("#over").css("display", "none");
			})

			var result = Util.getAjax(Util.Interface['particimedia'].params());
			console.log(result);
			if(result.code == 0) {
				if(result.data){
					$(".name").text(result.data.name);
					$(".nation>span").text(result.data.nationality);
					$(".qrcode>a>img").attr("src", Util.Interface['QRcode'].params(4, result.data.id));
					$(".img>img").attr("src", Util.Interface['QRcode'].params(4, result.data.id));
					//$(".ticket>p").text(result.data.number);
	
					var resultMeeting = Util.getAjax(Util.Interface['personalMeetingList'].params());
					var htmlstr = "";
					if(resultMeeting.code == 0) {
						for(var k = 0; k < resultMeeting.data.length; k++) {
							for(var i=0;i<resultMeeting.data[k].meetingList.length;i++){
								htmlstr+=resultMeeting.data[k].meetingList[i].serilNum+'、';
							}
						}
						htmlstr = htmlstr.substring(0,htmlstr.length-1);
						console.log("参会编号："+htmlstr);
						$(".ticket>p").text(htmlstr);
					} else {
						alert(result.msg);
					}
				}else{
					$(".viewport.mb").css("display","none");
				}

			} else {
				alert(result.msg);
				window.location.href = "login/login.html";
			}
		}
	}

	module.exports = app;
})