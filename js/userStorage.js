/**
 * @description 添加 获取删除   账户/密码/token/信息
 * 	添加user.username(data)
 * 	获取user.username()
 * 	删除user.username('')
 */
(function(window, userinfo){
	
	userinfo.username = function(){
		if(localStorage.getItem('account_key')){
			var acc =localStorage.getItem('account_key').split('|');
			return acc[0];
		}else{
			return null;
		}
	}
	userinfo.password = function(){
		if(localStorage.getItem('account_key')){
			var acc =localStorage.getItem('account_key').split('|');
			return acc[1];
		}else{
			return null;
		}
	}	
	/**
	* @description 判断是否登录
	*/
	userinfo.has_login = function(){
		var account = localStorage.getItem('account_key');
		var users = localStorage.getItem('user');
		if(account && users){
			return true;
		}else{
			return false;
		}
	}
	/**
	* @description 退出登录 清除登录信息
	*/
	userinfo.clear = function(){
		window.localStorage.removeItem('user');
		var account = localStorage.removeItem("account_key");
		var acc = account.split('|');
		acc.pop();
		var akey = acc.join('|');
		localStorage.setItem('account_key', akey);
	}
	/**
	* @description 设置账户信息，账户信息包含 用户名，密码，与当前token
	*/
	userinfo.settingAccount = function(data, username, password){
		window.localStorage.setItem('account_key', username + '|' + password + '|' + data.User_TokenStr)
	}
	
})(window,window.userInfo = window.userInfo || {})
