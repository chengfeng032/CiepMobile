//根据设备的视口宽度改变html的font-size的大小，实现屏幕适配。--2016-12-17
window.onresize = function() {
	resizeWith();
}
window.onload = function() {
	resizeWith();
}

function resizeWith() {
	var w = document.documentElement.offsetWidth;

	if(w < 320) {
		document.documentElement.style.fontSize = '20px';
	}
	if(w > 750) {
		document.documentElement.style.fontSize = '46.875px';
	} else {
		document.documentElement.style.fontSize = w / 16 + 'px';
	}
}

var Cookie = {};
Cookie.get = function(sName, sDefaultValue) {
	var sRE = "(?:; |^)" + sName + "=([^;]*);?";
	var oRE = new RegExp(sRE);
	if(oRE.test(document.cookie)) {
		return unescape(RegExp["$1"]);
	} else {
		return sDefaultValue || null;
	}
};
Cookie.set = function(sName, sValue, iExpireSec, sDomain, sPath, bSecure) {
	if(!sName) {
		return;
	}
	if(!sValue) {
		sValue = "";
	}
	var str = sName + "=" + escape(sValue) + "; ";
	if(!isNaN(iExpireSec)) {
		var oDate = new Date();
		oDate.setTime(oDate.getTime() + iExpireSec * 1000);
		str += "expires=" + oDate.toGMTString() + "; ";
	}
	if(sDomain) {
		str += "domain=" + sDomain + "; ";
	}
	if(sPath) {
		str += "path=" + sPath + "; ";
	} else {
		str += "path=/; ";
	}
	if(bSecure) {
		str += "secure";
	}
	document.cookie = str;
};
Cookie.clear = function(sName) {
	Cookie.set(sName, "", new Date(0));
};

var Util = Util || {};

Util.CiepUrl = "../..";
//Util.CiepUrl = "http://120.76.74.105:8085/ciep_new";

Util.Interface = {};

Util.Interface['找回密码3'] = {
	base: 'ResetPwdStep3',
	params: function(data) {
		return {
			method: 'POST',
			url: Util.CiepUrl + this.base,
			headers: {
				'Content-Type': 'text/json'
			},
			responseType: 'json',
			data: data
		}
	}
}
Util.Interface['首页轮播图'] = {
	base: '/common/compic!compiclist.action',
	params: function(data) {
		return {
			method: 'GET',
			url: Util.CiepUrl + this.base,
			headers: {
				'Content-Type': 'text/json'
			},
			responseType: 'json',
			timeout: 3000
		}
	}
}

Util.Interface['login'] = {
	base: '/login/login!login.action',
	params: function(username, password) {
		return {
			url: Util.CiepUrl + this.base,
			param: {
				'usercode': username,
				'password': password
			}
		}
	}
}
Util.Interface['checkAcount'] = {
	base: '/register/register!checkAcount.action',
	params: function(custname) {
		return {
			url: Util.CiepUrl + this.base,
			params: {
				'custname': custname
			}
		}
	}
}
Util.Interface['checkMobile'] = {
		base: '/register/register!checkMobile.action',
		params: function(mobile) {
			return {
				method: 'POST',
				url: Util.CiepUrl + this.base,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				responseType: 'json',
				params: {
					'mobile': mobile
				}
			}
		}
	}
	/*"custtype": "P”,//P:个人，I:机构
					  "custname": "用户名”,
					  "password": "密码”,
					  "passconfirm": "确认密码”*/
Util.Interface['register'] = {
	base: '/register/register!addUser.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			param: data
		}
	}
}
Util.Interface['loginOut'] = {
	base: '/login/login!loginout.action',
	params: function() {
		return Util.CiepUrl + this.base
	}
}
Util.Interface['changePass'] = {
	base: '/login/login!changepass.action',
	params: function(password, passwordnew) {
		return {
			method: 'post',
			url: Util.CiepUrl + this.base,
			headers: {
				'Content-Type': 'text/json'
			},
			responseType: 'json',
			data: {
				'password': password,
				'passwordnew': passwordnew
			}
		}
	}
}

