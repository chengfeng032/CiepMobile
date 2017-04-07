

var Opt = Opt || {};


/*国家下拉选择项*/
Opt.country= {   
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
};

/*单位性质*/
Opt.unitProperty = ['外资（欧美）', '外资（非欧美）', '合资','国企','民营公司','上市公司','创业公司','外企代表处','政府机关','事业单位','非盈利机构'];

/*单位规模*/
Opt.unitSize = ['少于50人','50~150人','150~500人','500~1000人','1000~5000人','5000~10000人','10000人以上'];

/*学历学位*/
Opt.educationDegree = ['初中及以下','高中','中技','中专','大专','本科','硕士','MBA','博士'];

/*所学专业*/
Opt.learnMajor = ['哲学','经济学','管理学','文学','工学','法学','历史学','理学','教育学','医学','农学'];

/*行业领域*/
Opt.industryAreas = ['农、林、牧、渔业','采矿业','制造业','电力、热力、燃气及水生产和供应业','建筑业','批发和零售业','交通运输、仓储和邮政业','住宿和餐饮业','信息传输、软件和信息技术服务业','金融业','房地产业','租赁和商务服务业','科学研究和技术服务业','水利、环境和公共设施管理业','居民服务、修理和其他服务业','教育','卫生和社会工作','文化、体育和娱乐业','公共管理、社会保障和社会组织','国际组织','政府、非盈利机构','其他'];

/*工作经验*/
Opt.workExperience = ['应届毕业生','3年及以下','3~5年','5~10年','10年以上','不要求'];

/*工作性质*/
Opt.workProperty = ['不限','全职','兼职','实习'];

/*项目类型*/
Opt.projectType = ['资金需求','技术需求','其他需求', '技术推介','成果推介','其他推介'];

/*来访目的*/
Opt.visitObj = ['寻找工作','寻找人才','寻找商机','项目对接','技术交流','其他'];

/*薪资区间*/
Opt.salaryRanges = ['不限','2k以下','2k~5k','5k~10k','10k~15k','15k~25k','25k~50k','50k以上'];

/*到岗时间*/
Opt.comeworkTime = ['一周内', '一周', '半个月', '一个月'];

/*城市*/
Opt.locationCity = ['北京','上海','广州','深圳', '南京', '东莞', '天津']

/*发布者角色*/
Opt.publisherRole = ['个人','单位'];

/*项目列表（需求）*/
Opt.projectNeed = ['资金需求','技术需求','其他需求'];

/*项目列表（推介）*/
Opt.projectRecommend = ['技术推介','成果推介','其他推介'];
