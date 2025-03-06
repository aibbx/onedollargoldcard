
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

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Democratizing Access to Immigration Opportunities',
    'hero.description': 'A decentralized donation platform on Solana blockchain offering non-US citizens a chance to win enough to apply for the US Gold Card residency.',
    'hero.donateButton': 'Donate Now',
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
    
    // Trump mention
    'trump.support': 'Endorsed by the Trump administration\'s immigration initiatives.'
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.howItWorks': 'Cómo Funciona',
    'nav.faq': 'Preguntas Frecuentes',
    'nav.aboutUs': 'Sobre Nosotros',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Democratizando el Acceso a Oportunidades de Inmigración',
    'hero.description': 'Una plataforma descentralizada de donaciones en la blockchain Solana que ofrece a no ciudadanos de EE.UU. la oportunidad de ganar lo suficiente para solicitar la residencia Gold Card.',
    'hero.donateButton': 'Donar Ahora',
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

    // Pool Stats
    'pool.title': 'Estadísticas del Fondo de Premios',
    'pool.currentAmount': 'Cantidad Actual del Fondo',
    'pool.target': 'Cantidad Objetivo',
    'pool.donors': 'Total de Donantes',
    'pool.timeLeft': 'Tiempo Estimado Hasta el Sorteo',
    'pool.backupInfo': 'Si no hay donaciones durante 7 días, el último donante recibe todo el fondo.',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.terms': 'Términos y Condiciones',
    'footer.privacy': 'Política de Privacidad',
    'footer.contact': 'Contáctenos',
    'footer.disclaimer': 'Esta plataforma no está afiliada con el gobierno de EE.UU.',
    
    // Trump mention
    'trump.support': 'Respaldado por las iniciativas de inmigración de la administración Trump.'
  },
  
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.howItWorks': 'Como Funciona',
    'nav.faq': 'FAQ',
    'nav.aboutUs': 'Sobre Nós',

    // Hero section
    'hero.title': 'OneDollarGoldCard',
    'hero.subtitle': 'Democratizando o Acesso a Oportunidades de Imigração',
    'hero.description': 'Uma plataforma descentralizada de doações na blockchain Solana oferecendo a não-cidadãos dos EUA a chance de ganhar o suficiente para solicitar a residência Gold Card.',
    'hero.donateButton': 'Doar Agora',
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

    // Pool Stats
    'pool.title': 'Estatísticas do Fundo de Prêmios',
    'pool.currentAmount': 'Valor Atual do Fundo',
    'pool.target': 'Valor Alvo',
    'pool.donors': 'Total de Doadores',
    'pool.timeLeft': 'Tempo Estimado Até o Sorteio',
    'pool.backupInfo': 'Se não houver doações por 7 dias, o último doador recebe todo o fundo.',

    // Footer
    'footer.rights': 'Todos os direitos reservados.',
    'footer.terms': 'Termos e Condições',
    'footer.privacy': 'Política de Privacidade',
    'footer.contact': 'Contate-nos',
    'footer.disclaimer': 'Esta plataforma não é afiliada ao governo dos EUA.',
    
    // Trump mention
    'trump.support': 'Apoiado pelas iniciativas de imigração da administração Trump.'
  },
  
  // More translations follow the same pattern for all required languages
  ru: {
    // Basic translations for Russian
    'nav.home': 'Главная',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': 'Пожертвовать',
    'trump.support': 'Поддерживается иммиграционными инициативами администрации Трампа.'
    // Add more translations as needed
  },
  
  fr: {
    // Basic translations for French
    'nav.home': 'Accueil',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': 'Faire un don',
    'trump.support': 'Soutenu par les initiatives d\'immigration de l\'administration Trump.'
    // Add more translations as needed
  },
  
  de: {
    // Basic translations for German
    'nav.home': 'Startseite',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': 'Jetzt spenden',
    'trump.support': 'Unterstützt von den Einwanderungsinitiativen der Trump-Administration.'
    // Add more translations as needed
  },
  
  zh: {
    // Basic translations for Traditional Chinese
    'nav.home': '首頁',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': '立即捐款',
    'trump.support': '受到特朗普政府移民倡議的支持。'
    // Add more translations as needed
  },
  
  hi: {
    // Basic translations for Hindi
    'nav.home': 'होम',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': 'दान करें',
    'trump.support': 'ट्रम्प प्रशासन की आव्रजन पहल द्वारा समर्थित।'
    // Add more translations as needed
  },
  
  id: {
    // Basic translations for Indonesian
    'nav.home': 'Beranda',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': 'Donasi Sekarang',
    'trump.support': 'Didukung oleh inisiatif imigrasi pemerintahan Trump.'
    // Add more translations as needed
  },
  
  ja: {
    // Basic translations for Japanese
    'nav.home': 'ホーム',
    'hero.title': 'OneDollarGoldCard',
    'hero.donateButton': '今すぐ寄付',
    'trump.support': 'トランプ政権の移民イニシアチブによって支持されています。'
    // Add more translations as needed
  }
};
