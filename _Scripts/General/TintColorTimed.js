#pragma strict

private var tintColor:Color = Color(1,0,0,1);
var flashTime = 0.1;

var prevTintColor:Color = Color(1,1,1,1);



function doTint()
{
	// tint all children renderers to tintColor
	var children = gameObject.GetComponentsInChildren.<MeshRenderer>();
	for(var f=0;f<children.length;f++)
	{
		var child = children[f];

		child.material.color = tintColor;
	}

	//do delay
	yield WaitForSeconds(flashTime);

	//return to normal color
	for(f=0;f<children.length;f++)
	{
		var child2 = children[f];
		child2.material.color = prevTintColor;
	}
}