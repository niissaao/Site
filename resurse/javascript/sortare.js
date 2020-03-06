window.onload=function()
{	
	function creeazaInput(idInput, tip, eticheta, clasa)
	{
		label = document.createElement("label");
		textLabel = document.createTextNode(eticheta);
		label.appendChild(textLabel);
		inp = document.createElement("input");
		inp.type = tip;
		inp.id = idInput;
		inp.class = clasa;
		label.appendChild(inp);
		x = document.getElementById("containerinp");
		x.appendChild(label);
		var mybr = document.createElement('br');
		x.appendChild(mybr);
	}
	
	function creeazaInput2(idInput, tip, eticheta, nume, clasa)
	{
		label = document.createElement("label");
		textLabel = document.createTextNode(eticheta);
		label.appendChild(textLabel);
		inp = document.createElement("input");
		inp.type = tip;
		inp.name = "nume";
		inp.id = idInput;
		inp.class = clasa;
		label.appendChild(inp);
		x = document.getElementById("containerinp");
		x.appendChild(label);
		var mybr = document.createElement('br');
		x.appendChild(mybr);
	}
	
	function creeazaInput3(idInput, tip, eticheta, clasa, valoare)
	{
		label = document.createElement("label");
		textLabel = document.createTextNode(eticheta);
		label.appendChild(textLabel);
		inp = document.createElement("input");
		inp.type = tip;
		inp.id = idInput;
		inp.class = clasa;
		inp.min = 0;
		inp.max = 240;
		inp.value = parseInt(valoare);
		label.appendChild(inp);
		x = document.getElementById("containerinp");
		x.appendChild(label);
		var mybr = document.createElement('br');
		x.appendChild(mybr);
	}
	
	function creeazaTextarea(idInput, row, col, nume, continut)
	{
		label = document.createElement("label");
		inp = document.createElement("textarea");
		inp.rows = row;
		inp.cols = col;
		inp.name = "nume";
		inp.id = idInput;
		c = document.createTextNode(continut);
		inp.appendChild(c);
		label.appendChild(inp);
		x = document.getElementById("containerinp");
		x.appendChild(label);
		var mybr = document.createElement('br');
		x.appendChild(mybr);
	}
	creeazaInput3("duratamin", "range", "Film mai lung decât: ", "durata", 0);
	creeazaInput3("duratamax", "range", "Film mai scurt decât: ", "durata", 240);
	creeazaInput("data", "text", "Data lansării: ", "data");
	creeazaInput2("color1", "radio", "Color: ", "color", "culoare");
	creeazaInput2("color0", "radio", " Alb-negru: ", "color", "culoare");
	creeazaInput("actor", "text", "Să fie cu actorul: ", "actor");
	creeazaInput("categorie", "text", "Să fie din categoria: ", "categorie");
	creeazaInput2("nota2", "checkbox", "Nota pe IMDb între 0 și 2.5: ", "nota", "nota");
	creeazaInput2("nota5", "checkbox", "Nota pe IMDb între 2.6 și 5: ", "nota", "nota");
	creeazaInput2("nota7", "checkbox", "Nota pe IMDb între 5.1 și 7.5: ", "nota", "nota");
	creeazaInput2("nota10", "checkbox", "Nota pe IMDb între 7.6 și 10: ", "nota", "nota");
	creeazaTextarea("txtarea", 4, 50, "coment", "Scrie aici cuvinte cheie separate prin virgulă. Se vor afișa filmele ce conțin în descriere măcar unul dintre cuvintele scrise.");
	document.getElementById("calculeaza").onclick = function()
	{
		var film = document.querySelectorAll(".template_film");
		var durata = document.querySelectorAll(".duratael");
		var sum = 0;
		for(i = 0; i < film.length; i++)
			if(film[i].style.display != "none")
				sum = parseInt(sum) + parseInt(durata[i].innerHTML);
		sum = sum + " minute";
		document.getElementById("calcul").value = sum;		
	}
	document.getElementById("filtreaza").onclick = function()
	{
		var film = document.querySelectorAll(".template_film");
		
		var durata_max = document.getElementById("duratamax").value;
		var durata_min = document.getElementById("duratamin").value;
		var durata = document.querySelectorAll(".duratael");
		
		var colr = document.getElementById("color1").checked;
		var albn = document.getElementById("color0").checked;
		var colorx = document.querySelectorAll(".colorx");
		
		var nota2 = document.getElementById("nota2").checked;
		var nota5 = document.getElementById("nota5").checked;
		var nota7 = document.getElementById("nota7").checked;
		var nota10 = document.getElementById("nota10").checked;
		var nota = document.querySelectorAll(".notax");
		
		var select_tari = document.getElementById("sel");
		var tr = select_tari.selectedIndex;
		var tara_sel = select_tari[tr].innerHTML;
		var tara = document.querySelectorAll(".tara");
		tara_sel = "<b>Țara:</b>" + tara_sel;
		
		//console.log(tara_sel);
		
		for(i = 0; i < film.length; i++)
			film[i].style.display = "none";
		for(i = 0; i < film.length; i++)
		{
			//console.log(tara[i].innerHTML);
			//if(tara_sel == tara[i].innerHTML)
			if(durata[i].innerHTML < durata_max)
				if(durata[i].innerHTML > durata_min)
					if(colr)
					{
						if(colorx[i].innerHTML == "true")
						{
							if(nota2)
								if(nota[i].innerHTML > 0)
									if(nota[i].innerHTML <= 2.5)
										film[i].style.display = "block";
							if(nota5)
								if(nota[i].innerHTML > 2.5)
									if(nota[i].innerHTML <= 5)
										film[i].style.display = "block";
							if(nota7)
								if(nota[i].innerHTML > 5)
									if(nota[i].innerHTML <= 7.5)
										film[i].style.display = "block";
							if(nota10)
								if(nota[i].innerHTML > 7.5)
									if(nota[i].innerHTML <= 10)
										film[i].style.display = "block";
							if(!nota2)
								if(!nota5)
									if(!nota7)
										if(!nota10)
											film[i].style.display = "block";
						}
					}
					else if(albn)
					{
						if(colorx[i].innerHTML == "false")
						{
							if(nota2)
								if(nota[i].innerHTML > 0)
									if(nota[i].innerHTML <= 2.5)
										film[i].style.display = "block";
							if(nota5)
								if(nota[i].innerHTML > 2.5)
									if(nota[i].innerHTML <= 5)
										film[i].style.display = "block";
							if(nota7)
								if(nota[i].innerHTML > 5)
									if(nota[i].innerHTML <= 7.5)
										film[i].style.display = "block";
							if(nota10)
								if(nota[i].innerHTML > 7.5)
									if(nota[i].innerHTML <= 10)
										film[i].style.display = "block";
							if(!nota2)
								if(!nota5)
									if(!nota7)
										if(!nota10)
											film[i].style.display = "block";
						}
					}
					else
						{
							if(nota2)
								if(nota[i].innerHTML > 0)
									if(nota[i].innerHTML <= 2.5)
										film[i].style.display = "block";
							if(nota5)
								if(nota[i].innerHTML > 2.5)
									if(nota[i].innerHTML <= 5)
										film[i].style.display = "block";
							if(nota7)
								if(nota[i].innerHTML > 5)
									if(nota[i].innerHTML <= 7.5)
										film[i].style.display = "block";
							if(nota10)
								if(nota[i].innerHTML > 7.5)
									if(nota[i].innerHTML <= 10)
										film[i].style.display = "block";
							if(!nota2)
								if(!nota5)
									if(!nota7)
										if(!nota10)
											film[i].style.display = "block";
						}
		}
	}
	
	c = 0;
	timer_is_on = 0;
	function timedCount()
	{
		document.getElementById("txt").innerHTML = c;
		c = c + 1;
		t = setTimeout(timedCount, 1000);
	}

	document.getElementById("startCount").onclick=function()
	{
		if (!timer_is_on)
		{
			timer_is_on = 1;
			timedCount();
		}
	}

	document.getElementById("stopCount").onclick=function()
	{
		clearTimeout(t);
		timer_is_on = 0;
	}
	
	var myVar = setInterval(Ora, 1000);
	function Ora()
	{
		var d = new Date();
		var t = d.toLocaleTimeString();
		document.getElementById("ora").innerHTML = t;
	}
	
	document.getElementById("stop_ora").onclick=function()
	{
		clearInterval(myVar);
	}
}	

function del(e)
{
	var film = document.querySelectorAll(".template_film");
	for(i = 0; i < film.length; i++)
	{
		var sters = document.getElementById(film[i].id);
		if(e == film[i].id + "x")
			sters.remove();
	}
}

function schimbBg(e)
{
	var y = event.clientY;
	if(500 - y > 250)
		document.getElementById(e).style.backgroundColor = "white";
	else
		document.getElementById(e).style.backgroundColor = "black";
}

function reBg(e)
{
	document.getElementById(e).style.backgroundColor = "#df9fbf";
}

function dezvaluie()
{
	var c = document.getElementById("toatefilmele").children.length;
	document.getElementById("nrfilme").innerHTML = c;
}

window.onkeypress=function(e)
{
	//alert(e.ctrlKey);
	//if(e.ctrlKey)
		if(e.key == "i")
		{
			var film = document.querySelectorAll(".template_film");
			var inv = [];
			for(i = 0; i < film.length; i++)
				inv[i] = film[film.length - 1 - i];
			for(i = 0; i < film.length; i++)
				film[i].innerHTML = inv[i].innerHTML;
		}
}