//根据类型代码获取文章信息
//canzhanshouce-参展手册
//danweicanzhanzhinan-单位参展指南
//gerencanhuizhinan-个人/团体参会指南
//meiticanhui-媒体参会指南
//querenhan-参展确认函
//huiyijieshao-会议介绍,huiyiricheng-会议日程,jiaotongzhinan-交通指南
//luntanzhengtijieshao-论坛整体介绍,tuijianjiudian-推荐酒店,tuijianqianyue-推荐签约及表彰活动
//zhanweidajian-展位搭建,zhuyaohuiyi-主要会议及活动,zhuyaoricheng-主要日程
//xieyishezhi-协议设置（注册协议）
//当前板块对应写死的详情页（15个）
//quanqiucaizhi-全球才智论坛
//zhuanyehuiyi-专业会议
//quanguoyinzhi-全国引智成果展览交流
//yangqiyinzhi-央企引智项目及人才对接
//waiguozhuanjia-外国专家组织与培训项目对接
//haiwailiuxue-海外留学人才及项目交流推介
//guojijishu-国际技术转移与创新合作专题
//yatairenli-亚太人力资源开发与服务博览暨论坛
//guojijiaoyu-国际教育展
//zhiyejiaoyu-职业教育与高技能人才专馆
//pingxuanbanzheng-评选与颁证活动
//guojijishu-国际人才市场对接交流会
//quanguoruanjian-全国软件人才项目投资交流会
//zhongguoshenzhen-中国深圳创新人才大赛
//xiliezhuanchang-系列专场招聘会			
Util.Interface['article'] = {
	base: '/common/comarticle!getByTypecode.action',
	params: function(typecode) {
		return Util.CiepUrl + this.base + '?typecode=' + typecode
	}
}

//获取展馆规划图列表
Util.Interface['exhibitionMap'] = {
	base: '/exhibition-map/list.action',
	params: function() {
		return Util.CiepUrl + this.base
	}
}

//获取大会论坛-论坛议程列表
Util.Interface['forumAgenda'] = {
	base: '/forum-agenda/list.action',
	params: function(page, rows) {
		return Util.CiepUrl + this.base + '?page=' + page + '&rows=' + rows
	}
}

//参展名单
Util.Interface['enterprise'] = {
		base: '/enterprise/list.action',
		params: function(page, rows) {
			return Util.CiepUrl + this.base + '?page=' + page + '&rows=' + rows			
		}
	}
	//获取往届回顾-取得成果列表
Util.Interface['historyAchievement'] = {
		base: '/history-achievement/list.action',
		params: function(page, rows) {
			return Util.CiepUrl + this.base + '?page=' + page + '&rows=' + rows
		}
	}
	//获取往届回顾-展商名录列表
Util.Interface['historyExhibitor'] = {
	base: '/history-exhibitor/list.action',
	params: function(page, rows) {
		return Util.CiepUrl + this.base + '?page=' + page + '&rows=' + rows
	}
}

//搜索职位列表
Util.Interface['positionList'] = {
	base: '/position/position!list.action',
	params: function(page, rows, title, entName, salRange, experience, education, major, industry, jobType) {
		return {
			url: Util.CiepUrl + this.base,
			data: {
				'page': page, // 分页页码
				'rows': rows, // 分页每页条数	
				'title': title, //"职位名称"
				'entName': entName, //"企业名称"
				'salRange': salRange, //"薪水范围"
				'experience': experience, //"经验要求"
				'education': education, //"教育程度要求"
				'major': major, //"专业"
				'industry': industry, //"行业"
				'jobType': jobType //"职位类型
			}
		}
	}
}

//查看岗位详情
Util.Interface['positionDetail'] = {
	base: '/position/position!getByidinfo.action',
	params: function(id) {
		return Util.CiepUrl + this.base + '?id=' + id
	}
}

//单位信息
Util.Interface['unitInfo'] = {
	base: '/ent/enterprise!getByidinfo.action',
	params: function(id) {
		return Util.CiepUrl + this.base + '?id=' + id
	}
}

