
/**
 * Hak na używanie klawisza <tab> 
 * podczas uzywania go na modal window focus mógł przeskoczyć na dolną warstwe
 * i tą metodą można było wykonywać akcje za pomocą klwaiatury
 *  
 * @param {Object} e
 * @param {Object} t
 */
Ext.getBody().on('keydown', function(e, t) {
  if (e.TAB == e.getKey()) {
    (function(){      
      var top_win = Ext.WindowMgr.getActive();      
      if (top_win) {
        if (!top_win.getEl().contains(document.activeElement)) {
          var found = false;
          var first_focus = top_win.findBy(function(cmp, win) {
            var ti = cmp.getEl().dom.tabIndex;            
            if('hidden' != cmp.getXType() && !cmp.hidden && ti >= 0 && !found) {
              found = true;
              return true;
            }            
            return false;
          });          
          if (first_focus.length > 0) {
            first_focus[0].focus(true);
          }
          else {
            top_win.focus();
          }
        }
      }    
    }).defer(1);
  }
}, this);


