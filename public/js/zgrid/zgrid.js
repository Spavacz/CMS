/*
 * zGrid - Tables Gone Wild
 */
(function($){
	/*
	 * dodaje grid do elementu t
	 * 
	 * @param t - element html table
	 * @param p - opcje
	 */
	$.addZGrid = function(t,p) {
		// sprawdzam czy grid nie jest juz zainicjowany dla obiektu
		if( t.grid ) return false;

		// domyslne opcje
		p = $.extend({
			url: false, // rest url
			autoload: true,
			paginator: false,
			checkboxes: false,
			controls: false,
			pageTag: 'page',
			sortTag: 'sort',
			orderTag: 'order',
			sort: 'id',
			order: 'asc',
			cols: [],
			onLoad: function(){}
		}, p);

		$(t).show(); //show if hidden

		// grid class
		var g = {
			// lista wierszy
			rows: [],
			// dodaje nowy wiersz do grida
			addRow:	function(data){
				var even = (g.rows.length % 2 == 0);
				
				var row = $('<tr'+ (!even ? ' class="alt" ' : '') + '></tr>');

				data.row = row;
				g.rows[g.rows.length] = data;
				
				// checkboxes
				if( p.checkboxes ) {
					row.append('<td><input type="checkbox"/></td>');
				}
				
				var col;
				for( var i in p.cols) {
					col = $('<td></td>');
					var colData = data.cols[p.cols[i].id];
					switch( p.cols[i].type )
					{
						case 'head':
							col.append('<h5>' + colData + '</h5>');
							break;
						case 'url':
							col.append('<a href="' + colData + '">' + colData + '</a>');
							break;
						case 'img':
							col.append('<img src="' + colData + '"/>');
							break;
						case 'string':
						default:
							col.append(colData);
					}
					row.append(col);
				}
				
				if( p.controls ) {
					col = $('<td></td>');
					for( var i in data.ctrl ) {
						var ctrlData = data.ctrl[i];
						//this.addControl(col,data.ctrl[i]);
						col.append('<a href="' + ctrlData.url + '" class="' + ctrlData.css + '" name="' + data.cols.id +
								'"><img alt="' + ctrlData.label + '" src="' + ctrlData.img + '"/></a>');
					}
					row.append(col);
				}
				
				/*td6.append('<a href="/cms/articles/edit/id/' + data.cols.id + '" original-title="Edit">' +
							'<img alt="Edit" src="admin/images/icons/edit.png"/></a>' + 
							'<a href="#delete" title="Delete" class="delete-btn" name="' + data.cols.id + '">' +
							'<img alt="Delete" src="admin/images/icons/delete.png"></a>');*/
				t.tbody.append(row);
			},
			deleteRow: function( id ) {
				for( var i in g.rows ) {
					if( g.rows[i].cols.id == id ) {
						break;
					}
				}
				g.rows[i].row.fadeOut('slow', function(){
					$(this).remove();
				});
				delete g.rows[i];
			},
			// wypelnia grida danymi
			populate: function( data ){
				t.tbody.empty();
				g.rows = [];
				for( var i in data ) {
					g.addRow(data[i]);
				}
			},
			// wczytuje dane z serwera
			loadData: function(){
				if( p.url ) { // tylko jesli ustawiony jest url	
					jQuery.getJSON( p.url + '?' + p.sortTag + '=' + p.sort + '&' + p.orderTag + '=' + p.order, 
							function(result, textData) {
								if(result.success) {
									g.populate( result.data );
									p.onLoad();
								}
					});
				}
			},
			sortMark: function(){
				for( var i in p.cols ) {
					if( p.cols[i].id == p.sort ) {
						var id = i;
					}
					if( p.cols[i].sortable ){
						p.cols[i].dom.attr('class', 'sortable');
					}
				}
				p.cols[id].dom.attr('class', 'sortable sort-'+p.order);
			}
		};
		
		// table header
		var thead = $('<thead></thead>');
		var row = $('<tr></tr>');
		
		if( p.checkboxes ) {
			row.append('<th><input type="checkbox" class="check-all"/></th>');
		}
		
		for( var i in p.cols ) {
			var col = $('<th></th>');
			if( p.cols[i].sortable )
			{
				col = $('<th class="sortable"></th>');
				var link = $('<a name="th-'+ i +'" href="#sort-by-' + p.cols[i].id + '">' + p.cols[i].label + '</a>');
				link.click( function(e){
					e.stopPropagation();
					var index = this.name.substr(3);
					p.sort = p.cols[index].id;
					if( p.order != 'asc' ) {
						p.order = 'asc';
					} else {
						p.order = 'desc';
					}
					g.sortMark();
					g.loadData();
					return false;
				});
				col.append(link);
			} 
			else {
				col.append(p.cols[i].label);
			}
			p.cols[i].dom = col;
			row.append(col);
		}
		thead.append(row);
		// table body
		var tbody = $('<tbody></tbody>');
		
		
		//make grid functions accessible
		t.thead = thead;
		t.tbody = tbody;
		t.p = p;
		t.grid = g;
		
		$(t).append(thead);
		$(t).append(tbody);
		
		// load data
		if (p.url && p.autoload) {
			g.loadData();
		}
		return t;
	};

	// document ready marker
	var docloaded = false;
	$(document).ready(function () {docloaded = true} );

	/*
	 * Dodaje funkcjonalnosc grida do elementu
	 * 
	 * p - opcje
	 */ 
	$.fn.zGrid = function(p) {
		return this.each( function() {
			if (!docloaded) {
				$(this).hide();
				var t = this;
				$(document).ready( function (){
					$.addZGrid(t,p);
				} );
			} else {
				$.addZGrid(this,p);
			}
		});
	};
	
	$.fn.zGridDeleteRow = function( id ) { //function to update general options
		return this.each( function() {
				//if (this.grid) $.extend(this.p,p);
				this.grid.deleteRow(id);
			});

	};
})(jQuery);