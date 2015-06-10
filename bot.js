//sIZJUqi7TZun8E_lxxnrJA

var sDrip = false;
var toFarm = '#pu11';

var clickBotI = null;
var buyBotI = null;
var dripBotI = null;



//init
$('.schniptest').remove();
$(function(){
	var child = $('#powerupstore').children();
	for(var i = 0; i < child.length; i++) {

		var pos = $(child[i]).position();
		var puId = $(child[i]).prop('id')
		$('#powerupstore').append('<div class="schniptest col-sm-3" style="float: right;position: absolute;top: '+(pos.top+25)+'px;right: 65px;"><input class="pu-upgrader form-control" data-pu="'+puId+'" type="NUMBER" min="-1" max="1000" step="1" value="0" size="0" ></div>');
	}
	var append = '                <div id="dripBotTAH" style="text-align:left;">                	<div>                		<h5>Click bot:</h5>						<div class="form-inline">							<button id="startBot" class="btn btn-primary">Start</button>							<label class="checkbox-inline">								<input type="checkbox" id="showAnimation" value=""> show animation							</label>						</div>						<div>							<label>memory/sec: <label id="memoryPerSec">843 MB</label></label>						</div>						<div>							<label>memory/min: <label id="memoryPerMin">843 MB</label></label>						</div>						<div>							<label>memory/hr: <label id="memoryPerHr">843 MB</label></label>						</div>                	</div>                	<div class="form-inline">                		<div class="form-group">							<label class="checkbox-inline">								<input  class="" type="checkbox" id="autoDrip" value=""> auto drip							</label>							<input type="text" id="autoDripValue" class="form-control" placeholder="drip after x seconds...">						</div>                	</div>                </div>';
	$('#middleColumn').append(append);
	updateBPS();
});

/*var set = setInterval(function(){
	$('#btn-addMem').trigger('click');
},50);*/



function dripBot(){
  if(sDrip){
	AnonymousUserManager.canDrip() && (game.dpChCnt++, game.dpChCnt >= 20 || dripper.dripGlobal(!1))
  }
}

function clickBot() {
	var t = CoffeeCup.calcBytesPerClick();
    localStats.byteCount + t > localStats.memoryCapacity && (t = localStats.memoryCapacity - localStats.byteCount), localStats.byteCount += t
}

/*function buyBot() {
	var children = $('#powerupstore').find('.storeItem');
	//for(var i = children.length; i >= 0; i--){
		var child = $(toFarm);
		var childId = $(child).prop('id');

		var amountToBuy = $('#powerupstore').find('input[data-pu='+childId+']');
		var oldAmount = $('#'+childId).find('.storeItemAmount').html();
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
}*/

function buyBot(){
	var upgrades = {};
	var upgradesInput = $('#powerupstore').find('.schniptest input');
	var hasNormalBuy = false;
	
	for(var i = upgradesInput.length; i >= 0; i--){
		if($(upgradesInput[i]).length && $(upgradesInput[i]).val() != 0) {
			upgrades[$(upgradesInput[i]).data('pu')] = $(upgradesInput[i]).val());
			hasNormalBuy = $(upgradesInput[i]).val() != -1;
		}
	}
	
	for(var key : upgrades) {
		if(hasNormalBuy && upgrades[key] == -1) {
			continue;
		}
	
		if(compareBytes(price, max)) {
			sDrip = true;
			break;
		} else {
			sDrip = false;
		}
		
		if(!increase(child, amountToBuy, oldAmount)) {
			break;
		} else {
			updateBPS();
		}
		
	}
	
	/*var children = $('#powerupstore').find('.storeItem');
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
			} else {
				updateBPS();
			}
		}
	}*/
}

function updateBPS() {
	var bps = (Math.floor(localStats.bps/1024/1024*10000) / 10000) + (Math.floor(CoffeeCup.calcBytesPerClick()*20/1024/1024 * 10000) / 10000);
	
	$('#memoryPerSec').html(bps + " MB");
	$('#memoryPerMin').html((bps*60) + " MB");
	$('#memoryPerHr').html((bps*60*60) + " MB");
}



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


var checkError = setInterval(function(){
	if($('#networkError').is(':visible')) {
		location.reload();
	}
},60000);

clickBotI = setInterval(clickBot,50);
buyBotI = setInterval(buyBot,10000);
dripBotI = setInterval(dripBot,10000);

