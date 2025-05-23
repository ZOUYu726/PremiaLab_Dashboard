import axios from 'axios';

// 设置为true表示使用模拟数据，设置为false表示连接真实后端
const TEST_MODE = false;
const API_URL = '/api';

// 接口定义
export interface Ticker {
  symbol: string;
  weight: number;
  name?: string;
  sector?: string;
  price?: number;
  change?: number;
}

export interface Portfolio {
  id?: string;
  name: string;
  tickers: Ticker[];
  created_at?: string;
}

export interface PortfolioResponse {
  id: string;
  created_at: string;
  portfolio: Portfolio;
}

// 风险数据接口
export interface RiskData {
  name: string;
  value: string;
  benchmark?: string;
  status: 'good' | 'neutral' | 'bad' | 'low' | 'medium' | 'high';
  percentage: number;
}

// 添加MonthlyReturnData接口，支持不同格式的月度收益数据
export interface MonthlyReturnData {
  month?: string;
  return?: number;
  portfolio?: number;
  benchmark?: number;
  benchmarkReturn?: number;
  value?: number;
  excess?: number;
  [key: string]: any; // 允许任意其他字段
}

// 定义不同时间段的表现数据结构
export interface PerformanceTimeFrame {
  return?: number;           // 百分比收益率
  annualized?: number;      // 年化收益率
  benchmarkReturn?: number;  // 基准收益率
  excessReturn?: number;     // 超额收益率
  volatility?: number;      // 波动率
  sharpe?: number;          // 夏普比率
  benchmark?: number;       // 与benchmarkReturn等同
  excess?: number;          // 与excessReturn等同
  labels?: string[];
  portfolioReturns?: number[];
  benchmarkReturns?: number[];
  excessReturns?: number[];
}

// 业绩数据接口
export interface PerformanceData {
  ytd?: PerformanceTimeFrame;
  oneYear?: PerformanceTimeFrame;
  threeYear?: PerformanceTimeFrame;
  fiveYear?: PerformanceTimeFrame;
  tenYear?: PerformanceTimeFrame;
  totalReturn?: number;
  annualizedReturn?: number;
  volatility?: number;
  benchmarkVolatility?: number;
  sharpeRatio?: number;
  benchmarkSharpeRatio?: number;
  maxDrawdown?: number;
  benchmarkDrawdown?: number;
  winRate?: number;
  monthlyReturns?: Array<MonthlyReturnData>;
  timeFrames?: {
    ytd: PerformanceTimeFrame;
    oneYear: PerformanceTimeFrame;
    threeYear: PerformanceTimeFrame;
    fiveYear: PerformanceTimeFrame;
    tenYear?: PerformanceTimeFrame;
  };
}

// 合并的资产配置数据接口
export interface AllocationData {
  sectorDistribution?: { [key: string]: number };
  regionDistribution?: { [key: string]: number };
  marketCapDistribution?: { [key: string]: number };
  行业分布?: { [key: string]: number };
  地区分布?: { [key: string]: number };
  市值分布?: { [key: string]: number };
  sector?: Array<{type: string, percentage: number}>;
  geography?: Array<{region: string, percentage: number}>;
}

// 比较数据接口
export interface ComparisonData {
  totalReturn?: { portfolio: number; benchmark: number; excess: number };
  annualizedReturn?: { portfolio: number; benchmark: number; excess: number };
  volatility?: { portfolio: number; benchmark: number; difference: number };
  sharpeRatio?: { portfolio: number; benchmark: number; difference: number };
  maxDrawdown?: { portfolio: number; benchmark: number; difference: number };
  correlation?: number;
  trackingError?: number;
  informationRatio?: number;
  winRate?: number;
  // 保留中文键名支持旧数据
  总收益率?: { 投资组合: number; 基准: number; 超额: number };
  年化收益率?: { 投资组合: number; 基准: number; 超额: number };
  波动率?: { 投资组合: number; 基准: number; 差异: number };
  夏普比率?: { 投资组合: number; 基准: number; 差异: number };
  最大回撤?: { 投资组合: number; 基准: number; 差异: number };
  相关性?: number;
  跟踪误差?: number;
  信息比率?: number;
  胜率?: number;
  // 数组形式的比较数据
  [key: string]: any;
}

// 因子数据相关接口
export interface FactorData {
  name: string;
  // 核心字段 - 后端始终提供
  portfolio_exposure?: number; // 投资组合暴露值
  benchmark_exposure?: number; // 基准暴露值
  difference?: number;        // 差异值
  category?: string;          // 因子类别: 'style', 'industry', 'country', 'other'
  
