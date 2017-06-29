window.onload = initPage;

function swapTiles(selectedCell,destinationCell) {
	var selectedImage = selectedCell.firstChild;
	while(selectedImage.nodeName === "#text") {
		selectedImage = selectedImage.nextSibling;
	}
	var destinationImage = destinationCell.firstChild;
	while(destinationImage.nodeName === "#text") {
		destinationImage = destinationImage.nextSibling;
	}
	selectedCell.appendChild(destinationImage);
	destinationCell.appendChild(selectedImage);
	if(puzzleIsComplete()) {
		document.getElementById("puzzleGrid").className = "win";
	}
}

function initPage() {
	var table = document.getElementById("puzzleGrid");
	var cells = table.getElementsByTagName("td");
	for (let i = 0; i< cells.length; i++) {
		cells[i].onclick = tileClick;
	}
}

function tileClick() {
	if(cellIsEmpty(this)) {
		alert("Please click on a numbered tile.")
	}
	var currenRow = this.id.charAt(4);
	var currenCol = this.id.charAt(5);
	//空单元格是否在上
	if(currenRow > 1) {
		var testRow = Number(currenRow) - 1;
		var testCellId = "cell" + testRow + currenCol;
		var testCell = document.getElementById(testCellId);
		if (cellIsEmpty(testCell)) {
			swapTiles(this,testCell);
			return;
		}
	}
	//空单元格是否在下
	if(currenRow < 4) {
		var testRow = Number(currenRow) + 1;
		var testCellId = "cell" + testRow + currenCol;
		var testCell = document.getElementById(testCellId);
		if (cellIsEmpty(testCell)) {
			swapTiles(this,testCell);
			return;
		}
	}
	//空单元格是否在左
	if(currenCol > 1) {
		var testCol = Number(currenCol) - 1;
		var testCellId = "cell" + currenRow + testCol;
		var testCell = document.getElementById(testCellId);
		if (cellIsEmpty(testCell)) {
			swapTiles(this,testCell);
			return;
		}
	}
	//空单元格是否在右
	if(currenCol < 4) {
		var testCol = Number(currenCol) + 1;
		var testCellId = "cell" + currenRow + testCol;
		var testCell = document.getElementById(testCellId);
		if (cellIsEmpty(testCell)) {
			swapTiles(this,testCell);
			return;
		}
	}
	//到达这吗，说明所点空格不在周围，点击无效
	alert("Please click a title next to an empty cell.")
}

function cellIsEmpty(cell) {
	var image = cell.firstChild;
	while(image.nodeName === "#text") {
		image = image.nextSibling;
	}
	if(image.alt === "empty") {
		return true;
	} else {
		return false;
	}
}


function puzzleIsComplete() {
	var tiles =document.getElementById("puzzleGrid").getElementsByTagName("img");
	var tilesOrder = "";
	for (let i = 0; i<tiles.length; i++) {
		var num = tiles[i].src.substr(-6,2);
		if(num != "ty") {
			tilesOrder += num;
		}
	}
	if(tilesOrder === "010203040506070809101112131415") {
		return true;
	} else {
		return false;
	}
}