# Chácaras Recanto da Lagoa

Site de divulgação do loteamento **Chácaras Recanto da Lagoa**, em Pingo-d'Água/MG, às margens da Lagoa Tiririca.

14 chácaras de 20.000 m² (2 hectares) cada — 9 disponíveis, 5 vendidas. Valores a partir de R$ 280.000.

HTML + CSS + JS puro, sem backend e sem cadastro (fácil de hospedar em qualquer lugar, ex. GitHub Pages, Netlify, Vercel). Contato é só via WhatsApp.

## Estrutura

- `index.html` — página inicial: hero, destaques, apresentação do empreendimento, grid das 14 chácaras com mapa esquemático, tour virtual (placeholder), galeria (com lightbox), valores, localização e contato
- `chacara.html?id=01` a `?id=14` — página individual dinâmica de cada unidade (área, status, valor, CTA de WhatsApp)
- `style.css` — identidade visual (verde escuro + dourado, serifada) e responsividade
- `script.js` — monta a lista/grid de chácaras a partir do array `LOTS`, a página de detalhe, o menu mobile e o lightbox da galeria
- `assets/` — imagens ilustrativas (fotos aéreas de paisagem) e o mapa esquemático em SVG

## Como atualizar a disponibilidade

Edite o array `LOTS` no topo de [script.js](script.js) — a lista de números em `.includes([...])` define quais chácaras aparecem como disponíveis; o restante (01 a 14) aparece como vendida. O grid, os contadores e as páginas individuais atualizam sozinhos.

## Pendências (próximos passos)

Ver também `LEIA-ME.txt` (notas de quem montou esta versão):

- Trocar as imagens ilustrativas pelas fotos reais e autorizadas do empreendimento
- Mapa é esquemático — não é planta topográfica nem documento de demarcação
- Atualizar o pin do Google Maps para as coordenadas oficiais do empreendimento (hoje aponta para Pingo-d'Água/MG em geral)
- Tour 360° real (hoje sinalizado como "em produção")
- Confirmar condições de parcelamento, preços e disponibilidade antes de publicar
- Contato da corretora Marina

## Contato

WhatsApp: (31) 97126-7200
