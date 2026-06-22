'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Link from 'next/link'

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function ArticleDetail() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-24">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← 返回主页
          </Link>
          <span className="font-semibold text-sm">HUAHUI 的文章</span>
        </div>
      </nav>

      {/* 文章主体 */}
      <article className="max-w-3xl mx-auto px-6 pt-32">
        <FadeIn>
          <div className="text-sm text-gray-400 mb-3">2026年6月 · 认知思考</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
            理性的严谨与感性的温度
          </h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
            全面拆解工科思维与文科思维的认知框架、碰撞交融与跨界实践方案。
          </p>
        </FadeIn>

        {/* 核心内容 */}
        <div className="space-y-16 text-gray-800 leading-relaxed text-lg">
          
          {/* Part 1 */}
          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Part 1 / 认知的双重维度
              </h2>
              <p className="text-gray-600 mb-8 italic">
                理解世界的两个原点：严密的数理逻辑，与深沉的人性关怀。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-black rounded-full"></span> 工科思维
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">精密可控的系统解构</p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li><strong>系统性原点：</strong>将世界视为因果关系与参数构成的工程系统。</li>
                    <li><strong>极度量化：</strong>“无法度量就无法优化”，高度依赖数据与指标。</li>
                    <li><strong>最优解导向：</strong>在既定边界与成本约束下，寻求资源最优配置。</li>
                    <li><strong>闭环思维：</strong>依赖“测试-反馈-修正”建立可行路径。</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span> 文科思维
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">探求人性的温度与价值</p>
                  <ul className="text-sm space-y-2 text-gray-600">
                    <li><strong>人本性原点：</strong>聚焦人的体验、尊严与价值，追寻生命意义。</li>
                    <li><strong>拥抱模糊性：</strong>包容灰色地带、复杂情感及哲学悖论。</li>
                    <li><strong>情境化考量：</strong>将事件置于特定的历史与文化语境。</li>
                    <li><strong>同理共鸣：</strong>运用叙事与故事编织共识，唤醒个体连结。</li>
                  </ul>
                </div>
              </div>

              {/* 核心支柱 */}
              <div className="mt-8 space-y-4">
                <h4 className="text-sm font-semibold text-gray-900">双方的核心结构支柱：</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <div className="font-medium text-black mb-1">工科三大支柱</div>
                    <p className="text-gray-500">解构拆分力（逐一攻克）、极限寻优力（系统效率）、冗余容错力（设置Plan B）。</p>
                  </div>
                  <div className="border border-gray-100 p-4 rounded-xl">
                    <div className="font-medium text-black mb-1">文科三大支柱</div>
                    <p className="text-gray-500">价值审视力（反思规则）、同理洞察力（感知情感）、叙事共识力（构建愿景）。</p>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* Part 2 */}
          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Part 2 / 碰撞、盲区与孤岛
              </h2>
              <p className="text-gray-600 mb-6">
                当认知陷入孤立偏执时，便会坠入工具理性的黑洞或虚无情怀的空中楼阁。
              </p>
              
              <div className="space-y-4">
                <div className="border-l-2 border-black pl-4">
                  <h4 className="font-semibold text-base text-gray-950">工科思维的孤岛：机械唯物</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    过分依赖数据模型，容易将复杂的人类“工具化”与“KPI化”。在面对无法通过公式解密的道德困境、艺术审美时，容易陷入系统焦虑。
                  </p>
                </div>
                <div className="border-l-2 border-gray-300 pl-4">
                  <h4 className="font-semibold text-base text-gray-950">文科思维的困局：浮空清谈</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    容易沉湎于宏大的乌托邦叙事，失去对现实客观物理规律的敬畏。若没有底层的逻辑闭环与资源计算，单纯的利他动机也常推导极低效、甚至灾难性的决策结果。
                  </p>
                </div>
              </div>

              {/* 对比表格 */}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="p-3 font-semibold text-gray-700">对比维度</th>
                      <th className="p-3 font-semibold text-gray-700">工科思维</th>
                      <th className="p-3 font-semibold text-gray-700">文科思维</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    <tr>
                      <td className="p-3 font-medium text-gray-900">核心终极导向</td>
                      <td className="p-3">目标与成果导向 (高效率把事情做成功)</td>
                      <td className="p-3">价值与意义导向 (探索为什么要研究)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">对待既存规则</td>
                      <td className="p-3">顺应并有效利用系统内部规则与数理定律</td>
                      <td className="p-3">审视、质问并批判社会制度及道德理念</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">失败的定义</td>
                      <td className="p-3">系统运行低效、发生不可控崩溃、缺乏物理产出</td>
                      <td className="p-3">缺乏人文关怀、丧失价值追求、滑向平庸与冷漠</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </FadeIn>

          {/* Part 3 */}
          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Part 3 / 融会贯通的大师之道
              </h2>
              <p className="mb-4">
                在科技与人文的交汇点，寻找引领未来的<strong>“文理双修”</strong>跨界核心方案。
              </p>
              <div className="my-8 p-6 bg-gray-900 text-gray-100 rounded-2xl">
                <h4 className="text-lg font-semibold mb-2 text-white">科技与人文的十字路口</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  苹果之所以成为不朽的传奇，是因为它始终坚持站在科技与人文的十字路口。极致卓越的硬件工程与冷酷供应链（工科），只有在被极简主义美学、深切的人性洞察和艺术般的直觉（文科）所点亮时，才能孕育出引领时代的生活艺术品。
                </p>
                <div className="text-xs text-gray-400 mt-4 border-t border-gray-800 pt-3 text-right">
                  —— 乔布斯与未来的 “T型” 创作者
                </div>
              </div>
              <p className="text-center font-medium text-gray-900 mt-8">
                “知其可行，更知其可贵。这是我们跨越未来智能时代的底层通行证。”
              </p>
            </section>
          </FadeIn>

        </div>

        {/* 结语 */}
        <FadeIn>
          <div className="mt-20 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
            <p className="font-medium text-gray-600 mb-1">理构基石，人点星空</p>
            <p>在变局交织的时代，愿我们共同跨越系统边界，探寻理性与人性之美。</p>
          </div>
        </FadeIn>
      </article>
    </main>
  )
}