#pragma strict

var oneInChancesOfModification:int = 3;
var healthModifier:float = 1;

var tintColor:Color = Color(0.5,0.5,0,1);

function Start () {

	//Modify enemy if diced rolled in favor
	if(Random.Range(0,oneInChancesOfModification) == 0)
	{
		//add tint color
	 	var tinter:TintColorConstant = gameObject.AddComponent("TintColorConstant");
	 	tinter.setTint(tintColor);

	 	//increase health
	 	var health:Health = gameObject.GetComponent(Health);
	 	health.health += healthModifier;
	}
}
