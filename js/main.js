// custome video controler by Conor bryne
console.log('custom video player ');
var VideoPlayer = function (el) {
	var self = this;

	this._video 		= el.querySelector('.js-video');
	this._playBtn 		= el.querySelector('.js-playback');
	this._muteBtn 		= el.querySelector('.js-mute');
	this._fullScreenBtn = el.querySelector('.js-fullscreen');
	this._seekBar 		= el.querySelector('.js-seek');
	this._volumeBar 	= el.querySelector('.js-volume');

    this.init = function() {

		self._playBtn.addEventListener("click", function() {
			if (self._video.paused === true) {
				self._video.play();
				self._playBtn.classList.add('is-playing');

			} else {
				self._video.pause();
				self._playBtn.classList.remove('is-playing');
			}
		});


		self._muteBtn.addEventListener("click", function() {

			if (self._video.muted === false) {
				self._video.muted = true;
				self._muteBtn.classList.add('icon--muted');
				self._volumeBar.value = '0';
			} else {
				self._video.muted = false;
				self._muteBtn.classList.remove('icon--muted');
				self._volumeBar.value = '1';
			}

		});

		self._fullScreenBtn.addEventListener("click", function() {
			if (self._video.requestFullscreen) {
				self._video.requestFullscreen();
			} else if (self._video.mozRequestFullScreen) {
				self._video.mozRequestFullScreen();
			} else if (self._video.webkitRequestFullscreen) {
				self._video.webkitRequestFullscreen();
			}
		});

		self._seekBar.addEventListener("change", function() {
			var time = self._video.duration * (self._seekBar.value / 100);
			self._video.currentTime = time;
		});

		self._video.addEventListener("timeupdate", function() {
			var value = (100 / self._video.duration) * self._video.currentTime;
			self._seekBar.value = value;
		});

		self._seekBar.addEventListener("mousedown", function() {
			self._video.pause();
		});

		self._seekBar.addEventListener("mouseup", function() {
			self._video.play();
		});

		self._volumeBar.addEventListener("change", function() {

			self._video.volume = self._volumeBar.value;

			if (self._volumeBar.value === '0') {
				self._video.muted = true;
				self._muteBtn.classList.add('icon--muted');
			} else {
				self._video.muted = false;
				self._muteBtn.classList.remove('icon--muted');
			}

		});

    };

};

var videoCrlId = document.getElementById("video-controls");

var vdo =  document.getElementById("video-container");

var mediaPlyCtrl = document.getElementById("video-controls__wrap");

var heroOverlay = document.getElementById('hero__overlay');

vdo.addEventListener('mouseover', function(){
	videoCrlId.classList.add('media-player__controls--active');
});


vdo.addEventListener('mouseout', function(){
	videoCrlId.classList.remove('media-player__controls--active');
});

video.addEventListener('play',function() {
        video.play();
    },false);

video.onclick = function() {
    if (video.paused) {
        video.play();
		mediaPlyCtrl.classList.add('is-playing');
    } else {
        video.pause();
		mediaPlyCtrl.classList.remove('is-playing');
    }

    return false;
};

heroOverlay.addEventListener('click', function(){
	var elem = document.getElementById("hero__overlay");
	elem.parentNode.removeChild(elem);
	video.play();
	mediaPlyCtrl.classList.add('is-playing');
});

document.addEventListener('DOMContentLoaded', function(e) {
	var video = document.querySelectorAll('.js-media-player')[0];
    var b = new VideoPlayer(video).init();
});