  // 向后兼容字段 - 旧版API兼容
  exposure?: number;          // 等效于 portfolio_exposure
  benchmark?: number;         // 等效于 benchmark_exposure
  value?: number;             // 等效于 portfolio_exposure
  raw_exposure?: number;      // 原始暴露值（未校正）
  rawExposure?: number;       // 原始暴露值（驼峰命名版本）
  benchmarkExposure?: number; // 等效于 benchmark_exposure（驼峰命名版本）
  positive?: boolean;         // 是否为正向暴露（已弃用，使用 difference > 0 判断）
  factor?: string;            // 旧版API使用的因子名称字段，等效于 name
}

export interface FactorCorrelation {
  factor1: string;
  factor2: string;
  correlation: number;
}

export interface RiskContribution {
  name: string;
  contribution: number;
  displayName?: string;
}

// 向后兼容旧版本用的接口 - 实际同 FactorData
export interface FactorItem extends FactorData {
  // 此接口与 FactorData 相同，保留是为了向后兼容
}

export interface FactorsData {
  styleFactors?: FactorData[];      // 风格因子（Value, Growth, Size等）
  industryFactors?: FactorData[];   // 行业因子（Technology, Healthcare等）
  countryFactors?: FactorData[];    // 国家/地区因子（US, China等）
  otherFactors?: FactorData[];      // 其他因子
  factorCorrelations?: FactorCorrelation[]; // 因子间相关性
  riskContributions?: RiskContribution[];   // 风险贡献
  hasCorrelationData?: boolean;     // 是否有相关性数据
}

// 投资组合分析数据
export interface PortfolioAnalysis {
  id?: string;
  name?: string;
  performance?: PerformanceData;
  risk?: RiskData[];
  factors?: FactorsData;
  allocation?: AllocationData;
  comparison?: ComparisonData | ComparisonData[];
  historical_trends?: HistoricalTrendsData;
}

// 合并的股票名称映射（英文+中文）
export const stockNameMapping: { [key: string]: string } = {
  "AAPL": "Apple Inc. / 苹果公司",
  "MSFT": "Microsoft Corporation / 微软公司",
  "AMZN": "Amazon.com Inc. / 亚马逊",
  "GOOGL": "Alphabet Inc. (Google) Class A / 谷歌",
  "GOOG": "Alphabet Inc. (Google) Class C",
  "META": "Meta Platforms Inc. / Meta平台",
  "TSLA": "Tesla Inc. / 特斯拉",
  "NVDA": "NVIDIA Corporation / 英伟达",
  "BRK-B": "Berkshire Hathaway Inc. Class B",
  "JPM": "JPMorgan Chase & Co. / 摩根大通",
  "JNJ": "Johnson & Johnson",
  "V": "Visa Inc. / 维萨",
  "PG": "Procter & Gamble Co.",
  "UNH": "UnitedHealth Group Inc.",
  "HD": "Home Depot Inc.",
  "MA": "Mastercard Inc.",
  "BAC": "Bank of America Corp. / 美国银行",
  "DIS": "Walt Disney Co.",
  "ADBE": "Adobe Inc.",
  "CRM": "Salesforce Inc.",
  "KO": "Coca-Cola Co.",
  "NFLX": "Netflix Inc.",
  "PFE": "Pfizer Inc.",
  "CSCO": "Cisco Systems Inc.",
  "AVGO": "Broadcom Inc.",
  "TMO": "Thermo Fisher Scientific Inc.",
  "ABT": "Abbott Laboratories",
  "PEP": "PepsiCo Inc.",
  "COST": "Costco Wholesale Corp.",
  "CMCSA": "Comcast Corp.",
  "ACN": "Accenture plc",
  "WMT": "Walmart Inc.",
  "MRK": "Merck & Co. Inc.",
  "VZ": "Verizon Communications Inc.",
  "NKE": "Nike Inc.",
  "INTC": "Intel Corporation",
  "AMD": "Advanced Micro Devices Inc.",
  "IBM": "International Business Machines Corp.",
  "QCOM": "Qualcomm Inc.",
  "T": "AT&T Inc.",
  "PYPL": "PayPal Holdings Inc.",
  "SBUX": "Starbucks Corp.",
  "MCD": "McDonald's Corp.",
  "TXN": "Texas Instruments Inc.",
  "BA": "Boeing Co.",
  "C": "Citigroup Inc.",
  "GS": "Goldman Sachs Group Inc.",
  "MMM": "3M Co.",
  "CVX": "Chevron Corp.",
  "XOM": "Exxon Mobil Corp.",
  "CAT": "Caterpillar Inc.",
  "AMAT": "Applied Materials Inc.",
  "INTU": "Intuit Inc.",
  "GE": "General Electric Co.",
  "ORCL": "Oracle Corp.",
  "F": "Ford Motor Co.",
  "GM": "General Motors Co.",
  "AMGN": "Amgen Inc.",
  "WFC": "Wells Fargo & Co.",
  "AXP": "American Express Co.",
  "BKNG": "Booking Holdings Inc.",
  "LMT": "Lockheed Martin Corp.",
  "RTX": "Raytheon Technologies Corp.",
  "UNP": "Union Pacific Corp.",
  "UPS": "United Parcel Service Inc.",
  "PM": "Philip Morris International Inc.",
  "LOW": "Lowe's Companies Inc.",
  "DHR": "Danaher Corp.",
  "LIN": "Linde plc",
  "NEE": "NextEra Energy Inc.",
  "AMT": "American Tower Corp.",
  "ISRG": "Intuitive Surgical Inc.",
  "SCHW": "Charles Schwab Corp.",
  "MS": "Morgan Stanley",
  "HON": "Honeywell International Inc.",
  "MDT": "Medtronic plc",
  "BMY": "Bristol-Myers Squibb Co."
};

