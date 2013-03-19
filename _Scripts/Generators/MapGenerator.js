#pragma strict

var prefab1:GameObject;
var endLevel:GameObject;

var pieceCount:int = 3;
var pieceWidth:float = 17;

var powerup:GameObject;

function Start () {
	//create prefab
	var i:int;
	for(i=0;i<pieceCount;i++)
	{
		var piece = Instantiate(prefab1,Vector3(i*pieceWidth,0,0),Quaternion.identity);
	}

	//add our end level prefab
	var endLevel = Instantiate(endLevel,Vector3(pieceCount*pieceWidth,0,0),Quaternion.identity);

	//add our powerup
	var power = Instantiate(powerup,Vector3(pieceCount*pieceWidth/2,-2.318727,-0.6313594),Quaternion.identity);
}

function Update () {

}