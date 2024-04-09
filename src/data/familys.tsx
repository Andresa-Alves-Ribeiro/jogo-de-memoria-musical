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
        { id: 1, name: "Tímpanos", audio: timpanosAudio },
        { id: 2, name: "Pratos", audio: pratosAudio },
        { id: 3, name: "Triângulo", audio: trianguloAudio },
        { id: 4, name: "Bateria", audio: bateriaAudio }
    ],
    "Percussao Melodica": [
        { id: 1, name: "Metalofone", audio: metalofoneAudio },
        { id: 2, name: "Xilofone", audio: xilofoneAudio },
        { id: 3, name: "Vibrafone", audio: vibrafoneAudio },
        { id: 4, name: "Sinos", audio: sinosAudio },
        { id: 5, name: "Tubos Sonoros", audio: tubosSonorosAudio }
    ],
    "Teclas": [
        { id: 1, name: "Piano", audio: pianoAudio },
        { id: 2, name: "Teclado", audio: tecladoAudio },
        { id: 3, name: "Órgão", audio: orgaoAudio },
        { id: 4, name: "Sanfona", audio: sanfonaAudio },
        { id: 5, name: "Escaleta", audio: escaletaAudio }
    ],
    "Madeiras": [
        { id: 1, name: "Flauta Doce", audio: flautaDoceAudio },
        { id: 2, name: "Flauta Transversal", audio: flautaTransversalAudio },
        { id: 3, name: "Clarinete", audio: clarineteAudio },
        { id: 4, name: "Oboé", audio: oboeAudio },
        { id: 5, name: "Fagote", audio: fagoteAudio },
        { id: 6, name: "Saxofone", audio: saxofoneAudio }
    ],
    "Cordas dedilhadas": [
        { id: 1, name: "Violão", audio: violaoAudio },
        { id: 2, name: "Viola Caipira", audio: violaCaipiraAudio },
        { id: 3, name: "Guitarra Elétrica", audio: guitarraAudio },
        { id: 4, name: "Contrabaixo Elétrico", audio: contrabaixoEletricoaAudio },
        { id: 5, name: "Ukelele", audio: ukeleleAudio },
        { id: 6, name: "Cavaquinho", audio: cavaquinhoAudio },
        { id: 7, name: "Banjo", audio: banjoAudio },
        { id: 8, name: "Harpa", audio: harpaAudio }
    ]
};