/**
 * 提交投资组合到后端
 * @param portfolio Portfolio data
 * @param language Optional language parameter for localization
 * @returns Promise containing API response
 */
export const submitPortfolio = async (portfolio: Portfolio, language?: string): Promise<Portfolio | PortfolioResponse> => {
  try {
    // 添加详细日志
    console.log('准备提交投资组合到后端:', portfolio);
    
    // 验证portfolio格式
    if (!portfolio.name || !Array.isArray(portfolio.tickers) || portfolio.tickers.length === 0) {
      throw new Error('投资组合数据不完整，缺少名称或股票列表为空');
    }
    
    // 验证权重总和
    const totalWeight = portfolio.tickers.reduce((sum, ticker) => sum + ticker.weight, 0);
    console.log('投资组合权重总和:', totalWeight);
    
    // 如果权重总和不接近1，尝试归一化
    if (Math.abs(totalWeight - 1) > 0.01) {
      console.log('权重总和不接近1，进行归一化');
      
      if (Math.abs(totalWeight - 100) < 1) {
        // 可能是百分比格式(0-100)，转换为小数(0-1)
        portfolio.tickers = portfolio.tickers.map(ticker => ({
          ...ticker,
          weight: ticker.weight / 100
        }));
      } else if (totalWeight > 0) {
        // 如果总权重不为0，则归一化
        portfolio.tickers = portfolio.tickers.map(ticker => ({
          ...ticker,
          weight: ticker.weight / totalWeight
        }));
      }
    }
    
    // 添加当前语言查询参数
    const queryParams = language ? `?lang=${language}` : '';
    const apiUrl = TEST_MODE ? `http://localhost:3001/api/portfolios${queryParams}` : `${API_URL}/portfolios${queryParams}`;
    console.log('发送请求到:', apiUrl);
    
    if (TEST_MODE) {
      // Simulate successful response in test mode
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return {
        id: 'test-' + Date.now(),
        created_at: new Date().toISOString(),
        portfolio: portfolio
      };
    }
    
    // 设置超时和重试
    const response = await axios.post(apiUrl, portfolio, {
      timeout: 10000, // 10秒超时
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('后端响应成功:', response.data);
    return response.data;
  } catch (error) {
    console.error('提交投资组合失败:', error);
    // 详细记录错误信息
    if (axios.isAxiosError(error)) {
      console.error('网络错误详情:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method
      });
      
      // 根据错误类型提供更具体的错误信息
      if (error.response?.status === 400) {
        throw new Error(`投资组合格式错误: ${error.response.data.detail || '权重总和必须为1'}`);
      } else if (error.response?.status === 404) {
        throw new Error('API端点不存在，请检查后端服务是否正在运行');
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('连接超时，请检查后端服务是否正在运行');
      } else if (!error.response) {
        throw new Error('无法连接到后端服务，请确保后端服务已启动并运行在正确的端口');
      }
    }
    throw new Error('Could not submit portfolio. Please check your API connection or try again later.');
  }
};

/**
 * 获取聊天消息相关的投资组合分析
 */
export const getChatPortfolioAnalysis = async (chatId: string): Promise<PortfolioAnalysis> => {
  try {
    const apiUrl = TEST_MODE ? `http://localhost:3001/api/chat/${chatId}/portfolio-analysis` : `/api/chat/${chatId}/portfolio-analysis`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('获取聊天相关的投资组合分析失败:', error);
    throw error;
  }
};

/**
 * Get user's portfolio list
 * @returns Promise containing portfolio array
 */
export const getPortfolios = async (): Promise<Portfolio[]> => {
  try {
    if (TEST_MODE) {
      // Return mock data in test mode
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 'port-1',
          name: '科技股组合',
          created_at: '2023-07-15T12:30:00Z',
          tickers: [
            { symbol: 'AAPL', weight: 0.3 },
            { symbol: 'MSFT', weight: 0.3 },
            { symbol: 'GOOGL', weight: 0.2 },
            { symbol: 'AMZN', weight: 0.2 }
          ]
        },
        {
          id: 'port-2',
          name: '多元化投资',
          created_at: '2023-07-10T09:45:00Z',
          tickers: [
            { symbol: 'SPY', weight: 0.4 },
            { symbol: 'QQQ', weight: 0.3 },
            { symbol: 'GLD', weight: 0.2 },
            { symbol: 'VNQ', weight: 0.1 }
          ]
        }
      ];
    }

    const response = await axios.get(API_URL + '/portfolios');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch portfolios:', error);
    throw new Error('Could not retrieve portfolio list. Please check your API connection or try again later.');
  }
};

