/* Dados centrais do empreendimento — editar aqui conforme a venda avança */
var WHATSAPP_NUMBER = "5531971267200";

var EMPREENDIMENTO = {
  nome: "Chácaras Recanto da Lagoa",
  cidade: "Pingo-d'Água",
  uf: "MG",
  referencia: "às margens da Lagoa Tiririca",
  totalChacaras: 14,
  areaCada: "20.000 m² (2 hectares)",
  precoAPartir: 280000
};

/* status: "disponivel" | "vendida" */
var CHACARAS = [
  { id: 1, status: "disponivel" },
  { id: 2, status: "disponivel" },
  { id: 3, status: "disponivel" },
  { id: 4, status: "disponivel" },
  { id: 5, status: "disponivel" },
  { id: 6, status: "disponivel" },
  { id: 7, status: "disponivel" },
  { id: 8, status: "disponivel" },
  { id: 9, status: "vendida" },
  { id: 10, status: "vendida" },
  { id: 11, status: "vendida" },
  { id: 12, status: "vendida" },
  { id: 13, status: "vendida" },
  { id: 14, status: "disponivel" }
];

function chacaraNumero(id) {
  return String(id).padStart(2, "0");
}

function formatPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function getChacara(id) {
  return CHACARAS.find(function (c) { return c.id === Number(id); });
}

function contarPorStatus(status) {
  return CHACARAS.filter(function (c) { return c.status === status; }).length;
}

function whatsappLink(mensagem) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(mensagem);
}
