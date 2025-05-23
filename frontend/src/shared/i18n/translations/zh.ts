export default {
  appTitle: "PremiaLab AI 投资组合分析器",
  chat: {
    welcome: "欢迎使用PremiaLab AI 投资组合分析器。我可以帮助您分析投资组合、提供市场洞察和回答投资相关问题。",
    inputPlaceholder: "输入您的投资相关问题...",
    examplesTitle: "您可以问这些问题：",
    examples: {
      tech: "分析一个科技股投资组合的表现",
      createPortfolio: "帮我创建一个投资组合：40% AAPL, 30% MSFT, 20% GOOGL, 10% AMZN",
      techAllocation: "我应该如何在美国大型科技股中进行配置？",
      lowRisk: "推荐一个低风险投资组合"
    },
    sendButton: "发送",
    disclaimer: "投资助手可以提供分析和建议，但不构成投资建议。请咨询专业人士进行投资决策。",
    loading: "思考中...",
    apiKeyRequired: "请先设置您的Perplexity API密钥。点击右上角的设置图标进行设置。",
    apiCallFailed: "API调用失败。请检查您的API密钥是否正确，或稍后再试。",
    apiKeyInvalid: "您提供的API密钥无效或已过期。请更新您的API密钥。",
    apiRateLimited: "请求过多，API访问受到限制。请稍等片刻再试。",
    networkError: "网络连接错误，无法连接到API服务器。请检查您的网络连接。",
    backendError: "发送到后端失败。请检查API连接是否正常工作，或稍后再试。",
    portfolioSent: "投资组合已成功发送到后端。",
    responseId: "响应ID",
    createdAt: "创建于",
    defaultMockResponse: "我是测试模式下的AI助手，我将根据您的输入提供模拟响应。",
    mockPortfolioResponse: "我已为您创建了一个科技股投资组合，这是一个测试响应。",
    mockPortfolioName: "测试投资组合",
    newChat: "新对话",
    recentChats: "最近对话",
    noChats: "无对话历史",
    sendMessage: "向PremiaLab AI发送消息...",
    networkSearch: "网络搜索",
    manualInput: "手动输入",
    aiDisclaimer: "AI可能会出错。请验证重要信息。",
    welcomeTitle: "我是PremiaLab AI，很高兴认识您！",
    welcomeDescription: "我可以帮助您分析投资组合，提供市场洞察，并回答投资相关问题。",
    newChatTitle: "新对话",
    aiAssistant: "AI助手",
    backToChat: "返回对话",
    openDashboard: "打开投资组合仪表板",
    generalOptions: "通用选项",
    webSearch: "网络搜索",
    generatedByAI: "内容由AI生成，请仔细审核",
    newConversation: "新对话",
    recentConversations: "最近对话",
    noConversations: "无对话历史",
    createManualPortfolio: "手动创建投资组合"
  },
  portfolio: {
    title: "投资组合",
    sendToDashboard: "发送到仪表板",
    name: "投资组合名称",
    enterName: "输入投资组合名称",
    stockList: "股票列表",
    addStock: "添加股票",
    stockCode: "股票代码（例如 AAPL）",
    weight: "权重",
    delete: "删除",
    cancel: "取消",
    submit: "提交投资组合",
    createManually: "手动创建投资组合",
    error: "投资组合创建失败",
    sentToDashboard: "仪表板已生成，点击查看",
    nameRequired: "请输入投资组合名称",
    symbolRequired: "请输入所有股票的代码",
    weightSumError: "权重总和应为100%。当前总和：{totalWeight}%",
    created: "已创建投资组合：{name}，包含{count}只股票",
    defaultName: "我的投资组合",
    createNew: "创建新投资组合",
    totalWeight: "总权重",
    manualAnalyzer: {
      title: "手动投资组合分析器",
      description: "输入您自己的投资组合进行分析",
      createTitle: "创建投资组合",
      nameLabel: "投资组合名称",
      descriptionLabel: "描述（可选）",
      stocksLabel: "股票列表",
      addStock: "添加股票",
      codeLabel: "股票代码",
      stockName: "股票名称",
      weightLabel: "权重",
      actionLabel: "操作",
      removeStock: "移除",
      balanceWeights: "平衡权重",
      totalWeight: "总权重",
      startAnalysis: "开始分析",
      analyzing: "分析中...",
      returnToEdit: "返回编辑",
      analysisError: "分析错误",
      analysisResults: "分析结果"
    },
    analysis: {
      title: "投资组合分析",
      overview: "投资组合概览",
      details: "详细分析",
      suggestions: "建议"
    }
  },
  settings: {
    title: "设置",
    description: "在下方输入您的Perplexity API密钥。您可以从Perplexity网站获取API密钥。",
    apiLinkText: "获取API密钥",
    placeholder: "输入您的API密钥",
    save: "保存",
    saveApi: "保存API密钥",
    apiTitle: "API密钥设置",
    close: "关闭",
    cancel: "取消",
    language: "语言",
    emptyApiKeyError: "API密钥不能为空。请输入有效的密钥。",
    sessionExpired: "您的会话已过期。请重新输入您的API密钥。"
  },
  navigation: {
    toDashboard: "切换到仪表板",
    toChat: "切换到聊天模式",
    backToChat: "返回聊天",
    toCurrentDashboard: "查看当前仪表板",
    viewDashboard: "查看投资组合仪表板",
    main: "主菜单",
    tools: "工具",
    dashboard: "仪表板",
    chat: "聊天",
    manualAnalyzer: "手动投资组合分析器"
  },
  language: {
    switchTo: "English",
    current: "中文"
  },
  common: {
    cancel: "取消"
  },
  dashboard: {
    title: "投资组合分析仪表板",
    description: "投资组合表现、风险和资产配置的综合分析",
    portfolioId: "投资组合ID",
    tabs: {
      performance: "绩效指标",
      holdings: "持仓",
      allocation: "资产配置",
      factors: "因子暴露",
      risk: "风险指标",
      trends: "历史趋势",
      chat: "AI助手"
    },
    portfolioNotFound: "未找到投资组合数据",
    metrics: {
      annualReturn: "年化收益率",
      sharpeRatio: "夏普比率",
      maxDrawdown: "最大回撤",
      informationRatio: "信息比率"
    },
    performanceVsBenchmark: "与基准比较的表现",
    portfolioReturn: "投资组合收益",
    benchmark: "基准",
    sectorDistribution: "行业分布",
    regionDistribution: "地区分布",
    marketCapDistribution: "市值分布",
    portfolioComposition: "投资组合构成",
    holdingsWeight: "持仓权重",
    symbol: "代码",
    name: "名称",
    sector: "行业",
    weight: "权重",
    price: "价格",
    dailyChange: "日变化",
    noHoldings: "没有持仓数据",
    noData: "没有可用数据",
    timeframes: {
      title: "各时间段表现",
      ytd: "今年至今",
      oneYear: "1年",
      threeYear: "3年",
      fiveYear: "5年",
      period: "时间段",
      totalReturn: "总收益率",
      annualized: "年化收益率",
      volatility: "波动率",
      sharpe: "夏普比率",
      excess: "超额收益"
    },
    errors: {
      loadAllocationFailed: "加载资产配置数据失败",
      loadPortfolioFailed: "加载投资组合持仓数据失败"
    },
    overview: "投资组合概览",
    performance: "绩效",
    allocation: "配置",
    risk: "风险",
    marketView: "市场视图",
    stockDetails: "股票详情",
    portfolioDetails: "投资组合详情",
    holdings: "持仓",
    keyMetrics: "关键指标",
    assetAllocation: "资产配置",
    sectorAllocation: "行业配置",
    geographicAllocation: "地理配置",
    factors: "因子暴露",
    riskMetrics: {
      title: "风险指标",
      volatility: "波动率",
      downsideRisk: "下行风险",
      var: "风险价值 (95%)",
      beta: "贝塔系数",
      maxDrawdown: "最大回撤",
      trackingError: "跟踪误差",
      informationRatio: "信息比率",
      sortinoRatio: "索提诺比率",
      sharpeRatio: "夏普比率",
      status: {
        good: "良好",
        neutral: "一般",
        bad: "不佳",
        low: "低风险",
        medium: "中等风险",
        high: "高风险"
      }
    },
    performanceMetrics: {
      title: "绩效指标",
      totalReturn: "总收益",
      annualizedReturn: "年化收益",
      sharpeRatio: "夏普比率",
      maxDrawdown: "最大回撤",
      volatility: "波动率",
      winRate: "胜率",
      performanceVsBenchmark: "绩效与基准对比"
    }
  },
  factors: {
    value: "价值",
    growth: "成长",
    size: "规模",
    momentum: "动量",
    quality: "质量",
    volatility: "波动性",
    monetaryPolicy: "货币政策",
    creditEnvironment: "信贷环境",
    economicGrowth: "经济增长",
    inflation: "通胀",
    interestRateChange: "利率变化",
    energyPrices: "能源价格",
    styleFactorExposure: "风格因子暴露",
    macroFactorExposure: "宏观因子暴露",
    industryFactorExposure: "行业因子暴露",
    countryFactorExposure: "国家因子暴露",
    otherFactorExposure: "其他因子暴露",
    analysisExplanation: "因子分析说明",
    exposureTitle: "因子暴露",
    exposureDescription: "表示投资组合对各种市场因子的敏感性。",
    positiveExposure: "正向暴露（绿色）表示当因子表现良好时，投资组合可能获得正收益。",
    negativeExposure: "负向暴露（红色）表示当因子表现良好时，投资组合可能获得负收益。",
    contributionAnalysis: "收益贡献分析",
    contributionChart: "图表：因子收益贡献",
    liquidity: "流动性",
    marketrisk: "市场风险",
    dividend: "股息收益率",
    showRawExposure: "显示原始暴露（相关性调整前）",
    adjustedExposureTitle: "调整后的暴露",
    adjustedExposureDescription: "暴露值已经过调整以考虑因子相关性。虚线显示调整前的原始暴露。",
    correlationMatrix: "因子相关性矩阵",
    correlationTitle: "相关性",
    correlationExplanation: "因子相关性",
    correlationDescription: "因子间可能相互关联，影响整体投资组合风险。绿色表示正相关，红色表示负相关。",
    positiveCorrelation: "正相关",
    negativeCorrelation: "负相关",
    riskContribution: "因子风险贡献",
    riskContributionDescription: "显示每个因子对整体投资组合风险的百分比贡献，考虑暴露幅度和因子相关性。",
    factorDataError: "处理因子数据时发生错误。显示默认值。",
    
    // 其他因子和金融指标
    carbonEfficiency: "碳足印",
    computersElectronics: "计算机电子",
    country: "国家",
    dividendYield: "股息收益率",
    earningsQuality: "盈利质量",
    earningsVariability: "盈利波动性",
    earningsYield: "盈利收益率",
    esg: "ESG",
    leverage: "杠杆",
    investmentQuality: "投资质量",
    internetSoftwareAndItServices: "互联网软件和IT服务",
    yield: "收益率",
    profitability: "盈利能力"
  },
  industries: {
    technology: "科技",
    healthcare: "医疗保健",
    financials: "金融",
    consumer: "消费",
    energy: "能源",
    utilities: "公用事业",
    materials: "材料",
    industrials: "工业",
    communication: "通信服务",
    realestate: "房地产",
    
    // 行业因子名称
    informationTechnology: "信息技术",
    consumerDiscretionary: "非必需消费品",
    consumerStaples: "必需消费品",
    communicationServices: "通信服务",
    realEstate: "房地产",
    aerospaceAndDefense: "航空航天与国防"
  },
  countries: {
    us: "美国",
    china: "中国",
    europe: "欧洲",
    japan: "日本",
    emergingmarkets: "新兴市场"
  },
  allocation: {
    sectors: {
      "info_tech": "信息技术",
      "financials": "金融",
      "communication": "通信服务",
      "consumer_disc": "非必需消费品",
      "consumer_staples": "必需消费品",
      "health_care": "医疗保健",
      "industrials": "工业",
      "energy": "能源",
      "materials": "材料",
      "utilities": "公用事业",
      "real_estate": "房地产",
      "other": "其他"
    },
    regions: {
      "us": "美国",
      "europe": "欧洲",
      "asia": "亚洲",
      "china": "中国",
      "japan": "日本",
      "emerging": "新兴市场",
      "other": "其他"
    },
    marketCaps: {
      "large": "大型股",
      "mid": "中型股",
      "small": "小型股",
      "micro": "微型股",
      "unknown": "未知"
    }
  }
}; 