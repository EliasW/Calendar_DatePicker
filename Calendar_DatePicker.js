define( ["qlik",  "jquery", "css!./style.css"],
function (qlik) {
	return {
		initialProperties : {
			version : 1.0,
			variableValue1 : "From (DD/MM/YYYY)   ",
			variableFrom : "",
			variableValue2 : "To   (DD/MM/YYYY)   ",
			variableTo : "",
		},
	  
		definition : {
			type : "items",
			component : "accordion",
			items : {
				settings : {
					uses : "settings",
				  	items : {
						variable : {
							type : "items",
							label : "Variable",
							
							items : {
								Variable1 : {
									ref : "variableFrom",
									label : "VariableFrom",
									type : "string",
									change : function(data) {
										qlik.currApp().variable.create(data.variableFrom);
										data.variableValue1.qStringExpression = '=' + data.variableFrom;
									}
								},
								Variable2 : {
									ref : "variableTo",
									label : "VariableTo",
									type : "string", 
									change : function(data) {
										qlik.currApp().variable.create(data.variableTo);										
										data.variableValue2.qStringExpression = '=' + data.variableTo;
									}
								}

							}

						}
					}
				}
			}
		},
	  
		paint : function($element, layout) {
			var html = "", t = this;
			var availabeButton = document			
			
			html += '<input type="button"  class="CalendarButton datepick" id="datepicker1" value="' +  layout.variableValue1 + '" >';
			html += '<input type="button"  class="CalendarButton datepick" id="datepicker2" value="' +  layout.variableValue2 + '" >';

			$element.html(html);

			$element.find('select, input').on('change', function(event) {
				event.preventDefault();
				var valFrom = document.getElementById('datepicker1').value;
				qlik.currApp(t).variable.setContent(layout.variableFrom, valFrom);
				layout.variableValue1 = valFrom;			
				})
						
			$element.find('select, input').on('change', function(event) {
				event.preventDefault();
				var valTo = document.getElementById('datepicker2').value;
				var valFrom = document.getElementById('datepicker1').value;
				
			//	if(valTo >= valFrom){				
				  qlik.currApp(t).variable.setContent(layout.variableTo, valTo);
				  layout.variableValue2 = valTo;	
			/*	}
				else
				{
				  var errTo = "dateError"
				  qlik.currApp(t).variable.setContent(layout.variableTo, errTo);
				  document.getElementById('datepicker2').value = errTo;
				}
				*/
			})
		
			$('.datepick').each(function(){
   			 $(this).datepicker({
  					dateFormat: "dd/mm/yyyy"
				});
			
			});	
  
		}
	};
});
