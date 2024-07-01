import violinoAudio from './audios/cordasDeArco/violino.wav';
import violonceloAudio from './audios/cordasDeArco/violoncelo.wav';
import violaAudio from './audios/cordasDeArco/viola-classica.wav';
import contrabaixoAcusticoAudio from './audios/cordasDeArco/contrabaixo-acustico.wav';

import banjoAudio from './audios/cordasDedilhadas/banjo.wav';
import cavaquinhoAudio from './audios/cordasDedilhadas/cavaquinho.wav';
import contrabaixoEletricoaAudio from './audios/cordasDedilhadas/contrabaixo-eletrico.wav';
import guitarraAudio from './audios/cordasDedilhadas/guitarra.wav';
import harpaAudio from './audios/cordasDedilhadas/harpa.wav';
import ukeleleAudio from './audios/cordasDedilhadas/ukelele.wav';
import violaCaipiraAudio from './audios/cordasDedilhadas/viola-caipira.wav';
import violaoAudio from './audios/cordasDedilhadas/violao.wav';

import tromboneAudio from './audios/metais/trombone.wav';
import trompaAudio from './audios/metais/trompa.wav';
import trompeteAudio from './audios/metais/trompete.wav';
import tubaAudio from './audios/metais/tuba.wav';

import fagoteAudio from "./audios/madeiras/fagote.wav"
import clarineteAudio from "./audios/madeiras/clarinete.mp3"
import flautaDoceAudio from "./audios/madeiras/flauta-doce.mp3"
import flautaTransversalAudio from "./audios/madeiras/flauta-transversal.mp3"
import oboeAudio from "./audios/madeiras/oboe.mp3"
import saxofoneAudio from "./audios/madeiras/saxofone.mp3"

import metalofoneAudio from "./audios/percussãoMelodica/metalofone.mp3"
import sinosAudio from "./audios/percussãoMelodica/sinos.mp3"
import tubosSonorosAudio from "./audios/percussãoMelodica/tubos-sonoros.mp3"
import vibrafoneAudio from "./audios/percussãoMelodica/vibrafone.mp3"
import xilofoneAudio from "./audios/percussãoMelodica/xilofone.mp3"

import bateriaAudio from "./audios/percussãoRitmica/bateria.mp3"
import pratosAudio from "./audios/percussãoRitmica/pratos.mp3"
import timpanosAudio from "./audios/percussãoRitmica/timpanos.mp3"
import trianguloAudio from "./audios/percussãoRitmica/triangulo.mp3"

import escaletaAudio from "./audios/teclas/escaleta.mp3"
import orgaoAudio from "./audios/teclas/orgao.mp3"
import pianoAudio from "./audios/teclas/piano.mp3"
import sanfonaAudio from "./audios/teclas/sanfona.mp3"
import tecladoAudio from "./audios/teclas/teclado.mp3"

// IMAGENS

import violinoImage from '../assets/instruments/violino.jpg';
import violonceloImage from '../assets/instruments/violoncelo.jpg';
import violaImage from '../assets/instruments/viola-classica.jpg';
import contrabaixoAcusticoImage from '../assets/instruments/contrabaixo-acustico.jpg';

import tromboneImage from '../assets/instruments/trombone.jpg';
import trompaImage from '../assets/instruments/trompa.png';
import trompeteImage from '../assets/instruments/trompete.jpg';
import tubaImage from '../assets/instruments/tuba.webp';

import timpanosImage from '../assets/instruments/timpanos.jpg';
import pratosImage from '../assets/instruments/pratos.jpg';
import trianguloImage from '../assets/instruments/triangulo.webp';
import bateriaImage from '../assets/instruments/bateria.jpg';

import metalofoneImage from '../assets/instruments/metalofone.jpg';
import xilofoneImage from '../assets/instruments/xilofone.webp';
import vibrafoneImage from '../assets/instruments/vibrafone.jpg';
import sinosImage from '../assets/instruments/sinos.jpeg';
import tubosImage from '../assets/instruments/tubos-sonoros.jpg';

import pianoImage from '../assets/instruments/piano.webp';
import tecladoImage from '../assets/instruments/teclado.webp';
import orgaoImage from '../assets/instruments/orgao.webp';
import sanfonaImage from '../assets/instruments/sanfona.webp';
import escaletaImage from '../assets/instruments/escaleta.webp';

import flautaDoceImage from '../assets/instruments/flauta-doce.jpg';
import flautaTransversalImage from '../assets/instruments/flauta-transversal.png';
import clarineteImage from '../assets/instruments/clarinete.png';
import oboeImage from '../assets/instruments/oboe.webp';
import fagoteImage from '../assets/instruments/fagote.jpg';
import saxofoneImage from '../assets/instruments/saxofone.jpeg';

