var Block = require("./block.js");

module.exports = Section;

function Section(data){
	this.data = data;
}

Section.prototype._getTypeBuffer = function(){
	return this.data.Blocks;
}
Section.prototype._getAddBuffer = function(){
	return this.data.Add;
}
Section.prototype._getSkyLightBuffer = function(){
	return this.data.SkyLight;
}
Section.prototype._getBlockLightBuffer = function(){
	return this.data.BlockLight;
}
Section.prototype._getDataBuffer = function(){
	return this.data.Data;
}
Section.prototype._ensureTypeBuffer = function(){
	if(!this._getTypeBuffer()){
		this.data.Blocks = new Buffer(4096);
	}
}
Section.prototype._ensureAddBuffer = function(){
	if(!this._getAddBuffer()){
		this.data.Add = new Buffer(2048);
	}
}
Section.prototype._ensureSkyLightBuffer = function(){
	if(!this._getSkyLightBuffer()){
		this.data.SkyLight = new Buffer(2048);
	}
}
Section.prototype._ensureBlockLightBuffer = function(){
	if(!this._getBlockLightBuffer()){
		this.data.BlockLight = new Buffer(2048);
	}
}
Section.prototype._ensureDataBuffer = function(){
	if(!this._getDataBuffer()){
		this.data.Data = new Buffer(2048);
	}
}
Section.prototype._get4Bit = function(arr,x){
	var pos = Math.floor(x/2);
	if(x%1){
		return arr[pos]&15;
	}else{
		return arr[pos]>>4;
	}
}
Section.prototype._set4Bit = function(arr,x,value){
	var pos = Math.floor(x/2);
	if(x%1){
		arr[pos] = arr[pos]&240 + value;
	}else{
		arr[pos] = arr[pos]&15 + value<<4;
	}
}
Section.prototype._toX = function(x,y,z){
	return y*256+z*16+x;
}


Section.prototype.getType = function (x,y,z){
	var x = this._toX(x,y,z);	
	var buf = this._getTypeBuffer();
	var add = this._getAddBuffer();
	if(buf){
		return buf[x] + (add?this._get4Bit(x)<<8:0);
	}else{
		return 0;
	}
}
Section.prototype.getSkyLight = function(x,y,z){
	var sl = this._getSkyLightBuffer();
	if(sl){
		return this._get4Bit(sl,this._toX(x,y,z));
	}else{
		return 0;
	}
}
Section.prototype.getBlockLight = function(x,y,z){
	var bl = this._getBlockLightBuffer();
	if(bl){
		return this._get4Bit(bl,this._toX(x,y,z));
	}else{
		return 0;
	}
}
Section.prototype.getData = function(x,y,z){
	var d = this._getDataBuffer();
	if(d){
		return this._get4Bit(d,this._toX(x,y,z));
	}else{
		return 0;
	}
}

Section.prototype.setType = function(x,y,z,value){
	var x = this._toX(x,y,z);
	this._ensureTypeBuffer();
	var buf = this._getTypeBuffer();
	
	var t = value % 256;
	buf[x] = t;
	
	var add = this._getAddBuffer();
	
	var a = (value-t)/256;
	
	if(add || a){
		if(!add){
			this._ensureAddBuffer();
			add = this._getAddBuffer();
		}
		this._set4Bit(add,x,a);		
	}
}
Section.prototype.setSkyLight = function(x,y,z,value){
	this._ensureSkyLightBuffer();
	var sl = this._getSkyLightBuffer();	
	this._set4Bit(sl,this._toX(x,y,z),value);
}
Section.prototype.setBlockLight = function(x,y,z,value){
	this._ensureBlockLightBuffer();
	var bl = this._getBlockLightBuffer();	
	this._set4Bit(bl,this._toX(x,y,z),value);
}
Section.prototype.setData = function(x,y,z,value){
	this._ensureDataBuffer();
	var d = this._getDataBuffer();	
	this._set4Bit(d,this._toX(x,y,z),value);
}
Section.prototype.getBlock = function(x,y,z){
	return new Block(this,x,y,z);
}

