# Manual Next01

Manual interativo do sistema (site estático, **sem build**) + versão PDF.
Organização: módulos → 3 camadas: **Entender** · **Conhecer a tela** · **Fazer**.

## Rodar local
    npx serve public -l 5173      # abra http://localhost:5173
(Não abra o index.html com duplo clique: módulos JS exigem servidor.)

## Onde editar o conteúdo
- `public/js/data.js` – estrutura dos módulos e guias (Comercial, Operacional, Faturamento…).
- `public/js/legacy.js` – conteúdo vindo do esboço v3 (treinamento consultivo, Cadastros).
- Guia: `{ t:'Título', obj:'Objetivo', steps:[{t:'Passo', s:['frase com **negrito**']}], tips:['…'] }`
- Imagens das telas: colocar em `public/img/`.

## PDF
- Pelo navegador: botão **Versão PDF** → *Imprimir / Salvar como PDF* (ordem: Cadastros → … → Relatórios).
- Automático (opcional): `npm install && npx playwright install chromium && npm run pdf` gera `public/Manual-Next01.pdf`.

## Publicar
1. **GitHub:** `git init && git add . && git commit -m "Manual Next01" && git branch -M main`, crie o repositório e `git remote add origin <url> && git push -u origin main`.
2. **Render (validação):** New → Static Site → repositório. Build Command: vazio. Publish Directory: `public`.
3. **Firebase (produção):** `npm i -g firebase-tools && firebase login && firebase init hosting` (public directory `public`, SPA: não, não sobrescrever index.html) e depois `firebase deploy`. O `firebase.json` já está pronto.