/**
 * 获取用户的投资组合列表（别名，保持向后兼容）
 */
export const getPortfolioList = getPortfolios;

/**
 * 创建投资组合
 */
export const createPortfolio = async (portfolio: Portfolio): Promise<Portfolio> => {
  try {
    const apiUrl = TEST_MODE ? `http://localhost:3001/api/portfolios` : `${API_URL}/portfolios`;
    const response = await axios.post(apiUrl, portfolio);
    return response.data;
  } catch (error) {
    console.error('创建投资组合失败:', error);
    throw error;
  }
};

/**
 * 获取单个投资组合
 * @param portfolioId Portfolio ID
 * @returns Promise containing portfolio data
 */
export const getPortfolio = async (portfolioId: string): Promise<any> => {
  try {
    if (TEST_MODE) {
      // Simulate successful response in test mode
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return {
        id: portfolioId,
        name: "Test Portfolio",
        created_at: new Date().toISOString(),
        tickers: [
          { symbol: "AAPL", weight: 0.25, name: "Apple Inc.", sector: "Technology", price: 173.57, change: 0.0123 },
          { symbol: "MSFT", weight: 0.20, name: "Microsoft Corp.", sector: "Technology", price: 402.28, change: -0.0056 },
          { symbol: "GOOGL", weight: 0.15, name: "Alphabet Inc.", sector: "Communication Services", price: 147.68, change: 0.0034 },
          { symbol: "AMZN", weight: 0.15, name: "Amazon.com Inc.", sector: "Consumer Discretionary", price: 178.08, change: 0.0212 },
          { symbol: "NVDA", weight: 0.10, name: "NVIDIA Corporation", sector: "Technology", price: 922.28, change: 0.0345 },
          { symbol: "META", weight: 0.05, name: "Meta Platforms, Inc.", sector: "Communication Services", price: 481.73, change: 0.0078 },
          { symbol: "TSM", weight: 0.05, name: "Taiwan Semiconductor", sector: "Technology", price: 148.57, change: 0.0045 },
          { symbol: "AVGO", weight: 0.05, name: "Broadcom Inc.", sector: "Technology", price: 1342.63, change: 0.0067 }
        ]
      };
    }

    const apiUrl = TEST_MODE ? `http://localhost:3001/api/portfolios/${portfolioId}` : `${API_URL}/portfolios/${portfolioId}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch portfolio ${portfolioId}:`, error);
    throw new Error('Could not retrieve portfolio. Please check your API connection or try again later.');
  }
};

/**
 * 获取可用的股票代码列表
 */
