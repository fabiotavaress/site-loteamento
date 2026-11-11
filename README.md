# Chácaras Recanto da Lagoa

Site de divulgação do loteamento **Chácaras Recanto da Lagoa**, em Pingo-d'Água/MG, às margens da Lagoa Tiririca.

14 chácaras de 20.000 m² (2 hectares) cada — 9 disponíveis, 5 vendidas. Valores a partir de R$ 280.000.

Esboço: HTML + CSS + JS puro, sem backend e sem cadastro (fácil de hospedar em qualquer lugar, ex. GitHub Pages, Netlify, Vercel). Contato é só via WhatsApp.

## Estrutura

- `index.html` — página inicial: hero, apresentação, grid das 14 chácaras, mapa interativo de disponibilidade, tour virtual (placeholder), galeria (placeholder), valores, localização e contato
- `chacara.html?id=N` — página individual de cada chácara (área, status, valor, posição no mapa, galeria, tour 360°, WhatsApp). Uma única página-modelo serve as 14 chácaras via parâmetro `id` na URL
- `css/styles.css` — estilo (paleta verde/dourado, inspirada em sites de loteamento de alto padrão)
- `js/data.js` — **fonte única de verdade**: dados do empreendimento e status de cada chácara (disponível/vendida). Editar aqui quando uma unidade for vendida
- `js/plotmap.js` — gera o croqui esquemático (SVG) das 14 chácaras coloridas por status, usado na home (mapa completo) e na página individual (mini-mapa com destaque)
- `js/common.js` — menu mobile e botão de idioma (PT/EN), compartilhado entre as páginas
- `js/main.js` — lógica específica da home (grid, pílulas de contagem, legendas)
- `js/chacara.js` — lógica específica da página de chácara individual
- `assets/images/` — fotos reais da região de Pingo-d'Água/MG, todas de licença aberta (Wikimedia Commons, CC BY / CC BY-SA), com crédito no rodapé do site. **Nenhuma é foto das chácaras em si** (ainda não existem fotos do empreendimento) — são fotos ilustrativas da cidade e da região, usadas até que as fotos reais de cada chácara fiquem prontas

## Sobre as fotos usadas

Como o empreendimento ainda não tem fotos próprias, o hero, a faixa panorâmica, a galeria e o CTA final usam fotos reais e de licença aberta da região (cidade de Pingo-d'Água, Rio Doce, Ponte Queimada — todas CC BY/CC BY-SA, créditos no rodapé). Nenhuma é literalmente da Lagoa Tiririca ou das chácaras — são ilustrativas, claramente marcadas como tal. Assim que houver fotos e vídeos reais do empreendimento, é só trocar os arquivos em `assets/images/` (mesmos nomes) e remover os avisos "ilustrativo" do texto.

## Como atualizar a disponibilidade

Edite o array `CHACARAS` em [js/data.js](js/data.js): mude o `status` de `"disponivel"` para `"vendida"` (ou vice-versa). O mapa, a grid, as pílulas e as páginas individuais atualizam sozinhos.

## Pendências (próximos passos)

- Fotos reais e tour 360°/3D de cada chácara (estilo Street View) — seções já preparadas para receber
- Imagens aéreas e vídeos na galeria
- Condições de parcelamento (hoje "consulte nossa equipe")
- Contato da corretora Marina
- Domínio e hospedagem definitivos

## Contato

WhatsApp: (31) 97126-7200
