startgame = (i) => {
    console.log('starting')
    console.log(i)
    let deadaliens = 0;
    
    let Game = function(canvasId) {
        let self = this;
        canvas = document.createElement('canvas')
        canvas.setAttribute('id', 'canvas');        
        //var canvas = document.getElementById('spaceinvaders')
        console.log(canvas)
        canvas.setAttribute('width', '400px')
        canvas.setAttribute('height', '300px')
        canvas.setAttribute('id', canvasId)
        canvas.setAttribute('class', 'spaceInvaders')

        document.body.appendChild(canvas)
        
        let gameSize = {w: canvas.width, h: canvas.height }
        this.gameSize = gameSize

        let images = []
        let items = 0

        let itemLoaded = function(e){
            items ++

            if(items >= images.length){
                self.deaths = []
                self.entities = createInvaders(self).concat(new Player(self, self.gameSize))
                tick()
            }
        }

        var tick = function() {
            self.update();
            self.draw(ctx, gameSize);
            requestAnimationFrame(tick);
        };
             
        var ctx = document.getElementById(canvasId).getContext("2d");
        this.ctx = ctx;
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, gameSize.w, gameSize.h);
        
        var alien = new Image();
        this.alien = alien;
        alien.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAHCAYAAAAMPr0FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDBEMjU1RDNBQUI5MTFFNDhGMEJCMjY4MDJDOEYzQTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDBEMjU1RDRBQUI5MTFFNDhGMEJCMjY4MDJDOEYzQTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MEQyNTVEMUFBQjkxMUU0OEYwQkIyNjgwMkM4RjNBMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MEQyNTVEMkFBQjkxMUU0OEYwQkIyNjgwMkM4RjNBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj57hN4AAABbSURBVHjarJHBCgAgCENd9DX9//8tOhRDVDzkpcT1HAskTeo0aPblbLqBnhm8pR1O4AEIAC0t6LL4VSPZbokbNLmYCSDKUzUstC/jc1nyQD+GgVsWzi/DtgADAIfeIDSZk8CfAAAAAElFTkSuQmCC";
        images.push(alien);
        
        var ship = new Image();
        this.ship = ship;
        ship.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAICAYAAAAiJnXPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEQ1MjdDM0RBQUJEMTFFNDkzQTM4N0I3Mjk4MUU3MTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEQ1MjdDM0VBQUJEMTFFNDkzQTM4N0I3Mjk4MUU3MTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4RDUyN0MzQkFBQkQxMUU0OTNBMzg3QjcyOTgxRTcxOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4RDUyN0MzQ0FBQkQxMUU0OTNBMzg3QjcyOTgxRTcxOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PriM658AAAA6SURBVHjaYvz//z8DNpDOwAiSYJzJgCnPhEcDCPwHsonTRAgwgpyHZDJRephI1AB2MlnOo58mgAADAJq3D6VetjagAAAAAElFTkSuQmCC";
        images.push(ship);
        
        var death = new Image();
        this.death = death;
        death.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAHCAYAAADebrddAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTgyQ0FDQUFBQUMzMTFFNEIwM0M4NERFNzhGN0I1N0UiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTgyQ0FDQUJBQUMzMTFFNEIwM0M4NERFNzhGN0I1N0UiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODJDQUNBOEFBQzMxMUU0QjAzQzg0REU3OEY3QjU3RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxODJDQUNBOUFBQzMxMUU0QjAzQzg0REU3OEY3QjU3RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnTyVU4AAABDSURBVHjafE9BCgAwCLLo/19ug0VE2byUYaLiFwAED3Xv3DWIx6Huw0SJSNrMJyOijjSyT96RW5d8YD2UFVl6+BFgACEMGQ8VjUkdAAAAAElFTkSuQmCC";
        images.push(death);
        
        var xray = new Image();
        this.xray = xray;
        xray.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAYAAAArkDztAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTBFOURCMjRBQUM0MTFFNEIyREY5NjkzOUIyRkRCOTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTBFOURCMjVBQUM0MTFFNEIyREY5NjkzOUIyRkRCOTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMEU5REIyMkFBQzQxMUU0QjJERjk2OTM5QjJGREI5MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMEU5REIyM0FBQzQxMUU0QjJERjk2OTM5QjJGREI5MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PszVWTEAAAAySURBVHjaYvwPBAwMDIwMqOA/E1TwP7IgSIwFykGWBOtmQlaFrIAJSZABWTfpdgAEGABJ0g8QYuwEUwAAAABJRU5ErkJggg==";
        images.push(xray);
        
        alien.onload = ship.onload = death.onload = xray.onload = itemLoaded;
        
        console.log("game running");

    };
    
    Game.prototype = {
        update: function() {
            var self = this;
            
            this.deaths = this.deaths.filter(function(d) {
                return d.count >= 0;
            });
            
            var entities = this.entities;
            
            var notCollidingWithAnything = function(entityA) {
                return entities.filter(function (entityB) {
                    var collided = colliding(entityA, entityB);
                    
                    if (collided && (entityA instanceof Invader || entityA instanceof Player)) {
                        self.addDeath(new Death(self, entityA.position));
                        if(entityA instanceof Player){
                            console.log('died')
                            died()
                        }
                       
                    }
                    
                    if (collided && (entityB instanceof Invader || entityB instanceof Player)) {
                        self.addDeath(new Death(self, entityB.position));
                        if(entityB instanceof Player){
                            console.log('died')
                            died()
                        }
                    }
                    
                    return collided;
                }).length === 0;
            };
            
            var outOfBounds = function(ents) {
                return ents.filter(function(e) {
                    return e.position.x > 0 &&
                        e.position.x < self.gameSize.w &&
                        e.position.y > 0 &&
                        e.position.y < self.gameSize.h;
                });
            };
            
            this.entities = outOfBounds(this.entities);
            this.entities = this.entities.filter(notCollidingWithAnything);
            
            for (var i=0; i<this.entities.length; i++) {
                this.entities[i].update();
            }
            
            for (i=0; i<this.deaths.length; i++) {
                this.deaths[i].update();
                
            }
            
            //console.log("game updating");
        },
        draw: function(ctx, gameSize) {
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(0, 0, gameSize.w, gameSize.h);
            
            for (var i=0; i<this.deaths.length; i++) {
                this.deaths[i].draw();
                
            }
            
            for (i=0; i<this.entities.length; i++) {
                this.entities[i].draw();
            }
        },
        addEntity: function(entity) {
            this.entities.push(entity);
        },
        
        addDeath: function(death) {
            this.deaths.push(death);
            countdeadalien()
        },
        invadersBelow: function(invader) {
            return this.entities.filter(function (anotherInvader) {
                return anotherInvader instanceof Invader &&
                    anotherInvader.position.y > invader.position.y &&
                    Math.abs(anotherInvader.position.x - invader.position.x < anotherInvader.size.w)
            }).length > 0;
        }
    };
    
    var Player = function(game, gameSize) {
        this.game = game;
        this.size = { w: 13, h: 8 };
        this.position = { x: (gameSize.w - this.size.w)/2, y: gameSize.h - this.size.h };
        this.pauseFire = 0;
        this.fireEnabled = true;
        this.controls = new Controls();
    };
    
    Player.prototype = {
        update: function() {
            if (!this.fireEnabled) this.pauseFire ++;
            if (this.pauseFire > 18) {
                this.pauseFire = 0;
                this.fireEnabled = true;
            }
            
            if (this.controls.isDown(this.controls.KEYS.LEFT)) {
                this.position.x -=1;
            } else if (this.controls.isDown(this.controls.KEYS.RIGHT)) {
                this.position.x += 1;
            }
            
            if (this.fireEnabled && this.controls.isDown(this.controls.KEYS.FIRE)) {
                this.game.addEntity(new Bullet(this, { x: 0, y: -5 }));
                this.fireEnabled = false;
            }
            if(this.controls.isDown(this.controls.KEYS.ENTER)){
                quit()
            }
        },
        draw: function() {
            this.game.ctx.drawImage(this.game.ship, 0, 0, this.size.w, this.size.h, this.position.x - this.size.w/2, this.position.y - this.size.h/2, this.size.w, this.size.h);
        }
    };
    
    var Bullet = function(player, vel) {
        this.player = player;
        this.size = { w: 1, h: 4 };
        this.position = { x: player.position.x, y: player.position.y - player.size.h };
        this.vel = vel;
    };
    
    Bullet.prototype = {
        update: function() {
            this.position.x += this.vel.x;
            this.position.y += this.vel.y;
        },
        draw: function() {
            var ctx = this.player.game.ctx;
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(this.position.x - this.size.w/2, this.position.y - this.size.h/2, this.size.w, this.size.h);
        }
    };
    
    var Invader = function(game, position, i) {
        this.game = game;
        this.position = position;
        this.i = i;
        this.size = { w: 12, h: 7 };
        this.sprite = this.game.alien;
        this.speedX = 0.4;
        this.patrol = 0;
        this.count = (i % 16) * 8;
    };
    
    Invader.prototype = {
        update: function() {
            this.count = (++this.count > 16) ? 0 : this.count;
            
            if (this.patrol < 0 || this.patrol > 74) {
                this.speedX = -this.speedX;
                this.position.y += 15;
            }
            
            this.patrol += this.speedX;
            this.position.x += this.speedX;
            
            if (!this.game.invadersBelow(this) && Math.random() > 0.995) {
                this.game.addEntity(new Xray(this.game, { x: this.position.x - this.size.w/2, y: this.position.y + this.size.h }, { x: Math.random() - 0.5, y: 2 }));
            }
        },
        draw: function() {
            var offset = (this.count > 8) ? this.size.w-1 : 0;
            this.game.ctx.drawImage(this.sprite, 0 + offset, 0, this.size.w-1, this.size.h, this.position.x - this.size.w/2, this.position.y - this.size.h/2, this.size.w, this.size.h);
        }
    };
    
    var Xray = function(game, position, vel) {
        this.game = game;
        this.size = { w: 3, h: 7 };
        this.position = position;
        this.vel = vel;
        this.sprite = this.game.xray;
        this.count = 0;
    };
    
    Xray.prototype = {
        update: function() {
            this.position.x += this.vel.x;
            this.position.y += this.vel.y;
            
            this.count = (++this.count > 10) ? 0 : this.count;
        },
        draw: function() {
            var offset = (this.count > 5) ? 3 : 0;
            this.game.ctx.drawImage(this.sprite, 0 + offset, 0, this.size.w, this.size.h, this.position.x - this.size.w/2, this.position.y - this.size.h/2, this.size.w, this.size.h);
        }
    };
    
    var Death = function(game, position) {
        this.game = game;
        this.size = { w: 11, h:7 };
        this.position = position;
        this.count = 13;
        this.sprite = this.game.death;
        
    };
    
    Death.prototype = {
        update: function() {
            this.count --;
        },
        draw: function() {
            this.game.ctx.drawImage(this.sprite, 0, 0, this.size.w, this.size.h, this.position.x - this.size.w/2, this.position.y - this.size.h/2, this.size.w, this.size.h);
        }
    };


    var Controls = function() {
        var keyState = {};
        
        window.onkeydown = function(e) {
            keyState[e.keyCode] = true;
        };
        
        window.onkeyup = function(e) {
            keyState[e.keyCode] = false;
        };
        
        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };
        
        this.KEYS = { LEFT: 81, RIGHT: 68, FIRE: 90, ENTER: 13 };
    };
    
    var createInvaders = function(game) {
        var invaders = [];
        
        for (var i=0; i<48; i++) {
            // amount
            var x = 30 + (i % 16) * 18;
            var y = 30 + (i % 3) * 12;
            invaders.push(new Invader(game, { x: x, y: y}, i));
        }
        
        return invaders;
    };
    
    var colliding = function(b1, b2) {
        var b1right     = b1.position.x + b1.size.w / 2;
        var b1bottom    = b1.position.y + b1.size.h / 2;
        var b1left      = b1.position.x - b1.size.w / 2;
        var b1top       = b1.position.y - b1.size.h / 2;
        var b2right     = b2.position.x + b2.size.w / 2;
        var b2bottom    = b2.position.y + b2.size.h / 2;
        var b2left      = b2.position.x - b2.size.w / 2;
        var b2top       = b2.position.y - b2.size.h / 2;
        
        return !(b1 === b2 ||
                b1bottom < b2top ||
                b1right < b2left ||
                b1left > b2right ||
                b1top > b2bottom);
    };

    start = (i) => {
        document.getElementById('stageElement').remove()
        new Game(i);
        document.getElementById('score').style.visibility="visible"
    };

    start(i)

    let quit = false

    died = () => {
        console.log(canvas)
        if(quit == true){
            console.log('quit')
        }else{
            setTimeout(function(){canvas.style.visibility = "hidden"; score.style.visibility = "hidden"; youdied.style.visibility = "visible" ; youdied.classList.add("fadein"); canvas.remove(); }, 1500);
            setTimeout(function(){youdiedcontinue.style.visibility = "visible" ;  youdiedcontinue.classList.add("fadein");}, 2000)
            setDied()
        }
        
    }

    quit = () => {
        console.log('quit')
        canvas.style.visibility = "hidden"; 
        document.getElementById('score').innerHTML = 'Score:' + 0
        score.style.visibility = "hidden"; 
        quit = true
        canvas.remove();
        setQuit();
        startAnimate();

    }
    countdeadalien = () => {
        deadaliens ++ 
        console.log(deadaliens)
        // show score
        if(deadaliens > 0){
            let score = deadaliens / 2
            document.getElementById('score').innerHTML = 'Score:' + score
        }
        
        if(deadaliens == 96){
            youwon()
        }
    }

    youwon = () => {
        let youwon = document.getElementById('youwon')
        setTimeout(function(){canvas.style.visibility = "hidden";score.style.visibility = "hidden"; youwon.style.visibility = "visible" ; youwon.classList.add("fadein"); canvas.remove();  }, 1500);
        setTimeout(function(){youwoncontinue.style.visibility = "visible" ;  youwoncontinue.classList.add("fadein");}, 2000)
    }

};

window.addEventListener('load', function () {

    let button = document.getElementById('playbutton')
    let diedonce = false
    let gamestarted = false
    let i = 0

    button.addEventListener('click', clickbutton = () => {
        console.log('clicked start button')
        startgame(i)
        gamestarted = true
    })


    window.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        console.log(i)
        console.log(gamestarted)
        console.log(diedonce)

        if (event.keyCode === 13 && !gamestarted && i < 1 && !diedonce) {
            
            console.log('enter')
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          button.click();
          
          
        } if (event.keyCode === 13 && diedonce){
            i = 0 
            diedonce = false
            startAnimate();

        }
      });
      
      setDied = () => {
        console.log('setdied')
        gamestarted = false
        diedonce = true

      }
      
      setQuit = () => {
        console.log('setquit')
        gamestarted = false
        diedonce = true

      }

  })