export const getAvailableStocks = async (): Promise<string[]> => {
  try {
    // 在实际环境中应该调用后端API获取列表
    // 在测试模式下返回静态列表
    return [
      "A", "AAPL", "ABBV", "ABNB", "ABT", "ACGL", "ACN", "ADBE", "ADI", "ADM", 
      "ADP", "ADSK", "AEE", "AEP", "AES", "AFL", "AIG", "AIZ", "AJG", "AKAM", 
      "ALB", "ALGN", "ALL", "ALLE", "AMAT", "AMCR", "AMD", "AME", "AMGN", "AMP",
      "AMT", "AMZN", "ANET", "ANSS", "AON", "AOS", "APD", "APH", "APTV", "ARE",
      "ATO", "ATVI", "AVB", "AVGO", "AVY", "AWK", "AXP", "AZO", "BA", "BAC", 
      // 为简洁起见，精简了列表
      "GOOGL", "META", "MSFT", "NVDA", "TSLA", "V", "JPM", "WFC", "INTC"
    ];
  } catch (error) {
    console.error('获取股票代码列表失败:', error);
    throw error;
  }
};

/**
 * 获取可用的股票代码和公司名称列表
 */
export const getAvailableStocksWithNames = async (): Promise<{symbol: string, name: string}[]> => {
  try {
    const stocks = await getAvailableStocks();
    return stocks.map(symbol => ({
      symbol,
      name: stockNameMapping[symbol] || ''
    }));
  } catch (error) {
    console.error('获取股票代码和名称列表失败:', error);
    throw error;
  }
};

/**
 * 获取投资组合的资产配置数据
 * @param portfolioId 投资组合ID
 * @returns 资产配置数据
 */
