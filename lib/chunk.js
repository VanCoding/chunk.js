var nbt = require("nbt.js");
var Section = require("./section.js");


module.exports = Chunk;

function Chunk(data,y){
	if(arguments.length == 1){
		this.data = nbt.parse(data);
	}else if(arguments.length == 2){
		this.data = {
			xPos:data,
			yPos:y,
			LastUpdate:0,
			Sections:[]
		};
	}
	
	this.sections = this.data.Level.Sections;
	delete this.data.Level.Sections;
	
	for(var i = 0; i < 16; i++){
		var s = this.sections[i];
		if(!s || s.Y != i){
			this.sections.splice(i,0,new Section({
				Y:i
			}));
		}else{
			this.sections[i] = new Section(s);
		}
	}
	

}

Chunk.prototype.build = function(){
	var d = JSON.parse(JSON.stringify(this.data));
	d.Level.Sections = [];
	for(var i = 0; i < this.sections.length; i++){
		var s = this.sections[i];
		if(s.Blocks){
			d.Level.Sections.push(s.data);
		}
	}
	return nbt.build(d);
}

Chunk.prototype.getSection = function(y){
	return this.sections[y];
}
Chunk.prototype.getBlock = function(x,y,z){
    return this.sections[Math.floor(y/16)].getBlock(x,y%16,z);
}