//sIZJUqi7TZun8E_lxxnrJA

var sDrip = false;
var toFarm = '#pu11';


//init
/*$('.schniptest').remove();
$(function(){
	var child = $('#powerupstore').children();
	for(var i = 0; i < child.length; i++) {

		var pos = $(child[i]).position();
		var puId = $(child[i]).prop('id')
		$('#powerupstore').append('<input class="schniptest" data-pu="'+puId+'" type="NUMBER" min="-1" max="1000" step="1" value="0" size="0" style="float: right;position: absolute;top: '+pos.top+'px;left: -39px;">');
	}

});*/

var set = setInterval(function(){
	$('#btn-addMem').trigger('click');
},50);

var drip = setInterval(function(){
  if(sDrip){
	$('#btn-addGlobalMem').trigger('click');
  }
},10000);

var checkError = setInterval(function(){
	if($('#networkError').is(':visible')) {
		location.reload();
	}
},60000);


clearInterval(buy);
/*var buy = setInterval(function(){
	var children = $('#powerupstore').find('.storeItem');
	for(var i = children.length; i >= 0; i--){
		var child = $(children[i]);
		var childId = $(child).prop('id');

		var amountToBuy = $('#powerupstore').find('input[data-pu='+childId+']');
		var oldAmount = $('#'+childId).find('.storeItemAmount').html();
		var price = $('#'+childId).find('.storePrice').text();
		var max = $('#memoryLimit').find('.amount').text();
		

		if($(amountToBuy).val() > 0 || $(amountToBuy).val() == -1) {
			if(compareBytes(price, max)) {
				sDrip = true;
				break;
			} else {
				sDrip = false;
			}
			if(!increase(child, amountToBuy, oldAmount)) {
				break;
			}
		}
	}
},10000);*/

var buy = setInterval(function(){
	var children = $('#powerupstore').find('.storeItem');
	//for(var i = children.length; i >= 0; i--){
		var child = $(toFarm);
		var childId = $(child).prop('id');

		/*var amountToBuy = $('#powerupstore').find('input[data-pu='+childId+']');
		var oldAmount = $('#'+childId).find('.storeItemAmount').html();*/
		var price = $('#'+childId).find('.storePrice').text();
		var max = $('#memoryLimit').find('.amount').text();
		

		//if($(amountToBuy).val() > 0 || $(amountToBuy).val() == -1) {
			if(compareBytes(price, max)) {
				sDrip = true;
				//break;
			} else {
				sDrip = false;
			}
			$(child).trigger('click');
			//if(!increase(child, amountToBuy, oldAmount)) {
			//	break;
			//}
		//}
	//}
},10000);

function increase(child, amountToBuy, oldAmount) {
	$(child).trigger('click');
	var newAmount = $(child).find('.storeItemAmount').html();
	
	if(newAmount > oldAmount) {
		if($(amountToBuy).val() != -1) {
			$(amountToBuy).val($(amountToBuy).val()-1);
		}
		return true;
	}
	return false;
}



function compareBytes(first, second) {
	if(first.match(/[0-9]+\.?[0-9]* bytes/) != null) {
		first = first.replace(" bytes", "");
		first = first/1024/1024/1024/1024;
	} else if(first.match(/[0-9]+\.?[0-9]* kB/) != null) {
		first = first.replace(" kB", "");
		first = first/1024/1024/1024;
	} else if(first.match(/[0-9]+\.?[0-9]* MB/) != null) {
		first = first.replace(" MB", "");
		first = first/1024/1024;
	} else if(first.match(/[0-9]+\.?[0-9]* GB/) != null) {
		first = first.replace(" GB", "");	
		first = first/1024;
	} else if(first.match(/[0-9]+\.?[0-9]* TB/) != null) {
		first = first.replace(" TB", "");	
		first = first;
	}
	
	
	if(second.match(/[0-9]+\.?[0-9]* bytes/) != null) {
		second = second.replace(" bytes", "");
		second = second/1024/1024/1024/1024;
	} else if(second.match(/[0-9]+\.?[0-9]* kB/) != null) {
		second = second.replace(" kB", "");
		second = second/1024/1024/1024;
	} else if(second.match(/[0-9]+\.?[0-9]* MB/) != null) {
		second = second.replace(" MB", "");
		second = second/1024/1024;
	} else if(second.match(/[0-9]+\.?[0-9]* GB/) != null) {
		second = second.replace(" GB", "");	
		second = second/1024;
	} else if(second.match(/[0-9]+\.?[0-9]* TB/) != null) {
		second = second.replace(" TB", "");	
		second = second;
	}
	
	//console.log(first + " " + second);
	//console.log(parseFloat(first) > parseFloat(second));

	return parseFloat(first) > parseFloat(second);
}