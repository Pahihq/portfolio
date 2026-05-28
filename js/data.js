/** Контакты и внешние ссылки */
export const site = {
  name: "NSBUGS",
  title: "Ника Саблина | Портфолио графического дизайнера",
  description: "Работы графического дизайнера: айдентика, упаковка, постеры и визуальные концепции.",
  email: "cometa.nv.01@mail.ru",
  telegram: "https://t.me/N6Ssa",
};

/** Тексты интерфейса */
export const ui = {
  nav: {
    about: "Обо мне",
    contact: "Контакты",
  },
  hero: {
    captionLeft: "Привет, я Ника — российский дизайнер, люблю эксперименты и архивирование",
    captionRight: "*Цифровой дизайнер: создаю визуальные истории в брендинге и продуктовом дизайне",
  },
  works: {
    title: "Избранные работы",
    period: "2025 — 2026",
  },
  footer: {
    heading: "ДАВАЙ СВЯЖЕМСЯ :)",
    telegram: "Telegram",
    email: "Почта",
    backToTop: "Наверх",
    copied: "Скопировано!",
  },
  theme: {
    toggle: "Переключить светлую и тёмную тему",
  },
  a11y: {
    mainNav: "Основная навигация",
    breadcrumb: "Навигационная цепочка",
  },
  project: {
    home: "Главная",
    works: "Работы",
    year: "Год",
    services: "Услуги",
    format: "Формат",
    tools: "Инструменты",
    backHome: "← НА ГЛАВНУЮ",
    nextProject: "СЛЕДУЮЩИЙ ПРОЕКТ →",
  },
  notFound: {
    title: "Упс!",
    text: "Временно недоступно, но я скоро вернусь! Следите за обновлениями.",
    link: "На главную",
  },
};

const base = import.meta.env.BASE_URL;

/** Внутренние пути сайта (GitHub Pages: /portfolio/) */
export const paths = {
  home: base,
  about: `${base}#about`,
  contact: `${base}#contact`,
  works: `${base}#works`,
  notFound: `${base}404.html`,
  project: (slug) => `${base}${slug}/`,
};

export const marqueeWords = ["МНОГОГРАННАЯ", "ДИЗАЙНЕР", "МУЛЬТИДИСЦИПЛИНАРНАЯ", "РОССИЯ"];

const dovlatovBookImage = `${base}images/dovlatov-book.jpg`;
const dovlatovBookCover = `${base}images/dovlatov-book-cover.jpg`;
const skomorokhImage = `${base}images/skomorokh/skomorokh.jpg`;
const skomorokhCover = `${base}images/skomorokh/skomorokh-cover.jpg`;
const kollabaImage = `${base}images/kollaba/kollaba.jpg`;
const kollabaCover = `${base}images/kollaba/kollaba-cover.jpg`;
const journalImage = `${base}images/journal/journal.jpg`;
const journalCover = `${base}images/journal/journal-cover.jpg`;

export const works = [
  {
    slug: "redefine-foods",
    title: "Я СТАРАЛСЯ НО МЕНЯ НЕ НАПЕЧАТАЛИ",
    category: "Книжный дизайн / Вёрстка",
    year: "2026",
    thumb: dovlatovBookCover,
  },
  { slug: "alienography", title: "СКОМОРОХ", category: "Айдентика для циркового фестиваля", year: "2025", thumb: skomorokhCover },
  { slug: "neighborhood-design", title: "Измайловская библиотека", category: "Коллаборация · комиксы, книжная графика", year: "2026", thumb: kollabaCover },
  { slug: "park-me", title: "ОТ ГРАФФИТИ ДО ГАЛЕРЕИ", category: "Журнал / Вёрстка", year: "2025", thumb: journalCover },
];

