function waitImageLoad() {
  'use strict';

  if (loadedImages == 10) {
	document.getElementsByClassName('videoWrapper')[0].remove();
    var section = document.createElement('section');
    section.className = 'game';
    document.body.append(section);
    var canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    section.append(canvas);
    var divInstruction = document.createElement('div');
    divInstruction.id = 'instruction';
    divInstruction.innerHTML = 'FIND ALL THE<br>HIDDEN OBJECTS!';
    section.append(divInstruction);
    var divItems = document.createElement('div');
    divItems.id = 'items';
    divItems.innerHTML = '<div><span>Mirror</span><span>Ballet Dancer</span><span>Parfume</span><span>Comb</span></div>';
    section.append(divItems);
    playGame();
  } else {
    setTimeout(waitImageLoad, 500);
  }
}


function playGame() {
  'use strict';

  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    bg = {
      proportion: 1920 / 1080,
      width: document.documentElement.clientWidth,
      height: 0,
      posX: 0,
      posY: 0,
      resize: function () {
        this.width = document.documentElement.clientWidth;
        this.height = 0;
        if (this.width / this.proportion > document.documentElement.clientHeight) {
          this.width = document.documentElement.clientWidth;
          this.height = this.width / this.proportion;
          this.posX = 0;
          this.posY = (document.documentElement.clientHeight - this.height) / 2;
        } else {
          this.height = document.documentElement.clientHeight;
          this.width = this.height * this.proportion;
          this.posX = (document.documentElement.clientWidth - this.width) / 2;
          this.posY = 0;
        }
      },
      paint: function () {
        ctx.drawImage(bgHoImg, this.posX, this.posY, this.width, this.height);
      },
    },
    tutorial = {
      proportion: 990 / 405,
      width: function () {
        return 17 * parseInt(getComputedStyle(document.documentElement).fontSize);
      },
      height: function () {
        return 17 / this.proportion * parseInt(getComputedStyle(document.documentElement).fontSize);
      },
      posX: function () {
        return document.documentElement.clientWidth / 100 * 50 - this.width() / 2;
      },
      posY: function () {
        return parseInt(getComputedStyle(document.documentElement).fontSize) / 2;
      },
      paint: function () {
        ctx.drawImage(tutorialImg, this.posX(), this.posY(), this.width(), this.height());
        instruction.style.width = this.width() + 'px';
        instruction.style.height = this.height() + 'px';
        instruction.style.left = this.posX() + 'px';
        instruction.style.top = this.posY() + 'px';
      },
    },
    hoGui = {
      proportion: 2716 / 272,
      width: function () {
        if (document.documentElement.clientWidth < 991) {
          return document.documentElement.clientWidth;
        } else {
          return 56 * parseInt(getComputedStyle(document.documentElement).fontSize);
        }
      },
      height: function () {
          return this.width() / this.proportion;
      },
      posX: function () {
        return document.documentElement.clientWidth / 100 * 50 - this.width() / 2;
      },
      posY: function () {
        return document.documentElement.clientHeight - this.height();
      },
      paint: function () {
        ctx.drawImage(hoGuiImg, this.posX(), this.posY(), this.width(), this.height());
        items.style.width = this.width() + 'px';
        items.style.height = this.height() + 'px';
        items.style.left = this.posX() + 'px';
        items.style.top = this.posY() + 'px';
      },
    },
    itemsToClick = [],
    mirror = null,
    ballet = null,
    parfume = null,
    comb = null,
    timerId = 0,
    beatId = 0,
	findId = 0,
    gameId = 0;






  bg.resize();

  mirror = new Item('Mirror', mirrorImg, 28 / 18.5, 85, 36, 49);
  mirror.resize();
  mirror.createWrapper();
  itemsToClick.push(mirror);

  ballet = new Item('Ballet Dancer', balletImg, 485 / 295, 100, 41, 72);
  ballet.resize();
  ballet.createWrapper();
  itemsToClick.push(ballet);

  parfume = new Item('Parfume', parfumeImg, 768 / 608, 100, 50, 57.5);
  parfume.resize();
  parfume.createWrapper();
  itemsToClick.push(parfume);

  comb = new Item('Comb', combImg, 309 / 304, 60, 49.5, 44);
  comb.resize();
  comb.createWrapper();
  itemsToClick.push(comb);

  window.onresize = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    bg.width = document.documentElement.clientWidth;
    bg.height = 0;
    bg.resize();
    for (var i = 0; i < itemsToClick.length; i++) {
      itemsToClick[i].resize();
    }
  };

  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;

  gameId = setInterval(paintGame, 80);
  timerId = setTimeout(function () {
	clearInterval(beatId);
    if (itemsToClick[0]) {
      beatId = setInterval(function () {
        itemsToClick[0].beat();
      }, 100);
    }
  }, 5000);









  function Item(name, img, proportion, width, procentX, procentY) {
    var that = this;
    this.name = name;
    this.img = img;
    this.proportion = proportion;
    this.width = 0;
    this.height = 0;
    this.posX = 0;
    this.posY = 0;
    this.coefX = -1;
    this.i = 0;
    this.itemWrapper = document.createElement('div');
    this.paint = function () {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
    this.resize = function () {
      var itemsProportionX = 1920 / bg.width;

      this.width = width / itemsProportionX;
      this.height = this.width * this.proportion;
      this.posX = bg.width / 100 * procentX + bg.posX;
      this.posY = bg.height / 100 * procentY + bg.posY - this.height;

      this.itemWrapper.style.width = this.width + 'px';
      this.itemWrapper.style.height = this.height + 'px';
      this.itemWrapper.style.position = 'absolute';
      this.itemWrapper.style.left = this.posX + 'px';
      this.itemWrapper.style.top = this.posY + 'px';
      this.itemWrapper.style.cursor = 'pointer';
    }
    this.beat = function () {
      var el = null,
        elements = document.getElementById('items').getElementsByTagName('span');

      for (var i = 0; i < elements.length; i++) {
        if (elements[i].style.textDecoration != 'line-through') {
          el = elements[i];
          break;
        }
      }

      if (this.i != 0 && this.i % 10 == 0) {
        if (getComputedStyle(el).color == 'rgb(79, 1, 1)') {
          el.style.color = 'rgb(255, 255, 255)';
        } else {
          el.style.color = 'rgb(79, 1, 1)';
        }
      }

      this.width += this.coefX;
      this.height = this.width * this.proportion;
      this.posY = bg.height / 100 * procentY + bg.posY - this.height;
      if (this.i++ == 10) {
        this.coefX = -this.coefX;
        this.i = 0;
      }
    }
    this.createWrapper = function () {
      var section = document.getElementsByClassName('game')[0];
      section.append(this.itemWrapper);

      this.itemWrapper.onclick = function () {
		var elements = document.getElementById('items').getElementsByTagName('span');
		
        clearTimeout(timerId);
        clearInterval(beatId);
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.color = 'rgb(79, 1, 1)';
        }
        findId = setInterval(function () {
          that.width -= 2;
          that.height = that.width * that.proportion;
          that.posY -= 10;
        }, 30);
        setTimeout(function () {
          clearInterval(findId);
          var el = null,
            elements = document.getElementById('items').getElementsByTagName('span');

          for (var i = 0; i < itemsToClick.length; i++) {
            if (itemsToClick[i] === that) {
              for (var j = 0; j < elements.length; j++) {
                if (elements[j].innerHTML == itemsToClick[i].name) {
                  el = elements[j];
                  break;
                }
              }
              itemsToClick.splice(i, 1);
              el.style.color = 'rgb(79, 1, 1)';
              el.style.textDecoration = 'line-through';
              break;
            }
          }
          that.itemWrapper.remove();
          if (itemsToClick[0]) {
            timerId = setTimeout(function () {
              beatId = setInterval(function () {
                itemsToClick[0].beat();
              }, 100);
            }, 5000);
          } else {
            clearInterval(timerId);
            clearInterval(beatId);
            finishGame();
          }
        }, 1000)
      }
    }
  }

  function paintGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bg.paint();
    for (var i = 0; i < itemsToClick.length; i++) {
      itemsToClick[i].paint();
    }
    tutorial.paint();
    hoGui.paint();
  }

  function finishGame() {
    var section = document.getElementsByClassName('game')[0];
    var logoWidth, logoProportion, logoHeight, logoPosX, logoPosY, buttonWidth, buttonProportion, buttonHeight, buttonPosX, buttonPosY;
    clearInterval(gameId);
    instruction.remove();
    items.remove();
    var divPlayFree = document.createElement('a');
    divPlayFree.id = 'playFree';
    divPlayFree.href = "#";
    divPlayFree.innerHTML = 'PLAY FREE';
    section.append(divPlayFree);
    gameId = setInterval(function () {
	  if (window.screen.width > 767) {
		logoWidth = 47 * parseInt(getComputedStyle(document.documentElement).fontSize);
	  } else {
		logoWidth = 35 * parseInt(getComputedStyle(document.documentElement).fontSize);
		playFree.style.fontSize = '1.5rem';
	  }
      logoProportion = 1137 / 558;
      logoHeight = logoWidth / logoProportion;
      logoPosX = document.documentElement.clientWidth / 100 * 50 - logoWidth / 2;
      logoPosY = document.documentElement.clientHeight / 100 * 50 - logoHeight / 1.5;
	  
	  if (window.screen.width > 767) {
		buttonWidth = 30 * parseInt(getComputedStyle(document.documentElement).fontSize);
	  } else {
		buttonWidth = 18 * parseInt(getComputedStyle(document.documentElement).fontSize); 
	  }
      buttonProportion = 552 / 140;
      buttonHeight = buttonWidth / buttonProportion;
      buttonPosX = document.documentElement.clientWidth / 100 * 50 - buttonWidth / 2;
      buttonPosY = document.documentElement.clientHeight / 100 * 50 + logoHeight / 3;

      playFree.style.width = buttonWidth + 'px';
      playFree.style.height = buttonHeight + 'px';
      playFree.style.left = buttonPosX + 'px';
      playFree.style.top = buttonPosY + 'px';

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgBlurImg, bg.posX, bg.posY, bg.width, bg.height);
      ctx.drawImage(logoImg, logoPosX, logoPosY, logoWidth, logoHeight);
      ctx.drawImage(buttonImg, buttonPosX, buttonPosY, buttonWidth, buttonHeight);
    }, 80);
  }
}
