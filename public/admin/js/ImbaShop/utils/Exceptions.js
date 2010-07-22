Ext.namespace('ImbaShop.utils.Exceptions');

/**
 * Klasa do wyswietlania logow wykorzystywana w catch-ach
 * 
 * @param {Object} e - element do wyswietlenia
 */
ImbaShop.utils.Exceptions = {
	
	
	/**
	 * Logowanie obiektu
	 * @param {Object} e
	 */
	log: function(e) {
		if(Ext.isGecko)
			console.log(e);
		else
			this.failure(e);
	}
	
	
	/**
	 * Funkcja zwracająca diva z informacją
	 * 
	 * @param {Object} t tytuł
	 * @param {Object} s treść
	 */
    ,createBox: function(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }	
	
	
	/**
	 * Funkcja tworząca wypływający element z informacją który po chwili znika.
	 * 
	 * @param {Object} title
	 * @param {Object} format
	 */
	,show: function(title, format){
		
		if (!this.msgCt) {
			this.msgCt = Ext.DomHelper.insertFirst(document.body, {
				id: 'msg-div'
			}, true);
		}
		
		this.msgCt.alignTo(document, 't-t');
		
		var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
		var m = Ext.DomHelper.append(this.msgCt, {
			html: this.createBox(title, s)
		}, true);
		
		m.slideIn('t').pause(1).ghost("t", {
			remove: true
		});
	}
	

	/**
	 * Funkcja sprawdzająca wynik zapytania, i odpowiednio wywołująca informacje o sukcesie bądź błędzie
	 * 
	 * @param {Object} infoObject
	 */
	,success: function(infoObject, displayResult){
		
		if (Ext.isDefined(infoObject.success) && infoObject.success == false) 
			this.failure(infoObject);
		else {
			if (!Ext.isDefined(infoObject.logged)){
				if (displayResult)
					this.show(i18n.INFO, (Ext.isDefined(infoObject.message) ? infoObject.message : i18n.SAVESUCCESS) );
				
				return true;
			}
			else 
				return infoObject.logged;			
		}
			
		return false;	
	}
	
	
	/**
	 * Funkcja wyświetlająca okno z infomacją o błędzie
	 * 
	 * @param {Object} errorObject
	 */
	,failure: function(errorObject){
		
		if (Ext.isObject(errorObject) && Ext.isDefined(errorObject.logged) && errorObject.logged == false){			
			new ImbaShop.Login({redirect: false});	
		}
		else if (Ext.isObject(errorObject) && Ext.isDefined(errorObject.success) && errorObject.success == false) {
			
			if (Ext.isDefined(errorObject) && Ext.isDefined(errorObject.message)){
				msg = errorObject.message;
			}
			else if(Ext.isString(errorObject)){
				msg = errorObject;
			}
			else {
				msg = i18n.CONNECTION_ERROR; 	
			}
			
			Ext.Msg.show({
			   	title: i18n.ERROR
			   	,msg: msg 
			   	,buttons: Ext.Msg.OK
			   	,icon: Ext.MessageBox.ERROR
			});
		}
	}
	
}
