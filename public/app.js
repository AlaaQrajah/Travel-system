const fallbackData = {
  onboarding: {
    brand: {
      name: "Rihlati",
      arabicName: "رحلتي",
      tagline: "منصة الحجز الذكية",
    },
    total: 3,
    slides: [
      {
        id: "safe-booking",
        title: "بسهولة وأمان من خلال التطبيق",
        description:
          "كل التفاصيل قدامك من اختيار الرحلة لحد تأكيد الحجز. بياناتك محفوظة وحجزك مضمون بكل أمان.",
        accent: "travelers",
      },
      {
        id: "track-anywhere",
        title: "تابع مواعيد الرحلات من مكانك",
        description:
          "تابع مواعيد الرحلات من مكانك بسهولة، وشاهد التوقيتات المتاحة في أي لحظة بدون أي تعب.",
        accent: "route",
      },
      {
        id: "book-fast",
        title: "احجز رحلتك بثواني",
        description:
          "اختر الوجهة والوقت المناسبين لك، ثم أكمل الحجز بسرعة وبخطوات واضحة داخل التطبيق.",
        accent: "booking",
      },
    ],
  },
  trips: {
    filters: {
      origins: ["حلب"],
      destinations: ["دمشق", "حمص", "اللاذقية", "دير الزور", "الرقة"],
    },
    trips: [
      {
        id: "trip-1001",
        origin: "حلب",
        destination: "دمشق",
        routeLabel: "من حلب إلى دمشق",
        date: "2026-03-05",
        time: "10:30 AM",
        driverLabel: "المدير",
        price: 85000,
        seatsLeft: 9,
      },
      {
        id: "trip-1002",
        origin: "حلب",
        destination: "حمص",
        routeLabel: "من حلب إلى حمص",
        date: "2026-03-15",
        time: "10:30 AM",
        driverLabel: "المدير",
        price: 60000,
        seatsLeft: 6,
      },
      {
        id: "trip-1003",
        origin: "حلب",
        destination: "حمص",
        routeLabel: "من حلب إلى حمص",
        date: "2026-05-05",
        time: "10:30 AM",
        driverLabel: "المدير",
        price: 62000,
        seatsLeft: 11,
      },
      {
        id: "trip-1004",
        origin: "حلب",
        destination: "اللاذقية",
        routeLabel: "من حلب إلى اللاذقية",
        date: "2026-03-25",
        time: "10:30 AM",
        driverLabel: "المدير",
        price: 70000,
        seatsLeft: 7,
      },
    ],
  },
  roles: [
    {
      key: "passenger",
      label: "المسافر",
      description: "ابحث عن رحلتك واحجز بسهولة",
    },
    {
      key: "supervisor",
      label: "المشرف",
      description: "إدارة الشركات والنظام",
    },
    {
      key: "admin",
      label: "المدير",
      description: "إدارة الرحلات والحجوزات",
    },
  ],
};

const screenConfig = [
  {
    id: "splash",
    label: "شاشة البدء",
    note: "شاشة افتتاحية بنفس روح الألوان الموجودة في الصور مع شعار مركزي ومؤشر تحميل.",
  },
  {
    id: "onboarding-0",
    label: "تعريف 1",
    note: "تعرض الفكرة الأولى للتطبيق مع بطاقة بصرية كبيرة وزر دائري في الأسفل.",
  },
  {
    id: "onboarding-1",
    label: "تعريف 2",
    note: "تركّز على متابعة الرحلات من أي مكان مع نفس أسلوب العرض المتدرج.",
  },
  {
    id: "onboarding-2",
    label: "تعريف 3",
    note: "الرسالة الأخيرة قبل الانتقال لتسجيل الدخول أو بدء الاستخدام.",
  },
  {
    id: "login",
    label: "تسجيل الدخول",
    note: "نموذج دخول يحاكي البطاقة البنفسجية والعناصر الدائرية في لقطات الواجهة.",
  },
  {
    id: "register",
    label: "إنشاء حساب",
    note: "نموذج تسجيل كامل بالاسم والبريد وكلمة المرور ونوع الحساب كما في الصور.",
  },
  {
    id: "search",
    label: "البحث",
    note: "شاشة البحث عن الرحلات مع حقول الانطلاق والوجهة والتاريخ وزر رئيسي واضح.",
  },
  {
    id: "trips",
    label: "قائمة الرحلات",
    note: "تعرض بطاقات الرحلات المختصرة بالشكل العمودي نفسه الموجود في اللقطات.",
  },
  {
    id: "roles",
    label: "الأدوار",
    note: "لوحة أدوار تتضمن المسافر والمشرف والمدير مع بطاقة تنظيم سفلية.",
  },
];

