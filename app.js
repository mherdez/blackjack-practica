let baraja = [];
let totalPuntos = 0;
let carta;
let intervalSacarCartas;
let nivel = 1;
let numCartas = 1;
let apiladas = '';
let cartaHtml = '';

const barajaNueva = (numeroBarajas) => {
	baraja = [];

	for (let i = 1; i <= numeroBarajas; i++) {
		for (const p of ['H', 'C', 'S', 'D']) {
			for (const n of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
				baraja.push(n + p);
			}
			for (const l of ['A', 'K', 'Q', 'J']) {
				baraja.push(l + p);
			}
		}
	}
	baraja = baraja.sort(() => Math.random() - 0.5);
	baraja = _.shuffle(baraja);
	// console.clear();
	console.log(baraja);
	return baraja;
};
const valorCarta = (carta) => {
	let valor = carta.substring(0, carta.length - 1);
	if (isNaN(valor)) {
		return -1;
	}
	valor *= 1;
	if (valor === 10) {
		return -1;
	}
	if (valor <= 6) {
		return 1;
	}
	return 0;
};
const noCards = () => {
	clearInterval(intervalSacarCartas);

	$('#btn-new').removeClass('disabled');
	$('#btn-new').addClass('shadow');

	$('#btn-stop').addClass('disabled');
	$('#btn-stop').removeClass('shadow');

	$('#btn-count').removeClass('disabled');
	$('#btn-count').addClass('shadow');

	$('#myAlerta').text('Baraja sin cartas');
	$('#myAlerta').addClass('myBg-danger');
	$('#myAlerta').addClass('myAlerta');

	$('#cards').html('');
	return;
};
const sacarCartas = (baraja) => {
	intervalSacarCartas = setInterval(() => {
		if (baraja.length === 0) {
			noCards();
			return;
		}
		for (let i = 1; i <= numCartas; i++) {
			carta = baraja.shift();
			cartaHtml += `<img src="./assets/cartas/${carta}.png" />`;
			totalPuntos += valorCarta(carta);
			// console.log(carta, valorCarta(carta), ' - total: ', totalPuntos);
		}
		$('#cards').html(cartaHtml);

		$('input[name=inlineCheckbox1]:checked').val() === 'apiladas'
			? $('#cards').addClass('apiladas')
			: $('#cards').removeClass('apiladas');

		cartaHtml = '';
	}, nivel);
};

$(() => {
	// BOTON NUEVO JUEGO
	$('#btn-new').click(() => {
		totalPuntos = 0;
		$('#cards').html('');

		$('#myAlerta').text('');
		$('#myAlerta').removeClass('myBg-danger');
		$('#myAlerta').removeClass('myAlerta');

		$('#cards-player').html('');
		$('#cards-computer').html('');

		$('#btn-new').addClass('disabled');
		$('#btn-new').removeClass('shadow');

		$('#btn-stop').removeClass('disabled');
		$('#btn-stop').addClass('shadow');

		$('#btn-count').addClass('disabled');
		$('#btn-count').removeClass('shadow');

		$('#nivel').attr('disabled', 'true');
		$('.form-check-input').each(function () {
			$(this).attr('disabled', 'true');
		});
		$('#nivel').attr('disabled', 'true');

		nivel = $('#nivel').val() * 1;
		numCartas = $('input[name=inlineRadioOptions]:checked').val() * 1;
		sacarCartas(barajaNueva(6));
	});

	// BOTON DETENERSE
	$('#btn-stop').click(() => {
		clearInterval(intervalSacarCartas);
		$('#cards').html('');

		$('#cards-player').html('');
		$('#cards-computer').html('');

		$('#btn-new').removeClass('disabled');
		$('#btn-new').addClass('shadow');
		$('#nivel').removeAttr('disabled');
		$('#nivel').attr('disabled', 'true');
		$('.form-check-input').each(function () {
			$(this).removeAttr('disabled');
		});

		$('#btn-stop').addClass('disabled');
		$('#btn-stop').removeClass('shadow');

		$('#btn-count').removeClass('disabled');
		$('#btn-count').addClass('shadow');
	});

	// BOTON MOSTRAR CUENTA
	$('#btn-count').click(() => {
		$('.modal-title').text('Conteo total');
		$('.modal-body').text(totalPuntos);
	});
});
