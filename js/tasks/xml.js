function getFirstChild(n)
{
	y=n.firstChild;
	
	while (y.nodeType!=1){
		y=y.nextSibling;
	}
	
	return y;
}

function getNextSibling(n)
{
	y=n.nextSibling;
	
	while (y.nodeType!=1){
		y=y.nextSibling;
	}
	
	return y;
}

function xmlToString(thexml){
	if(thexml.xml){
		xmlString = thexml.xml;
	}
	else{
		xmlString = (new XMLSerializer).serializeToString(thexml);
	}
	
	return xmlString;
}