const state = {
  currentScreen: "splash",
  onboarding: fallbackData.onboarding,
  trips: fallbackData.trips.trips,
  roles: fallbackData.roles,
  filters: fallbackData.trips.filters,
  filteredTrips: [],
  hasSearched: false,
  search: {
    origin: "",
    destination: "",
    date: "",
  },
  activeRole: "admin",
};

const phoneScreen = document.querySelector("#phoneScreen");
const screenSelector = document.querySelector("#screenSelector");
const screenNotes = document.querySelector("#screenNotes");
const apiStatus = document.querySelector("#apiStatus");
const toast = document.querySelector("#toast");

const icons = {
  arrow: `
    <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 12h14"></path>
      <path d="M13 5l7 7-7 7"></path>
    </svg>
  `,
  search: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="M20 20l-3.5-3.5"></path>
    </svg>
  `,
  user: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M4 20c1.7-3.3 4.4-5 8-5s6.3 1.7 8 5"></path>
    </svg>
  `,
  mail: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 6h16v12H4z"></path>
      <path d="M4 7l8 6 8-6"></path>
    </svg>
  `,
  lock: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2"></rect>
      <path d="M8 11V8a4 4 0 018 0v3"></path>
    </svg>
  `,
  shield: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-2.6 7.6-7 9-4.4-1.4-7-4.5-7-9V6l7-3z"></path>
      <path d="M9.5 12.5l1.7 1.7 3.8-4.2"></path>
    </svg>
  `,
  briefcase: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2"></rect>
      <path d="M9 7V5h6v2"></path>
      <path d="M3 12h18"></path>
    </svg>
  `,
};

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const brandMarkup = (compact = false) => `
  <div class="brand-logo ${compact ? "" : "brand-logo--hero"}">
    <span class="brand-mark">🚌</span>
    <div class="brand-copy">
      <strong>رحلتي</strong>
      <span>Rihlati</span>
    </div>
  </div>
`;

const roleIcon = (roleKey) => {
  if (roleKey === "supervisor") {
    return icons.shield;
  }

  if (roleKey === "admin") {
    return icons.briefcase;
  }

  return icons.user;
};

const formatPrice = (price) => `${new Intl.NumberFormat("en-US").format(price)} ل.س`;