//获取对接项目列表  (当searchType==0时，获取项目引进，当searchType!=0时，获取项目推介)
Util.Interface['projectduijie'] = {
	base: '/project/list.action',
	params: function(searchType, name, type, sector, releasetype) {
		return Util.CiepUrl + this.base + '?searchType=' + searchType + '&project.name=' + name + '&project.type=' + type + '&project.sector=' + sector + '&releasetype=' + releasetype
	}
}

//获取项目详情
Util.Interface['projectDetail'] = {
	base: '/project/detail.action',
	params: function(id) {
		return Util.CiepUrl + this.base + '?project.id=' + id
	}
}

//获取大会板块详情
Util.Interface['plateDetail'] = {
	base: '/system/section/getSectionDetail.action',
	params: function(id) {
		return Util.CiepUrl + this.base + '?section.id=' + id
	}
}

//获取大会板块列表接口（参展参会下拉菜单选项）
Util.Interface['allSectionList'] = {
	base: '/system/section/getAllSectionList.action',
	params: function(type) {
		return Util.CiepUrl + this.base + '?type=' + type
	}
}

//编辑参会个人信息（有些字段页面没有的话不需要传）
Util.Interface['editPersonalInfo'] = {
	base: '/partici/participant!add.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//个人参展：提交我的参会列表
Util.Interface['meetingListSubmit'] = {
	base: '/partici/participant!myconfs.action',
	params: function(confid) {
		return {
			url: Util.CiepUrl + this.base,
			data: {
				'confIds': confid
			}
		}
	}
}

//生成二维码接口
Util.Interface['QRcode'] = {
	base: "/qrcode/qr!gen.action",
	params: function(cmd, id) {
		return Util.CiepUrl + this.base + '?cmd=' + cmd + '&id=' + id
			//"cmd":cmd  1-企业信息，2-点播视频，3-直播视频，4-展票二维码
			//"id":id  对应对象ID；当cmd:4时，id为用户参会信息participant的id
	}
}

//检测登录状态
Util.Interface['checkuser'] = {
	base: '/login/login!checkuser.action',
	params: function() {
		return Util.CiepUrl + this.base
	}
}

//查询登录用户的参会个人信息
Util.Interface['particimedia'] = {
	base: '/partici/participant!currpartici.action',
	params: function() {
		return Util.CiepUrl + this.base
	}
}

//个人参展：查询我的参会列表
Util.Interface['personalMeetingList'] = {
	base: '/partici/participant!getmyconfs.action',
	params: function() {
		return Util.CiepUrl + this.base
	}
}

//获取项目列表
Util.Interface['projectList'] = {
	base: '/common/project/list.action',
	params: function(page, rows) {
		return Util.CiepUrl + this.base + "?page=" + page + "&rows=" + rows
	}
}

//发布项目
Util.Interface['projectAdd'] = {
	base: '/common/project/add.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//修改项目
Util.Interface['projectSave'] = {
	base: '/common/project/save.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//删除项目
Util.Interface['projectDel'] = {
	base: '/common/project/delete.action',
	params: function(id) {
		return {
			url: Util.CiepUrl + this.base,
			data: {
				"project.id": id
			}
		}
	}
}

//我的简历-新增/修改：更新类型  范围数字0-3。0：简历基本信息；
Util.Interface['myResumeUpdate'] = {
	base: '/member/person/resume/update.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}

	}
}

//我的简历-简历详情
Util.Interface['myResume'] = {
	base: '/member/person/resume/myResume.action',
	params: function() {
		return Util.CiepUrl + this.base
	}
}

//简历教育经历添加/修改
Util.Interface['educationSave'] = {
	base: '/member/person/resume/education/save.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//简历教育经历删除
Util.Interface['educationDelete'] = {
	base: '/member/person/resume/education/delete.action',
	params: function(id) {
		return {
			url: Util.CiepUrl + this.base,
			data: {
				"education.id": id
			}
		}
	}
}

//简历工作经历添加/修改
Util.Interface['workSave'] = {
	base: '/member/person/resume/work-exp/save.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//简历工作经历删除
Util.Interface['workDelete'] = {
	base: '/member/person/resume/work-exp/delete.action',
	params: function(id) {
		return {
			url: Util.CiepUrl + this.base,
			data: {
				"workExperience.id": id
			}
		}
	}
}

//求职意向
Util.Interface['jobPreferencesSave'] = {
	base: '/member/person/resume/job-pre/save.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//首页搜索
Util.Interface['searchList'] = {
	base: '/search/list.action',
	params: function(src) {
		return Util.CiepUrl + this.base + src

	}
}

//修改密码
Util.Interface['modifyPassword'] = {
	base: '/login/login!changepass.action',
	params: function(data) {
		return {
			url: Util.CiepUrl + this.base,
			data: data
		}
	}
}

//通过get方法获取数据
Util.getAjax = function(url) {
	var $value;
	$.ajax({
		type: "get",
		url: url,
		async: false,
		dataType: 'json',
		timeout: '300',
		contentType: 'text/json',
		success: function(data) {
			$value = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Ajax error!')
		}
	});
	return $value;
}

//通过post方法获取数据
Util.postAjax = function(Url, Data) {
	var $value;
	$.ajax({
		type: "post",
		url: Url,
		async: false,
		dataType: 'json',
		timeout: '300',
		contentType: 'text/json',
		param: Data,
		success: function(data) {
			$value = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('Ajax error!')
		}
	});
	return $value;
}

//检查登录状态
Util.loginStatus = function() {
	var $value;
	$.get(Util.CiepUrl + "/login/login!checkuser.action", function(data) {
		$value = data.code;
	})
	return $value;
}
/*$(".icon-clear").on("click", function(e) {
	e.preventDefault();
	$(this).siblings("input").val("");
	$(this).siblings("input").focus();
})*/


function Location() {
	this.items	= {
		'0':{
			101:'United States of America美国',
			105:'United Kingdom英国',
			109:'Germany德国',113:'Australia澳大利亚',115:'France法国',
			116:'Italy意大利',
			117:'South Korea韩国',118:'Japan日本',119:'Mexico墨西哥',209:'Cambodia柬埔寨',
			210:'Vietnam越南',211:'Argentina阿根廷',212:'Philippines菲律宾',
			213:'Canada 加拿大',214:'Malaysia马来西亚',215:'Laos老挝',216:'Greece希腊',217:'New Zealand新西兰',
			218:'Singapore新加坡',219:'Switzerland 瑞士',220:'Cuba 古巴',221:'India印度',222:'Belize伯利兹',
			223:'Belgium比利时',224:'Benin 贝宁',225:'Bermuda 百慕大',226:'Bhutan不丹',227:'Bolivia玻利维亚',228:'Bosnia and Herzegovina 波斯尼亚和黑塞哥维那',
			229:'Botswana博茨瓦纳',230:'Bouvet Island 布维岛',231:'Brazil 巴西',232:'Brunei Darussalam 文莱',233:'Bulgaria 保加利亚',
			234:'Burkina Faso 布基纳法索',235:'Burundi 布隆迪',236:'Cameroon 喀麦隆',237:'Austria奥地利',238:'Cape Verde 佛得角',
			239:'The Central African Republic 中非共和国',240:'Chile 智利',241:'Christmas Island 圣诞岛',242:'Colombia 哥伦比亚',
			243:'Bangladesh 孟加拉国',244:'Congo刚果共和国',245:'Democratic Republic of the Cong刚果民主共和国',246:'Cook Island 库克群岛',
			247:'Costa rica 哥斯达黎加',248:"Coate d'Ivorie 科特迪瓦",249:'Barbados巴巴多斯',250:'维德岛',251:'Cyprus塞浦路斯',
			252:'Czech捷克',253:'Denmark丹麦',254:'Djibouti吉布提',
			255:'The Commonwealth of Dominica多米尼克',256:'Afghanistan 阿富汗',257:'The Dominican Republic多米尼加',258:'Algeria阿尔及利亚',
			259:'Ecuador厄瓜多尔',260:'Egypt埃及',261:'West Sahara西撒哈拉',262:'Spain西班牙',263:' Estonia爱沙尼亚',264:' Ethiopia埃塞俄比亚',
			265:' Eritrea厄立特里亚',266:'Fiji斐济',267:'Finland芬兰',268:'ANtigua and Barbuda 安提瓜和巴布达',269:'Micronesia密克罗尼西亚联邦',270:'法罗群岛',
			271:'Gabon加蓬',272:'Equatorial Guinea赤道几内亚',273:' French Guiana法属圭亚那',274:'Gambia冈比亚',275:' Georgia格鲁吉亚',276:'Ghana加纳',
			277:'Gibraltar直布罗陀',278:'Barbados巴巴多斯',279:'Greenland格陵兰',280:'Grenada格林纳达',281:'Guam关岛',282:'Guatemala危地马拉',
			283:'Guinea几内亚',284:'Guinea-Bissau几内亚比绍',285:'Guyana圭亚那',286:'Croatia克罗地亚',287:'Haiti海地',
			288:'Honduras洪都拉斯',289:'Hungary匈牙利',290:'Iceland冰岛',291:'Belarus白俄罗斯',292:'Indonesia印度尼西亚',293:'Iran伊朗',
			294:'Iraq伊拉克',295:'Ireland爱尔兰',296:'Israel以色列',297:'Anguilla安圭拉',298:'Jamaica牙买加',299:'Armenia 亚美尼亚',300:'Jordan约旦',
			301:'Kazakhstan哈萨克斯坦',302:'Kenya肯尼亚',303:'Kiribati基里巴斯',304:'North Korea朝鲜',305:'Republic of Albania阿尔巴尼亚',
			306:'Angola安哥拉',
			307:'Comoros科摩罗',308:'Saint Kitts and Nevis圣基茨和尼维斯',309:'Kyrgyzstan吉尔吉斯斯坦',310:'Kuwait科威特',
			311:'Cayman Islands开曼群岛',312:'Azerbaijan 阿塞拜疆',313:'Sri Lanka斯里兰卡',314:'Latvia拉托维亚',315:'Lebanon黎巴嫩',316:'Lesotho莱索托',
			317:'Liberia利比里亚',318:'Libya利比亚',319:'Liechtenstein列支敦士登',320:'Lithuania立陶宛',321:'Luxembourg卢森堡',
			322:'St. Lucia圣卢西亚',323:'Madagascar马达加斯加',324:'Montenegro黑山',325:'Malawi马拉维',326:'Albania 阿尔巴尼亚',327:'Maldives马尔代夫',
			328:'Mali马里',329:'Macedonia马其顿',330:'Malta马耳他',331:'Marshall Islands马绍尔群岛',332:'Mauritania毛里塔尼亚',333:'Mauritius毛里求斯',
			334:'Antilles安的列斯群岛',335:'Moldova摩尔多瓦',336:'Monaco摩纳哥',337:'Mongolia蒙古',338:'Montserrat蒙特塞拉特',339:'Morocco摩洛哥',
			340:'Mozambique莫桑比克',341:'Burma缅甸',342:'Northern Mariana Islands北马里亚那群岛',343:'Namibia纳米比亚',344:'Naura瑙鲁',
			345:'Nepal尼泊尔',346:'Netherlands荷兰',347:'New Caledonia新喀里多尼亚',348:'Bahamas 巴哈马',349:'Nicaragua尼加拉瓜',
			350:'Niger尼日尔',351:'Nigeria尼日利亚',352:'Niue纽埃',353:'Norfolk Island诺福克岛',354:'Norway挪威',355:'Oman阿曼',
			356:'Pakistan巴基斯坦',357:'French Polynesia法属波利尼西亚',358:'Palau帕劳',359:'Panama巴拿马',360:'Papua New Guinea巴布亚新几内亚',
			361:'Paraguay巴拉圭',362:'Peru秘鲁',363:'American Samoa美属萨摩亚群岛',364:'圣皮埃尔和密克隆群岛',365:'Pitcairn Islands皮特开恩群岛',366:' Poland波兰',
			367:'Portugal葡萄牙',368:'The State of Palestine巴勒斯坦',369:'Puerto Rico波多黎各',370:'Qatar卡塔尔',371:'Romania罗马尼亚',372:'Russia俄罗斯联邦',
			373:'Rwanda卢旺达',374:'El Salvador萨尔瓦多',375:'St.Helena圣赫勒拿',376:'San Marino圣马力诺',377:'Sao Tome and Principe圣多美和普林西比',
			378:'Saudi Arabia沙特阿拉伯',379:'Senegal塞内加尔',380:'Seychelles塞舌尔',381:'Sierra leone塞拉利昂',382:'Serbia塞尔维亚',
			383:'Bahrain 巴林',
			384:'Slovakia斯洛伐克',385:'Slovene斯洛文尼亚',386:'Solomon Islands所罗门群岛',387:'Somali索马里',388:'Sudan苏丹',389:'South Sudan 南苏丹',
			390:'Surinam苏里南',391:'Swaziland斯威士兰',392:'Sweden瑞典',393:'Syria叙利亚',394:'Chad乍得',395:'Tajikistan塔吉克斯坦',
			396:'Tanzania坦桑尼亚',397:'Thailand泰国',398:'Togo多哥',399:'Tokela托克劳',400:'Tonga汤加',401:'Trinidad and Tobago特立尼达和多巴哥',
			402:'Tunisia突尼斯',403:'Turkey土耳其',404:'East Timor东帝汶',405:'Turkmenistan土库曼斯坦',406:'Turks and Caicos Islands特克斯和凯科斯群岛',
			407:'Tuvalu图瓦卢',408:'Uganda乌干达',409:'Ukraine乌克兰',410:'United Arab Emirates 阿拉伯联合酋长国',
			411:'The Principality of Andorra 安道尔',412:'Uruguay乌拉圭',413:'Uzbekistan乌兹别克斯坦',414:'Vatican City梵蒂冈',
			415:'Saint Vincent and the Grenadines圣文森特和格林纳丁斯',416:'Venezuela委内瑞拉',417:'Antarctica南极洲',
			418:'Virgin Islands(British)英属维尔京群岛',419:'Vigin Islands(U.S.)美属维尔京群岛',420:'Republic of Vanuatu瓦努阿图共和国',
			421:'Western Samoa西萨摩亚',422:'Yemen[1]  也门',423:'South Africa南非',424:'Zaire扎伊尔',425:'Zambia赞比亚',426:'Zimbabwe津巴布韦',
			100:'中国'
		},
		'0,100':{235:'北京市',240:'天津市',250:'上海市',260:'重庆市',270:'河北省',406:'山西省',622:'内蒙古',804:'辽宁省',945:'吉林省',1036:'黑龙江省',1226:'江苏省',
			1371:'浙江省',1500:'安徽省',1679:'福建省',1812:'江西省',1992:'山东省',2197:'河南省',2456:'湖北省',2613:'湖南省',
			2822:'广东省',3015:'广西',3201:'海南省',3235:'四川省',3561:'贵州省',3728:'云南省',3983:'西藏',4136:'陕西省',4334:'甘肃省',4499:'青海省',4588:'宁夏',
			4624:'新疆',4802:'香港',4822:'澳门',4825:'台湾省'},
		'0,100,235':{3:'北京市'},
		'0,100,240':{23:'天津市'},
		'0,100,250':{45:'上海市'},
		'0,100,260':{67:'重庆市'},
		'0,100,270':{109:'石家庄市',145:'张家口市',176:'承德市',196:'秦皇岛市',208:'唐山市',229:'廊坊市',246:'保定市',290:'衡水市',310:'沧州市',337:'邢台市',372:'邯郸市'},
		'0,100,406':{407:'太原市',421:'朔州市',432:'大同市',451:'阳泉市',459:'长治市',483:'晋城市',494:'忻州市',521:'晋中市',542:'临汾市',574:'吕梁市',598:'运城市'},
		'0,100,622':{623:'呼和浩特市',638:'包头市',651:'乌海市',655:'赤峰市',677:'通辽市',692:'呼伦贝尔市',713:'鄂尔多斯市',729:'乌兰察布市',750:'巴彦淖尔市',764:'兴安盟',775:'锡林郭勒盟',798:'阿拉善盟'},
		'0,100,804':{805:'沈阳市',822:'朝阳市',832:'阜新市',842:'铁岭市',853:'抚顺市',864:'本溪市',873:'辽阳市',882:'鞍山市',892:'丹东市',900:'大连市',912:'营口市',919:'盘锦市',926:'锦州市',936:'葫芦岛市'},
		'0,100,945':{946:'长春市',958:'白城市',966:'松原市',976:'吉林市',987:'四平市',996:'辽源市',1003:'通化市',1014:'白山市',1025:'延边州'},
		'0,100,1036':{1037:'哈尔滨市',1064:'齐齐哈尔市',1089:'七台河市',1095:'黑河市',1105:'大庆市',1119:'鹤岗市',1130:'伊春市',1149:'佳木斯市',1165:'双鸭山市',1178:'鸡西市',1189:'牡丹江市',1202:'绥化市',1219:'大兴安岭地区'},
		'0,100,1226':{1227:'南京市',1243:'徐州市',1259:'连云港市',1271:'宿迁市',1280:'淮安市',1293:'盐城市',1308:'扬州市',1317:'泰州市',1324:'南通市',1335:'镇江市',1342:'常州市',1350:'无锡市',1359:'苏州市'},
		'0,100,1371':{1372:'杭州市',1387:'湖州市',1396:'嘉兴市',1406:'舟山市',1413:'宁波市',1425:'绍兴市',1433:'衢州市',1442:'金华市',1453:'台州市',1465:'温州市',1483:'丽水市'},
		'0,100,1500':{1501:'合肥市',1512:'宿州市',1522:'淮北市',1528:'亳州市',1536:'阜阳市',1549:'蚌埠市',1560:'淮南市',1568:'滁州市',1581:'马鞍山市',1587:'芜湖市',1598:'铜陵市',1604:'安庆市',1623:'黄山市',1635:'六安市',1648:'巢湖市',1658:'池州市',1666:'宣城市'},
		'0,100,1679':{1680:'福州市',1699:'南平市',1713:'莆田市',1719:'三明市',1740:'泉州市',1758:'厦门市',1765:'漳州市',1785:'龙岩市',1798:'宁德市'},
		'0,100,1812':{1813:'南昌市',1827:'九江市',1849:'景德镇市',1855:'鹰潭市',1860:'新余市',1864:'萍乡市',1873:'赣州市',1907:'上饶市',1930:'抚州市',1952:'宜春市',1967:'吉安市'},
		'0,100,1992':{1993:'济南市',2006:'青岛市',2019:'聊城市',2029:'德州市',2047:'东营市',2056:'淄博市',2068:'潍坊市',2081:'烟台市',2095:'威海市',2100:'日照市',2107:'临沂市',2129:'枣庄市',2136:'济宁市',2154:'泰安市',2163:'莱芜市',2166:'滨州市',2179:'菏泽市'},
		'0,100,2197':{2198:'郑州市',2212:'开封市',2228:'三门峡市',2238:'洛阳市',2262:'焦作市',2277:'新乡市',2296:'鹤壁市',2304:'安阳市',2318:'濮阳市',2330:'商丘市',2346:'许昌市',2356:'漯河市',2364:'平顶山市',2379:'南阳市',2400:'信阳市',2417:'周口市',2436:'驻马店市',2455:'济源市'},
		'0,100,2456':{2457:'武汉市',2471:'十堰市',2485:'襄樊市',2498:'荆门市',2506:'孝感市',2517:'黄冈市',2535:'鄂州市',2539:'黄石市',2547:'咸宁市',2558:'荆州市',2570:'宜昌市',2589:'随州市',2598:'恩施州'},
		'0,100,2613':{2614:'长沙市',2628:'张家界市',2635:'常德市',2651:'益阳市',2661:'岳阳市',2675:'株洲市',2689:'湘潭市',2696:'衡阳市',2714:'郴州市',2734:'永州市',2755:'邵阳市',2776:'怀化市',2799:'娄底市',2807:'湘西州'},
		'0,100,2822':{2823:'广州市',2836:'深圳市',2843:'清远市',2857:'韶关市',2872:'河源市',2884:'梅州市',2899:'潮州市',2905:'汕头市',2914:'揭阳市',2923:'汕尾市',2930:'惠州市',2937:'东莞市',2938:'深圳市',2945:'珠海市',2949:'中山市',2950:'江门市',2958:'佛山市',2964:'肇庆市',2976:'云浮市',2985:'阳江市',2992:'茂名市',3000:'湛江市'},
		'0,100,3015':{3016:'南宁市',3029:'桂林市',3059:'柳州市',3076:'梧州市',3087:'贵港市',3094:'玉林市',3105:'钦州市',3112:'北海市',3118:'防城港市',3124:'崇左市',3137:'百色市',3161:'河池市',3182:'来宾市',3193:'贺州市'},
		'0,100,3201':{3202:'海口市',3207:'三亚市',3208:'省直辖行政单位'},
		'0,100,3235':{3236:'成都市',3261:'广元市',3273:'绵阳市',3289:'德阳市',3298:'南充市',3313:'广安市',3322:'遂宁市',3331:'内江市',3340:'乐山市',3358:'自贡市',3367:'泸州市',3379:'宜宾市',3399:'攀枝花市',3407:'巴中市',3415:'达州市',3428:'资阳市',3435:'眉山市',3447:'雅安市',3463:'阿坝州',3490:'甘孜州',3527:'凉山州'},
		'0,100,3561':{3562:'贵阳市',3576:'六盘水市',3583:'遵义市',3608:'安顺市',3620:'毕节地区',3636:'铜仁地区',3656:'黔东南州',3688:'黔南州',3711:'黔西南州'},
		'0,100,3728':{3729:'昆明市',3752:'曲靖市',3769:'玉溪市',3787:'保山市',3797:'昭通市',3819:'丽江市',3829:'思茅市',3849:'临沧市',3865:'德宏州',3874:'怒江州',3884:'迪庆州',3891:'大理州',3915:'楚雄州',3935:'红河州',3960:'文山州',3977:'西双版纳州'},
		'0,100,3983':{3984:'拉萨市',4000:'那曲地区',4021:'昌都地区',4044:'林芝地区',4059:'山南地区',4084:'日喀则地区',4120:'阿里地区'},
		'0,100,4136':{4137:'西安市',4155:'延安市',4181:'铜川市',4187:'渭南市',4207:'咸阳市',4232:'宝鸡市',4254:'汉中市',4276:'榆林市',4300:'安康市',4320:'商洛市'},
		'0,100,4334':{4335:'兰州市',4347:'嘉峪关市',4352:'白银市',4361:'天水市',4374:'武威市',4382:'酒泉市',4394:'张掖市',4406:'庆阳市',4422:'平凉市',4436:'定西市',4450:'陇南市',4467:'临夏州',4483:'甘南州'},
		'0,100,4499':{4500:'西宁市',4511:'海东地区',4524:'海北州',4533:'海南州',4544:'黄南州',4553:'果洛州',4566:'玉树州',4579:'海西州'},
		'0,100,4588':{4589:'银川市',4598:'石嘴山市',4603:'吴忠市',4610:'固原市',4620:'中卫市'},
		'0,100,4624':{4625:'乌鲁木齐市',4635:'克拉玛依市',4640:'自治区直辖县级行政单位',4645:'喀什地区',4669:'阿克苏地区',4687:'和田地区',4702:'吐鲁番地区',4708:'哈密地区',4714:'克孜勒苏柯州',4722:'博尔塔拉州',4728:'昌吉州',4742:'巴音郭楞州',4760:'伊犁州',4779:'塔城地区',4792:'阿勒泰地区'},
		'0,100,4802':{4803:'香港特别行政区'},
		'0,100,4822':{4823:'澳门特别行政区'},
		'0,100,4825':{4826:'台北',4827:'高雄',4828:'台中',4829:'花莲',4830:'基隆',4831:'嘉义',4832:'金门',4833:'连江',4834:'苗栗',4835:'南投',4836:'澎湖',4837:'屏东',4838:'台东',4839:'台南',4840:'桃园',4841:'新竹',4842:'宜兰',4843:'云林',4844:'彰化'}
	};
}