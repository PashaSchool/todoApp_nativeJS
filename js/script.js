(function(){
	// get all inputs
	var btn = document.getElementById('submit'),
		inputName = document.getElementById('inputName'),
		inputSurname = document.getElementById('inputSurname'),
		container = document.getElementById('container');
	// add event listener for input
	btn.addEventListener( 'click', handlerClick, false );
	btn.addEventListener( 'keydown', handleKeydown, false );
	// if localStor. have some data - show it
	render();

	function handlerClick() {
		validInput();
	}
	// use Enter key to submit data
	function handleKeydown(event) {
		var code = event.which || event.keyCode; 
		if( code === 13 )  {
			validInput();
		}
	}	
	// Check input field
	function validInput() {
		if( !inputName.value.length || !inputSurname.value.length ) {
			console.log('The field is empty')
		}else{
			storeValue();
		}
	}

	function storeValue() {
		var obj = {},
			textBlock = [],
			jsn;

		obj.name = inputName.value;
		obj.surname = inputSurname.value;
		_reset( inputName, inputSurname );
		
		if ( localStorage.getItem('data') != null ) {
			var ownLocalData = JSON.parse( localStorage.getItem('data') );
			textBlock.push(obj);
			textBlock = textBlock.concat(ownLocalData);
			jsn = JSON.stringify( textBlock );
			localStorage.setItem( 'data', jsn );
			render();
			// createStorage(textBlock, obj);
		}else {
			textBlock.push(obj);
			jsn = JSON.stringify( textBlock );
			localStorage.setItem( 'data', jsn );
			render();
		}
	}

	// show all data in document
	function render() {
		var parse = JSON.parse(localStorage.getItem('data'));
		if(!parse) return;
		container.innerHTML = "";
		parse.forEach(function(item, i){
			var div = document.createElement('div');
			div.classList.add('wrapper');
			div.innerHTML = "<h3>"+ item.name +"</h3>";
			div.innerHTML += "<h4>" + item.surname + "</h4>";
			container.appendChild(div);
		})
	}
	// privat method reset input field
	function _reset() {
		var slice = Array.prototype.slice,
			arg = slice.apply( arguments ),
			i = 0,
			max = arg.length;

		for(; i < max; i+=1) {
			arg[i].value = "";
		}
	}

})();