const illustration = (accent) => {
  if (accent === "route") {
    return `
      <svg viewBox="0 0 320 260" role="img" aria-label="متابعة الرحلات">
        <defs>
          <linearGradient id="skyRoute" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#16337e" />
            <stop offset="100%" stop-color="#53a1ff" />
          </linearGradient>
          <linearGradient id="fieldRoute" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#a0bf33" />
            <stop offset="100%" stop-color="#d5c55c" />
          </linearGradient>
        </defs>
        <rect width="320" height="260" fill="url(#skyRoute)"></rect>
        <circle cx="92" cy="62" r="28" fill="#ffd871" opacity="0.95"></circle>
        <path d="M0 162h320v98H0z" fill="url(#fieldRoute)"></path>
        <path d="M36 260L170 132l54 0 60 128z" fill="#5d6880"></path>
        <path d="M112 260L207 160l28 0 28 100z" fill="#f4f8ff"></path>
        <rect x="142" y="108" width="86" height="46" rx="12" fill="#f6fbff"></rect>
        <rect x="150" y="116" width="54" height="19" rx="6" fill="#a8d5ff"></rect>
        <rect x="148" y="154" width="20" height="12" rx="6" fill="#273261"></rect>
        <rect x="204" y="154" width="20" height="12" rx="6" fill="#273261"></rect>
        <path d="M34 136c48-8 76-8 118 0" stroke="#2d6add" stroke-width="5" stroke-linecap="round" opacity="0.65"></path>
      </svg>
    `;
  }

  if (accent === "booking") {
    return `
      <svg viewBox="0 0 320 260" role="img" aria-label="حجز سريع">
        <defs>
          <linearGradient id="skyBook" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#112e7b" />
            <stop offset="100%" stop-color="#2f6ae1" />
          </linearGradient>
        </defs>
        <rect width="320" height="260" fill="url(#skyBook)"></rect>
        <circle cx="62" cy="74" r="32" fill="#ffdf7d" opacity="0.95"></circle>
        <path d="M0 194h320v66H0z" fill="#5c9d3f"></path>
        <path d="M0 230l120-68h36l-60 98H0z" fill="#2f3247"></path>
        <path d="M48 152h218a16 16 0 0116 16v40H32v-36a20 20 0 0116-20z" fill="#f7fbff"></path>
        <rect x="68" y="166" width="126" height="22" rx="8" fill="#aad2ff"></rect>
        <rect x="208" y="176" width="44" height="18" rx="4" fill="#dbeeff"></rect>
        <circle cx="86" cy="208" r="18" fill="#22315b"></circle>
        <circle cx="240" cy="208" r="18" fill="#22315b"></circle>
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 320 260" role="img" aria-label="سهولة وأمان">
      <defs>
        <linearGradient id="skyTravel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0d285f" />
          <stop offset="100%" stop-color="#4e9cff" />
        </linearGradient>
      </defs>
      <rect width="320" height="260" fill="url(#skyTravel)"></rect>
      <rect x="24" y="48" width="272" height="164" rx="24" fill="#0b173e" opacity="0.24"></rect>
      <rect x="38" y="62" width="244" height="136" rx="22" fill="#1b3d74"></rect>
      <rect x="48" y="72" width="224" height="116" rx="18" fill="#cce9ff"></rect>
      <path d="M48 164c48-38 82-54 112-54 36 0 68 14 112 52v26H48z" fill="#15244b"></path>
      <rect x="158" y="102" width="84" height="38" rx="12" fill="#f6fbff"></rect>
      <rect x="166" y="110" width="50" height="16" rx="5" fill="#a9d6ff"></rect>
      <circle cx="178" cy="144" r="10" fill="#26325f"></circle>
      <circle cx="224" cy="144" r="10" fill="#26325f"></circle>
      <circle cx="106" cy="132" r="28" fill="#d78356"></circle>
      <circle cx="106" cy="125" r="18" fill="#f5d8c3"></circle>
      <path d="M80 172c8-22 20-32 36-32s28 10 36 32" fill="#4f6ce0"></path>
      <circle cx="154" cy="122" r="30" fill="#c98c64"></circle>
      <circle cx="154" cy="114" r="18" fill="#f5d8c3"></circle>
      <path d="M126 172c10-22 23-32 39-32s29 10 39 32" fill="#9b7f7c"></path>
    </svg>
  `;
};

const setScreen = (screenId) => {
  state.currentScreen = screenId;
  renderSelector();
  renderNotes();
  renderScreen();
};

const renderSelector = () => {
  screenSelector.innerHTML = screenConfig
    .map(
      (screen) => `
        <button
          class="screen-chip ${screen.id === state.currentScreen ? "is-active" : ""}"
          type="button"
          data-action="set-screen"
          data-screen="${screen.id}"
        >
          ${screen.label}
        </button>
      `,
    )
    .join("");
};

const renderNotes = () => {
  const selected = screenConfig.find((screen) => screen.id === state.currentScreen);
  screenNotes.textContent = selected ? selected.note : "";
};

const renderStatus = () => {
  apiStatus.innerHTML = `
    <div class="status-card">
      <strong>${state.onboarding.slides.length}</strong>
      <span>شرائح تعريف</span>
    </div>
    <div class="status-card">
      <strong>${state.trips.length}</strong>
      <span>رحلات متاحة</span>
    </div>
    <div class="status-card">
      <strong>${state.roles.length}</strong>
      <span>أدوار النظام</span>
    </div>
  `;
};

const renderScreen = () => {
  if (state.currentScreen === "splash") {
    phoneScreen.innerHTML = renderSplash();
    return;
  }

  if (state.currentScreen.startsWith("onboarding-")) {
    const slideIndex = Number(state.currentScreen.split("-")[1]);
    phoneScreen.innerHTML = renderOnboarding(slideIndex);
    return;
  }

  if (state.currentScreen === "login") {
    phoneScreen.innerHTML = renderAuth("login");
    return;
  }

  if (state.currentScreen === "register") {
    phoneScreen.innerHTML = renderAuth("register");
    return;
  }

  if (state.currentScreen === "search") {
    phoneScreen.innerHTML = renderSearch();
    return;
  }

  if (state.currentScreen === "roles") {
    phoneScreen.innerHTML = renderRoles();
    return;
  }

  phoneScreen.innerHTML = renderTrips();
};

const renderSplash = () => `
  <section class="screen splash-screen">
    ${brandMarkup()}
    <p>${escapeHtml(state.onboarding.brand.tagline)}</p>
    <div class="progress-bar" aria-label="جاري التحميل">
      <span></span>
    </div>
  </section>
`;

const renderOnboarding = (index) => {
  const slide = state.onboarding.slides[index] || state.onboarding.slides[0];
  const nextScreen = index >= state.onboarding.slides.length - 1 ? "login" : `onboarding-${index + 1}`;

  return `
    <section class="screen onboarding-screen">
      <div class="screen-header">
        <button type="button" class="circle-button" data-action="set-screen" data-screen="${nextScreen}">
          ${icons.arrow}
        </button>
        <button type="button" class="skip-link" data-action="set-screen" data-screen="login">تخطي</button>
      </div>

      <div class="illustration-card">
        ${illustration(slide.accent)}
      </div>

      <div class="feature-copy">
        <h2>${escapeHtml(slide.title)}</h2>
        <p>${escapeHtml(slide.description)}</p>
      </div>

      <div class="pager" aria-label="مؤشر الشرائح">
        ${state.onboarding.slides
          .map((_, slideIndex) => `<span class="${slideIndex === index ? "is-active" : ""}"></span>`)
          .join("")}
      </div>

      <button type="button" class="circle-button circle-button--large" data-action="set-screen" data-screen="${nextScreen}">
        ${icons.arrow}
      </button>
    </section>
  `;
};

const renderAuthField = ({ label, name, type = "text", icon, placeholder, options }) => {
  if (type === "select") {
    return `
      <label class="field-group">
        <span class="field-label">${escapeHtml(label)}</span>
        <span class="input-shell">
          ${icon}
          <select name="${escapeHtml(name)}" required>
            <option value="">نوع الحساب</option>
            ${options
              .map(
                (option) =>
                  `<option value="${escapeHtml(option.key)}">${escapeHtml(option.label)}</option>`,
              )
              .join("")}
          </select>
        </span>
      </label>
    `;
  }

  return `
    <label class="field-group">
      <span class="field-label">${escapeHtml(label)}</span>
      <span class="input-shell">
        ${icon}
        <input type="${escapeHtml(type)}" name="${escapeHtml(name)}" placeholder="${escapeHtml(placeholder)}" required />
      </span>
    </label>
  `;
};

const renderAuth = (mode) => {
  const isRegister = mode === "register";
  const fields = isRegister
    ? [
        {
          label: "الاسم الكامل",
          name: "fullName",
          icon: icons.user,
          placeholder: "الاسم",
        },
        {
          label: "البريد الإلكتروني",
          name: "email",
          type: "email",
          icon: icons.mail,
          placeholder: "أدخل بريدك الإلكتروني",
        },
        {
          label: "كلمة المرور",
          name: "password",
          type: "password",
          icon: icons.lock,
          placeholder: "أدخل كلمة المرور",
        },
        {
          label: "تأكيد كلمة المرور",
          name: "confirmPassword",
          type: "password",
          icon: icons.lock,
          placeholder: "أعد إدخال كلمة المرور",
        },
        {
          label: "نوع الحساب",
          name: "role",
          type: "select",
          icon: icons.user,
          options: state.roles,
        },
      ]
    : [
        {
          label: "البريد الإلكتروني",
          name: "email",
          type: "email",
          icon: icons.mail,
          placeholder: "أدخل بريدك الإلكتروني",
        },
        {
          label: "كلمة المرور",
          name: "password",
          type: "password",
          icon: icons.lock,
          placeholder: "أدخل كلمة المرور",
        },
      ];

  return `
    <section class="screen auth-screen">
      <div class="auth-intro">
        ${brandMarkup()}
        <p>تسجيل دخول أو إنشاء حساب</p>
      </div>

      <div class="auth-card">
        <button type="button" class="auth-close" data-action="set-screen" data-screen="splash" aria-label="إغلاق">×</button>
        <h2>${isRegister ? "إنشاء حساب" : "تسجيل الدخول"}</h2>

        <form class="form-stack" id="authForm" data-mode="${mode}">
          ${fields.map(renderAuthField).join("")}

          ${
            isRegister
              ? ""
              : `
                <div class="inline-options">
                  <button type="button" class="ghost-link">نسيت كلمة المرور؟</button>
                  <label class="remember-line">
                    <input type="checkbox" name="rememberMe" />
                    <span>تذكرني</span>
                  </label>
                </div>
              `
          }

          <button type="submit" class="primary-button">${isRegister ? "إنشاء الحساب" : "تسجيل دخول"}</button>

          <p class="switch-copy">
            ${
              isRegister
                ? 'لديك حساب بالفعل؟ <button type="button" data-action="set-screen" data-screen="login">تسجيل الدخول</button>'
                : 'ليس لديك حساب؟ <button type="button" data-action="set-screen" data-screen="register">إنشاء حساب جديد</button>'
            }
          </p>
        </form>
      </div>
    </section>
  `;
};

const renderSearch = () => `
  <section class="screen search-screen">
    <div class="title-row">
      <span class="bus-emoji">🚌</span>
      <h2>احجز رحلتك بسهولة</h2>
    </div>
    <p class="support-copy">اختر مكان الانطلاق والوجهة ثم ابدأ البحث بالتصميم نفسه الظاهر في الواجهة المرجعية.</p>

    <form id="searchForm" class="search-card">
      <label class="field-group">
        <span class="field-label">مكان الانطلاق</span>
        <span class="input-shell">
          ${icons.arrow}
          <select name="origin" required>
            <option value="">من ...</option>
            ${state.filters.origins
              .map(
                (origin) =>
                  `<option value="${escapeHtml(origin)}" ${origin === state.search.origin ? "selected" : ""}>${escapeHtml(origin)}</option>`,
              )
              .join("")}
          </select>
        </span>
      </label>

      <label class="field-group">
        <span class="field-label">الوجهة</span>
        <span class="input-shell">
          ${icons.arrow}
          <select name="destination" required>
            <option value="">إلى ...</option>
            ${state.filters.destinations
              .map(
                (destination) =>
                  `<option value="${escapeHtml(destination)}" ${destination === state.search.destination ? "selected" : ""}>${escapeHtml(destination)}</option>`,
              )
              .join("")}
          </select>
        </span>
      </label>

      <label class="field-group">
        <span class="field-label">تاريخ الرحلة</span>
        <span class="input-shell">
          ${icons.lock}
          <input type="date" name="date" value="${escapeHtml(state.search.date)}" />
        </span>
      </label>

      <button type="submit" class="primary-button">بحث</button>
    </form>
  </section>
`;

const currentTrips = () => (state.hasSearched ? state.filteredTrips : state.trips);

const renderTrips = () => {
  const trips = currentTrips();

  return `
    <section class="screen trips-screen">
      <div class="title-row">
        <span class="bus-emoji">🚌</span>
        <h2>احجز رحلتك بسهولة</h2>
      </div>

      <div class="mini-search">
        <button type="button" class="circle-button" data-action="set-screen" data-screen="search" aria-label="العودة للبحث">
          ${icons.search}
        </button>
        <span>${escapeHtml(
          state.search.origin && state.search.destination
            ? `${state.search.origin} ← ${state.search.destination}`
            : "عرض الرحلات المتاحة",
        )}</span>
      </div>

      <div class="trip-list">
        ${
          trips.length
            ? trips
                .map(
                  (trip) => `
                    <article class="trip-card">
                      <div class="trip-avatar">${icons.briefcase}</div>
                      <div class="trip-meta">
                        <div class="trip-route">${escapeHtml(trip.routeLabel)}</div>
                        <div class="trip-subline">🗓 ${escapeHtml(trip.date)} • ${escapeHtml(trip.time)}</div>
                        <div class="trip-subline">${escapeHtml(trip.driverLabel)} • ${trip.seatsLeft} مقاعد</div>
                        <div class="trip-price">${escapeHtml(formatPrice(trip.price))}</div>
                      </div>
                      <button type="button" class="trip-plus" data-action="book-trip" data-trip-id="${trip.id}" aria-label="إضافة الرحلة">+</button>
                    </article>
                  `,
                )
                .join("")
            : `
              <div class="empty-state">
                <strong>لا توجد نتائج مطابقة.</strong>
                <button type="button" class="primary-button" data-action="set-screen" data-screen="search">العودة للبحث</button>
              </div>
            `
        }
      </div>
    </section>
  `;
};

const renderRoles = () => `
  <section class="screen roles-screen">
    <div class="roles-topbar">
      <div>
        <strong>رحلتي</strong>
        <small>منصة الحجز الذكية</small>
      </div>
      <div class="role-actions">
        ${state.roles
          .map(
            (role) => `
              <button
                type="button"
                class="role-pill ${role.key === state.activeRole ? "is-active" : ""}"
                data-action="activate-role"
                data-role="${role.key}"
              >
                ${escapeHtml(role.label)}
              </button>
            `,
          )
          .join("")}
      </div>
    </div>

    <div class="role-grid">
      ${state.roles
        .map(
          (role, index) => `
            <article
              class="role-card ${role.key === state.activeRole ? "is-active" : ""} ${index === 2 ? "role-card--wide" : ""}"
              data-action="activate-role"
              data-role="${role.key}"
            >
              <span class="role-icon">${roleIcon(role.key)}</span>
              <h3>${escapeHtml(role.label)}</h3>
              <p>${escapeHtml(role.description)}</p>
            </article>
          `,
        )
        .join("")}
    </div>

    <div class="schedule-board">
      <div class="board-tabs">
        <span></span>
        <span></span>
        <span class="is-active"></span>
      </div>
      <div class="board-grid">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="screen-footer">
      <button type="button" class="primary-button" data-action="set-screen" data-screen="search">رجوع</button>
    </div>
  </section>
`;

const request = async (url, options) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};

