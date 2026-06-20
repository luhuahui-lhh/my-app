export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* 导航栏 - 优化移动端适配 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-lg">华霖装饰纸</span>
          <div className="flex gap-4 sm:gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-black transition-colors">关于</a>
            <a href="#projects" className="hover:text-black transition-colors">项目</a>
            <a href="#blog" className="hover:text-black transition-colors">文章</a>
            <a href="#contact" className="hover:text-black transition-colors">联系</a>
          </div>
        </div>
      </nav>

      {/* 个人介绍 - 修复文本换行、全角字符，增加锚点偏移 */}
      <section id="about" className="max-w-4xl mx-auto px-6 pt-36 pb-24 scroll-mt-20">
        <p className="text-gray-400 mb-3">你好，我是</p>
        <h1 className="text-5xl font-bold mb-6"> HUALIN</h1>
        <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
          杭州华霖装饰纸有限公司成立于2010年，位于中国装饰纸之都——临安。全资控股子公司安徽华霖新材料科技有限公司成立于2021年，位于安徽省宁国市港口生态产业园，占地面积35000平方米。公司地理位置优越，交通运输便利。
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#contact" className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">联系我</a>
          <a href="#projects" className="px-6 py-3 border border-gray-300 rounded-full text-sm hover:border-gray-500 transition-colors">企业简介</a>
        </div>
      </section>

      {/* 项目 - 修复字符串换行、tag匹配、全角字符，替换key为唯一标识 */}
      <section id="projects" className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <h2 className="text-2xl font-bold mb-10">企业简介</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                id: "company-intro",
                title: "公司简介", 
                desc: "公司集研发、生产、销售于一体，配备先进的生产设备和优秀的工艺团队，采用夏王、华旺高档装饰原纸及瑞士艾克洛油墨，致力于打造优质高端装饰纸品牌。", 
                tag: "企业介绍" 
              },
              { 
                id: "certification",
                title: "资质认证", 
                desc: "2012年起，公司获得ISO9001质量管理体系认证，ISO14001环境管理体系认证和IS045001职业健康安全管理体系认证。2019年杭州华霖被评选为市级成长型企业，连年被评为纳税信用等级A级单位、纳税人保护协会成员单位，及“重合同、守信用”单位。", 
                tag: "资质荣誉" 
              },
              { 
                id: "tech-innovation",
                title: "技术创新", 
                desc: "我们一直致力于优质装饰纸的设计与研发，持续推进产品的迭代和技术创新。2020年华霖被认定为国家高新技术企业，拥有50多个实用新型专利。", 
                tag: "研发专利" 
              },
              { 
                id: "core-value",
                title: "核心理念", 
                desc: "公司坚持“以人为本，信任尊重”的管理理念，秉承“以质量求生存，以信誉求发展”的经营理念，提倡“执着创新，诚信负责”的核心价值观，不断开拓进取，为广大客户提供更优质的产品和更专业的服务。", 
                tag: "企业文化" 
              },
            ].map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{p.tag}</span>
                <h3 className="font-semibold text-lg mt-4 mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 文章 - 替换真实化数据、修正年份，替换key为唯一标识 */}
      <section id="blog" className="max-w-4xl mx-auto px-6 py-24 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-10">文章</h2>
        <div className="divide-y divide-gray-100">
          {[
            { 
              id: "blog1",
              title: "装饰纸行业发展趋势", 
              date: "2024年6月", 
              desc: "解析2024年装饰纸行业的技术革新与市场需求变化。" 
            },
            { 
              id: "blog2",
              title: "华霖新品研发纪实", 
              date: "2024年5月", 
              desc: "华霖新款高端装饰纸的研发过程与工艺升级。" 
            },
            { 
              id: "blog3",
              title: "环保装饰纸的应用前景", 
              date: "2024年4月", 
              desc: "环保政策下，绿色装饰纸的市场机遇与技术突破。" 
            },
          ].map((post) => (
            <div key={post.id} className="py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <p className="text-gray-400 text-sm">{post.desc}</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 联系 - 修复全角字符，优化友情链接（增加安全属性） */}
      <section id="contact" className="bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl font-bold mb-4">联系我</h2>
          <p className="text-gray-400 mb-8">我们愿与业内厂商、客户共创共赢，携手同行，共创美好未来! </p>
          <div className="flex justify-center gap-4">
            <a href="mailto:hualin201005@gmail.com" className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">发邮件</a>
            <a 
              href="https://www.hlzsz.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 border border-gray-300 rounded-full text-sm hover:border-gray-500 transition-colors"
            >
              官网链接
            </a>
          </div>
        </div>
      </section>

      {/* 页脚 - 动态获取当前年份 */}
      <footer className="text-center py-8 text-gray-300 text-sm">
        © {new Date().getFullYear()} 华霖装饰纸 All Rights Reserved
      </footer>
    </main>
  );
}