export const instrumentFamilies: Array<string> = [
    "Cordas de arco",
    "Cordas dedilhadas",
    "Metais",
    "Madeiras",
    "Percussão Ritmica",
    "Percussão Melodica",
    "Teclas"
];

export const instrumentsByFamily: { [key: string]: Array<string> } = {
    "Cordas de arco": [
        "Violino",
        "Viola Clássica",
        "Violoncelo",
        "Contrabaixo Acústico"
    ],
    "Cordas dedilhadas": [
        "Violão",
        "Viola Caipira",
        "Guitarra Elétrica",
        "Contrabaixo Elétrico",
        "Ukelele",
        "Cavaquinho",
        "Banjo",
        "Harpa"
    ],
    "Metais": [
        "Trompete",
        "Trombone",
        "Trompa",
        "Tuba"
    ],
    "Madeiras": [
        "Flauta Doce",
        "Flauta Transversal",
        "Clarinete",
        "Oboé",
        "Fagote",
        "Saxofone"
    ],
    "Percussão Ritmica": [
        "Tímpanos",
        "Pratos",
        "Triângulo",
        "Bateria"
    ],
    "Percussão Melodica": [
        "Metalofone",
        "Xilofone",
        "Vibrafone",
        "Sinos",
        "Tubos Sonoros"
    ],
    "Teclas": [
        "Piano",
        "Teclado",
        "Órgão",
        "Sanfona",
        "Escaleta"
    ]
};
