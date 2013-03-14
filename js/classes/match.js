function Match(num, red, blue){
	this.matchNum = num;
	this.matchStatus = 'waiting for result';
	this.matchStatusNum = 0;
	this.rTeam = red;
	this.bTeam = blue;
	this.rScore = "N/A";
	this.bScore = "N/A";

	this.ele = createElement('tr', {'class':'match'});
	insertElementAt(this.ele, document.getElementById('matchTable'));
	
	this.firstRow = createElement('tr',{'class':'firstRow'});
	this.secondRow = createElement('tr',{'class':'secondRow'});
	insertElementAt(this.firstRow,this.ele);
	insertElementAt(this.secondRow,this.ele);
	
	this.matchNumEle = createElement('td', {'class':'matchNum'}, "Match: "+this.matchNum);
	this.statusEle = createElement('td', {'class':'matchStatus'}, this.matchStatus);
	insertElementAt(this.matchNumEle, this.firstRow);
	insertElementAt(this.statusEle, this.secondRow);
	
	this.redEle = createElement('td', {'class':'redMatches'});
	this.blueEle = createElement('td', {'class':'blueMatches'});
	
	insertElementAt(this.redEle,this.firstRow);
	insertElementAt(this.blueEle,this.firstRow);
	
	insertElementAt(createElement('button',{'onclick':"removeMatch("+this.matchNum+")"}, 'Remove Match'), this.firstRow);
	
	for(r in this.rTeam){
		insertElementAt(createElement('td',{'class':'team'},this.rTeam[r]), this.redEle);
	}
	
	for(b in this.bTeam){
		insertElementAt(createElement('td',{'class':'team'},this.bTeam[b]), this.blueEle);
	}
	
		this.rScoreHolder = createElement('td',{'class':'score'},'Score: ');
		this.bScoreHolder = createElement('td',{'class':'score'},'Score: ');
		insertElementAt(this.rScoreHolder, this.redEle);
		insertElementAt(this.bScoreHolder, this.blueEle);
		
		this.rScoreEle = createElement('span',{'class':'numScore'},this.rScore);
		this.bScoreEle = createElement('span',{'class':'numScore'},this.bScore);
		insertElementAt(this.rScoreEle,this.rScoreHolder);
		insertElementAt(this.bScoreEle,this.bScoreHolder);
	
	this.formEle = createElement('form', {'name':"matchForm_"+this.matchNum,'onsubmit':'return false'});
	insertElementAt(this.formEle, this.secondRow);
	
	insertElementAt(createElement('input',{'name':'RedScore','placeholder':'Red Score','onkeypress':'return validateKeypress(event,2,9000)'}),this.formEle);
	insertElementAt(createElement('input',{'name':'BlueScore','placeholder':'Blue Score','onkeypress':'return validateKeypress(event,2,9000)'}),this.formEle);
	insertElementAt(createElement('button',{'onclick':"getScore("+this.matchNum+")"},'submit score'),this.formEle);
	
	this.isCompleted = function(){
		return this.rScore == "N/A" || this.bScore == "N/A";
	}
	
	this.updateMatch = function(red, blue){
		var wList = "";
		var lList = "";
		var tList = "";
		
		this.rScore = red;
		this.bScore = blue;
		
		if(parseInt(red, 10) > parseInt(blue, 10)){// red won
			for(r in this.rTeam){
				wList = wList + " " + this.rTeam[r] + " ";
			}
			
			for(b in this.bTeam){
				lList = lList + " " + this.bTeam[b] + " ";
			}
			
			this.matchStatus = 'Red Won';
			this.matchStatusNum = 1;
			
			setElement(this.statusEle,{'style':'color:red;font-size:27px;'});
		}
		else if(parseInt(red, 10) < parseInt(blue, 10)){// blue won
			for(r in this.rTeam){
				lList = lList + " " + this.rTeam[r] + " ";
			}
			
			for(b in this.bTeam){
				wList = wList + " " + this.bTeam[b] + " ";
			}
			
			this.matchStatus = 'Blue Won';
			this.matchStatusNum = 2;
			
			setElement(this.statusEle,{'style':'color:blue;font-size:27px;'});
		}
		else{// tie
			for(r in this.rTeam){
				tList = tList + " " + this.rTeam[r];
			}
			
			for(b in this.bTeam){
				tList = tList + " " + this.bTeam[b];
			}
			
			this.matchStatus = 'Tie';
			setElement(this.statusEle,{'style':'font-size:27px;'});
			this.matchStatusNum = 3;
			
			removeElement(this.formEle);
			updateElementContent(this.statusEle,this.matchStatus);
			updateElementContent(this.rScoreEle,this.rScore);
			updateElementContent(this.bScoreEle,this.bScore);
			
			return "ties: " + tList;
		}
		
		removeElement(this.formEle);
		updateElementContent(this.statusEle,this.matchStatus);
		updateElementContent(this.rScoreEle,this.rScore);
		updateElementContent(this.bScoreEle,this.bScore);
		
		return "wins:" + wList + "loses: " + lList;
	}
	
	this.checkTeam = function (num) {
		var RW = 0;
		var BW = 0;
		var color = 0;
		var inMatch = 0;
		for(r in this.rTeam){
			if(this.rTeam[r] == num){
				inMatch = 1;
				color = 0;
			}
		}
		for(b in this.bTeam){
			if(this.bTeam[b] == num){
				inMatch = 1;
				color = 2;
			}
		}
		
		switch(this.matchStatusNum){
			case 0:
				RW = 0;
				BW = 0;
				break;
			case 1:
				RW = 8;
				BW = 0;
				break;
			case 2:
				RW = 0;
				BW = 4;
				break;
			case 3:
				RW = 8;
				BW = 4;
				break;
			
		}
		
		return RW + BW + color + inMatch;
	}
}