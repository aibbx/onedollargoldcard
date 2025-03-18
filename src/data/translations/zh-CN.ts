
import { TranslationDictionary } from './types';

export const zhCN: TranslationDictionary = {
  // Navigation
  'nav.home': '首页',
  'nav.howItWorks': '运作方式',
  'nav.faq': '常见问题',
  'nav.terms': '条款',
  
  // Hero section
  'hero.title': '一美元黄金卡计划',
  'hero.subtitle': '仅需 $1 即可支持这项倡议',
  'hero.donateNow': '立即捐赠',
  
  // Donation section
  'donation.title': '捐赠',
  'donation.amountLabel': '捐赠金额',
  'donation.minAmount': '最低捐赠金额为 $1.00 USDT',
  'donation.fee': '服务费 (5%)',
  'donation.total': '总计',
  'donation.confirmation': '我同意条款和条件，并确认我有资格参加本计划',
  'donation.button': '捐赠 USDT',
  'donation.walletConnect': '连接钱包',
  'donation.incentive': '赢取高达 $5 百万美元的黄金卡',
  'donation.multiplier': '捐赠越多，赢取几率越高',
  'donation.shareOnX': '在 X 上分享',
  'donation.history': '捐赠历史',
  'donation.stats.totalDonated': '总捐赠额',
  'donation.stats.winningChance': '获胜几率',
  'donation.stats.walletType': '钱包类型',
  'donation.stats.donationCount': '捐赠次数',
  'donation.stats.lastDonation': '最近捐赠',
  'donation.recover': '恢复交易记录',
  
  // Pool stats
  'pool.title': '奖池状态',
  'pool.total': '奖池总额',
  'pool.target': '目标金额',
  'pool.donors': '捐赠者',
  'pool.timeRemaining': '剩余时间',
  'pool.currentAmount': '当前金额',
  'pool.progress': '完成进度',
  'pool.shareTitle': '分享奖池',
  
  // Features section
  'features.title': '为什么选择我们?',
  'features.subtitle': '我们的使命是让移民机会更加民主化',
  'features.1.title': '100% 透明',
  'features.1.description': '我们的智能合约在区块链上公开，确保所有交易的完全透明',
  'features.2.title': '安全与信任',
  'features.2.description': '您的捐款直接进入奖金池，我们无法提取或调用',
  'features.3.title': '真正的影响',
  'features.3.description': '您的捐款支持更广泛的社区获得移民机会',
  
  // Statistics
  'stats.donors': '捐赠者',
  'stats.raised': '已筹集',
  'stats.winners': '获奖者',
  
  // How it works page
  'howItWorks.title': '运作方式',
  'howItWorks.subtitle': '我们的平台使用区块链技术，确保黄金卡计划获奖者选择过程的透明度和公平性',
  'howItWorks.tab.donationMechanics': '捐赠机制',
  'howItWorks.tab.winnerSelection': '获奖者选择',
  'howItWorks.tab.security': '安全功能',
  'howItWorks.tab.smartContract': '智能合约',
  
  // FAQ page
  'faq.title': '常见问题',
  'faq.subtitle': '关于 OneDollarGoldCard 的常见问题',
  'faq.contact.title': '还有疑问?',
  'faq.contact.description': '如果您有其他问题，请随时与我们联系',
  'faq.contact.button': '联系我们',
  'faq.section.general': '一般问题',
  'faq.section.donation': '捐赠流程',
  'faq.section.winner': '获奖者选择',
  'faq.section.technical': '技术与安全',
  'faq.section.legal': '法律与合规',
  
  // Wallet connection
  'wallet.connect': '连接钱包',
  'wallet.description': '连接您的 BSC 钱包以捐赠并参与黄金卡计划',
  'wallet.agreement': '连接钱包即表示您同意我们的',
  'wallet.terms': '服务条款',
  'wallet.privacy': '隐私政策',
  'wallet.clickToConnect': '点击连接',
  'wallet.install': '安装',
  'wallet.disconnect': '断开钱包连接',
  'wallet.donateNow': '立即捐赠',
  
  // Terms page
  'terms.title': '条款和条件',
  'terms.subtitle': '使用 OneDollarGoldCard 前，请仔细阅读这些条款',
  'terms.lastUpdated': '最后更新',
  'terms.agree': '我同意并想立即捐赠',
  'terms.section.eligibility': '资格',
  'terms.section.platform': '平台运作',
  'terms.section.donations': '捐赠',
  'terms.section.prize': '奖金分配',
  'terms.section.disclaimers': '免责声明',
  'terms.section.privacy': '隐私',
  'terms.section.modifications': '修改',
  'terms.section.governing': '适用法律',
  
  // Footer
  'footer.rights': '版权所有',
  'footer.terms': '条款和条件',
  'footer.privacy': '隐私政策',
  'footer.contact': '联系我们',
  
  // Notifications and errors
  'notify.donation.preparing': '准备您的捐赠',
  'notify.donation.processing': '处理交易中',
  'notify.donation.approve': '请在您的钱包中批准交易',
  'notify.donation.stillProcessing': '处理时间超出预期',
  'notify.donation.checkWallet': '请检查您的钱包，确保您已批准交易',
  'notify.donation.success': '捐赠成功',
  'notify.donation.thankYou': '谢谢！您的捐赠已确认',
  'notify.donation.failed': '捐赠失败',
  'notify.donation.error.insufficient': '您的钱包中没有足够的 USDT，请添加更多 USDT 后重试',
  'notify.donation.error.rejected': '您在钱包中拒绝了交易，准备好批准时请重试',
  'notify.donation.error.timeout': '交易超时，Solana 网络可能拥堵，请重试',
  'notify.donation.error.tokenAccount': '您需要一个 USDT 代币账户，请先向您的钱包添加一些 USDT',
  'notify.recovery.found': '发现捐赠交易',
  'notify.recovery.description': '我们发现了来自您钱包的捐赠交易',
  'notify.recovery.button': '恢复捐赠记录',
  
  // Not found page
  'notFound.title': '404',
  'notFound.message': '抱歉！找不到页面',
  'notFound.return': '返回首页'
};