export const getPortfolioAllocation = async (portfolioId: string): Promise<any> => {
  try {
    if (TEST_MODE) {
      // 如果测试模式，返回模拟数据
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPortfolioAnalysis().allocation;
    }
    
    // 使用analyze接口获取完整数据，然后提取allocation部分
    const analysisData = await getPortfolioAnalysis(portfolioId);
    
    if (analysisData && analysisData.allocation) {
      const allocation = analysisData.allocation;
      
      // 检查数据格式并在必要时进行转换
      const result: AllocationData = {
        sectorDistribution: {},
        regionDistribution: {},
        marketCapDistribution: {}
      };
      
      // 处理行业分布数据
      if (allocation.sectorDistribution) {
        // 已经是正确格式
        result.sectorDistribution = allocation.sectorDistribution;
      } else if (allocation.sector && Array.isArray(allocation.sector)) {
        // 旧数组格式，需要转换
        allocation.sector.forEach(item => {
          if (item.type && item.percentage !== undefined) {
            result.sectorDistribution[item.type] = item.percentage;
          }
        });
      }
      
      // 处理地区分布数据
      if (allocation.regionDistribution) {
        // 已经是正确格式
        result.regionDistribution = allocation.regionDistribution;
      } else if (allocation.geography && Array.isArray(allocation.geography)) {
        // 旧数组格式，需要转换
        allocation.geography.forEach(item => {
          if (item.region && item.percentage !== undefined) {
            result.regionDistribution[item.region] = item.percentage;
          }
        });
      }
      
      // 处理市值分布数据
      if (allocation.marketCapDistribution) {
        result.marketCapDistribution = allocation.marketCapDistribution;
      } else {
        // 添加默认市值分布
        result.marketCapDistribution = {
          "Large Cap": 70.0,
          "Mid Cap": 20.0,
          "Small Cap": 10.0
        };
      }
      
      return result;
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('获取资产配置数据失败:', error);
    throw new Error('无法获取资产配置数据。请稍后重试。');
  }
};

/**
 * 获取投资组合与基准的对比数据
 * @param portfolioId 投资组合ID
 * @returns 比较数据
 */
export const getPortfolioComparison = async (portfolioId: string): Promise<any> => {
  try {
    if (TEST_MODE) {
      // 模拟响应
      console.log('使用模拟的比较数据(TEST_MODE=true)');
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        // 英文键名版本
        totalReturn: { portfolio: 15.2, benchmark: 10.5, excess: 4.7 },
        annualizedReturn: { portfolio: 12.4, benchmark: 9.1, excess: 3.3 },
        volatility: { portfolio: 14.2, benchmark: 12.7, difference: 1.5 },
        sharpeRatio: { portfolio: 1.36, benchmark: 1.12, difference: 0.24 },
        maxDrawdown: { portfolio: -8.6, benchmark: -11.7, difference: 3.1 },
        correlation: 0.89,
        trackingError: 5.2,
        informationRatio: 1.05,
        winRate: 58.3
      };
    }

    // 使用analyze接口获取完整数据，然后提取comparison部分
    const analysisData = await getPortfolioAnalysis(portfolioId);
    
    // 从完整分析数据中提取比较数据
    if (analysisData) {
      // 尝试提取格式化过的比较字典
      if (analysisData.comparison) {
        // 检查是否是数组格式（旧版API）
        if (Array.isArray(analysisData.comparison)) {
          // 转换数组格式为字典格式，以便前端使用
          const comparisonList = analysisData.comparison;
          const comparisonData: any = {};

          comparisonList.forEach(item => {
            const metricKey = item.metric.toLowerCase().replace(/\s+/g, '');
            comparisonData[metricKey] = {
              portfolio: parseFloat(item.portfolio),
              benchmark: parseFloat(item.benchmark),
              difference: parseFloat(item.difference)
            };
          });

          return comparisonData;
        } else {
          // 已经是字典格式
          return analysisData.comparison;
        }
      }
      // 如果没有专门的comparison字段，返回空对象
      return {};
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('获取比较数据失败:', error);
    throw new Error('无法获取比较数据。请稍后重试。');
  }
};

/**
 * 获取股票数据
 */
export const getStocksData = async (): Promise<Record<string, any>> => {
  try {
    const apiUrl = TEST_MODE ? `http://localhost:3001/api/stocks-data` : `/api/stocks-data`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('获取股票数据失败:', error);
    throw error;
  }
};

/**
 * 生成模拟的投资组合分析数据（用于开发和测试）
 */
export const mockPortfolioAnalysis = (): PortfolioAnalysis => {
  // 生成模拟数据
  return {
    performance: {
      totalReturn: 15.7,
      annualizedReturn: 12.3,
      volatility: 12.5,
      sharpeRatio: 1.42,
      maxDrawdown: -8.5,
      winRate: 58.2,
      monthlyReturns: [
        { month: '一月', return: 3.2 },
        { month: '二月', return: -1.8 },
        { month: '三月', return: 2.1 },
        { month: '四月', return: 4.5 },
        { month: '五月', return: -0.7 },
        { month: '六月', return: 2.9 }
      ],
      // 添加不同时间段表现数据
      timeFrames: {
        ytd: { 
          return: 8.4, 
          annualized: undefined, 
          benchmarkReturn: 5.2, 
          excessReturn: 3.2,
          volatility: 10.8,
          sharpe: 1.21
        },
        oneYear: { 
          return: 15.7, 
          annualized: 15.7, 
          benchmarkReturn: 12.5, 
          excessReturn: 3.2,
          volatility: 12.5,
          sharpe: 1.42
        },
        threeYear: { 
          return: 42.3, 
          annualized: 12.5, 
          benchmarkReturn: 35.6, 
          excessReturn: 6.7,
          volatility: 14.2,
          sharpe: 1.35
        },
        fiveYear: { 
          return: 78.6, 
          annualized: 12.3, 
          benchmarkReturn: 65.8, 
          excessReturn: 12.8,
          volatility: 15.1,
          sharpe: 1.28
        }
      }
    },
    allocation: {
      // 使用新的对象格式而不是数组格式
      sectorDistribution: {
        '科技': 32.5,
        '医疗健康': 15.8,
        '金融': 12.3,
        '消费品': 10.5,
        '通信服务': 8.7,
        '工业': 7.9,
        '能源': 5.3,
        '材料': 4.2,
        '公用事业': 2.8
      },
      regionDistribution: {
        '美国': 45.7,
        '中国': 21.5,
        '欧洲': 15.8,
        '日本': 7.3,
        '新兴市场': 9.7
      },
      marketCapDistribution: {
        'Large Cap': 70.0,
        'Mid Cap': 20.0,
        'Small Cap': 10.0
      }
    },
    risk: [
      { name: '波动率', value: '12.5%', status: 'medium', percentage: 60 },
      { name: '最大回撤', value: '-8.5%', status: 'low', percentage: 40 },
      { name: '下行风险', value: '12.3%', status: 'medium', percentage: 55 },
      { name: '贝塔系数', value: '0.85', status: 'high', percentage: 75 },
      { name: 'VaR (95%)', value: '-2.8%', status: 'low', percentage: 30 },
      { name: '夏普比率', value: '1.42', status: 'medium', percentage: 65 }
    ],
    comparison: [
      { metric: '年化收益率', portfolio: '12.3%', benchmark: '10.2%', difference: '+2.1%', positive: true },
      { metric: '夏普比率', portfolio: '1.42', benchmark: '0.9', difference: '+0.52', positive: true },
      { metric: '最大回撤', portfolio: '-8.5%', benchmark: '-18.2%', difference: '+9.7%', positive: true },
      { metric: '波动率', portfolio: '12.5%', benchmark: '16.4%', difference: '+3.9%', positive: false },
      { metric: '贝塔系数', portfolio: '0.85', benchmark: '1.00', difference: '+0.15', positive: false },
      { metric: '年化α值', portfolio: '2.1%', benchmark: '0.0%', difference: '+2.1%', positive: true }
    ],
    factors: {
      styleFactors: [
        { name: 'size', exposure: 0.85, rawExposure: 0.80, positive: true },
        { name: 'value', exposure: -0.32, rawExposure: -0.30, positive: false },
        { name: 'momentum', exposure: 1.27, rawExposure: 1.20, positive: true },
        { name: 'quality', exposure: 0.53, rawExposure: 0.50, positive: true },
        { name: 'volatility', exposure: -0.21, rawExposure: -0.25, positive: false }
      ],
      industryFactors: [
        { name: 'technology', exposure: 0.92, rawExposure: 0.90, positive: true },
        { name: 'healthcare', exposure: 0.45, rawExposure: 0.45, positive: true },
        { name: 'financials', exposure: -0.18, rawExposure: -0.20, positive: false },
        { name: 'consumer', exposure: 0.22, rawExposure: 0.20, positive: true },
        { name: 'energy', exposure: -0.65, rawExposure: -0.60, positive: false }
      ],
      countryFactors: [
        { name: 'us', exposure: 0.78, rawExposure: 0.75, positive: true },
        { name: 'china', exposure: 0.52, rawExposure: 0.50, positive: true },
        { name: 'europe', exposure: -0.15, rawExposure: -0.15, positive: false },
        { name: 'japan', exposure: 0.08, rawExposure: 0.10, positive: true },
        { name: 'emergingmarkets', exposure: 0.31, rawExposure: 0.30, positive: true }
      ],
      otherFactors: [
        { name: 'liquidity', exposure: 0.24, rawExposure: 0.25, positive: true },
        { name: 'marketrisk', exposure: -0.35, rawExposure: -0.35, positive: false },
        { name: 'dividend', exposure: 0.12, rawExposure: 0.10, positive: true }
      ],
      factorCorrelations: [
        { factor1: 'value', factor2: 'growth', correlation: -0.65 },
        { factor1: 'value', factor2: 'quality', correlation: 0.45 },
        { factor1: 'momentum', factor2: 'volatility', correlation: -0.30 },
        { factor1: 'size', factor2: 'quality', correlation: 0.20 },
        { factor1: 'quality', factor2: 'volatility', correlation: -0.25 }
      ],
      riskContributions: [
        { name: 'value', contribution: 22.5 },
        { name: 'growth', contribution: 15.8 },
        { name: 'size', contribution: 12.7 },
        { name: 'momentum', contribution: 28.4 },
        { name: 'quality', contribution: 10.3 },
        { name: 'volatility', contribution: 10.3 }
      ],
      hasCorrelationData: true
    },
    historical_trends: {
      monthlyReturns: [
        { month: '一月', return: 3.2, benchmark: 3.0 },
        { month: '二月', return: -1.8, benchmark: -1.5 },
        { month: '三月', return: 2.1, benchmark: 1.9 },
        { month: '四月', return: 4.5, benchmark: 4.2 },
        { month: '五月', return: -0.7, benchmark: -0.5 },
        { month: '六月', return: 2.9, benchmark: 2.7 }
      ],
      cumulativeReturns: [
        { month: '一月', portfolio: 3.2, benchmark: 3.2 },
        { month: '二月', portfolio: 1.4, benchmark: 1.4 },
        { month: '三月', portfolio: 3.5, benchmark: 3.5 },
        { month: '四月', portfolio: 8.0, benchmark: 8.0 },
        { month: '五月', portfolio: 7.3, benchmark: 7.3 },
        { month: '六月', portfolio: 10.2, benchmark: 10.2 }
      ]
    }
  };
};

/**
 * 获取投资组合分析数据的综合函数
 * @param portfolioId 投资组合ID
 * @returns PortfolioAnalysis 投资组合分析数据
 */
export const getPortfolioAnalysis = async (portfolioId: string): Promise<PortfolioAnalysis> => {
  try {
    console.log(`获取投资组合 ${portfolioId} 的分析数据`);
    
    if (TEST_MODE) {
      console.log('测试模式已启用，返回模拟数据');
      await new Promise(resolve => setTimeout(resolve, 800)); // 模拟网络延迟
      return mockPortfolioAnalysis();
    }
    
    // 使用统一的analyze接口
    console.log(`发送请求到: /api/portfolios/${portfolioId}/analyze`);
    const response = await axios.get(`/api/portfolios/${portfolioId}/analyze`);
    console.log('API Response:', response.data);
    
    if (!response.data || !response.data.performance) {
      console.error('API返回数据格式不正确:', response.data);
      throw new Error('API返回数据格式不正确');
    }
    
    return response.data;
  } catch (error) {
    console.error(`获取投资组合 ${portfolioId} 分析数据失败:`, error);
    if (axios.isAxiosError(error)) {
      console.error('网络错误详情:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method
      });
    }
    throw new Error('无法获取投资组合分析数据。请检查连接或稍后重试。');
  }
};

