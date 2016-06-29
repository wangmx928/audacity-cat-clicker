var model = {
	currentCat : null,
	cats : [{
		name : 'Amy',
		clickCount : 0,
		imgSrc : 'images/1.jpg',
		imgAttr : 'cat1'
	},{
		name : 'Bob',
		clickCount : 0,
		imgSrc : 'images/2.jpg',
		imgAttr : 'cat2'
	},{
		name : 'Catline',
		clickCount : 0,
		imgSrc : 'images/3.jpg',
		imgAttr : 'cat3'
	},{
		name : 'David',
		clickCount : 0,
		imgSrc : 'images/4.jpg',
		imgAttr : 'cat4'
	},{
		name : 'Ele',
		clickCount : 0,
		imgSrc : 'images/5.jpg',
		imgAttr : 'cat5'
	}]
};

var octupus = {
	init : function(){
		model.currentCat = model.cats[0];
		catView.init();
		catListView.init();
		adminView.init();
	},
	getCats : function(){
		return model.cats;
	},
	incrementCounter : function(){
		model.currentCat.clickCount++;
		catView.render();
	},
	setCurrentCat: function(cat){
		model.currentCat = cat;
	},
	getCurrentCat : function(){
		return model.currentCat;
	}
};

var catView = {
	init : function(){
		// store DOM pointers
		this.cat = document.getElementById('catBlocks');
		this.name = document.getElementById('catName');
		this.count = document.getElementById('catCount');
		this.img = document.getElementById('catImg');

		this.img.addEventListener('click', function(){
			octupus.incrementCounter();
		}, false);

		this.render();
	},

	render : function(){
		var currentCat = octupus.getCurrentCat();
		this.name.textContent = currentCat.name;
		this.count.textContent = currentCat.clickCount;
		this.img.src = currentCat.imgSrc;
		this.img.alt = currentCat.imgAttr;
	}
};

var catListView = {
	init : function(){
		this.catListElem = document.getElementById('catUL');
		this.render();
	},
	render : function(){
		var cats = octupus.getCats();
		var elem, cat;
		var num = cats.length;
		this.catListElem.innerHTML = '';
		for(var i = 0; i < num; i++){
			cat = cats[i];
			elem = document.createElement('li');
			elem.style = "list-style: none;"
			elem.textContent = cat.name;

			elem.addEventListener('click', (function(catCopy){
				return function(){
					octupus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));
			this.catListElem.appendChild(elem);
		}
	}
};

var adminView = {
	init : function(){
		this.form = document.getElementById('adminForm');
		this.name = document.getElementById('formName');
		this.url = document.getElementById('formUrl');
		this.clicks = document.getElementById('formClicks');
		this.form.style.display = 'none';
	},
	toggleForm : function(){
		this.render();
		if(this.form.style.display === 'none'){
			this.form.style.display = 'flex';
		}
		else{
			this.form.style.display = 'none';
		}
	},
	render : function(){
		var cat = octupus.getCurrentCat();
		this.name.value = cat.name;
		this.url.value = cat.imgSrc;
		this.clicks.value = cat.clickCount;
	},
	update : function(){
		var cat = octupus.getCurrentCat();
		cat.name = this.name.value;
		cat.imgSrc = this.url.value;
		cat.clickCount = this.clicks.value;
		this.toggleForm();
	}
};

octupus.init();