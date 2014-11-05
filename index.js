//Canvas 2d Barnsley's Fern Generator
//Twitter: @walloffire
//(c) 2011
//v 0.1
//Released under MIT License
$(document).ready(function(){
  $.W = $('#canvas').width();
    new FractalGen().main();
});

function FractalGen(){
  var self = this;
  self.W = 500;
  self.H = 500;
  self.zerothPoint = new Point(0,0);
  self.numberOfPoints = 100000 - 1;
  self.pointArray = new Array();
  self.nthPoint =self.zerothPoint;
  
  
  
  this.main = function(){
    self.pointArray.push(self.zerothPoint);
    self.canvas = $('#canvas');
    self.ctx = canvas.getContext("2d");
    self.ctx.fillRect(0, 0, self.W, self.H);
    self.imgData = self.ctx.createImageData(self.W, self.H);
    self.generatePointData();
    self.manipulateImgData();
    self.drawData();
  };
  
  this.generatePointData = function () {
    for(var i = 0; i < self.numberOfPoints; i++){
      var rand =  Math.floor(Math.random() * 100);
      if(rand <= 3)
        self.pointArray.push(self.f_1());
      else if(rand >= 4 &&  rand <= 76)
        self.pointArray.push(self.f_2());
      else if(rand >= 77 && rand <= 90)
        self.pointArray.push(self.f_3());
      else if(rand >= 90)
        self.pointArray.push(self.f_4());
    }
      
  };
  
  this.manipulateImgData = function(){
    $.each(self.pointArray, function(i, point) {
      var index = (point.displayY * self.W + point.displayX)* 4;
      self.imgData.data[index + point.colorOffset] = point.colorValue;
      self.imgData.data[index + point.alphaOffset] = point.alpha;
    });
  };
  
  this.drawData = function(){
    self.ctx.putImageData(self.imgData, 0, 0);
  };
  
  this.f_1 = function(){return self.nthPoint = new Point(0, 0.16 * self.nthPoint.y);};
  this.f_2 = function(){return self.nthPoint = new Point((0.85 * self.nthPoint.x) + (0.04 * self.nthPoint.y), (-0.04 * self.nthPoint.x) + (0.85 * self.nthPoint.y) + 1.6);}
  this.f_3 = function(){return self.nthPoint = new Point(0.2 * self.nthPoint.x + -0.26 * self.nthPoint.y, 0.23 * self.nthPoint.x + 0.22 * self.nthPoint.y + 1.6);};
  this.f_4 = function(){return self.nthPoint = new Point(-0.15 * self.nthPoint.x + 0.28 * self.nthPoint.y, 0.26 * self.nthPoint.x + 0.24 * self.nthPoint.y + 0.44);};
};

function Point(x,y) {
  var self = this;
  
  this.init = function(){
    self.colorOffset = 1;
    self.alphaOffset = 3;
    self.alpha = 95;
    self.colorValue = 255;
    self.x = x;
    self.y = y;
    // x and y multiplies by 50 for display purposes (zoom)
    // 200 is the offset since we want to see both sides of the fern
    self.displayX = Math.floor(200 + x*50); 
    self.displayY = Math.floor(self.cartesianToComputer(y*50,$.W));
  };

  this.cartesianToComputer = function(y, h){
    return h - y;
  };
  
  self.init();

};