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

export const instrumentFamilies: Array<string> = [
    "Cordas de arco",
    "Cordas dedilhadas",
    "Metais",
    "Madeiras",
    "Percussão Ritmica",
    "Percussão Melodica",
    "Teclas"
];

export const instrumentsByFamily: { [key: string]: Array<{ id: number, name: string, audio: string }> } = {
    "CordasDeArco": [
        { id: 1, name: "Violino", audio: violinoAudio },
        { id: 2, name: "Viola Clássica", audio: violaAudio },
        { id: 3, name: "Violoncelo", audio: violonceloAudio },
        { id: 4, name: "Contrabaixo Acústico", audio: contrabaixoAcusticoAudio }
    ],
    "CordasDedilhadas": [
        { id: 1, name: "Violão", audio: violaoAudio },
        { id: 2, name: "Viola Caipira", audio: violaCaipiraAudio },
        { id: 3, name: "Guitarra Elétrica", audio: guitarraAudio },
        { id: 4, name: "Contrabaixo Elétrico", audio: contrabaixoEletricoaAudio },
        { id: 5, name: "Ukelele", audio: ukeleleAudio },
        { id: 6, name: "Cavaquinho", audio: cavaquinhoAudio },
        { id: 7, name: "Banjo", audio: banjoAudio },
        { id: 8, name: "Harpa", audio: harpaAudio }
    ],
    "Metais": [
        { id: 1, name: "Trompete", audio: tromboneAudio },
        { id: 2, name: "Trombone", audio: trompaAudio },
        { id: 3, name: "Trompa", audio: trompeteAudio },
        { id: 4, name: "Tuba", audio: tubaAudio }
    ],
    "Madeiras": [
        { id: 1, name: "Flauta Doce", audio: violinoAudio }, //
        { id: 2, name: "Flauta Transversal", audio: violinoAudio }, //
        { id: 3, name: "Clarinete", audio: violinoAudio }, //
        { id: 4, name: "Oboé", audio: violinoAudio }, //
        { id: 5, name: "Fagote", audio: fagoteAudio },
        { id: 6, name: "Saxofone", audio: violinoAudio } //
    ],
    "PercussãoRitmica": [
        { id: 1, name: "Tímpanos", audio: violinoAudio },
        { id: 2, name: "Pratos", audio: violaAudio },
        { id: 3, name: "Triângulo", audio: violonceloAudio },
        { id: 4, name: "Bateria", audio: violinoAudio }
    ],
    "percussãoMelodica": [
        { id: 1, name: "Metalofone", audio: violinoAudio },
        { id: 2, name: "Xilofone", audio: violaAudio },
        { id: 3, name: "Vibrafone", audio: violonceloAudio },
        { id: 4, name: "Sinos", audio: violinoAudio },
        { id: 5, name: "Tubos Sonoros", audio: violinoAudio }
    ],
    "Teclas": [
        { id: 1, name: "Piano", audio: violinoAudio },
        { id: 2, name: "Teclado", audio: violaAudio },
        { id: 3, name: "Órgão", audio: violonceloAudio },
        { id: 4, name: "Sanfona", audio: violinoAudio },
        { id: 5, name: "Escaleta", audio: violinoAudio }
    ]
};