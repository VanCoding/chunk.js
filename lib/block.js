module.exports = Block;

function Block(section,x,y,z){
	this.section = section;
    this.x = x;
    this.y = y;
    this.z = z;    
}

Block.prototype.getType = function(){
	return this.section.getType(this.x,this.y,this.z);
}
Block.prototype.getSkyLight = function(){
	return this.section.getSkyLight(this.x,this.y,this.z);
}
Block.prototype.getBlockLight = function(){
	return this.section.getBlockLight(this.x,this.y,this.z);
}
Block.prototype.getData = function(){
	return this.section.getData(this.x,this.y,this.z);
}

Block.prototype.setType = function(value){
	return this.section.setType(this.x,this.y,this.z,value);
}
Block.prototype.setSkyLight = function(value){
	return this.section.setSkyLight(this.x,this.y,this.z,value);
}
Block.prototype.setBlockLight = function(value){
	return this.section.setBlockLight(this.x,this.y,this.z,value);
}
Block.prototype.setData = function(value){
	return this.section.setData(this.x,this.y,this.z,value);
}