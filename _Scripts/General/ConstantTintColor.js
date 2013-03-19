#pragma strict

private var tintColor:Color = Color(0.5,0.5,0,1);

function Start()
{
	// tint all children renderers to tintColor
	var children = gameObject.GetComponentsInChildren.<MeshRenderer>();
	for(var f=0;f<children.length;f++)
	{
		var child = children[f];
		child.material.color = tintColor;
	}
}