// 历史趋势数据接口
export interface HistoricalTrendsData {
  monthlyReturns: MonthlyReturn[];
  cumulativeReturns: CumulativeReturn[];
}

export interface MonthlyReturn {
  month: string;
  return: number;
  benchmark: number;
}

export interface CumulativeReturn {
  month: string;
  portfolio: number;
  benchmark: number;
}

/**
 * 获取投资组合历史趋势数据
 */
export const getPortfolioHistoricalTrends = async (
  portfolioId: string,
  period: 'ytd' | '1year' | '3year' | '5year' = '5year',
  testMode = TEST_MODE,
  language = 'en'
): Promise<HistoricalTrendsData | null> => {
  try {
    console.log(`获取投资组合 ${portfolioId} 的历史趋势数据，周期: ${period}`);
    
    if (testMode) {
      console.log('测试模式: 返回模拟的历史趋势数据');
      // 生成模拟数据并根据period过滤
      const mockData = generateMockHistoricalTrends(period);
      return mockData;
    }
    
    // 请求API，明确包含period参数
    const response = await axios.get(`${API_URL}/portfolios/${portfolioId}/analyze`, {
      params: { period, lang: language }
    });
    
    // 从完整的分析数据中提取历史趋势部分
    if (response.data && response.data.historical_trends) {
      console.log(`成功获取 ${portfolioId} 的历史趋势数据`);
      return response.data.historical_trends;
    }
    
    console.warn(`投资组合 ${portfolioId} 的分析数据中没有历史趋势数据`);
    return null;
  } catch (error) {
    console.error(`获取投资组合 ${portfolioId} 历史趋势数据失败:`, error);
    if (axios.isAxiosError(error)) {
      console.error('网络错误详情:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method
      });
    }
    return null;
  }
};

