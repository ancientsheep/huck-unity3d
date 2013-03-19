#pragma strict

function Start()
{
	yield WaitForSeconds(4);

	//restart game
	GameManager.resetAll();
	Application.LoadLevel("Next Level");
}