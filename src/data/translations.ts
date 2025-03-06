
export type LanguageCode = 'en' | 'es' | 'pt' | 'ru' | 'fr' | 'de' | 'zh' | 'hi' | 'id' | 'ja';

interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  [language: string]: TranslationDictionary;
}

export const translations: Translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.howItWorks': 'How It Works',
    'nav.faq': 'FAQ',
    'nav.aboutUs': 'About Us',
    'nav.terms': 'Terms',
    'nav.smartContract': 'Smart Contract',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Democratizing Access to Immigration Opportunities',
    'hero.description': 'A decentralized donation platform on Solana blockchain offering non-US citizens a chance to win enough to apply for the US Gold Card residency.',
    'hero.donateButton': 'Donate Now',
    'hero.donateNow': 'Donate Now',
    'hero.learnMore': 'Learn More',

    // Features
    'features.title': 'Why OneDollarGoldCard?',
    'features.transparent.title': 'Fully Transparent',
    'features.transparent.desc': 'All transactions and winner selection are verified on-chain.',
    'features.accessible.title': 'Accessible to Everyone',
    'features.accessible.desc': 'Start with just $1.00 USDC plus a small fee.',
    'features.fair.title': 'Fair Chance System',
    'features.fair.desc': 'Your chances increase proportionally with your donation amount.',
    'features.secure.title': 'Secure by Design',
    'features.secure.desc': 'Built on Solana\'s secure and efficient blockchain.',

    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.step1.title': 'Make a Donation',
    'howItWorks.step1.desc': 'Donate a minimum of $1.00 USDC (plus 5% service fee).',
    'howItWorks.step2.title': 'Join the Pool',
    'howItWorks.step2.desc': 'Your donation increases your chance to win proportionally.',
    'howItWorks.step3.title': 'Winner Selection',
    'howItWorks.step3.desc': 'When the pool reaches $10M, a winner is randomly selected.',
    'howItWorks.step4.title': 'Receive Funds',
    'howItWorks.step4.desc': 'The winner receives $5M, and $5M stays for the next round.',

    // Donation Card
    'donation.title': 'Make a Donation',
    'donation.amount': 'Donation Amount',
    'donation.fee': 'Service Fee (5%)',
    'donation.total': 'Total Amount',
    'donation.button': 'Donate Now',
    'donation.minAmount': 'Minimum donation is $1.00 USDC.',
    'donation.walletConnect': 'Connect Wallet',
    'donation.confirmation': 'I confirm I am not a US citizen or green card holder.',
    'donation.shareX': 'Share on X',
    'donation.stats': 'Your Stats',
    'donation.totalDonated': 'Total Donated:',
    'donation.winningChance': 'Winning Chance:',
    'donation.connectedWallet': 'Connected Wallet:',

    // Pool Stats
    'pool.title': 'Prize Pool Statistics',
    'pool.currentAmount': 'Current Pool Amount',
    'pool.target': 'Target Amount',
    'pool.donors': 'Total Donors',
    'pool.timeLeft': 'Estimated Time Until Draw',
    'pool.backupTitle': '7-Day Inactivity Safeguard',
    'pool.backupInfo': 'If no donations for 7 days, the last donor receives the entire pool.',
    'pool.share': 'Share on Social',
    'pool.sns': 'Solana Name Service',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.contact': 'Contact Us',
    'footer.disclaimer': 'This platform is not affiliated with the US government.',
    
    // Trump quotes
    'trump.support1': "America needs a merit-based system. The Gold Card initiative is how we'll get the best talent. Believe me!",
    'trump.support2': "The Gold Card is the best way, maybe ever, for the best and brightest to come to America. Tremendous opportunity!",
    'trump.support3': "We're going to create a pathway that's fair, fast, and fantastic. The Gold Card program is really something special.",
    'trump.support4': "We want the smartest people coming to America. The Gold Card is how we'll make that happen. It's going to be huge!",

    // Trump mention
    'trump.support': 'Endorsed by the Trump administration\'s immigration initiatives.'
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.faq': 'Preguntas Frecuentes',
    'nav.aboutUs': 'Sobre Nosotros',
    'nav.terms': 'Términos',
    'nav.smartContract': 'Contrato Inteligente',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Democratizando el Acceso a Oportunidades de Inmigración',
    'hero.description': 'Una plataforma descentralizada de donaciones en la blockchain Solana que ofrece a no ciudadanos de EE.UU. la oportunidad de ganar lo suficiente para solicitar la residencia Gold Card.',
    'hero.donateButton': 'Donar Ahora',
    'hero.donateNow': 'Donar Ahora',
    'hero.learnMore': 'Aprender Más',

    // Features
    'features.title': '¿Por qué OneDollarGoldCard?',
    'features.transparent.title': 'Totalmente Transparente',
    'features.transparent.desc': 'Todas las transacciones y selección de ganadores se verifican en la cadena.',
    'features.accessible.title': 'Accesible para Todos',
    'features.accessible.desc': 'Comienza con solo $1.00 USDC más una pequeña tarifa.',
    'features.fair.title': 'Sistema de Oportunidad Justa',
    'features.fair.desc': 'Tus posibilidades aumentan proporcionalmente con tu cantidad de donación.',
    'features.secure.title': 'Seguro por Diseño',
    'features.secure.desc': 'Construido en la blockchain segura y eficiente de Solana.',

    // How It Works
    'howItWorks.title': 'Cómo Funciona',
    'howItWorks.step1.title': 'Haz una Donación',
    'howItWorks.step1.desc': 'Dona un mínimo de $1.00 USDC (más 5% de tarifa de servicio).',
    'howItWorks.step2.title': 'Únete al Fondo',
    'howItWorks.step2.desc': 'Tu donación aumenta proporcionalmente tu oportunidad de ganar.',
    'howItWorks.step3.title': 'Selección del Ganador',
    'howItWorks.step3.desc': 'Cuando el fondo alcanza $10M, se selecciona aleatoriamente un ganador.',
    'howItWorks.step4.title': 'Recibe Fondos',
    'howItWorks.step4.desc': 'El ganador recibe $5M, y $5M permanecen para la próxima ronda.',

    // Donation Card
    'donation.title': 'Hacer una Donación',
    'donation.amount': 'Cantidad de Donación',
    'donation.fee': 'Tarifa de Servicio (5%)',
    'donation.total': 'Cantidad Total',
    'donation.button': 'Donar Ahora',
    'donation.minAmount': 'La donación mínima es $1.00 USDC.',
    'donation.walletConnect': 'Conectar Billetera',
    'donation.confirmation': 'Confirmo que no soy ciudadano estadounidense ni titular de green card.',
    'donation.shareX': 'Compartir en X',
    'donation.stats': 'Tus Estadísticas',
    'donation.totalDonated': 'Total Donado:',
    'donation.winningChance': 'Probabilidad de Ganar:',
    'donation.connectedWallet': 'Billetera Conectada:',

    // Pool Stats
    'pool.title': 'Estadísticas del Fondo de Premios',
    'pool.currentAmount': 'Cantidad Actual del Fondo',
    'pool.target': 'Cantidad Objetivo',
    'pool.donors': 'Total de Donantes',
    'pool.timeLeft': 'Tiempo Estimado Hasta el Sorteo',
    'pool.backupTitle': 'Salvaguarda de Inactividad de 7 Días',
    'pool.backupInfo': 'Si no hay donaciones durante 7 días, el último donante recibe todo el fondo.',
    'pool.share': 'Compartir en Redes',
    'pool.sns': 'Servicio de Nombres de Solana',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.terms': 'Términos y Condiciones',
    'footer.privacy': 'Política de Privacidad',
    'footer.contact': 'Contáctenos',
    'footer.disclaimer': 'Esta plataforma no está afiliada con el gobierno de EE.UU.',
    
    // Trump quotes
    'trump.support1': "América necesita un sistema basado en méritos. ¡La iniciativa Gold Card es cómo conseguiremos el mejor talento. ¡Créanme!",
    'trump.support2': "La Gold Card es la mejor manera, quizás la mejor de la historia, para que los mejores y más brillantes vengan a América. ¡Una oportunidad tremenda!",
    'trump.support3': "Vamos a crear un camino que sea justo, rápido y fantástico. El programa Gold Card es realmente algo especial.",
    'trump.support4': "Queremos que la gente más inteligente venga a América. La Gold Card es cómo lo haremos realidad. ¡Va a ser enorme!",
    
    // Trump mention
    'trump.support': 'Respaldado por las iniciativas de inmigración de la administración Trump.'
  },
  
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.howItWorks': 'Como Funciona',
    'nav.faq': 'Perguntas Frequentes',
    'nav.aboutUs': 'Sobre Nós',
    'nav.terms': 'Termos',
    'nav.smartContract': 'Contrato Inteligente',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Democratizando o Acesso a Oportunidades de Imigração',
    'hero.description': 'Uma plataforma descentralizada de doações na blockchain Solana oferecendo a não-cidadãos dos EUA a chance de ganhar o suficiente para solicitar a residência Gold Card.',
    'hero.donateButton': 'Doar Agora',
    'hero.donateNow': 'Doar Agora',
    'hero.learnMore': 'Saiba Mais',

    // Features
    'features.title': 'Por que OneDollarGoldCard?',
    'features.transparent.title': 'Totalmente Transparente',
    'features.transparent.desc': 'Todas as transações e seleção de ganhadores são verificadas na blockchain.',
    'features.accessible.title': 'Acessível para Todos',
    'features.accessible.desc': 'Comece com apenas $1.00 USDC mais uma pequena taxa.',
    'features.fair.title': 'Sistema de Chance Justa',
    'features.fair.desc': 'Suas chances aumentam proporcionalmente com o valor da sua doação.',
    'features.secure.title': 'Seguro por Design',
    'features.secure.desc': 'Construído na blockchain segura e eficiente da Solana.',

    // How It Works
    'howItWorks.title': 'Como Funciona',
    'howItWorks.step1.title': 'Faça uma Doação',
    'howItWorks.step1.desc': 'Doe um mínimo de $1.00 USDC (mais 5% de taxa de serviço).',
    'howItWorks.step2.title': 'Junte-se ao Fundo',
    'howItWorks.step2.desc': 'Sua doação aumenta proporcionalmente sua chance de ganhar.',
    'howItWorks.step3.title': 'Seleção do Ganhador',
    'howItWorks.step3.desc': 'Quando o fundo alcança $10M, um ganhador é selecionado aleatoriamente.',
    'howItWorks.step4.title': 'Receba os Fundos',
    'howItWorks.step4.desc': 'O ganhador recebe $5M, e $5M permanecem para a próxima rodada.',

    // Donation Card
    'donation.title': 'Faça uma Doação',
    'donation.amount': 'Valor da Doação',
    'donation.fee': 'Taxa de Serviço (5%)',
    'donation.total': 'Valor Total',
    'donation.button': 'Doar Agora',
    'donation.minAmount': 'A doação mínima é $1.00 USDC.',
    'donation.walletConnect': 'Conectar Carteira',
    'donation.confirmation': 'Confirmo que não sou cidadão americano ou portador de green card.',
    'donation.shareX': 'Compartilhar no X',
    'donation.stats': 'Suas Estatísticas',
    'donation.totalDonated': 'Total Doado:',
    'donation.winningChance': 'Chance de Ganhar:',
    'donation.connectedWallet': 'Carteira Conectada:',

    // Pool Stats
    'pool.title': 'Estatísticas do Fundo de Prêmios',
    'pool.currentAmount': 'Valor Atual do Fundo',
    'pool.target': 'Valor Alvo',
    'pool.donors': 'Total de Doadores',
    'pool.timeLeft': 'Tempo Estimado Até o Sorteio',
    'pool.backupTitle': 'Salvaguarda de Inatividade de 7 Dias',
    'pool.backupInfo': 'Se não houver doações por 7 dias, o último doador recebe todo o fundo.',
    'pool.share': 'Compartilhar nas Redes',
    'pool.sns': 'Serviço de Nomes Solana',

    // Footer
    'footer.rights': 'Todos os direitos reservados.',
    'footer.terms': 'Termos e Condições',
    'footer.privacy': 'Política de Privacidade',
    'footer.contact': 'Contate-nos',
    'footer.disclaimer': 'Esta plataforma não é afiliada ao governo dos EUA.',
    
    // Trump quotes
    'trump.support1': "A América precisa de um sistema baseado no mérito. A iniciativa Gold Card é como vamos obter os melhores talentos. Acreditem em mim!",
    'trump.support2': "O Gold Card é a melhor maneira, talvez a melhor de todos os tempos, para os melhores e mais brilhantes virem para a América. Uma oportunidade tremenda!",
    'trump.support3': "Vamos criar um caminho que seja justo, rápido e fantástico. O programa Gold Card é realmente algo especial.",
    'trump.support4': "Queremos as pessoas mais inteligentes vindo para a América. O Gold Card é como faremos isso acontecer. Vai ser enorme!",
    
    // Trump mention
    'trump.support': 'Apoiado pelas iniciativas de imigração da administração Trump.'
  },
  
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.howItWorks': 'Как это работает',
    'nav.faq': 'Вопросы и ответы',
    'nav.aboutUs': 'О нас',
    'nav.terms': 'Условия',
    'nav.smartContract': 'Смарт-контракт',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Демократизация доступа к иммиграционным возможностям',
    'hero.description': 'Децентрализованная платформа пожертвований на блокчейне Solana, предлагающая не гражданам США шанс выиграть достаточно средств для подачи заявления на получение вида на жительство Gold Card.',
    'hero.donateButton': 'Пожертвовать сейчас',
    'hero.donateNow': 'Пожертвовать сейчас',
    'hero.learnMore': 'Узнать больше',

    // Features
    'features.title': 'Почему OneDollarGoldCard?',
    'features.transparent.title': 'Полностью прозрачно',
    'features.transparent.desc': 'Все транзакции и выбор победителей проверяются в сети.',
    'features.accessible.title': 'Доступно каждому',
    'features.accessible.desc': 'Начните всего с 1.00 USDC плюс небольшая комиссия.',
    'features.fair.title': 'Система честных шансов',
    'features.fair.desc': 'Ваши шансы увеличиваются пропорционально сумме вашего пожертвования.',
    'features.secure.title': 'Безопасность по дизайну',
    'features.secure.desc': 'Построено на безопасном и эффективном блокчейне Solana.',

    // How It Works
    'howItWorks.title': 'Как это работает',
    'howItWorks.step1.title': 'Сделайте пожертвование',
    'howItWorks.step1.desc': 'Пожертвуйте минимум 1.00 USDC (плюс 5% сервисный сбор).',
    'howItWorks.step2.title': 'Присоединяйтесь к пулу',
    'howItWorks.step2.desc': 'Ваше пожертвование пропорционально увеличивает ваш шанс на выигрыш.',
    'howItWorks.step3.title': 'Выбор победителя',
    'howItWorks.step3.desc': 'Когда пул достигнет 10 миллионов долларов, победитель будет выбран случайным образом.',
    'howItWorks.step4.title': 'Получите средства',
    'howItWorks.step4.desc': 'Победитель получает 5 миллионов долларов, а 5 миллионов долларов остаются на следующий раунд.',

    // Donation Card
    'donation.title': 'Сделать пожертвование',
    'donation.amount': 'Сумма пожертвования',
    'donation.fee': 'Сервисный сбор (5%)',
    'donation.total': 'Общая сумма',
    'donation.button': 'Пожертвовать сейчас',
    'donation.minAmount': 'Минимальная сумма пожертвования составляет 1.00 USDC.',
    'donation.walletConnect': 'Подключить кошелек',
    'donation.confirmation': 'Я подтверждаю, что не являюсь гражданином США или владельцем грин-карты.',
    'donation.shareX': 'Поделиться в X',
    'donation.stats': 'Ваша статистика',
    'donation.totalDonated': 'Всего пожертвовано:',
    'donation.winningChance': 'Шанс выиграть:',
    'donation.connectedWallet': 'Подключенный кошелек:',

    // Pool Stats
    'pool.title': 'Статистика призового фонда',
    'pool.currentAmount': 'Текущая сумма пула',
    'pool.target': 'Целевая сумма',
    'pool.donors': 'Всего доноров',
    'pool.timeLeft': 'Ориентировочное время до розыгрыша',
    'pool.backupTitle': 'Защита от 7-дневной неактивности',
    'pool.backupInfo': 'Если в течение 7 дней не будет пожертвований, последний донор получит весь пул.',
    'pool.share': 'Поделиться в соцсетях',
    'pool.sns': 'Сервис имен Solana',

    // Footer
    'footer.rights': 'Все права защищены.',
    'footer.terms': 'Условия использования',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.contact': 'Свяжитесь с нами',
    'footer.disclaimer': 'Эта платформа не связана с правительством США.',
    
    // Trump quotes
    'trump.support1': "Америке нужна система, основанная на заслугах. Инициатива Gold Card — это то, как мы получим лучшие таланты. Поверьте мне!",
    'trump.support2': "Gold Card — это, пожалуй, лучший способ для самых талантливых и умных приехать в Америку. Огромная возможность!",
    'trump.support3': "Мы создадим путь, который будет справедливым, быстрым и фантастическим. Программа Gold Card — это действительно что-то особенное.",
    'trump.support4': "Мы хотим, чтобы в Америку приезжали самые умные люди. Gold Card — это то, как мы сделаем это реальностью. Это будет огромно!",
    
    // Trump mention
    'trump.support': 'Поддерживается иммиграционными инициативами администрации Трампа.'
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.howItWorks': 'Comment ça marche',
    'nav.faq': 'FAQ',
    'nav.aboutUs': 'À propos de nous',
    'nav.terms': 'Conditions',
    'nav.smartContract': 'Contrat intelligent',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Démocratisation de l\'accès aux opportunités d\'immigration',
    'hero.description': 'Une plateforme de dons décentralisée sur la blockchain Solana offrant aux non-citoyens américains une chance de gagner suffisamment pour demander la résidence Gold Card.',
    'hero.donateButton': 'Faire un don maintenant',
    'hero.donateNow': 'Faire un don maintenant',
    'hero.learnMore': 'En savoir plus',

    // Features
    'features.title': 'Pourquoi OneDollarGoldCard?',
    'features.transparent.title': 'Entièrement transparent',
    'features.transparent.desc': 'Toutes les transactions et la sélection des gagnants sont vérifiées en chaîne.',
    'features.accessible.title': 'Accessible à tous',
    'features.accessible.desc': 'Commencez avec seulement 1,00 USDC plus une petite commission.',
    'features.fair.title': 'Système de chance équitable',
    'features.fair.desc': 'Vos chances augmentent proportionnellement au montant de votre don.',
    'features.secure.title': 'Sécurisé par conception',
    'features.secure.desc': 'Construit sur la blockchain sécurisée et efficace de Solana.',

    // How It Works
    'howItWorks.title': 'Comment ça marche',
    'howItWorks.step1.title': 'Faire un don',
    'howItWorks.step1.desc': 'Faites un don minimum de 1,00 USDC (plus 5% de frais de service).',
    'howItWorks.step2.title': 'Rejoignez le pool',
    'howItWorks.step2.desc': 'Votre don augmente proportionnellement vos chances de gagner.',
    'howItWorks.step3.title': 'Sélection du gagnant',
    'howItWorks.step3.desc': 'Lorsque le pool atteint 10 millions de dollars, un gagnant est sélectionné au hasard.',
    'howItWorks.step4.title': 'Recevoir des fonds',
    'howItWorks.step4.desc': 'Le gagnant reçoit 5 millions de dollars et 5 millions de dollars restent pour le prochain tour.',

    // Donation Card
    'donation.title': 'Faire un don',
    'donation.amount': 'Montant du don',
    'donation.fee': 'Frais de service (5%)',
    'donation.total': 'Montant total',
    'donation.button': 'Faire un don maintenant',
    'donation.minAmount': 'Le don minimum est de 1,00 USDC.',
    'donation.walletConnect': 'Connecter le portefeuille',
    'donation.confirmation': 'Je confirme que je ne suis pas citoyen américain ou détenteur d\'une carte verte.',
    'donation.shareX': 'Partager sur X',
    'donation.stats': 'Vos statistiques',
    'donation.totalDonated': 'Total donné:',
    'donation.winningChance': 'Chance de gagner:',
    'donation.connectedWallet': 'Portefeuille connecté:',

    // Pool Stats
    'pool.title': 'Statistiques de la cagnotte',
    'pool.currentAmount': 'Montant actuel du pool',
    'pool.target': 'Montant cible',
    'pool.donors': 'Nombre total de donateurs',
    'pool.timeLeft': 'Temps estimé jusqu\'au tirage au sort',
    'pool.backupTitle': 'Protection contre l\'inactivité de 7 jours',
    'pool.backupInfo': 'S\'il n\'y a pas de dons pendant 7 jours, le dernier donateur reçoit l\'intégralité du pool.',
    'pool.share': 'Partager sur les réseaux',
    'pool.sns': 'Service de noms Solana',

    // Footer
    'footer.rights': 'Tous droits réservés.',
    'footer.terms': 'Conditions d\'utilisation',
    'footer.privacy': 'Politique de confidentialité',
    'footer.contact': 'Contactez nous',
    'footer.disclaimer': 'Cette plateforme n\'est pas affiliée au gouvernement américain.',
    
    // Trump quotes
    'trump.support1': "L'Amérique a besoin d'un système basé sur le mérite. L'initiative Gold Card est la façon dont nous obtiendrons les meilleurs talents. Croyez-moi!",
    'trump.support2': "La Gold Card est le meilleur moyen, peut-être de tous les temps, pour les meilleurs et les plus brillants de venir en Amérique. Une opportunité formidable!",
    'trump.support3': "Nous allons créer un chemin qui est juste, rapide et fantastique. Le programme Gold Card est vraiment quelque chose de spécial.",
    'trump.support4': "Nous voulons que les personnes les plus intelligentes viennent en Amérique. La Gold Card est la façon dont nous y parviendrons. Ça va être énorme!",
    
    // Trump mention
    'trump.support': 'Soutenu par les initiatives d\'immigration de l\'administration Trump.'
  },
  
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.howItWorks': 'Wie es funktioniert',
    'nav.faq': 'FAQ',
    'nav.aboutUs': 'Über uns',
    'nav.terms': 'Nutzungsbedingungen',
    'nav.smartContract': 'Smart Contract',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Demokratisierung des Zugangs zu Einwanderungsmöglichkeiten',
    'hero.description': 'Eine dezentrale Spendenplattform auf der Solana-Blockchain, die Nicht-US-Bürgern die Möglichkeit bietet, genügend Geld zu gewinnen, um die Gold Card-Aufenthaltserlaubnis zu beantragen.',
    'hero.donateButton': 'Jetzt spenden',
    'hero.donateNow': 'Jetzt spenden',
    'hero.learnMore': 'Mehr erfahren',

    // Features
    'features.title': 'Warum OneDollarGoldCard?',
    'features.transparent.title': 'Vollständig transparent',
    'features.transparent.desc': 'Alle Transaktionen und die Gewinnerauswahl werden On-Chain verifiziert.',
    'features.accessible.title': 'Für jeden zugänglich',
    'features.accessible.desc': 'Beginnen Sie mit nur 1,00 USDC plus einer geringen Gebühr.',
    'features.fair.title': 'Faires Chancensystem',
    'features.fair.desc': 'Ihre Chancen steigen proportional zu Ihrem Spendenbetrag.',
    'features.secure.title': 'Sicher durch Design',
    'features.secure.desc': 'Auf der sicheren und effizienten Blockchain von Solana aufgebaut.',

    // How It Works
    'howItWorks.title': 'Wie es funktioniert',
    'howItWorks.step1.title': 'Spenden Sie',
    'howItWorks.step1.desc': 'Spenden Sie mindestens 1,00 USDC (zuzüglich 5% Servicegebühr).',
    'howItWorks.step2.title': 'Treten Sie dem Pool bei',
    'howItWorks.step2.desc': 'Ihre Spende erhöht proportional Ihre Gewinnchance.',
    'howItWorks.step3.title': 'Gewinnerauswahl',
    'howItWorks.step3.desc': 'Wenn der Pool 10 Millionen US-Dollar erreicht, wird ein Gewinner zufällig ausgewählt.',
    'howItWorks.step4.title': 'Gelder erhalten',
    'howItWorks.step4.desc': 'Der Gewinner erhält 5 Millionen US-Dollar und 5 Millionen US-Dollar verbleiben für die nächste Runde.',

    // Donation Card
    'donation.title': 'Spenden Sie',
    'donation.amount': 'Spendenbetrag',
    'donation.fee': 'Servicegebühr (5%)',
    'donation.total': 'Gesamtbetrag',
    'donation.button': 'Jetzt spenden',
    'donation.minAmount': 'Die Mindestspende beträgt 1,00 USDC.',
    'donation.walletConnect': 'Wallet verbinden',
    'donation.confirmation': 'Ich bestätige, dass ich kein US-Bürger oder Green Card-Inhaber bin.',
    'donation.shareX': 'Auf X teilen',
    'donation.stats': 'Ihre Statistiken',
    'donation.totalDonated': 'Gesamt gespendet:',
    'donation.winningChance': 'Gewinnchance:',
    'donation.connectedWallet': 'Verbundenes Wallet:',

    // Pool Stats
    'pool.title': 'Statistiken des Preispools',
    'pool.currentAmount': 'Aktueller Poolbetrag',
    'pool.target': 'Zielbetrag',
    'pool.donors': 'Anzahl der Spender',
    'pool.timeLeft': 'Geschätzte Zeit bis zur Ziehung',
    'pool.backupTitle': '7-Tage-Inaktivitätsschutz',
    'pool.backupInfo': 'Wenn 7 Tage lang keine Spenden eingehen, erhält der letzte Spender den gesamten Pool.',
    'pool.share': 'In sozialen Netzwerken teilen',
    'pool.sns': 'Solana Name Service',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.privacy': 'Datenschutzrichtlinie',
    'footer.contact': 'Kontaktiere uns',
    'footer.disclaimer': 'Diese Plattform ist nicht mit der US-Regierung verbunden.',
    
    // Trump quotes
    'trump.support1': "Amerika braucht ein leistungsbasiertes System. Die Gold Card Initiative ist, wie wir die besten Talente bekommen werden. Glauben Sie mir!",
    'trump.support2': "Die Gold Card ist der beste Weg, vielleicht der beste aller Zeiten, für die Besten und Klügsten, nach Amerika zu kommen. Eine fantastische Chance!",
    'trump.support3': "Wir werden einen Weg schaffen, der fair, schnell und fantastisch ist. Das Gold Card Programm ist wirklich etwas Besonderes.",
    'trump.support4': "Wir wollen die klügsten Leute, die nach Amerika kommen. Die Gold Card ist, wie wir das erreichen werden. Es wird riesig werden!",
    
    // Trump mention
    'trump.support': 'Unterstützt von den Einwanderungsinitiativen der Trump-Administration.'
  },
  
  zh: {
    // Navigation
    'nav.home': '首頁',
    'nav.howItWorks': '運作方式',
    'nav.faq': '常見問題',
    'nav.aboutUs': '關於我們',
    'nav.terms': '條款',
    'nav.smartContract': '智能合約',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': '普及移民機會',
    'hero.description': '一個在 Solana 區塊鏈上的去中心化捐贈平台，為非美國公民提供贏取足夠資金申請美國金卡的機會。',
    'hero.donateButton': '立即捐款',
    'hero.donateNow': '立即捐款',
    'hero.learnMore': '了解更多',

    // Features
    'features.title': '為什麼選擇 OneDollarGoldCard？',
    'features.transparent.title': '完全透明',
    'features.transparent.desc': '所有交易和獲獎者選擇都在鏈上驗證。',
    'features.accessible.title': '人人皆可參與',
    'features.accessible.desc': '只需 1.00 USDC 加上少量費用即可開始。',
    'features.fair.title': '公平機會系統',
    'features.fair.desc': '您的機會隨著您的捐款金額成比例增加。',
    'features.secure.title': '安全設計',
    'features.secure.desc': '建立在 Solana 安全高效的區塊鏈上。',

    // How It Works
    'howItWorks.title': '運作方式',
    'howItWorks.step1.title': '進行捐贈',
    'howItWorks.step1.desc': '捐贈至少 1.00 USDC（加上 5% 的服務費）。',
    'howItWorks.step2.title': '加入獎金池',
    'howItWorks.step2.desc': '您的捐款成比例地增加您獲勝的機會。',
    'howItWorks.step3.title': '選擇獲獎者',
    'howItWorks.step3.desc': '當獎金池達到 1000 萬美元時，將隨機選擇一位獲獎者。',
    'howItWorks.step4.title': '接收資金',
    'howItWorks.step4.desc': '獲獎者將獲得 500 萬美元，而 500 萬美元將保留到下一輪。',

    // Donation Card
    'donation.title': '進行捐贈',
    'donation.amount': '捐贈金額',
    'donation.fee': '服務費 (5%)',
    'donation.total': '總金額',
    'donation.button': '立即捐款',
    'donation.minAmount': '最低捐贈金額為 1.00 USDC。',
    'donation.walletConnect': '連接錢包',
    'donation.confirmation': '我確認我不是美國公民或綠卡持有人。',
    'donation.shareX': '在 X 上分享',
    'donation.stats': '您的統計資料',
    'donation.totalDonated': '總捐贈額:',
    'donation.winningChance': '獲勝機會:',
    'donation.connectedWallet': '已連接錢包:',

    // Pool Stats
    'pool.title': '獎金池統計',
    'pool.currentAmount': '目前獎金池金額',
    'pool.target': '目標金額',
    'pool.donors': '捐贈者總數',
    'pool.timeLeft': '預計抽獎時間',
    'pool.backupTitle': '7天不活動保障',
    'pool.backupInfo': '如果 7 天內沒有捐款，最後一位捐贈者將獲得整個獎金池。',
    'pool.share': '分享到社交媒體',
    'pool.sns': 'Solana 名稱服務',

    // Footer
    'footer.rights': '版權所有。',
    'footer.terms': '條款與細則',
    'footer.privacy': '隱私政策',
    'footer.contact': '聯繫我們',
    'footer.disclaimer': '本平台與美國政府無關。',
    
    // Trump quotes
    'trump.support1': "美國需要一個基於績效的系統。金卡計劃是我們獲得最佳人才的方式。相信我！",
    'trump.support2': "金卡是最好的方式，可能是有史以來最好的，讓最優秀和最聰明的人來到美國。這是一個巨大的機會！",
    'trump.support3': "我們將創建一個公平、快速且精彩的途徑。金卡計劃真的很特別。",
    'trump.support4': "我們希望最聰明的人來到美國。金卡就是我們實現這一目標的方式。這將會非常成功！",
    
    // Trump mention
    'trump.support': '受到特朗普政府移民倡議的支持。'
  },
  
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'nav.aboutUs': 'हमारे बारे में',
    'nav.terms': 'नियम और शर्तें',
    'nav.smartContract': 'स्मार्ट कॉन्ट्रैक्ट',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'आव्रजन अवसरों तक पहुंच का लोकतंत्रीकरण',
    'hero.description': 'सोलाना ब्लॉकचेन पर एक विकेन्द्रीकृत दान मंच जो गैर-अमेरिकी नागरिकों को अमेरिकी गोल्ड कार्ड निवास के लिए आवेदन करने के लिए पर्याप्त जीतने का मौका प्रदान करता है।',
    'hero.donateButton': 'अभी दान करें',
    'hero.donateNow': 'अभी दान करें',
    'hero.learnMore': 'और जानें',

    // Features
    'features.title': 'OneDollarGoldCard क्यों?',
    'features.transparent.title': 'पूरी तरह से पारदर्शी',
    'features.transparent.desc': 'सभी लेनदेन और विजेता चयन ऑन-चेन सत्यापित हैं।',
    'features.accessible.title': 'सभी के लिए सुलभ',
    'features.accessible.desc': 'सिर्फ 1.00 USDC और एक छोटे शुल्क के साथ शुरू करें।',
    'features.fair.title': 'उचित अवसर प्रणाली',
    'features.fair.desc': 'आपके दान की राशि के अनुपात में आपकी संभावनाएँ बढ़ जाती हैं।',
    'features.secure.title': 'डिजाइन द्वारा सुरक्षित',
    'features.secure.desc': 'सोलाना के सुरक्षित और कुशल ब्लॉकचेन पर निर्मित।',

    // How It Works
    'howItWorks.title': 'यह कैसे काम करता है',
    'howItWorks.step1.title': 'दान करें',
    'howItWorks.step1.desc': 'न्यूनतम 1.00 USDC (प्लस 5% सेवा शुल्क) दान करें।',
    'howItWorks.step2.title': 'पूल में शामिल हों',
    'howItWorks.step2.desc': 'आपका दान आनुपातिक रूप से जीतने की आपकी संभावना को बढ़ाता है।',
    'howItWorks.step3.title': 'विजेता का चयन',
    'howItWorks.step3.desc': 'जब पूल 10 मिलियन डॉलर तक पहुंच जाएगा, तो एक विजेता को यादृच्छिक रूप से चुना जाएगा।',
    'howItWorks.step4.title': 'धन प्राप्त करें',
    'howItWorks.step4.desc': 'विजेता को 5 मिलियन डॉलर मिलते हैं, और 5 मिलियन डॉलर अगले दौर के लिए बने रहते हैं।',

    // Donation Card
    'donation.title': 'दान करें',
    'donation.amount': 'दान राशि',
    'donation.fee': 'सेवा शुल्क (5%)',
    'donation.total': 'कुल राशि',
    'donation.button': 'अभी दान करें',
    'donation.minAmount': 'न्यूनतम दान 1.00 USDC है।',
    'donation.walletConnect': 'वॉलेट कनेक्ट करें',
    'donation.confirmation': 'मैं पुष्टि करता हूं कि मैं अमेरिकी नागरिक या ग्रीन कार्ड धारक नहीं हूं।',
    'donation.shareX': 'X पर साझा करें',
    'donation.stats': 'आपके आंकड़े',
    'donation.totalDonated': 'कुल दान किया गया:',
    'donation.winningChance': 'जीतने का मौका:',
    'donation.connectedWallet': 'कनेक्टेड वॉलेट:',

    // Pool Stats
    'pool.title': 'पुरस्कार पूल सांख्यिकी',
    'pool.currentAmount': 'वर्तमान पूल राशि',
    'pool.target': 'लक्ष्य राशि',
    'pool.donors': 'कुल दानकर्ता',
    'pool.timeLeft': 'ड्रॉ तक अनुमानित समय',
    'pool.backupTitle': '7 दिन की निष्क्रियता सुरक्षा',
    'pool.backupInfo': 'यदि 7 दिनों तक कोई दान नहीं होता है, तो अंतिम दानकर्ता को पूरा पूल प्राप्त होगा।',
    'pool.share': 'सोशल मीडिया पर शेयर करें',
    'pool.sns': 'सोलाना नाम सेवा',

    // Footer
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    'footer.terms': 'नियम और शर्तें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.contact': 'संपर्क करें',
    'footer.disclaimer': 'यह मंच अमेरिकी सरकार से संबद्ध नहीं है।',
    
    // Trump quotes
    'trump.support1': "अमेरिका को एक योग्यता-आधारित प्रणाली की आवश्यकता है। गोल्ड कार्ड पहल वह है जिससे हमें सर्वश्रेष्ठ प्रतिभा मिलेगी। मुझ पर विश्वास करो!",
    'trump.support2': "गोल्ड कार्ड सर्वश्रेष्ठ और सबसे प्रतिभाशाली लोगों के अमेरिका आने का सबसे अच्छा तरीका है, शायद अब तक का सबसे अच्छा! जबरदस्त अवसर!",
    'trump.support3': "हम एक ऐसा मार्ग बनाएंगे जो निष्पक्ष, तेज और शानदार हो। गोल्ड कार्ड कार्यक्रम वास्तव में कुछ विशेष है।",
    'trump.support4': "हम चाहते हैं कि सबसे चतुर लोग अमेरिका आएं। गोल्ड कार्ड वह है जिससे हम यह सुनिश्चित करेंगे। यह बहुत बड़ा होने वाला है!",
    
    // Trump mention
    'trump.support': 'ट्रम्प प्रशासन की आव्रजन पहल द्वारा समर्थित।'
  },
  
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.howItWorks': 'Cara Kerja',
    'nav.faq': 'FAQ',
    'nav.aboutUs': 'Tentang Kami',
    'nav.terms': 'Ketentuan',
    'nav.smartContract': 'Kontrak Pintar',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Demokratisasi Akses ke Peluang Imigrasi',
    'hero.description': 'Platform donasi terdesentralisasi di blockchain Solana yang menawarkan kesempatan kepada warga negara non-AS untuk memenangkan cukup uang untuk mengajukan permohonan residensi Kartu Emas AS.',
    'hero.donateButton': 'Donasi Sekarang',
    'hero.donateNow': 'Donasi Sekarang',
    'hero.learnMore': 'Pelajari Lebih Lanjut',

    // Features
    'features.title': 'Mengapa OneDollarGoldCard?',
    'features.transparent.title': 'Sepenuhnya Transparan',
    'features.transparent.desc': 'Semua transaksi dan pemilihan pemenang diverifikasi on-chain.',
    'features.accessible.title': 'Dapat Diakses oleh Semua Orang',
    'features.accessible.desc': 'Mulai hanya dengan 1,00 USDC ditambah biaya kecil.',
    'features.fair.title': 'Sistem Kesempatan yang Adil',
    'features.fair.desc': 'Peluang Anda meningkat sebanding dengan jumlah donasi Anda.',
    'features.secure.title': 'Aman Berdasarkan Desain',
    'features.secure.desc': 'Dibangun di atas blockchain Solana yang aman dan efisien.',

    // How It Works
    'howItWorks.title': 'Cara Kerja',
    'howItWorks.step1.title': 'Berikan Donasi',
    'howItWorks.step1.desc': 'Donasikan minimal 1,00 USDC (ditambah biaya layanan 5%).',
    'howItWorks.step2.title': 'Bergabung dengan Pool',
    'howItWorks.step2.desc': 'Donasi Anda meningkatkan peluang Anda untuk menang secara proporsional.',
    'howItWorks.step3.title': 'Pemilihan Pemenang',
    'howItWorks.step3.desc': 'Ketika pool mencapai $10 juta, seorang pemenang akan dipilih secara acak.',
    'howItWorks.step4.title': 'Terima Dana',
    'howItWorks.step4.desc': 'Pemenang menerima $5 juta, dan $5 juta tetap untuk putaran berikutnya.',

    // Donation Card
    'donation.title': 'Berikan Donasi',
    'donation.amount': 'Jumlah Donasi',
    'donation.fee': 'Biaya Layanan (5%)',
    'donation.total': 'Jumlah Total',
    'donation.button': 'Donasi Sekarang',
    'donation.minAmount': 'Donasi minimal adalah 1,00 USDC.',
    'donation.walletConnect': 'Hubungkan Dompet',
    'donation.confirmation': 'Saya mengonfirmasi bahwa saya bukan warga negara AS atau pemegang kartu hijau.',
    'donation.shareX': 'Bagikan di X',
    'donation.stats': 'Statistik Anda',
    'donation.totalDonated': 'Total Didonasikan:',
    'donation.winningChance': 'Peluang Menang:',
    'donation.connectedWallet': 'Dompet Terhubung:',

    // Pool Stats
    'pool.title': 'Statistik Pool Hadiah',
    'pool.currentAmount': 'Jumlah Pool Saat Ini',
    'pool.target': 'Jumlah Target',
    'pool.donors': 'Total Donor',
    'pool.timeLeft': 'Perkiraan Waktu Hingga Pengundian',
    'pool.backupTitle': 'Perlindungan Ketidakaktifan 7 Hari',
    'pool.backupInfo': 'Jika tidak ada donasi selama 7 hari, donor terakhir menerima seluruh pool.',
    'pool.share': 'Bagikan di Media Sosial',
    'pool.sns': 'Layanan Nama Solana',

    // Footer
    'footer.rights': 'Hak cipta dilindungi undang-undang.',
    'footer.terms': 'Syarat & Ketentuan',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.contact': 'Hubungi Kami',
    'footer.disclaimer': 'Platform ini tidak berafiliasi dengan pemerintah AS.',
    
    // Trump quotes
    'trump.support1': "Amerika membutuhkan sistem berbasis prestasi. Inisiatif Gold Card adalah cara kita akan mendapatkan bakat terbaik. Percayalah pada saya!",
    'trump.support2': "Gold Card adalah cara terbaik, mungkin yang terbaik sepanjang masa, bagi yang terbaik dan paling cemerlang untuk datang ke Amerika. Kesempatan luar biasa!",
    'trump.support3': "Kami akan menciptakan jalur yang adil, cepat, dan fantastis. Program Gold Card benar-benar sesuatu yang istimewa.",
    'trump.support4': "Kami ingin orang-orang terpintar datang ke Amerika. Gold Card adalah cara kami akan mewujudkannya. Ini akan menjadi sangat besar!",
    
    // Trump mention
    'trump.support': 'Didukung oleh inisiatif imigrasi pemerintahan Trump.'
  },
  
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.howItWorks': '仕組み',
    'nav.faq': 'よくある質問',
    'nav.aboutUs': '私たちについて',
    'nav.terms': '利用規約',
    'nav.smartContract': 'スマートコントラクト',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': '移民機会へのアクセスの民主化',
    'hero.description': 'Solanaブロックチェーン上の分散型寄付プラットフォームで、非米国市民にUS Gold Card居住権を申請するのに十分な金額を獲得するチャンスを提供します。',
    'hero.donateButton': '今すぐ寄付',
    'hero.donateNow': '今すぐ寄付',
    'hero.learnMore': '詳細を見る',

    // Features
    'features.title': 'なぜOneDollarGoldCard？',
    'features.transparent.title': '完全に透明',
    'features.transparent.desc': 'すべての取引と当選者の選択はオンチェーンで検証されます。',
    'features.accessible.title': '誰でもアクセス可能',
    'features.accessible.desc': '少額の手数料に加えて1.00 USDCだけで始められます。',
    'features.fair.title': '公平な機会システム',
    'features.fair.desc': 'あなたの寄付額に比例してチャンスが増加します。',
    'features.secure.title': '設計による安全性',
    'features.secure.desc': 'Solanaの安全で効率的なブロックチェーン上に構築されています。',

    // How It Works
    'howItWorks.title': '仕組み',
    'howItWorks.step1.title': '寄付する',
    'howItWorks.step1.desc': '最低1.00 USDC（プラス5％のサービス料）を寄付します。',
    'howItWorks.step2.title': 'プールに参加する',
    'howItWorks.step2.desc': 'あなたの寄付は、勝つチャンスを比例的に増加させます。',
    'howItWorks.step3.title': '当選者の選出',
    'howItWorks.step3.desc': 'プールが1000万ドルに達すると、当選者がランダムに選ばれます。',
    'howItWorks.step4.title': '資金を受け取る',
    'howItWorks.step4.desc': '当選者は500万ドルを受け取り、500万ドルが次のラウンドのために残ります。',

    // Donation Card
    'donation.title': '寄付する',
    'donation.amount': '寄付金額',
    'donation.fee': 'サービス料（5％）',
    'donation.total': '合計金額',
    'donation.button': '今すぐ寄付',
    'donation.minAmount': '最低寄付額は1.00 USDCです。',
    'donation.walletConnect': 'ウォレットを接続',
    'donation.confirmation': '私は米国市民またはグリーンカード保持者ではないことを確認します。',
    'donation.shareX': 'Xでシェア',
    'donation.stats': 'あなたの統計',
    'donation.totalDonated': '寄付総額:',
    'donation.winningChance': '当選確率:',
    'donation.connectedWallet': '接続中のウォレット:',

    // Pool Stats
    'pool.title': '賞金プール統計',
    'pool.currentAmount': '現在のプール金額',
    'pool.target': '目標金額',
    'pool.donors': '寄付者総数',
    'pool.timeLeft': '抽選までの推定時間',
    'pool.backupTitle': '7日間の不活動保護',
    'pool.backupInfo': '7日間寄付がない場合、最後の寄付者がプール全体を受け取ります。',
    'pool.share': 'ソーシャルでシェア',
    'pool.sns': 'Solana ネームサービス',

    // Footer
    'footer.rights': '全著作権所有。',
    'footer.terms': '利用規約',
    'footer.privacy': 'プライバシーポリシー',
    'footer.contact': 'お問い合わせ',
    'footer.disclaimer': 'このプラットフォームは米国政府と提携していません。',
    
    // Trump quotes
    'trump.support1': "アメリカには実力主義のシステムが必要です。ゴールドカードイニシアチブは、最高の人材を獲得する方法です。信じてください！",
    'trump.support2': "ゴールドカードは、最高で最も優秀な人材がアメリカに来るための最良の方法です。素晴らしい機会です！",
    'trump.support3': "私たちは公平で、迅速で、素晴らしい道を作ります。ゴールドカードプログラムは本当に特別なものです。",
    'trump.support4': "私たちは最も賢い人々がアメリカに来ることを望んでいます。ゴールドカードはそれを実現する方法です。これは非常に大きなことになるでしょう！",
    
    // Trump mention
    'trump.support': 'トランプ政権の移民イニシアチブによって支持されています。'
  }
};

