

ImbaShop.utils.VTypesRegExp = {
	time: /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i
	,phone: /^\+?(\(\d+\))?[\d\s-]+$/
	,name: /^[\D]*$/i
	,date: /^\d{4}-\d{2}-\d{2}$/i
	,num: /^\d*$/
	,nip: /^(\d{10})|(\d{3}-\d{2}-\d{2}-\d{3})$/
}

ImbaShop.utils.VTypes = {
	
	time: {
		time: function(val, field){
			return ImbaShop.utils.VTypesRegExp.time.test(val);
		},
		timeText: 'Nieprawidłowy format daty. Prawidłowy format: "12:34 PM".',
		timeMask: /[\d\s:amp]/i
	}
	
	,phone: {
		phone: function(val, field){
			return ImbaShop.utils.VTypesRegExp.phone.test(val);
		},
		phoneText: 'Nieprawidłowy format numeru telefonu.',
		phoneMask: /[\d\s\\(\)+-]/
	}
	
	,name: {
		name: function(val, field){
			return ImbaShop.utils.VTypesRegExp.name.test(val);
		},
		nameText: 'Niedozwolone znaki.',
		nameMask: /[\D]/i
	}
	
	,date: {
		date: function(val, field){
			return ImbaShop.utils.VTypesRegExp.date.test(val);
		},
		dateText: 'Nieprawidłowy format daty. Poprawna data: YYYY-MM-DD.',
		dateMask: /[\d]/
	}
	
	,num: {
		num: function(val, field){
			return ImbaShop.utils.VTypesRegExp.num.test(val);
		},
		numText: 'Nieprawidłowy format liczby.',
		numMask: /[\d]/
	}
	
	,nip: { //TODO to jest niedokończone
		nip: function(val, field){
			return ImbaShop.utils.VTypesRegExp.nip.test(val);
		},
		nipText: 'Nieprawidłowy format NIP.',
		nipMask: /[\d\s:amp]/i
	}
		
	,iban : {
		iban : function (val){

			var temp = val.replace(/ /g,'').toUpperCase(); 
			var sequence = '';
			var mod = 0;
			var substitutes = {
				'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
				'A':'10','B':'11','C':'12','D':'13','E':'14','F':'15','G':'16','H':'17','I':'18',
				'J':'19','K':'20','L':'21','M':'22','N':'23','O':'24','P':'25','Q':'26','R':'27',
				'S':'28','T':'29','U':'30','V':'31','W':'32','X':'33','Y':'34','Z':'35'
			};
						
			if (temp[0] <= 9 && temp[1] <= 9){
				temp = 'PL' + temp;
			}
			temp = temp.substr(4) + temp.substr(0,4);

			for (var i = 0; i < temp.length; i++){
				sequence += substitutes[temp[i]];
			}				
			
			for (var i = 0; i < sequence.length; i = i + 6) {
				mod = (mod + sequence.substr(i,6)) % 97;
			}
			
			return (mod == 1) ? true : false;			
		},	
		ibanText: 'Podany numer nie jest prawidłowym numerem konta bankowego'
	}	
	
}


for (var item in ImbaShop.utils.VTypes) {
	Ext.apply(Ext.form.VTypes, ImbaShop.utils.VTypes[item]);
}


