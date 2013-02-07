function NewMatch(){
	mn = document.forms['newMatch']['MatchNum'].value;
	r1 = document.forms['newMatch']['Red1'].value;
	r2 = document.forms['newMatch']['Red2'].value;
	b1 = document.forms['newMatch']['Blue1'].value;
	b2 = document.forms['newMatch']['Blue2'].value;
	
	if(mn == '' || r1 == '' || r2 == '' || b1 == '' || b2 == ''){
			alert("incomplete");
	}
	else{
		alert(addMatch(mn,[r1,r2],[b1,b2]));
	}
}

function getScore(match){
	rs = document.forms["matchForm_"+match]['RedScore'].value;
	bs = document.forms["matchForm_"+match]['BlueScore'].value;
	
	if(rs == '' || bs == ''){
		alert("incomplete");
	}
	else{
		AllMatches[match].updateMatch(rs,bs);
	}
}