const express = require('express'); //include modulul express memorand in variabila express obiectul asociat modulului(exportat de modul)
var app = express();
const formidable = require('formidable');
const fs = require('fs');
const session = require('express-session')
const nodemailer = require("nodemailer");
const crypto = require('crypto');

app.set('view engine', 'ejs');

function getJson(numeFis)
{
	let textFis = fs.readFileSync(numeFis); //pun continutul fisierului useri.json in rawdata
	return JSON.parse(textFis); //obtin obiectul asociat json-ului
}

function saveJson(obJson, numeFis)
{
	let data = JSON.stringify(obJson); //transform in JSON
	fs.writeFileSync(numeFis, data); //scriu JSON-ul in fisier (inlocuind datele vechi)
}

app.use(express.static(__dirname));

//setez folderele statice (cele in care nu am fisiere generate prin node)
app.use('/resurse', express.static('resurse'));

//setez o sesiune
app.use(session(
{
	secret: 'abcdefg', //folosit de express session pentru criptarea id-ului de sesiune
	resave: true,
	saveUninitialized: false
}));

//cand se face o cerere get catre pagina de index 
app.get('/', function(req, res)
{
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('pagini/index', {user: req.session.username});
});

app.post('/', function(req, res)
{
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files)
	{		
		jsfis = getJson('utilizatori.json')
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword'); //creez un obiect de tip cifru cu algoritmul aes
		var encrParola = cifru.update(fields.parola, 'utf8', 'hex'); //cifrez parola
		encrParola += cifru.final('hex'); //inchid cifrarea (altfel as fi putut adauga text nou cu update ca sa fie cifrat
		let user = jsfis.utilizatori.find(function(x)
		{
			//caut un user cu acelasi nume dat in formular si aceeasi cifrare a parolei
			return (x.username == fields.username && x.parola == encrParola );
		});
		if(user)
		{
			console.log(user);
			console.log(user.parola);
			console.log(encrParola);
			req.session.username = user;//setez userul ca proprietate a sesiunii
		}
		console.log(req.session.username);
		/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
		res.render('pagini/index',{user: req.session.username});
	});
});

app.post('/index', function(req, res)
{
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files)
	{		
		jsfis = getJson('utilizatori.json')
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword'); //creez un obiect de tip cifru cu algoritmul aes
		var encrParola = cifru.update(fields.parola, 'utf8', 'hex'); //cifrez parola
		encrParola += cifru.final('hex'); //inchid cifrarea (altfel as fi putut adauga text nou cu update ca sa fie cifrat
		let user = jsfis.utilizatori.find(function(x)
		{
			//caut un user cu acelasi nume dat in formular si aceeasi cifrare a parolei
			return (x.username == fields.username && x.parola == encrParola );
		});
		if(user)
		{
			console.log(user);
			console.log(user.parola);
			console.log(encrParola);
			req.session.username = user;//setez userul ca proprietate a sesiunii
		}
		console.log(req.session.username);
		/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
		res.render('pagini/index',{user: req.session.username});
	});
});

app.get('/inregistrare', function(req, res) 
{
    res.render('pagini/inregistrare', {user: req.session.username});
});

app.post('/inregistrare', (req, res) => 
{
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files)
	{
		let rawdata = fs.readFileSync('utilizatori.json');
		let jsfis = JSON.parse(rawdata);
		var cifru = crypto.createCipher('aes-128-cbc', 'mypassword');
		var encrParola = cifru.update(fields.parola, 'utf8', 'hex');
		encrParola += cifru.final('hex');
		console.log(fields.parola + " " + encrParola);
		jsfis.utilizatori.push({id:jsfis.lastId, username:fields.username, nume:fields.nume, email: fields.email, parola: encrParola, dataInreg: new Date()});
		jsfis.lastId++;
		res.render('pagini/inregistrare', {user: req.session.username, rsstatus:"ok"});
		saveJson(jsfis,'utilizatori.json')
		trimiteMail(fields.nume, fields.email).catch((err) => {console.log(err)})
    });	
});

async function trimiteMail(nume, email)
{
	let transporter = nodemailer.createTransport(
	{
		service: 'gmail',
		secure: false,
		auth:
		{
			user: "siteseriale@gmail.com", //mailul site-ului (de aici se trimite catre user)
			pass: "Parola!1234" 
		},
	    tls:
		{
			rejectUnauthorized: false //pentru gmail
		}
	});
	//trimitere mail
	let info = await transporter.sendMail(
	{
		from: '"Site-ul cu filme si seriale" <siteseriale@example.com>',
		to: email,
		subject: "User nou", 
		text: "Salut, " + nume + "! Ești binevenit să descoperi tainele lumii cinematografice alături de noi!", 
		html: "<p>Salut, " + nume + "! Ești binevenit să descoperi tainele lumii cinematografice alături de noi!</p>" 
	});
	console.log("Mesaj trimis: %s", info.messageId);
}

app.get('/deconectare', function(req, res)
{
    req.session.destroy(); //distrug sesiunea cand se intra pe pagina de deconectare
	res.render('pagini/deconectare');	
});

app.get('/arhiva', function(req, res)
{
 	let rawdata = fs.readFileSync('film.json');
	let jsfis = JSON.parse(rawdata);
	res.render('pagini/arhiva',{film:jsfis.film, user: req.session.username});
});

app.get("/*",function (req, res, next)
{
res.render("pagini/" + req.path, {user: req.session.username}, function(err, html) //render are un parametru optional cu o functie callback
	{ 
		//err e setat cand avem o eroare
		//html e setat cand a fost gasit view-ul cu succes
		if (err) //daca avem eroare
		{
			if (err.message.indexOf('Failed to lookup view') !== -1) //verificam daca eroarea contine mesajul de view negasit
			{	
				return res.status(404).render('pagini/404', {user: req.session.username});//caz in care afisam pagina de 404
			}
			throw err;//altfel aruncam mai departe eroarea (generata de alte cauze)
		}
		res.send(html);  //daca nu a fost nicio eroare trimitem html-ul rezultat in urma compilarii cu render
    });
});

app.listen(8080);
console.log('Serverul a pornit pe portul 8080');