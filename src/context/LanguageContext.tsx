import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'CZ' | 'EN' | 'UA';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  urlPrefix: string;
}

const translations: Record<Language, Record<string, string>> = {
  CZ: {
    home: 'Domů', gallery: 'Galerie', about: 'O nás', book: 'Rezervovat',
    hero_title: 'ARCHIV TEKUTÉHO UMĚNÍ', hero_sub: 'Prémiový barový catering od roku 2010',
    hero_p: 'Zažijte dokonalý mobilní barový servis šitý na míru pro elitní akce.',
    mood_finder: 'Hledač nálady', mood_p: 'Řekněte nám svou náladu, mi navrhneme mistrovské dílo.',
    services: 'Luxusní koncepty', inquiry: 'Poptávka', name: 'Jméno', email: 'Email',
    date: 'Datum akce', guests: 'Počet hostů', vision: 'Vaše vize a detaily akce...',
    submit: 'Odeslat poptávku', collection: 'Archiv koktejlů', view_details: 'Zobrazit detaily',
    sweet: 'Sladká', strong: 'Silná', fresh: 'Svěží', bitter: 'Hořká', recommend: 'Doporučujeme:',
    experience: 'Zkušenosti', weddings: 'Svatby', menu_items: 'Položky menu', years: 'let',
    office: 'Kancelář Praha', est: 'ZALOŽENO 2010 • PRAHA',
    footer_city: 'Praha',
    cat_all: 'Vše', cat_weddings: 'Svatby', cat_corporate: 'Firemní akce', cat_mixology: 'Mixologie',
    cat_bars: 'Bary', cat_experience: 'Zážitky', cat_catering: 'Catering',
    gallery_h1: 'VIZUÁLNÍ KOLEKCE', gallery_p: 'Výběr našich nejlepších momentů.',
    footer_mastery: 'MISTROVSTVÍ V MIXOLOGII OD ROKU 2010', footer_explore: 'PROZKOUMAT',
    footer_social: 'SOCIÁLNÍ SÍTĚ', instagram: 'Instagram', facebook: 'Facebook', 
    footer_contact: 'Kontakt', footer_rights: 'VŠECHNA PRÁVA VYHRAZENA.',
    footer_terms: 'Zásady ochrany osobních údajů',
    privacy_policy: 'Zásady ochrany osobních údajů',
    inquiry_h2: 'POŽÁDEJTE o ZÁŽITEK',
    inquiry_p: 'Poskytujeme celostátní barový catering od roku 2010. Vyplňte formulář.',
    contact_h1: 'KONTAKTUJTE NÁS',
    contact_tag: 'PŘÍMÁ LINKA',
    contact_p: 'Máte dotaz nebo chcete probrat svůj projekt? Jsme tu pro vás.',
    // Calculator
    calc_tag: 'Naplánujte svou akci', calc_h2: 'KALKULAČKA CATERINGU',
    calc_p: 'Okamžitě odhadněte požadavky pro váš barový zážitek na míru.',
    calc_guests: 'Hosté', calc_hours: 'Délka servisu',
    res_cocktails: 'Odhad koktejlů', res_bars: 'Cateringové bary',
    res_staff: 'Celý servisní tým', res_note: '* Toto je profesionální odhad pro standardní servis.',
    // Taste Profiler
    tp_tag: 'SYSTÉM ONLINE // v2.0.4', tp_h2: 'KALIBRAČNÍ MOTOR CHUTĚ',
    tp_p: 'Definujte svou chuťovou architekturu. Systém syntetizuje vlastní plán menu a doporučí ideální barové nastavení.',
        tp_sweet: 'SLADKÁ', tp_sour: 'KYSELÁ', tp_strong: 'SILNÁ', tp_smoky: 'KOUŘOVÁ', tp_herbal: 'BYLINKOVÁ',
        tp_fruity: 'OVOCNÁ', tp_bitter: 'HOŘKÁ',
                ingredients_list: 'SEZNAM INGREDIENCÍ',
                collections: 'KOLEKCE',
                units_detected: 'JEDNOTEK_DETEKOVÁNO',
                back_to_collection: 'ZPĚT_DO_KOLEKCE',
            
            tp_blueprint: 'VÝSTUPNÍ_PLÁN.EXE',
        
     tp_profile_id: 'ID PROFILU',
    tp_architecture: 'GENEROVANÁ ARCHITEKTURA', tp_base: 'DOPORUČENÝ ZÁKLAD',
    tp_vessel: 'SKLENICE', tp_integration: 'OPTIMÁLNÍ INTEGRACE SLUŽEB',
    tp_initialize: 'INICIALIZOVAT NASTAVENÍ',
    // Service Detail
    sd_not_found: 'Koncept nenalezen', sd_luxury_concept: 'LUXUSNÍ_KONCEPT',
    sd_vision_text: 'Neservírujeme jen nápoje; tvoříme atmosféru. Každé nastavení {title} je zakázková instalace navržená tak, aby pozvedla vaši akci na multismyslový zážitek.',
    sd_manifesto: 'MANIFESTO', sd_experience: 'ZÁŽITEK',
    sd_sight: 'ZRAK', sd_sight_desc: 'Architektonické barové sestavy s vlastním LED osvětlením a expozicemi prémiového skla.',
    sd_sound: 'ZVUK', sd_sound_desc: 'Rytmické míchání nerezové oceli a vytříbená ambientní zvuková kulisa špičkového lounge baru.',
    sd_taste: 'CHUŤ', sd_taste_desc: 'Komplexní, vyvážené profily obsahující domácí sirupy a malosériové botanicals.',
    sd_tech_specs: 'TECHNICKÉ_SPECIFIKACE', sd_setup_time: 'ČAS PŘÍPRAVY',
    sd_min_space: 'MIN. PROSTOR', sd_power_req: 'NAPÁJENÍ',
    sd_capacity: 'KAPACITA', sd_unlimited: 'NEOMEZENÁ', sd_up_next: 'DALŠÍ v POŘADÍ',
    unit_min: 'MIN', unit_m: 'M',
    // Technical Shared
    unit_id: 'ID_JEDNOTKY', architecture: 'ARCHITEKTURA', flavor_profile: 'CHUTĚ_PROFIL',
    serve_context: 'KONTEXT_SERVÍROVÁNÍ', ice_program: 'PROGRAM_LEDU', garnish: 'OZDOBA',
    service_match: 'SHODA_SLUŽEB', ice_clear_cube: 'ČIRÁ RUČNĚ ŘEZANÁ KOSTKA', garnish_botanicals: 'DEHYDRATOVANÉ BOTANIKY', vessel_crystal: 'TĚŽKÝ KŘIŠŤÁL',
    exp_concept: 'ZAŽIJTE TENTO KONCEPT NA SVÉ AKCI',
    discover_next: 'OBJEVTE DALŠÍ', err_empty: 'ERR_PRÁZDNÁ_KOLEKCE',
    no_units: 'ŽÁDNÉ JEDNOTKY REGISTROVANÉ v TOMTO ARCHIVU',
    // Login
    login_title: 'SALÓNEK', login_subtitle: 'Bar Catering & Mixology Fórum',
    login_email: 'Profesionální Email', login_password: 'Bezpečnostní Klíč',
    login_stay: 'Zůstat přihlášen', login_forgot: 'Zapomenutý přístup?',
    login_enter: 'Vstoupit do salónku', login_guild: 'Pokračovat s přístupem Guild',
    login_not_member: 'Nejste členem?', login_request: 'Požádat o členství',
    // About
    wa_message: 'Ahoj, mám zájem o vaše cateringové služby.', private_events: 'Soukromé akce',
    about_tag: 'PŘÍBĚH HOSTINGU', about_h1: 'REDEFINICE STANDARDU BAROVÉHO CATERINGU',
    about_intro_h2: 'ALCHYMIE POHOSTINSTVÍ', about_intro_p1: 'Will Be Bar Catering není jen služba; je to závazek k dokonalosti.',
    about_intro_p2: 'Naše cesta začala vizí přinést standard nejlepších světových barů přímo k vám.',
    about_feature1_h: 'TECHNICKÁ PRECIZNOST', about_feature1_p: 'Každý pohyb je proveden s chirurgickou přesností.',
    about_feature2_h: 'UMĚLECKÁ VIZE', about_feature2_p: 'Navrhujeme barmanská menu, která vyprávějí váš příběh.',
    about_feature3_h: 'ELITNÍ STANDARDY', about_feature3_p: 'Neuznáváme kompromisy v kvalitě.',
    about_quote: '„Usilujeme o technickou dokonalost v každém nalití.“',
    book_event: 'Rezervovat na akci', cocktail_not_found: 'Koktejl nenalezen', enlarged_view: 'Zvětšený náhled',
    // Privacy
    privacy_tag: 'PRÁVNÍ_ARCHIV // v1.0',
    privacy_h2_1: 'Ochrana osobních údajů',
    privacy_p_1: 'Tento dokument popisuje, jak nakládáme s vašimi osobními údaji v souladu s nařízením GDPR.',
    privacy_h2_2: 'Jaké údaje sbíráme',
    privacy_p_2: 'Sbíráme pouze nezbytné údaje pro vyřízení vaší poptávky.',
    privacy_h2_3: 'Vaše práva',
    privacy_p_3: 'Máte právo kdykoliv požádat o výmaz svých osobních údajů.',
    contact_visual_h2: 'ARCHIV\nPOHOSTINNOSTI', contact_form_title: 'ELEKTRONICKÁ_POPTÁVKA // v2.0',
    start_chat: 'ZAČÍT CHAT', explore_concept: 'PROZKOUMAT KONCEPT',
    tel_label: 'TEL', email_label: 'EMAIL',
    concept_registry: 'REGISTR_KONCEPTŮ',
    mixology_archive: 'MIXOLOGICKÝ_ARCHIV',
    visual_archive: 'VIZUÁLNÍ_ARCHIV',
    history_archive: 'HISTORICKÝ_ARCHIV',
    direct_connect: 'PŘÍMÉ_SPOJENÍ',
    direct_communication: 'PŘÍMÁ_KOMUNIKACE',
    operational_precision: 'OPERAČNÍ_PŘESNOST',
    global_footprint: 'GLOBÁLNÍ_STOPA',
    scroll_to_explore: 'PROCHÁZET_ARCHIV',
    follow: 'SLEDOVAT', connect: 'SPOJIT_SE',
    archive_intro_cocktails: 'Komplexní registr technických architektur koktejlů a tekutých aktiv.',
    archive_intro_services: 'Průzkum zakázkových barových nastavení a multismyslových zážitků.',
    archive_intro_gallery: 'Kurátorský vizuální archiv našich nejlepších akcí.',
    about_philosophy_tag: '01 // FILOSOFIE',
    about_protocol_tag: '02 // TECHNICKÝ_PROTOKOL',
    about_registry_tag: '03 // GEOGRAFICKÝ_REGISTR',
    protocol_ice_desc: 'Všechny jednotky fungují pod mandátem čirého ledu, s ručně řezanými kostkami a vlastními razítky.',
    protocol_flavor_desc: 'Menu jsou syntetizována pomocí našeho proprietárního systému chuťového profilování pro multismyslovou rovnováhu.',
    protocol_glass_desc: 'Využití prémiového bezolovnatého křišťálu a architektonických nádob pro každou úroveň služeb.',
    protocol_uniform_desc: 'Přísné dodržování archivu vizuální identity, kurátorovaného specificky pro DNA každé akce.',
    registry_prague_desc: 'Strategický uzel pro evropskou logistiku a laboratoř pro výzkum mixologie.',
    registry_kyiv_desc: 'Designové studio a technické školicí zařízení pro elitní personál pohostinství.',
    // Uniform Selector
    uniform_tag: 'VIZUÁLNÍ IDENTITA',
    uniform_h2: 'VZHLED VAŠEHO TÝMU',
    uniform_p: 'Vyberte si styl, který nejlépe doplňuje atmosféru vaší akce. Od formální elegance po moderní industriální styl.',
    uniform_classic: 'KLASICKÁ ČERNÁ',
    uniform_modern: 'MODERNÍ ŠEDÁ',
    uniform_casual: 'CASUAL ZÁSTĚRA',
    uniform_suit: 'FORMÁLNÍ OBLEK',
    uniform_philosophy_tag: '01 // FILOSOFIE',
    uniform_philosophy_h3: 'ARCHIV ODÍVÁNÍ',
    uniform_philosophy_p: 'Vizuální dokonalost je stejně kritická jako koktejl samotný. Náš tým pracuje pod komplexním protokolem odívání a udržuje rozsáhlý archiv na míru šitých standardů.',
    uniform_stats_tag: '02 // ARCHIVNÍ_STATISTIKY',
    uniform_style_24: '24_STYLŮ',
    uniform_style_24_p: 'Rozmanitá kolekce odlišných konfigurací oděvů.',
    uniform_tailored: 'STŘIH_NA_MÍRU',
    uniform_tailored_p: 'Každý kus je individuálně upraven pro ostré architektonické linie.',
    uniform_beyond: 'NADPÁMEC_ČERNÉ',
    uniform_beyond_p: 'Od avantgardního industriálu až po vysoce formální společenský oděv.',
    uniform_curation: 'CELKOVÁ_KURACE',
    uniform_curation_p: 'Sladíme vzhled našeho týmu s přesnou vizuální DNA vaší akce.',
    uniform_badge: 'DISTINKTNÍ KONFIGURACE'
  },
  EN: {
    home: 'Home', gallery: 'Gallery', about: 'About Us', book: 'Book Now',
    hero_title: 'THE LIQUID ARCHIVE', hero_sub: 'Premium bar catering since 2010',
    hero_p: 'Experience the ultimate mobile bar service tailored for elite events.',
    mood_finder: 'Mood Finder', mood_p: 'Tell us your mood, we\'ll suggest the masterpiece.',
    services: 'Luxury Concepts', inquiry: 'Inquiry', name: 'Name', email: 'Email',
    date: 'Event Date', guests: 'Guest Count', vision: 'Your vision & event details...',
    submit: 'Submit Inquiry', collection: 'Mixology Directory', view_details: 'View Details',
    sweet: 'Sweet', strong: 'Strong', fresh: 'Fresh', bitter: 'Bitter', recommend: 'We recommend:',
    experience: 'Experience', weddings: 'Weddings', menu_items: 'Menu Items', years: 'years',
    office: 'Prague Office', est: 'ESTABLISHED 2010 • PRAGUE',
    footer_city: 'Prague',
    cat_all: 'All', cat_weddings: 'Weddings', cat_corporate: 'Corporate', cat_mixology: 'Mixology',
    cat_bars: 'Bars', cat_experience: 'Experience', cat_catering: 'Catering',
    gallery_h1: 'THE VISUAL COLLECTION', gallery_p: 'A curated selection of our finest moments.',
    footer_mastery: 'MASTERY IN MIXOLOGY SINCE 2010', footer_explore: 'EXPLORE',
    footer_social: 'SOCIAL', instagram: 'Instagram', facebook: 'Facebook',
    footer_contact: 'Contact', footer_rights: 'ALL RIGHTS RESERVED.',
    footer_terms: 'Privacy Policy',
    privacy_policy: 'Privacy Policy',
    inquiry_h2: 'REQUEST YOUR EXPERIENCE',
    inquiry_p: 'We provide nationwide bar catering services since 2010. Fill out the form.',
    contact_h1: 'GET IN TOUCH',
    contact_tag: 'DIRECT LINE',
    contact_p: 'Have a question or want to discuss your project? We are here for you.',
    // Calculator
    calc_tag: 'Plan Your Event', calc_h2: 'CATERING CALCULATOR',
    calc_p: 'Estimate the requirements for your bespoke bar experience instantly.',
    calc_guests: 'Guests', calc_hours: 'Hours of Service',
    res_cocktails: 'Estimated Cocktails', res_bars: 'Catering Bars',
    res_staff: 'Total Service Team', res_note: '* This is a professional estimate for standard service.',
    // Taste Profiler
    tp_tag: 'SYSTEM ONLINE // v2.0.4', tp_h2: 'PALATE CALIBRATION ENGINE',
    tp_p: 'Define your flavor architecture. The system will synthesize a custom menu blueprint and recommend the ideal bar setup.',
        tp_sweet: 'SWEET', tp_sour: 'SOUR', tp_strong: 'STRONG', tp_smoky: 'SMOKY', tp_herbal: 'HERBAL',
        tp_fruity: 'FRUITY', tp_bitter: 'BITTER',
            ingredients_list: 'INGREDIENTS LIST',
            collections: 'COLLECTIONS',
            units_detected: 'UNITS_DETECTED',
            back_to_collection: 'BACK_TO_COLLECTION',
            tp_blueprint: 'BLUEPRINT_OUTPUT.EXE',
        
     tp_profile_id: 'PROFILE ID',
    tp_architecture: 'GENERATED ARCHITECTURE', tp_base: 'RECOMMENDED BASE',
    tp_vessel: 'VESSEL', tp_integration: 'OPTIMAL SERVICE INTEGRATION',
    tp_initialize: 'INITIALIZE SETUP',
    // Service Detail
    sd_not_found: 'Concept Not Found', sd_luxury_concept: 'LUXURY_CONCEPT',
    sd_vision_text: 'We don\'t just serve drinks; we curate atmospheres. Every {title} setup is a bespoke installation designed to elevate your event into a multisensory experience.',
    sd_manifesto: 'THE_MANIFESTO', sd_experience: 'THE_EXPERIENCE',
    sd_sight: 'SIGHT', sd_sight_desc: 'Architectural bar setups with custom LED lighting and premium glassware displays.',
    sd_sound: 'SOUND', sd_sound_desc: 'The rhythmic shake of stainless steel and the refined ambient soundscape of a high-end lounge.',
    sd_taste: 'TASTE', sd_taste_desc: 'Complex, balanced profiles featuring home-made syrups and small-batch botanicals.',
    sd_tech_specs: 'TECHNICAL_SPECS', sd_setup_time: 'SETUP TIME',
    sd_min_space: 'MIN SPACE', sd_power_req: 'POWER REQ.',
    sd_capacity: 'CAPACITY', sd_unlimited: 'UNLIMITED', sd_up_next: 'UP NEXT',
    unit_min: 'MIN', unit_m: 'M',
    // Technical Shared
    unit_id: 'UNIT_ID', architecture: 'ARCHITECTURE', flavor_profile: 'FLAVOR_PROFILE',
    serve_context: 'SERVE_CONTEXT', ice_program: 'ICE_PROGRAM', garnish: 'GARNISH',
    service_match: 'SERVICE_MATCH', ice_clear_cube: 'CLEAR HAND-CUT CUBE', garnish_botanicals: 'DEHYDRATED BOTANICALS', vessel_crystal: 'HEAVY CRYSTAL',
    exp_concept: 'EXPERIENCE THIS CONCEPT AT YOUR EVENT',
    discover_next: 'DISCOVER NEXT', err_empty: 'ERR_EMPTY_COLLECTION',
    no_units: 'NO UNITS REGISTERED UNDER THIS ARCHIVE',
    // Login
    login_title: 'THE LOUNGE', login_subtitle: 'Bar Catering & Mixology Forum',
    login_email: 'Professional Email', login_password: 'Security Key',
    login_stay: 'Stay Signed In', login_forgot: 'Forgot Access?',
    login_enter: 'Enter The Lounge', login_guild: 'Continue with Guild Access',
    login_not_member: 'Not a member?', login_request: 'Request Membership',
    // About
    wa_message: 'Hello, I\'m interested in your catering services.', private_events: 'Private Events',
    about_tag: 'THE STORY OF HOSTING', about_h1: 'REDEFINING THE STANDARD OF BAR CATERING',
    about_intro_h2: 'THE ALCHEMY OF HOSPITALITY', about_intro_p1: 'Will Be Bar Catering is not just a service; it\'s a commitment to excellence.',
    about_intro_p2: 'Our journey began with a vision to bring the standards of the world\'s best bars directly to you.',
    about_feature1_h: 'TECHNICAL PRECISION', about_feature1_p: 'Every move is executed with surgical precision.',
    about_feature2_h: 'ARTISTIC VISION', about_feature2_p: 'Your event deserves a unique identity.',
    about_feature3_h: 'ELITE STANDARDS', about_feature3_p: 'We accept no compromises in quality.',
    about_quote: '"We pursuit technical perfection in every pour."',
    book_event: 'Book for Event', cocktail_not_found: 'Cocktail not found', enlarged_view: 'Enlarged View',
    // Privacy
    privacy_tag: 'LEGAL_ARCHIVE // v1.0',
    privacy_h2_1: 'Data Protection',
    privacy_p_1: 'This document describes how we handle your personal data in accordance with GDPR regulations.',
    privacy_h2_2: 'What Data We Collect',
    privacy_p_2: 'We collect only necessary data to process your inquiry.',
    privacy_h2_3: 'Your Rights',
    privacy_p_3: 'You have the right to request deletion of your personal data.',
    contact_visual_h2: 'THE ARCHIVE OF\nHOSPITALITY', contact_form_title: 'ELECTRONIC_INQUIRY // v2.0',
    start_chat: 'START CHAT', explore_concept: 'EXPLORE CONCEPT',
    tel_label: 'TEL', email_label: 'EMAIL',
    concept_registry: 'CONCEPT_REGISTRY',
    mixology_archive: 'MIXOLOGY_ARCHIVE',
    visual_archive: 'VISUAL_ARCHIVE',
    history_archive: 'HISTORY_ARCHIVE',
    direct_connect: 'DIRECT_CONNECT',
    direct_communication: 'DIRECT_COMMUNICATION',
    operational_precision: 'OPERATIONAL_PRECISION',
    global_footprint: 'GLOBAL_FOOTPRINT',
    scroll_to_explore: 'SCROLL_TO_EXPLORE',
    follow: 'FOLLOW', connect: 'CONNECT',
    archive_intro_cocktails: 'Comprehensive registry of technical cocktail architectures and liquid assets.',
    archive_intro_services: 'Exploration of bespoke bar setups and multisensory experiences.',
    archive_intro_gallery: 'A curated visual archive of our finest events.',
    about_philosophy_tag: '01 // PHILOSOPHY',
    about_protocol_tag: '02 // TECHNICAL_PROTOCOL',
    about_registry_tag: '03 // GEOGRAPHIC_REGISTRY',
    protocol_ice_desc: 'All units operate under a clear-ice mandate, featuring hand-cut cubes and custom stamps.',
    protocol_flavor_desc: 'Menus are synthesized using our proprietary taste profiling system for multi-sensory balance.',
    protocol_glass_desc: 'Utilization of premium lead-free crystal and architectural vessels for every service tier.',
    protocol_uniform_desc: 'Strict adherence to the visual identity archive, curated specifically for each event DNA.',
    registry_prague_desc: 'Strategic hub for European logistics and mixology research laboratory.',
    registry_kyiv_desc: 'Design studio and technical training facility for elite hospitality staff.',
    // Uniform Selector
    uniform_tag: 'VISUAL IDENTITY',
    uniform_h2: 'CURATE THE LOOK',
    uniform_p: 'Select the attire that best complements your event atmosphere. From formal elegance to modern industrial styles.',
    uniform_classic: 'CLASSIC BLACK',
    uniform_modern: 'MODERN GREY',
    uniform_casual: 'CASUAL APRON',
    uniform_suit: 'FORMAL SUIT',
    uniform_philosophy_tag: '01 // PHILOSOPHY',
    uniform_philosophy_h3: 'THE ATTIRE ARCHIVE',
    uniform_philosophy_p: 'Visual excellence is as critical as the cocktail itself. Our team operates under a comprehensive attire protocol, maintaining an expansive archive of tailored standards.',
    uniform_stats_tag: '02 // ARCHIVE_STATS',
    uniform_style_24: '24_STYLES',
    uniform_style_24_p: 'A diverse collection of distinct attire configurations.',
    uniform_tailored: 'TAILORED_FIT',
    uniform_tailored_p: 'Every piece is custom-fitted to ensure sharp architectural lines.',
    uniform_beyond: 'BEYOND_BLACK',
    uniform_beyond_p: 'From avant-garde industrial to high-gala formal wear.',
    uniform_curation: 'TOTAL_CURATION',
    uniform_curation_p: 'We match our team\'s look to your event\'s exact visual DNA.',
    uniform_badge: 'DISTINCT CONFIGURATIONS'
  },
  UA: {
    home: 'Головна', gallery: 'Галерея', about: 'Про нас', book: 'Бронювати',
    hero_title: 'АРХІВ РІДКОГО МИСТЕЦТВА', hero_sub: 'Преміальний кейтеринг з 2010 року',
    hero_p: 'Відчуйте неперевершений мобільний барний сервіс для елітних подій.',
    mood_finder: 'Пошук за настроєм', mood_p: 'Скажіть нам свій настрій, і ми запропонуємо шедевр.',
    services: 'Люксові концепції', inquiry: 'Запит', name: "Ім'я", email: 'Email',
    date: 'Дата події', guests: 'Кількість гостей', vision: 'Ваше бачення та деталі події...',
    submit: 'Надіслати запит', collection: 'Архів коктейлів', view_details: 'Детальніше',
    sweet: 'Солодкий', strong: 'Міцний', fresh: 'Свіжий', bitter: 'Гіркий', recommend: 'Ми рекомендуємо:',
    experience: 'Досвід', weddings: 'Весілля', menu_items: 'Меню', years: 'років',
    office: 'Офіс у Празі', est: 'ЗАСНОВАНО 2010 • ПРАГА',
    footer_city: 'Прага',
    cat_all: 'Всі', cat_weddings: 'Весілля', cat_corporate: 'Корпоративи', cat_mixology: 'Міксологія',
    cat_bars: 'Бари', cat_experience: 'Досвід', cat_catering: 'Кейтеринг',
    gallery_h1: 'ВІЗУАЛЬНА КОЛЕКЦІЯ', gallery_p: 'Вибірка наших найкращих моментів.',
    footer_mastery: 'МАЙСТЕРНІСТЬ МІКСОЛОГІЇ З 2010 РОКУ', footer_explore: 'ДОСЛІДИТИ',
    footer_social: 'СОЦМЕРЕЖІ', instagram: 'Instagram', facebook: 'Facebook',
    footer_contact: 'Контакти', footer_rights: 'УСІ ПРАВА ЗАХИЩЕНІ.',
    footer_terms: 'Політика конфіденційності',
    privacy_policy: 'Політика конфіденційності',
    inquiry_h2: 'ЗАМОВИТИ ЗАХІД',
    inquiry_p: 'Ми надаємо послуги барного кейтерингу по всій країні з 2010 року. Заповніть форму.',
    contact_h1: "ЗВ'ЯЖІТЬСЯ З НАМИ",
    contact_tag: 'ПРЯМА ЛІНІЯ',
    contact_p: 'Маєте запитання або хочете обговорити свій проект? Ми тут для вас.',
    // Calculator
    calc_tag: 'Планування події', calc_h2: 'КАЛЬКУЛЯТОР КЕЙТЕРИНГУ',
    calc_p: 'Миттєво оцініть вимоги для вашого індивідуального барного досвіду.',
    calc_guests: 'Гості', calc_hours: 'Години обслуговування',
    res_cocktails: 'Орієнтовно коктейлів', res_bars: 'Кейтерингові бари',
    res_staff: 'Весь сервісний персонал', res_note: '* Це професійна оцінка для стандартного обслуговування.',
    // Taste Profiler
    tp_tag: 'СИСТЕМА ОНЛАЙН // v2.0.4', tp_h2: 'ДВИГУН КАЛІБРУВАННЯ СМАКУ',
    tp_p: 'Визначте свою архітектуру смаку. Система синтезує індивідуальний план меню та запропонує ідеальне барне обладнання.',
        tp_sweet: 'СОЛОДКИЙ', tp_sour: 'КИСЛИЙ', tp_strong: 'МІЦНИЙ', tp_smoky: 'ДИМНИЙ', tp_herbal: 'ТРАВ\'ЯНИЙ',
        tp_fruity: 'ФРУКТОВИЙ', tp_bitter: 'ГІРКИЙ',
            ingredients_list: 'СПИСОК ІНГРЕДІЄНТІВ',
            collections: 'КОЛЕКЦІЇ',
            units_detected: 'ОДИНИЦЬ_ВИЯВЛЕНО',
            back_to_collection: 'НАЗАД_ДО_КОЛЕКЦІЇ',
            tp_blueprint: 'ВИТЯГ_ПЛАНУ.EXE',
        
     tp_profile_id: 'ID ПРОФІЛЮ',
    tp_architecture: 'ЗГЕНЕРОВАНА АРХІТЕКТУРА', tp_base: 'РЕКОМЕНДОВАНА БАЗА',
    tp_vessel: 'ПОСУД', tp_integration: 'ОПТИМАЛЬНА ІНТЕГРАЦІЯ ПОСЛУГ',
    tp_initialize: 'ІНІЦІАЛІЗУВАТИ',
    // Service Detail
    sd_not_found: 'Конcept не знайдено', sd_luxury_concept: 'ЛЮКС_КОНЦЕПТ',
    sd_vision_text: 'Ми не просто подаємо напої; ми створюємо атмосферу. Кожне налаштування {title} — це індивідуальна інсталяція, розроблена для того, щоб перетворити вашу подію на мультисенсорний досвід.',
    sd_manifesto: 'МАНІФЕСТ', sd_experience: 'ДОСВІД',
    sd_sight: 'ЗІР', sd_sight_desc: 'Архітектурні барні стійки з індивідуальним LED-освітленням та експозиціями преміального посуду.',
    sd_sound: 'ЗВУК', sd_sound_desc: 'Ритмічне струшування нержавіючої сталі та вишуканий ембієнт-саундтрек висококласного лаунж-бару.',
    sd_taste: 'СМАК', sd_taste_desc: 'Складні, збалансовані профілі з домашніми сиропами та крафтовими ботанікалами.',
    sd_tech_specs: 'ТЕХНІЧНІ_ХАРАКТЕРИСТИКИ', sd_setup_time: 'ЧАС ПІДГОТОВКИ',
    sd_min_space: 'МІН. ПЛОЩА', sd_power_req: 'ЕЛЕКТРОЖИВЛЕННЯ',
    sd_capacity: 'МІСТКІСТЬ', sd_unlimited: 'НЕОБМЕЖЕНО', sd_up_next: 'НАСТУПНИЙ КОНЦЕПТ',
    unit_min: 'ХВ', unit_m: 'М',
    // Technical Shared
    unit_id: 'ID_ОДИНИЦІ', architecture: 'АРХІТЕКТУРА', flavor_profile: 'ПРОФІЛЬ_СМАКУ',
    serve_context: 'КОНТЕКСТ_ПОДАЧІ', ice_program: 'ПРОГРАМА_ЛЬОДУ', garnish: 'ГАРНІР',
    service_match: 'ВІДПОВІДНІСТЬ_ПОСЛУГ', ice_clear_cube: 'ЧИСТИЙ КУБИК РУЧНОЇ НАРІЗКИ', garnish_botanicals: 'ДЕГІДРОВАНІ БОТАНІКАЛИ', vessel_crystal: 'ВАЖКИЙ КРИШТАЛЬ',
    exp_concept: 'ВІДЧУЙТЕ ЦЕЙ КОНЦЕПТ НА ВАШОМУ ЗАХОДІ',
    discover_next: 'ВІДКРИЙТЕ НАСТУПНИЙ', err_empty: 'ERR_ПОРОЖНЯ_КОЛЕКЦІЯ',
    no_units: 'ЖОДНИХ ОДИНИЦЬ НЕ ЗАРЕЄСТРОВАНО В ЦЬОМУ АРХІВІ',
    // Login
    login_title: 'ЛАУНЖ', login_subtitle: 'Форум барного кейтерингу та міксології',
    login_email: 'Професійний Email', login_password: 'Ключ безпеки',
    login_stay: 'Залишатися в системі', login_forgot: 'Забули доступ?',
    login_enter: 'Увійти до лаунжу', login_guild: 'Продовжити з доступом Гільдії',
    login_not_member: 'Не є членом?', login_request: 'Запитати членство',
    // About
    wa_message: 'Привіт, мене цікавлять ваші послуги кейтерингу.', private_events: 'Приватні заходи',
    about_tag: 'ІСТОРІЯ ГОСТИННОСТІ', about_h1: 'ПЕРЕОСМИСЛЕННЯ СТАНДАРТІВ БАРНОГО КЕЙТЕРИНГУ',
    about_intro_h2: 'АЛХІМІЯ ГОСТИННОСТІ', about_intro_p1: 'Will Be Bar Catering — це не просто послуга; це прагнення до досконалості.',
    about_intro_p2: 'Наша подорож почалася з бачення перенести стандарти найкращих світових барів безпосередньо до вас.',
    about_feature1_h: 'ТЕХНІЧНА ПРЕЦИЗІЙНІСТЬ', about_feature1_p: 'Кожен рух виконується з хірургічною точністю.',
    about_feature2_h: 'ХУДОЖНЄ БАЧЕННЯ', about_feature2_p: 'Ваш захід заслуговує на унікальну ідентичність.',
    about_feature3_h: 'ЕЛІТНІ СТАНДАРТИ', about_feature3_p: 'Ми не йдемо на компроміси щодо якості.',
    about_quote: '«Ми прагнемо до технічної досконалості в кожній порції».',
    book_event: 'Замовити на захід', cocktail_not_found: 'Коктейль не знайдено', enlarged_view: 'Збільшений перегляд',
    // Privacy
    privacy_tag: 'ЮРИДИЧНИЙ_АРХІВ // v1.0',
    privacy_h2_1: 'Захист персональних даних',
    privacy_p_1: 'Цей документ описує, як ми поводимося з вашими персональними даними відповідно до правил GDPR.',
    privacy_h2_2: 'Які дані ми збираємо',
    privacy_p_2: 'Ми збираємо лише необхідні дані для обробки вашого запиту.',
    privacy_h2_3: 'Ваші права',
    privacy_p_3: 'Ви маєте право в будь-який час подати запит на видалення ваших персональних даних.',
    contact_visual_h2: 'АРХІВ\nГОСТИННОСТІ', contact_form_title: 'ЕЛЕКТРОННИЙ_ЗАПИТ // v2.0',
    start_chat: 'ПОЧАТИ ЧАТ', explore_concept: 'ДОСЛІДИТИ КОНЦЕПТ',
    tel_label: 'ТЕЛ', email_label: 'EMAIL',
    concept_registry: 'РЕЄСТР_КОНЦЕПЦІЙ',
    mixology_archive: 'МІКСОЛОГІЧНИЙ_АРХІВ',
    visual_archive: 'ВІЗУАЛЬНИЙ_АРХІВ',
    history_archive: 'ІСТОРИЧНИЙ_АРХІВ',
    direct_connect: 'ПРЯМИЙ_ЗВ’ЯЗОК',
    direct_communication: 'ПРЯМА_КОМУНІКАЦІЯ',
    operational_precision: 'ОПЕРАЦІЙНА_ТОЧНІСТЬ',
    global_footprint: 'ГЛОБАЛЬНА_ПРИСУТНІСТЬ',
    scroll_to_explore: 'ПРОКРУТИТИ_ДЛЯ_ОГЛЯДУ',
    follow: 'СТЕЖИТИ', connect: 'ЗВ’ЯЗАТИСЯ',
    archive_intro_cocktails: 'Комплексний реєстр технічних архітектур коктейлів та ліквідних активів.',
    archive_intro_services: 'Дослідження індивідуальних барних рішень та мультисенсорного досвіду.',
    archive_intro_gallery: 'Кураторський візуальний архів наших найкращих подій.',
    about_philosophy_tag: '01 // ФІЛОСОФІЯ',
    about_protocol_tag: '02 // ТЕХНІЧНИЙ_ПРОТОКОЛ',
    about_registry_tag: '03 // ГЕОГРАФІЧНИЙ_РЕЄСТР',
    protocol_ice_desc: 'Усі підрозділи працюють за мандатом чистого льоду, використовуючи кубики ручної нарізки та власні штампи.',
    protocol_flavor_desc: 'Меню синтезуються за допомогою нашої власної системи профілювання смаку для мультисенсорного балансу.',
    protocol_glass_desc: 'Використання преміального кришталю без вмісту свинцю та архітектурного посуду для кожного рівня обслуговування.',
    protocol_uniform_desc: 'Суворе дотримання архіву візуальної ідентичності, підібраного спеціально для DNA кожної події.',
    registry_prague_desc: 'Стратегічний хаб європейської логістики та лабораторія досліджень міксології.',
    registry_kyiv_desc: 'Дизайн-студія та технічний навчальний центр для елітного персоналу гостинності.',
    // Uniform Selector
    uniform_tag: 'ВІЗУАЛЬНА ІДЕНТИЧНІСТЬ',
    uniform_h2: 'АРХІВ ОБРАЗІВ',
    uniform_p: 'Візуальна досконалість так само важлива, як і сам коктейль. Наша команда дотримується комплексного протоколу дрес-коду, підтримуючи великий архів індивідуальних стандартів.',
    uniform_philosophy_tag: '01 // ФІЛОСОФІЯ',
    uniform_philosophy_h3: 'АРХІВ ВБРАННЯ',
    uniform_philosophy_p: 'Візуальна досконалість є такою ж критичною, як і сам коктейль. Наша команда працює за комплексним протоколом вбрання, підтримуючи великий архів індивідуальних стандартів.',
    uniform_stats_tag: '02 // АРХІВНА_СТАТИСТИКА',
    uniform_style_24: '24_СТИЛІ',
    uniform_style_24_p: 'Різноманітна колекція відмінних конфігурацій вбрання.',
    uniform_tailored: 'ПОШИТТЯ_НА_ЗАМОВЛЕННЯ',
    uniform_tailored_p: 'Кожен виріб індивідуально підігнаний для чітких архітектурних ліній.',
    uniform_beyond: 'БІЛЬШЕ_НІЖ_ЧОРНИЙ',
    uniform_beyond_p: 'Від авангардного індустріального до урочистого вечірнього вбрання.',
    uniform_curation: 'ПОВНА_КУРАЦІЯ',
    uniform_curation_p: 'Ми підбираємо образ нашої команди відповідно до візуальної ДНК вашого заходу.',
    uniform_badge: 'ОКРЕМИХ КОНФІГУРАЦІЙ'
  }
};

