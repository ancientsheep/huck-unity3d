#pragma strict

var target:GameObject;

function Start () {

}

function Update () {
	if(target)
		gameObject.transform.position.x = target.transform.position.x;
}