/**
 * 生成模拟的历史趋势数据
 */
const generateMockHistoricalTrends = (period: 'ytd' | '1year' | '3year' | '5year'): HistoricalTrendsData => {
  const now = new Date();
  let monthsToGenerate = 60; // 默认5年
  
  switch(period) {
    case 'ytd':
      // 当前年份的月份数
      monthsToGenerate = now.getMonth() + 1;
      break;
    case '1year':
      monthsToGenerate = 12;
      break;
    case '3year':
      monthsToGenerate = 36;
      break;
    case '5year':
      monthsToGenerate = 60;
      break;
  }
  
  const monthlyReturns: MonthlyReturn[] = [];
  const cumulativeReturns: CumulativeReturn[] = [];
  
  let cumulativePortfolio = 100;
  let cumulativeBenchmark = 100;
  
  // 从当前月份往前生成数据
  for (let i = 0; i < monthsToGenerate; i++) {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`;
    
    // 生成合理的随机收益率 (-10% 到 15%)
    const portfolioReturn = parseFloat((Math.random() * 25 - 10).toFixed(2));
    // 基准收益率与投资组合有一定相关性，但通常略低
    const benchmarkReturn = parseFloat((portfolioReturn * 0.8 + (Math.random() * 6 - 3)).toFixed(2));
    
    monthlyReturns.unshift({
      month: monthStr,
      return: portfolioReturn,
      benchmark: benchmarkReturn
    });
    
    // 更新累计收益
    cumulativePortfolio *= (1 + portfolioReturn / 100);
    cumulativeBenchmark *= (1 + benchmarkReturn / 100);
    
    cumulativeReturns.unshift({
      month: monthStr,
      portfolio: parseFloat((cumulativePortfolio - 100).toFixed(2)),
      benchmark: parseFloat((cumulativeBenchmark - 100).toFixed(2))
    });
  }
  
  return {
    monthlyReturns: monthlyReturns.sort((a, b) => a.month.localeCompare(b.month)),
    cumulativeReturns: cumulativeReturns.sort((a, b) => a.month.localeCompare(b.month))
  };
}; 