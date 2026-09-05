/**
 * Bilik Yarışı — sual məlumatları
 *
 * Yeni sual əlavə etmək üçün eyni obyekt formasından istifadə edin:
 * { category, value, question, answer }
 *
 * Kateqoriya sırası CATEGORY_ORDER massivi ilə idarə olunur.
 */

const VALUES = [10, 20, 30, 40, 50];

const CATEGORY_ORDER = [
  "BİRİNCİ MÖVZU",
  "COĞRAFİYA",
  "ŞƏHƏRİN ADI",
  "MEYVƏ-TƏRƏVƏZ",
  "GEYİM",
  "K-DAN K-YA",
];

const QUESTIONS = [
  // BİRİNCİ MÖVZU
  {
    category: "BİRİNCİ MÖVZU",
    value: 10,
    question: "Azərbaycan Respublikasının dövlət dili hansıdır?",
    answer: "Azərbaycan dili",
  },
  {
    category: "BİRİNCİ MÖVZU",
    value: 20,
    question: "Azərbaycanın milli valyutası nə adlanır?",
    answer: "Manat",
  },
  {
    category: "BİRİNCİ MÖVZU",
    value: 30,
    question: "Azərbaycanın dövlət bayrağında hansı rənglər var?",
    answer: "Mavi, qırmızı və yaşıl",
  },
  {
    category: "BİRİNCİ MÖVZU",
    value: 40,
    question: "Azərbaycanın dövlət müstəqilliyi hansı ildə bərpa edilmişdir?",
    answer: "1991-ci il",
  },
  {
    category: "BİRİNCİ MÖVZU",
    value: 50,
    question: "Azərbaycan Respublikasının Dövlət Himninin musiqisi kimə məxsusdur?",
    answer: "Üzeyir Hacıbəyli",
  },

  // COĞRAFİYA
  {
    category: "COĞRAFİYA",
    value: 10,
    question: "Azərbaycan neçə ölkə ilə quru sərhədə malikdir?",
    answer: "5 ölkə",
  },
  {
    category: "COĞRAFİYA",
    value: 20,
    question: "Azərbaycanın paytaxtı hansı şəhərdir?",
    answer: "Bakı",
  },
  {
    category: "COĞRAFİYA",
    value: 30,
    question: "Azərbaycanın ən uzun çayı hansıdır?",
    answer: "Kür",
  },
  {
    category: "COĞRAFİYA",
    value: 40,
    question: "Azərbaycanın ən yüksək zirvəsi hansıdır?",
    answer: "Bazardüzü",
  },
  {
    category: "COĞRAFİYA",
    value: 50,
    question: "Xəzər dənizi coğrafi baxımdan əslində nə hesab olunur?",
    answer: "Dünyanın ən böyük gölü",
  },

  // ŞƏHƏRİN ADI
  {
    category: "ŞƏHƏRİN ADI",
    value: 10,
    question: "Azərbaycan Respublikasının paytaxt şəhərinin adı nədir?",
    answer: "Bakı",
  },
  {
    category: "ŞƏHƏRİN ADI",
    value: 20,
    question: "“Küləklər şəhəri” kimi tanınan şəhər hansıdır?",
    answer: "Bakı",
  },
  {
    category: "ŞƏHƏRİN ADI",
    value: 30,
    question: "Naxçıvan Muxtar Respublikasının paytaxtı hansı şəhərdir?",
    answer: "Naxçıvan",
  },
  {
    category: "ŞƏHƏRİN ADI",
    value: 40,
    question: "Qarabağın mədəni paytaxtı hesab olunan şəhər hansıdır?",
    answer: "Şuşa",
  },
  {
    category: "ŞƏHƏRİN ADI",
    value: 50,
    question: "Azərbaycanın ikinci ən böyük şəhəri hansıdır?",
    answer: "Gəncə",
  },

  // MEYVƏ-TƏRƏVƏZ
  {
    category: "MEYVƏ-TƏRƏVƏZ",
    value: 10,
    question: "Qırmızı rəngli, şirin-turş dadlı, salata tez-tez qatılan tərəvəz hansıdır?",
    answer: "Pomidor",
  },
  {
    category: "MEYVƏ-TƏRƏVƏZ",
    value: 20,
    question: "Yaşıl rəngli, uzunsov, yay süfrəsinin əvəzolunmaz tərəvəzi hansıdır?",
    answer: "Xiyar",
  },
  {
    category: "MEYVƏ-TƏRƏVƏZ",
    value: 30,
    question: "Qarpızın sarı-narıncı rəngli yaxın qohumu hansı meyvədir?",
    answer: "Yemiş",
  },
  {
    category: "MEYVƏ-TƏRƏVƏZ",
    value: 40,
    question: "Azərbaycanda “meyvələrin şahı” sayılan, qırmızı dənəli meyvə hansıdır?",
    answer: "Nar",
  },
  {
    category: "MEYVƏ-TƏRƏVƏZ",
    value: 50,
    question: "Sarımtıl, ətirli və bərk, mürəbbəsi məşhur olan meyvə hansıdır?",
    answer: "Heyva",
  },

  // GEYİM
  {
    category: "GEYİM",
    value: 10,
    question: "Ayağa geyilən, cüt olan geyim nə adlanır?",
    answer: "Ayaqqabı",
  },
  {
    category: "GEYİM",
    value: 20,
    question: "Soyuq havada əlləri isidən geyim nədir?",
    answer: "Əlcək",
  },
  {
    category: "GEYİM",
    value: 30,
    question: "Boyun ətrafına dolanan qış geyimi nə adlanır?",
    answer: "Şərf",
  },
  {
    category: "GEYİM",
    value: 40,
    question: "Azərbaycan milli kişi baş geyimi nə adlanır?",
    answer: "Papaq",
  },
  {
    category: "GEYİM",
    value: 50,
    question: "Azərbaycanın milli ipək qadın baş örtüyü nə adlanır?",
    answer: "Kəlağayı",
  },

  // K-DAN K-YA
  {
    category: "K-DAN K-YA",
    value: 10,
    question: "Havada əsir, “K” hərfi ilə başlayır və “K” ilə bitir. Bu nədir?",
    answer: "Külək",
  },
  {
    category: "K-DAN K-YA",
    value: 20,
    question: "Çiçəkdən-çiçəyə uçan, “K”dən “K”yə olan həşərat hansıdır?",
    answer: "Kəpənək",
  },
    {
    category: "K-DAN K-YA",
    value: 400,
    question: "Yair?",
    answer: "dsdüs",
  },
  {
    category: "K-DAN K-YA",
    value: 30,
    question: "Gözün qapağındakı tükdür, “K”dən “K”yə. Bu nədir?",
    answer: "Körpük",
  },
  {
    category: "K-DAN K-YA",
    value: 40,
    question: "Yardım, imdad mənasında işlənən, “K”dən “K”yə olan söz nədir?",
    answer: "Kömək",
  },
  {
    category: "K-DAN K-YA",
    value: 400,
    question: "Yair?",
    answer: "dsdüs",
  },
  {
    category: "K-DAN K-YA",
    value: 50,
    question: "Dağlarda yaşayan, “K”dən “K”yə olan quş hansıdır?",
    answer: "Kəklik",
  },
];

function cellId(category, value) {
  return `${category}::${value}`;
}

function getQuestion(category, value) {
  return QUESTIONS.find((item) => item.category === category && item.value === value) ?? null;
}

window.Bilik = {
  VALUES,
  CATEGORY_ORDER,
  QUESTIONS,
  cellId,
  getQuestion,
};
