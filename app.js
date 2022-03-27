let baraja = [];
let totalPuntos = 0;
let carta;
let intervalSacarCartas;
let nivel = 1;

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
	baraja = baraja.sort((a, b) => Math.random() - 0.5);
	console.clear();
	// console.log(baraja);
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
		carta = baraja.shift();
		const cartaHtml = `<img src="./assets/cartas/${carta}.png" />`;
		$('#cards').html(cartaHtml);
		totalPuntos += valorCarta(carta);
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

		nivel = $('#nivel').val() * 1;
		// if (nivel === 1) {
		// 	nivel = 2000;
		// }
		// if (nivel === 2) {
		// 	nivel = 1500;
		// }
		// if (nivel === 3) {
		// 	nivel = 1000;
		// }
		// if (nivel === 4) {
		// 	nivel = 750;
		// }
		// if (nivel === 5) {
		// 	nivel = 500;
		// }
		sacarCartas(barajaNueva(1));
		console.log(nivel);
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

		$('#btn-stop').addClass('disabled');
		$('#btn-stop').removeClass('shadow');

		$('#btn-count').removeClass('disabled');
		$('#btn-count').addClass('shadow');
	});

	// BOTON MOSTRAR CUENTA
	$('#btn-count').click(() => {
		$('#myAlerta').text(totalPuntos);
		$('#myAlerta').addClass('myAlerta');
		$('#myAlerta').addClass('myBg-success');
		console.log(totalPuntos);
	});
});
