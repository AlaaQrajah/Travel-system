const slides = [
  {
    id: "safe-booking",
    title: "بسهولة وأمان من خلال التطبيق",
    description:
      "كل التفاصيل قدامك من اختيار الرحلة لحد تأكيد الحجز. بياناتك محفوظة وحجزك مضمون بكل أمان.",
    accent: "travelers",
    ctaLabel: "التالي",
  },
  {
    id: "track-anywhere",
    title: "تابع مواعيد الرحلات من مكانك",
    description:
      "تابع مواعيد الرحلات من مكانك بسهولة، وشاهد التوقيتات المتاحة في أي لحظة بدون أي تعب.",
    accent: "route",
    ctaLabel: "التالي",
  },
  {
    id: "book-fast",
    title: "احجز رحلتك بثواني",
    description:
      "اختر الوجهة والوقت المناسبين لك، ثم أكمل الحجز بسرعة وبخطوات واضحة داخل التطبيق.",
    accent: "booking",
    ctaLabel: "ابدأ الآن",
  },
];

const getSlides = () => ({
  brand: {
    name: "Rihlati",
    arabicName: "رحلتي",
    tagline: "منصة الحجز الذكية",
  },
  progressStyle: "gradient",
  total: slides.length,
  slides,
});

module.exports = {
  getSlides,
};
