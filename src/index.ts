// On veut récupère tous les épisodes

function Stepper() {
	this.episodes  = ['4', '5', '6'];
	this.sliders = [];
	this.current = 0;
	this.transitionEndEventName = this.getTransitionEndEventName();

	this.init();
}

Stepper.prototype.init = function () {
	var self = this;
	self.episodes.forEach(function(item, value) {
		self.sliders[value] = document.querySelectorAll('[data-episode*="'+item+'"]');
	});

	self.arrowLeft = document.querySelector(".arrow.left");
	self.arrowRight = document.querySelector(".arrow.right");

	self.arrowLeft.addEventListener('click', function() {
		if (this.classList.contains('disable')) return false;
		self.step(this, -1);
	});

	self.arrowRight.addEventListener('click', function() {
		if (this.classList.contains('disable')) return false;
		self.step(this, 1);
	});
}

Stepper.prototype.step = function(arrow, inc) {
	let self = this;

	this.next = this.current + inc;

	if (this.next == 0) {
		this.arrowLeft.classList.add('disable');
	}

	if (this.next == this.episodes.length - 2) {
		this.arrowRight.classList.remove('disable');
	}
	
	if (this.next > 0) {
		this.arrowLeft.classList.remove('disable');
	}

	if (this.next == this.episodes.length - 1) {
		this.arrowRight.classList.add('disable');
	}

	this.sliders[this.current].forEach(function(item) {		
		if (item.tagName == 'IMG') {
			if (inc > 0) {
				item.classList.replace("active", "toLeft");
			}
			else {
				item.classList.replace("active", "toRight");
			}
		}
		else if (item.tagName == "LI") {
			if (inc < 0) {
				item.classList.remove("active");
			}
		}
		else {
			if (item.dataset.episode.indexOf(self.episodes[self.next]) == -1) {
				item.classList.replace("active", "leave");
				item.addEventListener(self.transitionEndEventName, function()  {
					item.classList.remove("leave");
				});
			}
		}
	});

	this.sliders[this.next].forEach(function(item) {
		if (item.dataset.episode.indexOf(self.episodes[self.current]) == -1) {
			item.classList.add("active");
		}
			
		if (item.tagName == 'IMG') {
			item.classList.remove("toLeft", "toRight");
		}
	});

	this.current = this.next;
};

Stepper.prototype.getTransitionEndEventName = function() {
  var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
   }
  let bodyStyle = document.body.style;
  for(let transition in transitions) {
      if(bodyStyle[transition] != undefined) {
          return transitions[transition];
      } 
  }
};

new Stepper();