export const projects = {
  "redefine-foods": {
    displayTitle: "Я СТАРАЛСЯ НО МЕНЯ НЕ НАПЕЧАТАЛИ",
    breadcrumbTitle: "Довлатов",
    subtitle: "Книга, посвящённая Сергею Довлатову",
    description:
      "Концептуальный подход: книга как цепочка коротких фраз и визуальных пауз, отражающая ироничный и честный тон Довлатова. Текст фрагментарен — так устроена память о человеке, которого мы знаем по обрывкам.",
    sections: [
      {
        title: "Визуальный стиль",
        text: "Визуальный стиль построен на минимализме и намеренно оставленном пустом пространстве как инструменте повествования: паузы работают так же, как слова.",
      },
      {
        title: "Название",
        text: "Название отсылает и к биографии Довлатова, и к универсальному опыту непризнанного автора.",
      },
    ],
    year: "2026",
    services: ["Вёрстка"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    images: [dovlatovBookImage],
  },
  "alienography": {
    displayTitle: "СКОМОРОХ",
    breadcrumbTitle: "Скоморох",
    subtitle: "Айдентика для циркового фестиваля",
    description:
      "Визуальная система для циркового фестиваля: айдентика, полиграфия и мерч, собранные в единый характерный образ.",
    year: "2025",
    servicesLabel: "Формат",
    services: ["Айдентика", "Полиграфия", "Мерч"],
    tools: ["Figma", "Illustrator", "Photoshop"],
    images: [skomorokhImage],
  },
  "neighborhood-design": {
    displayTitle: "Измайловская библиотека",
    breadcrumbTitle: "Измайловская библиотека",
    subtitle: "Коллаборация с библиотекой комиксов и книжной графики",
    description:
      "Коллаборация с Измайловской библиотекой комиксов и книжной графики: полиграфия и мерч, связанные с миром комикса и книжного визуала.",
    year: "2026",
    servicesLabel: "Формат",
    services: ["Полиграфия", "Мерч"],
    tools: ["Figma", "Illustrator", "Photoshop"],
    images: [kollabaImage],
  },
  "park-me": {
    displayTitle: "ЖУРНАЛ «ОТ ГРАФФИТИ ДО ГАЛЕРЕИ»",
    breadcrumbTitle: "От граффити до галереи",
    description:
      "Новый взгляд на стрит-арт — не как на вандализм, а как на форму современного искусства, бунта и манифеста.",
    year: "2025",
    services: ["Вёрстка"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    images: [journalImage],
  },
  "atoms": {
    displayTitle: "Atoms",
    description: "Образовательная платформа, которая помогает студентам объединяться в команды для совместных проектов и расширять профессиональные связи. Совместная работа с Leo Baek, Joy Ham и Sunjoo Park.",
    year: "07/2023",
    services: ["UI/UX дизайн"],
    tools: ["Figma", "Photoshop"],
    images: ["https://framerusercontent.com/images/2POFmcfrHMa8IQEDlX7LKNv602M.png?width=4000&height=2667", "https://framerusercontent.com/images/8iO7IjLPiPNoCqDfTKQsTv2EO8A.png?width=2200&height=1652", "https://framerusercontent.com/images/0DsSYmOgKcIQGow3D1lbdNRhQ8.png?width=2200&height=1652", "https://framerusercontent.com/images/Pgx7HSVCgTtyBxBxH1PtCtbriKU.png?width=4480&height=3360", "https://framerusercontent.com/images/3ZOXvP9NWGx8m3MzTGupXHsKA.png?width=4480&height=3360", "https://framerusercontent.com/images/lsXxMN60Nq9MM49drRE99xn2c.png?width=2200&height=1652", "https://framerusercontent.com/images/rZfQ2uct0yrrUl5xIjO4wRRWI.png?width=2200&height=1652", "https://framerusercontent.com/images/5DAjlofRQLEkeU9zXIFgZ3Na4.png?width=2200&height=1652", "https://framerusercontent.com/images/ix1rwoVHWdGew4Q9K2E9FBWq4.png?width=2200&height=1652", "https://framerusercontent.com/images/0D0c7OMWQgxpqi9BcYRZvzulpiA.png?width=4480&height=3360", "https://framerusercontent.com/images/fxRcPPIM83WS8jVFP7VycLJ2uXI.png?width=4480&height=3360", "https://framerusercontent.com/images/7G7ZdM42EK074hNvsPn047yMzOA.png?width=4480&height=3360"],
  },
  "miller-knoll": {
    displayTitle: "MillerKnoll",
    description: "Ребрендинг MKWRL (MillerKnoll Workplace Research Library) с концепцией «стопки файлов» — визуальной метафоры архива и накопленных знаний.",
    year: "04/2023",
    services: ["Айдентика"],
    tools: ["Illustrator", "After Effects", "Photoshop", "Figma"],
    images: ["https://framerusercontent.com/images/QQ2RIP7Tpj16SScwgvjBTmUYACA.png?width=4000&height=2667", "https://framerusercontent.com/images/z9G6sH8OKD0PTaXhV9KATRTIBDY.png?width=4480&height=3360", "https://framerusercontent.com/images/NwCLzofSjqzRfDP1a5JF9t989zE.png?width=2200&height=1652", "https://framerusercontent.com/images/yTVDcV5KddUhFgkHXEsCJqM.png?width=2200&height=1652", "https://framerusercontent.com/images/rl05F6VHRKpRWxW4g6PP4mtGwDE.png?width=4480&height=3360", "https://framerusercontent.com/images/cWEfxsq3FaS9KwBdL31Wml8XBs.png?width=2200&height=1652", "https://framerusercontent.com/images/gDx7Oz8mIaZHgoloQH3MiZmtBg.png?width=2200&height=1652", "https://framerusercontent.com/images/4YHGc3SIK92RvQW0ySygOVAk.png?width=4480&height=3360", "https://framerusercontent.com/images/CG5W9NV0W3Ew4EYp3CgiDAIkWFs.png?width=3480&height=2556", "https://framerusercontent.com/images/sEm8uhLHEXNy7jTth2rREawM1cI.jpg?width=4500&height=3000", "https://framerusercontent.com/images/jGft6zcWfHrV1cK1ZrE2XRGhXg.png?width=2441&height=1838", "https://framerusercontent.com/images/MLAc0e2HEtL9x6H38UlOZav3g.png?width=4000&height=4000"],
  },
  "spy": {
    displayTitle: "SPY",
    description: "Редизайн айдентики Международного музея шпионажа.",
    year: "04/2024",
    services: ["Айдентика"],
    tools: ["Photoshop", "Illustrator"],
    images: ["https://framerusercontent.com/images/NmBHSRwhBwsQyUMpzT4i8IYfUCM.png?width=1653&height=900", "https://framerusercontent.com/images/r2O4yaIVxuGBa2JFbTtPyjh8cQE.png?width=1339&height=898", "https://framerusercontent.com/images/OJIbbWEd1YXZbd1FTPVjHQjPvM.png?width=2200&height=1652", "https://framerusercontent.com/images/5GCOECQFjj54ztX3bSlO1cMvZPw.png?width=2200&height=1652", "https://framerusercontent.com/images/LwUJI5jVk80FVkDM7VSYr7US2YI.png?width=1277&height=953", "https://framerusercontent.com/images/FapSs5hkTdPpFKOktYz8T3cf89Y.png?width=1395&height=895", "https://framerusercontent.com/images/KQb3AKFFlxQW4muOailMbAHRetk.png?width=3480&height=2610", "https://framerusercontent.com/images/VIZbP5LoVaIjm7GQw2SGgB66o.png?width=1512&height=962", "https://framerusercontent.com/images/r5bB0T0TYOufn8wYPYK1ig0TKPM.png?width=611&height=818", "https://framerusercontent.com/images/Gkn7yZ3MyCJ3OkHmzzdJtRZaYCA.png?width=1335&height=804"],
  },
  "qahira": {
    displayTitle: "Qahira",
    description: "Qahira — парфюм, в каждой капле которого ощущается победа. Это не просто аромат, а напоминание жить моментом и опираться на внутреннюю силу.",
    year: "05/2023",
    services: ["Упаковка", "Айдентика"],
    tools: ["Figma", "Illustrator", "InDesign", "Photoshop"],
    images: ["https://framerusercontent.com/images/UJiUPK5jPu8g56FF5fl2BgDg64.png?width=3480&height=2610", "https://framerusercontent.com/images/gbAKBkunohowbwzkW8mz3akCY.png?width=4000&height=3200", "https://framerusercontent.com/images/T1Bf4yHtGlJ2VRoXoRmlvuSxI.png?width=2200&height=1652", "https://framerusercontent.com/images/rjpbZgPHPDoT2kgpi9FHL4B6b2s.png?width=2200&height=1652", "https://framerusercontent.com/images/5YREcnCz2uPFnGWb39bKDuKJNx0.png?width=4480&height=3360", "https://framerusercontent.com/images/MWOVihrKrn14JmILXGMUB1qxw.png?width=2200&height=1652", "https://framerusercontent.com/images/sdiPmbOC1hoWbHZfpesA9UADL0.png?width=2200&height=1652", "https://framerusercontent.com/images/vEuJlK6OYWrP6rP7XpMmC0nvMBk.png?width=4500&height=3000", "https://framerusercontent.com/images/V9gWkoGzE3vheIf8ERxOIYZL9Q.png?width=3480&height=2610", "https://framerusercontent.com/images/NLpag0PnsChqoPyF2jIHEfh8n1A.png?width=3480&height=2610", "https://framerusercontent.com/images/jxyc6v9rDwBUDAroMACRJIU3rck.png?width=4500&height=2924", "https://framerusercontent.com/images/pBsDq8yJfhvcixiRyRwald6mk.png?width=6000&height=4500"],
  },
  "go-go": {
    displayTitle: "GoGo",
    description: "Тревел-приложение, которое снижает стресс при планировании маршрута с несколькими точками для группы участников с разными расписаниями и бюджетами. Совместная работа с Sunjoo Park, Melody Yu, Sua Kim.",
    year: "06/2022",
    services: ["UI/UX дизайн"],
    tools: ["Figma", "Illustrator", "Photoshop"],
    images: ["https://framerusercontent.com/images/8Wsp6fprYA9ZDRzbmPkrkcbziMM.png?width=4480&height=3360", "https://framerusercontent.com/images/fKtyNGFeddlo81J8Y1h6Mi1FEk.png?width=4480&height=3360", "https://framerusercontent.com/images/NjwTmL7fD9t2lRLY2vJ9JtgrNWc.png?width=2200&height=1652", "https://framerusercontent.com/images/Olvdvk8klNBEd2J8MBpdqauNFw0.png?width=2200&height=1652", "https://framerusercontent.com/images/kJnccJkmsgGN1gRV7UzesO7FBc.png?width=2200&height=1652", "https://framerusercontent.com/images/ZdKCnLB8SghZWsw8aKxc0mmvCj4.png?width=2200&height=1652", "https://framerusercontent.com/images/KmBLrWyUyHDhOeZslzh03dw4KKQ.png?width=4480&height=3360", "https://framerusercontent.com/images/UXTP94LFNoF7qiASC6gyU0e9s.png?width=2200&height=1652", "https://framerusercontent.com/images/MFHSFdAGcy4GYHem2twpmBSYS4.png?width=2200&height=1652", "https://framerusercontent.com/images/JQ09UNx4nZoG6WNVgx9mtPmI48.png?width=2200&height=1652", "https://framerusercontent.com/images/LBZVvkD7ggsJDNNiW5vWIpWwQp4.png?width=2200&height=1652", "https://framerusercontent.com/images/45G7EqB1rmXmISr2TfuBwEpoMY.png?width=4480&height=3360"],
  },
  "wagging-hearts": {
    displayTitle: "Wagging Hearts",
    description: "Совместно с American Heart Association мы продвигали пользу активного образа жизни для сердца — и у владельцев собак, и у них самих. Поп-ап инсталляция мотивировала чаще гулять с питомцами. Совместная работа с Nicole Lee, Jason Ma.",
    year: "05/2023",
    services: ["Айдентика"],
    tools: ["Figma", "Illustrator", "Blender", "Photoshop"],
    images: ["https://framerusercontent.com/images/OZGW8TEQbTUtelBoznA9KrJyiug.png?width=4480&height=3360", "https://framerusercontent.com/images/j9TUKishpEH1RSWxFK7UsBJzaLM.png?width=2200&height=1652", "https://framerusercontent.com/images/51cK33XJmQCjfLCF9pvLp1FAxE.png?width=2200&height=1652", "https://framerusercontent.com/images/9jCY5QwOXvZ1mF0XbfODTArfsXQ.png?width=4480&height=3360", "https://framerusercontent.com/images/bFb0qGwY6G11bMoJWXosdPXY1I.png?width=4480&height=3360", "https://framerusercontent.com/images/FWKcEqnTkezXswOcL4In6b7iPdI.png?width=4000&height=3000", "https://framerusercontent.com/images/0qnVuOfMXja9mlxcCKsLVJoV798.png?width=4000&height=3000", "https://framerusercontent.com/images/O0AmFNvoOV7j26aiRysGJetiy8.png?width=4000&height=3000", "https://framerusercontent.com/images/96JMbWztU4IJbEihQnSETe2SXk.png?width=1276&height=951", "https://framerusercontent.com/images/2uubpC9sMWhj5CPCV07APCWcRM.png?width=4000&height=3000", "https://framerusercontent.com/images/uOarkRBlIZCw2T6fIl3OLKn1LE.png?width=4000&height=3000", "https://framerusercontent.com/images/tB2pV3aua9MpnMDoI3Z7NaExd0.png?width=4000&height=3000"],
  },
  "related-department": {
    displayTitle: "Related Department",
    description: "Развороты интервью со Scarlett Xin Meng — графическим дизайнером и креативным директором Related Department. Интервью провела Chaeree Lee.",
    year: "04/2024",
    services: ["Дизайн публикации"],
    tools: ["Интервью", "Photoshop", "InDesign", "Illustrator"],
    images: ["https://framerusercontent.com/images/R6P4sBLOp6VhzJw8DUYirvpeg.png?width=3500&height=3500", "https://framerusercontent.com/images/dw8WoRoukkGOESIw1NwhCkVmI.png?width=1516&height=1792", "https://framerusercontent.com/images/JWGJwmVjmAyFgt1uUzUHyjqKo.png?width=1643&height=1016", "https://framerusercontent.com/images/7Vy55rfZ1qbm9ZGjvjNPy2TxV0.png?width=3500&height=3500", "https://framerusercontent.com/images/auFZd5HzSm0BG1PCNSoysGPiJU.png?width=1512&height=1742", "https://framerusercontent.com/images/EJ8HKwuLkIehWJrZT3tFfQlt4.png?width=1514&height=1826"],
  },
  "blue-dragon": {
    displayTitle: "청룡",
    description: "Для новогодней вечеринки Korean Student Association создала цельный визуальный стиль мероприятия — от соцсетей до крупномасштабной motion-графики в духе года Синего Дракона.",
    year: "01/2024",
    services: ["3D-визуализация", "Инсталляция"],
    tools: ["Blender", "Premiere Pro", "Figma"],
    images: ["https://framerusercontent.com/images/AT3Mds29MwvNB0damgyCwEuKY.png?width=3841&height=2161", "https://framerusercontent.com/images/m0qpa0ZcX9DRowSv4BAqWrvCJ8.png?width=4480&height=3360", "https://framerusercontent.com/images/09PpNiNM3ZKxaqNudD72Uhczc.png?width=1710&height=1283", "https://framerusercontent.com/images/s8BLorAnmGrIKLhhdaYZRkcbCbw.png?width=1710&height=1283", "https://framerusercontent.com/images/g4eQqbziscAevR6YPqJklxCL0nM.png?width=1710&height=1250", "https://framerusercontent.com/images/b9N8YmMe2rrFcE6MsdoGR6wexE.png?width=1710&height=1283"],
  },
  "conversation": {
    displayTitle: "Conversation",
    description: "Визуальное исследование диалога между мной и мамой. В центре — её частая фраза: в жизни есть и хорошее, и плохое, но важно находить между ними баланс.",
    year: "12/2023",
    services: ["3D-моушн"],
    tools: ["Blender", "Premiere Pro", "Photoshop", "Figma"],
    images: ["https://framerusercontent.com/images/ZhpdF8ap1P7IaCK4ZIfM7n5KH4.png?width=1245&height=895", "https://framerusercontent.com/images/OYdAKbxXUDmDgT8uqqTQW41EAdM.png?width=1248&height=848", "https://framerusercontent.com/images/AnnlmoedP4W62niZ0QQHZoBQD88.png?width=1404&height=897", "https://framerusercontent.com/images/nhVg3B9uBP17kxS1dq5V5dv7Mkg.png?width=1248&height=874", "https://framerusercontent.com/images/rpnlKAp6X5bB5bZX3fnYr6FVkA.png?width=4480&height=3360", "https://framerusercontent.com/images/iY2vm3MgDHCUV1zqjB3bWEPAxM.png?width=1799&height=1216", "https://framerusercontent.com/images/qlfEJJFhkbe3T4HzCWLoKFOmc.png?width=2524&height=1780"],
  },
  "seen-and-unseen": {
    displayTitle: "Seen & Unseen",
    description: "Концепт музыкального фестиваля, который выводит на сцену недооценённых артистов и даёт им пространство для самовыражения.",
    year: "12/2024",
    services: ["Айдентика", "Концепт-дизайн"],
    tools: ["Illustrator", "Photoshop"],
    images: ["https://framerusercontent.com/images/4eFUbfz34UeMdxrRdgsKh0HVgg.png?width=4480&height=3360", "https://framerusercontent.com/images/ODFwD6uNV7Wun13mfd4uCm5RzD0.png?width=2200&height=1652", "https://framerusercontent.com/images/BnwfhUJAgKIW6vulZdpEkFhq9AI.png?width=2200&height=1652", "https://framerusercontent.com/images/zYrE4F40438nOc3nWSDTdBvUfI.png?width=1405&height=897", "https://framerusercontent.com/images/z1aZePpDRi3imk95fU1rtoYXZA.png?width=4000&height=3000", "https://framerusercontent.com/images/aPJsiHzRistRwYPaRf7TM6KESw.png?width=4500&height=3000", "https://framerusercontent.com/images/JIYNo7gHGKyNELnnhz5TpjJme4.png?width=3000&height=2200", "https://framerusercontent.com/images/faLnn8PRFgH3JNZhHX2Tnkybc.png?width=4000&height=3000", "https://framerusercontent.com/images/oYxNqPFQygZEDjqLfKliUGy95c.png?width=4000&height=3000"],
  },
};

export function getAdjacentProjects(slug) {
  const slugs = works.map((w) => w.slug);
  const index = slugs.indexOf(slug);
  if (index === -1) return { prev: null, next: null };
  return { prev: index > 0 ? slugs[index - 1] : null, next: index < slugs.length - 1 ? slugs[index + 1] : null };
}