import violaoImage from '../assets/instruments/violão.jpg';
import violaCaipiraImage from '../assets/instruments/viola-caipira.jpeg';
import guitarraImage from '../assets/instruments/guitarra.jpeg';
import contrabaixoImage from '../assets/instruments/contrabaixo-eletrico.jpeg';
import ukeleleImage from '../assets/instruments/ukelele.jpeg';
import cavaquinhoImage from '../assets/instruments/cavaquinho.webp';
import banjoImage from '../assets/instruments/banjo.jpeg';
import harpaImage from '../assets/instruments/harpa.jpeg';


export const instrumentFamilies: Array<string> = [
    "Cordas de arco",
    "Cordas dedilhadas",
    "Metais",
    "Madeiras",
    "Percussao Ritmica",
    "Percussao Melodica",
    "Teclas"
];

export const instrumentsByFamily: { [key: string]: Array<{ id: number, name: string, audio: string, image: string }> } = {
    "Cordas de arco": [
        { id: 1, name: "Violino", audio: violinoAudio, image: violinoImage },
        { id: 2, name: "Viola Clássica", audio: violaAudio, image: violaImage },
        { id: 3, name: "Violoncelo", audio: violonceloAudio, image: violonceloImage },
        { id: 4, name: "Contrabaixo Acústico", audio: contrabaixoAcusticoAudio, image: contrabaixoAcusticoImage }
    ],
    "Metais": [
        { id: 1, name: "Trompete", audio: trompeteAudio, image: trompeteImage },
        { id: 2, name: "Trombone", audio: tromboneAudio, image: tromboneImage },
        { id: 3, name: "Trompa", audio: trompaAudio, image: trompaImage },
        { id: 4, name: "Tuba", audio: tubaAudio, image: tubaImage }
    ],
    "Percussao Ritmica": [
        { id: 1, name: "Tímpanos", audio: timpanosAudio, image: timpanosImage},
        { id: 2, name: "Pratos", audio: pratosAudio, image: pratosImage },
        { id: 3, name: "Triângulo", audio: trianguloAudio, image: trianguloImage },
        { id: 4, name: "Bateria", audio: bateriaAudio, image: bateriaImage }
    ],
    "Percussao Melodica": [
        { id: 1, name: "Metalofone", audio: metalofoneAudio, image: metalofoneImage },
        { id: 2, name: "Xilofone", audio: xilofoneAudio, image: xilofoneImage },
        { id: 3, name: "Vibrafone", audio: vibrafoneAudio, image: vibrafoneImage },
        { id: 4, name: "Sinos", audio: sinosAudio, image: sinosImage },
        { id: 5, name: "Tubos Sonoros", audio: tubosSonorosAudio, image: tubosImage }
    ],
    "Teclas": [
        { id: 1, name: "Piano", audio: pianoAudio, image: pianoImage },
        { id: 2, name: "Teclado", audio: tecladoAudio, image: tecladoImage },
        { id: 3, name: "Órgão", audio: orgaoAudio, image: orgaoImage },
        { id: 4, name: "Sanfona", audio: sanfonaAudio, image: sanfonaImage },
        { id: 5, name: "Escaleta", audio: escaletaAudio, image: escaletaImage }
    ],
    "Madeiras": [
        { id: 1, name: "Flauta Doce", audio: flautaDoceAudio, image: flautaDoceImage },
        { id: 2, name: "Flauta Transversal", audio: flautaTransversalAudio, image: flautaTransversalImage },
        { id: 3, name: "Clarinete", audio: clarineteAudio, image: clarineteImage },
        { id: 4, name: "Oboé", audio: oboeAudio, image: oboeImage },
        { id: 5, name: "Fagote", audio: fagoteAudio, image: fagoteImage },
        { id: 6, name: "Saxofone", audio: saxofoneAudio, image: saxofoneImage }
    ],
    "Cordas dedilhadas": [
        { id: 1, name: "Violão", audio: violaoAudio, image: violaoImage },
        { id: 2, name: "Viola Caipira", audio: violaCaipiraAudio, image: violaCaipiraImage },
        { id: 3, name: "Guitarra Elétrica", audio: guitarraAudio, image: guitarraImage },
        { id: 4, name: "Contrabaixo Elétrico", audio: contrabaixoEletricoaAudio, image: contrabaixoImage },
        { id: 5, name: "Ukelele", audio: ukeleleAudio, image: ukeleleImage },
        { id: 6, name: "Cavaquinho", audio: cavaquinhoAudio, image: cavaquinhoImage },
        { id: 7, name: "Banjo", audio: banjoAudio, image: banjoImage },
        { id: 8, name: "Harpa", audio: harpaAudio, image: harpaImage }
    ]
};