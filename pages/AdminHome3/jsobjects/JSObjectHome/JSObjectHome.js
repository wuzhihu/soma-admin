export default {
	myVar1: [],
	myVar2: {},
	async menuClick(idx) {
		let menus = [ButtonIndex, ButtonZhgl, ButtonKhgl, ButtonCpgl, ButtonDdgl, ButtonXtgl];
		for (let i = 0; i < menus.length; i++) {
			if (i != idx) {
				menus[i].setColor('#576d7b');
			} else {
				menus[i].setColor('#4195e6');
			}
		}
		return 1;
	}
}