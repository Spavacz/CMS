/**
 * 
 */
 
ImbaShop.utils.Format = function(){
	
	return {
		
		/**
         * formatowanie liczby do polskiej waluty
         * @param {Number/String} wartosc
         * @return {String} sformatowana wartosc
         */
		
        plMoney : function(v){
			
			if (typeof(v) == 'string'){
				if (v.indexOf(',') != -1) {
					v = v.replace(',', '.');
				}
			}
			
            v = (Math.round((v-0)*100))/100;
            v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
            v = String(v);
            var ps = v.split('.');
            var whole = ps[0];
            var sub = ps[1] ? ','+ ps[1] : ',00';
            var r = /(\d+)(\d{3})/;
            while (r.test(whole)) {
                whole = whole.replace(r, '$1' + ' ' + '$2');
            }
            v = whole + sub;
            if(v.charAt(0) == '-'){
                return '-' + v.substr(1);
            }
            return v + ' zł';
        },
		
		
		/**
         * formatowanie liczby do polskiej waluty z "+"
         * @param {Number/String} wartosc
         * @return {String} sformatowana wartosc
         */
		
        plMoneyPlus : function(v){
         	var val = ImbaShop.utils.Format.plMoney(v);
			
			if (val != '0,00 zł'){
				return "+" + val;
			}
			else {
				return val;
			}
            
        },
		
		
		/**
         * formatowanie liczby do polskiej waluty z "-"
         * @param {Number/String} wartosc
         * @return {String} sformatowana wartosc
         */
		
        plMoneyMinus : function(v){
        	var val = ImbaShop.utils.Format.plMoney(v);
			if (val.substr(0,1) == '-' || val == '0,00 zł')
				return val;
			else
                return "-" + val;
        },
        
        percent: function(v){
        	return v + '%';
        }
		
		
		
		
				
	}
	
	
	
}()


Ext.apply(ImbaShop.utils.Format, Ext.util.Format);