const loadData = async () => {
  try {
    const [onboardingResponse, tripsResponse, rolesResponse] = await Promise.all([
      request("/api/onboarding"),
      request("/api/trips"),
      request("/api/roles"),
    ]);

    state.onboarding = onboardingResponse.data || fallbackData.onboarding;
    state.trips = tripsResponse.data?.trips || fallbackData.trips.trips;
    state.filters = tripsResponse.data?.filters || fallbackData.trips.filters;
    state.roles = rolesResponse.data || fallbackData.roles;
  } catch {
    showToast("تم تحميل النسخة الاحتياطية للواجهة.", true);
  }
};

const showToast = (message, muted = false) => {
  toast.textContent = message;
  toast.style.background = muted ? "rgba(20, 31, 91, 0.85)" : "rgba(8, 16, 70, 0.96)";
  toast.classList.add("is-visible");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
};

const handleAuthSubmit = async (event) => {
  event.preventDefault();
  const form = event.target;
  const mode = form.dataset.mode;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  if (mode === "login") {
    payload.rememberMe = formData.get("rememberMe") === "on";
  }

  try {
    const response = await request(`/api/auth/${mode === "login" ? "login" : "register"}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const redirectTo = response.data?.ui?.redirectTo || "search";
    showToast(response.message || "تمت العملية بنجاح.");
    setScreen(redirectTo);
  } catch {
    showToast("تعذر تنفيذ الطلب. تحقق من البيانات.", true);
  }
};

const handleSearchSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData.entries());

  state.search = {
    origin: payload.origin,
    destination: payload.destination,
    date: payload.date,
  };

  if (!payload.date) {
    delete payload.date;
  }

  try {
    const response = await request("/api/trips/search", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    state.hasSearched = true;
    state.filteredTrips = response.data?.trips || [];
    showToast(`تم العثور على ${response.data?.total || 0} رحلة.`);
  } catch {
    state.hasSearched = true;
    state.filteredTrips = [];
    showToast("تعذر تنفيذ البحث الآن.", true);
  }

  setScreen("trips");
};

phoneScreen.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  const action = actionElement.dataset.action;

  if (action === "set-screen") {
    setScreen(actionElement.dataset.screen);
    return;
  }

  if (action === "activate-role") {
    state.activeRole = actionElement.dataset.role;
    renderScreen();
    return;
  }

  if (action === "book-trip") {
    showToast(`تمت إضافة الرحلة ${actionElement.dataset.tripId} إلى الحجز.`);
  }
});

phoneScreen.addEventListener("submit", (event) => {
  if (event.target.id === "authForm") {
    handleAuthSubmit(event);
    return;
  }

  if (event.target.id === "searchForm") {
    handleSearchSubmit(event);
  }
});

screenSelector.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='set-screen']");

  if (!button) {
    return;
  }

  setScreen(button.dataset.screen);
});

const boot = async () => {
  await loadData();
  renderSelector();
  renderNotes();
  renderStatus();
  renderScreen();
};

boot();
