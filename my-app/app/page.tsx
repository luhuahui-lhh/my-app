{/* 文章 */}
      <section id="blog" className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-10">文章</h2>
        </FadeIn>
        <div className="divide-y divide-gray-100">
          
          {/* 💡 新增的第二篇独立路由大作 */}
          <FadeIn delay={0}>
            <Link href="/blog/wenzhang2" className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">走出激情的盲区：从四面文明之镜看狭隘民族主义的自我封闭</h3>
                  <p className="text-gray-400 text-sm">放下偏见，真正坐下来凝视这四面“文明之镜”，照出极端情绪下的虚妄与盲目。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </Link>
          </FadeIn>

          {/* 💡 第一篇：之前的独立科学科普页面 */}
          <FadeIn delay={100}>
            <Link href="/blog/wenzhang1" className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">观察者视界：从自然律令到社会算法</h3>
                  <p className="text-gray-400 text-sm">用理性的逻辑去解构未知，用严密的规则去容纳混沌。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </Link>
          </FadeIn>

          {/* 💡 之前内嵌在主页原地展开的罗伯特议事规则 */}
          <FadeIn delay={200}>
            <div onClick={() => { setShowArticle(true); window.scrollTo(0,0); }} className="py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">议事的算法：罗伯特议事规则与群体决策的理性设计</h3>
                  <p className="text-gray-400 text-sm">罗伯特议事规则与群体决策的理性设计。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>