import { useLocation, useNavigate } from 'react-router-dom';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [lang, setLangState] = useState<Language>(() => {
    // URL-based language detection for SEO prefixes
    const path = window.location.pathname;
    if (path.startsWith('/ua')) return 'UA';
    if (path.startsWith('/eng')) return 'EN';
    return 'CZ'; // Default root is Czech
  });

  const t = (key: string) => translations[lang][key] || key;
  const urlPrefix = lang === 'UA' ? '/ua' : lang === 'EN' ? '/eng' : '';

  const setLang = (newLang: Language) => {
    let cleanPath = location.pathname;
    if (cleanPath.startsWith('/ua')) cleanPath = cleanPath.replace('/ua', '');
    else if (cleanPath.startsWith('/eng')) cleanPath = cleanPath.replace('/eng', '');
    if (cleanPath === '') cleanPath = '/';

    const newPrefix = newLang === 'UA' ? '/ua' : newLang === 'EN' ? '/eng' : '';
    setLangState(newLang);
    navigate(`${newPrefix}${cleanPath}${location.search}${location.hash}`);
  };

  // Synchronize internal state if URL changes externally (back/forward)
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/ua')) setLangState('UA');
    else if (path.startsWith('/eng')) setLangState('EN');
    else setLangState('CZ');
  }, [location.pathname]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, urlPrefix }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
