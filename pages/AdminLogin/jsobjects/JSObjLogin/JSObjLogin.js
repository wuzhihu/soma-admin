export default {
	myVar1: [],
	myVar2: {},
	myFun1 () {
		//	write code here
		//	this.myVar1 = [1,2,3]

		return 0;
	},
	async userlogin () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
		let user_name = "";
		let user_pwd = "";
		let user_infos = null;

		if (Input_user.text.trim() === ""){
			showAlert("请输入登录用户账号");
			return 0;			
		}else{
			user_name = Input_user.text.trim();
		}

		if (Input_pwd.text.trim() === ""){
			showAlert("请输入登录用户密码");
			return 0;		
		}else{
			user_pwd = Input_pwd.text.trim();
		}


		showAlert("用户："+user_name+"\n密码："+user_pwd);
		//showAlert(JSON.stringify({tel:user_name, passwd:user_pwd}));
		//const login_rep = api_getUserlogin.run({tel:{user_name}, passwd:{user_pwd}});

		const login_rep = api_getUserlogin.run({tel: user_name, passwd: user_pwd});
		login_rep.then(response => {
			console.log(response);
			if (response.code !== 0) {
				showAlert(JSON.stringify(response.data.tips? response.data.tips:(response.data? response.data:response.tips)),'error');
				//throw new Error('Network response was not ok');
			}else{
				//console.log(response.data);
				storeValue("HTTP_USER_TOKEN", response.data.HTTP_USER_TOKEN).then(() => {
					//showAlert("HTTP_USER_TOKEN已保存为全局变量", "success");
				});

				if ('list' in response.data){
					user_infos = response.data.list;
					//showAlert('list in :'+JSON.stringify(user_infos));
				}else{
					user_infos = [response.data];
					//showAlert('list not in :'+JSON.stringify(user_infos));
				}
				//showAlert(JSON.stringify(user_infos));
				storeValue("user_infos", user_infos).then(() => {
					//showAlert("user_infos已保存为全局变量", "success");
				});
				//return response.data; // 解析JSON数据		
				navigateTo("AdminHome");
			}
		}).catch(error => {
			showAlert('服务端接口未能正常返回('+JSON.stringify(error), error);
			//console.error('There was a problem with the fetch operation:', error);
		});
		return 1;
	},
	async show_value () {
		showAlert(JSON.stringify(appsmith.store.HTTP_USER_TOKEN));
	}
}