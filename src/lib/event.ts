export const event = {
  honoree: "Débora Michele",
  firstName: "Débora",
  title: "Uma Noite Para Recordar",
  subtitle: "O começo de uma história inesquecível",
  tagline: "Uma celebração criada para ser sentida em cada detalhe.",
  dateLabel: "10 · 10 · 2026",
  dateLong: "Sábado, 10 de outubro de 2026",
  timeLabel: "20h30",
  iso: "2026-10-10T20:30:00-03:00",
  rsvpUntil: "20 de setembro de 2026",
  venue: "House Eventos Sobradinho",
  address: "DF-440, Km 11 – Chácara Mric, Rota do Cavalo",
  city: "Sobradinho — DF",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=House+Eventos+Sobradinho+DF-440+Km+11+Sobradinho+DF",
  dress: "Traje social completo. Tons escuros e dourados são bem-vindos.",
  parking: "Estacionamento no local.",
  pixKey: "deboramichele@noite",
  letter: [
    "Há noites que cabem em um instante.",
    "Outras se tornam o começo de tudo o que vem depois.",
    "No dia em que Débora Michele completa mais um ciclo, queremos que você esteja presente — não apenas como convidado, mas como parte da memória.",
  ],
  program: [
    { time: "20h30", title: "Recepção", detail: "Boas-vindas, luz baixa e o primeiro brinde." },
    { time: "21h00", title: "Jantar", detail: "A mesa é o coração da noite." },
    { time: "22h30", title: "Palavras e bolo", detail: "Um instante só dela — e de quem a ama." },
    { time: "23h00", title: "A festa", detail: "Para quem quiser ficar até o último frame." },
  ],
  gifts: [
    {
      id: "viagem",
      title: "Uma contribuição para a viagem",
      description: "Para um destino que ainda vai virar história. Qualquer valor é um capítulo.",
    },
    {
      id: "jantar",
      title: "Um jantar para dois",
      description: "Uma mesa reservada, luz baixa, tempo demais. A noite depois da noite.",
    },
    {
      id: "perfume",
      title: "Um perfume que vira memória",
      description: "Fragrância autoral — o tipo de presente que se reconhece no ar, anos depois.",
    },
    {
      id: "joia",
      title: "Uma joia delicada",
      description: "Algo pequeno, de ouro ou pérola, para guardar a data junto ao pulso.",
    },
    {
      id: "spa",
      title: "Um dia inteiro de silêncio",
      description: "Spa, massagem, tempo sem relógio. Um presente que se sente no corpo.",
    },
    {
      id: "vinho",
      title: "Um vinho para o brinde",
      description: "Uma garrafa especial para abrir quando a sala estiver só dourada.",
    },
  ],
} as const;

export type GiftId = (typeof event.gifts)[number]["id"];
