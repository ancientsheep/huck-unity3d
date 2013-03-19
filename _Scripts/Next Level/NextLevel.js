#pragma strict

var worldLevelText:GameObject;

function Start () {

	//inc next level
	var world = GameManager.getCurrWorld();
	world++;
	GameManager.setCurrWorld(world);

	//Set world / level text
	var textMesh : TextMesh = worldLevelText.GetComponent(TextMesh);
	textMesh.text = "World "+world;


	yield WaitForSeconds(3);

	Application.LoadLevel("Game Scene");
}

function Update () {

}