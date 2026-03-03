# 🎵 Jogo da Memória Musical

Um jogo interativo de memória que combina diversão com aprendizado musical. Encontre os pares de instrumentos musicais, ouça seus sons característicos e teste seu conhecimento sobre orquestras e instrumentos.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

---

## 📸 Preview

> Adicione suas capturas de tela na pasta `docs/images/` e substitua os caminhos abaixo.

Tela inicial 

<img width="2555" height="1305" alt="Captura de tela 2026-03-02 211226" src="https://github.com/user-attachments/assets/8aaa7eb9-d242-4795-b73e-3d90b0c11ab7" />

Tela do Game

<img width="2554" height="1305" alt="Captura de tela 2026-03-02 211239" src="https://github.com/user-attachments/assets/895b1b88-c0a3-4bf6-8e58-a6f6814321b4" />

---

## ✨ Funcionalidades

- **Seleção de instrumentos** — Escolha as famílias de instrumentos que deseja jogar (cordas, metais, madeiras, percussão, teclas)
- **Áudio interativo** — Cada card reproduz o som real do instrumento ao ser virado
- **Estatísticas em tempo real** — Acompanhe tentativas, pontuação e tempo de jogo
- **Pausar e continuar** — Controle total sobre o fluxo da partida
- **Celebração de vitória** — Efeito de confetti ao completar o jogo
- **Interface responsiva** — Funciona em desktop, tablet e mobile
- **Acessibilidade** — Suporte a navegação por teclado (↑↓ para navegar, Enter para selecionar)
- **Persistência** — Suas escolhas de instrumentos são lembradas entre sessões

---

## 🎹 Famílias de Instrumentos

| Família | Instrumentos |
|---------|--------------|
| **Cordas de arco** | Violino, Viola Clássica, Violoncelo, Contrabaixo Acústico |
| **Cordas dedilhadas** | Violão, Viola Caipira, Guitarra, Contrabaixo Elétrico, Ukelele, Cavaquinho, Banjo, Harpa |
| **Metais** | Trompete, Trombone, Trompa, Tuba |
| **Madeiras** | Flauta Doce, Flauta Transversal, Clarinete, Oboé, Fagote, Saxofone |
| **Percussão rítmica** | Tímpanos, Pratos, Triângulo, Bateria |
| **Percussão melódica** | Metalofone, Xilofone, Vibrafone, Sinos, Tubos Sonoros |
| **Teclas** | Piano, Teclado, Órgão, Sanfona, Escaleta |

---

## 🛠️ Tecnologias

- **React 18** — Biblioteca de interface
- **TypeScript** — Tipagem estática
- **Vite** — Build tool e dev server
- **Tailwind CSS** — Estilização utilitária
- **React Bootstrap** — Componentes UI
- **Phosphor Icons** — Ícones
- **Sonner** — Notificações toast
- **Canvas Confetti** — Efeito de celebração
- **Vitest** — Testes unitários
- **React Testing Library** — Testes de componentes

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/Andresa-Alves-Ribeiro/jogo-de-memoria-musical.git

# Entre na pasta do projeto
cd jogo-de-memoria-musical

# Instale as dependências
npm install
```

---

## ▶️ Executando o projeto

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

---

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

---

## 📜 Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build localmente |
| `npm run lint` | Executa o ESLint |
| `npm test` | Executa os testes |
| `npm run test:coverage` | Executa testes com relatório de cobertura |

---

## 📁 Estrutura do projeto

```
src/
├── assets/           # Imagens, áudios e mídia
├── components/       # Componentes reutilizáveis
├── contexts/         # Contextos React (Game, Audio, Stats)
├── data/             # Dados dos instrumentos (families.tsx)
├── hooks/            # Hooks customizados (áudio, sons)
├── pages/            # Páginas (Home, Game)
├── types/            # Tipos TypeScript
└── App.tsx           # Componente principal
```

---

## 🎮 Como jogar

1. Na tela inicial, escolha **Iniciar Jogo**
2. Selecione uma ou mais famílias de instrumentos
3. Vire os cards para encontrar os pares
4. Ao virar um card, o som do instrumento é reproduzido
5. Encontre todos os pares para vencer!
6. Use as setas (↑↓) e Enter para navegação por teclado

---

## 📄 Licença

Este projeto é de uso pessoal/educacional.

---

## 👩‍💻 Autora

Hi! 👋 I'm Andresa Alves Ribeiro, a Front-end/Full-Stack developer and Information Systems student. I love creating solutions to complex problems and am always excited to learn new technologies.

This project was developed as part of a technical assessment, showcasing my skills in modern web development, particularly with Next.js, TypeScript, and full-stack development practices.

### Connect with me

<p align="center">
  <a href="mailto:andresa_15ga@hotmail.com"><img src="https://img.shields.io/static/v1?logoWidth=15&logoColor=ff69b4&logo=gmail&label=Email&message=andresa_15ga@hotmail.com&color=ff69b4" target="_blank"></a>
  <a href="https://www.linkedin.com/in/andresa-alves-ribeiro/"><img alt="LinkedIn Profile" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=0A66C2&logo=LinkedIn&label=LinkedIn&message=andresa-alves-ribeiro&color=0A66C2"></a>
  <a href="https://www.instagram.com/dresa.alves/"><img alt="Instagram Profile" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=E4405F&logo=Instagram&label=Instagram&message=@dresa.alves&color=E4405F"></a>
</p>
