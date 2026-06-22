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

export default function RobertsRulesArticle() {
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
          <div className="text-sm text-gray-400 mb-3">2026年6月 · 社会政治学 / 组织设计</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
            议事的算法：罗伯特议事规则与群体决策的理性设计
          </h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
            如何用工科的精密规则，保护文科的自由与人权？拆解文字构建的“群体协作操作系统”。
          </p>
        </FadeIn>

        {/* 核心内容 */}
        <div className="space-y-16 text-gray-800 leading-relaxed text-lg">
          
          {/* 引言 */}
          <FadeIn>
            <section>
              <p className="mb-6">
                在面对群体决策时，我们经常陷入两个极端：要么流于无休止的“清谈和争吵”，效率极其低下；要么滑向少数人的“一言堂”，抹杀了多元个体的声音。
              </p>
              <p className="mb-6">
                诞生于 19 世纪的<strong>《罗伯特议事规则》（Robert's Rules of Order）</strong>，本质上是一套用极其严密的数理逻辑与程序设计，来保障人性尊严、自由与公平的“社会协作代码”。它告诉我们：理性的严谨，正是为了给感性的温度提供最坚实的容器。
              </p>
            </section>
          </FadeIn>

          {/* 核心原则 */}
          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                核心原则 / 规则底层的平衡哲学
              </h2>
              <p className="text-gray-600 mb-8 italic">
                罗伯特议事规则的高明之处，在于它将极为复杂的权力和人权诉求，解构成了几条不可动摇的底层算法：
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-2">① 多数人原则与少数人保护</h3>
                  <p className="text-sm text-gray-600">
                    虽然最终决策听从多数人（Majority rules），但必须在充分听取少数人意见（Protect the minority）的前提下进行。剥夺少数人的发言权，等同于破坏了多数人决策的合法性。
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-2">② 一时一件（One thing at a time）</h3>
                  <p className="text-sm text-gray-600">
                    在任意给定时间内，会议只能审议和辩论一个动议。这类似于计算机系统中的“单线程”处理，防止思绪和讨论发散，确保每一个问题都有清晰的闭环。
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-2">③ 对事不对人（Debate policy, not personality）</h3>
                  <p className="text-sm text-gray-600">
                    辩论的目标是“动议（事情本身）”的可行性与价值，严禁攻击发言者的动机、人品或身份。所有发言必须面向主持人，切断个体间直接的情绪冲突。
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="font-bold text-gray-900 mb-2">④ 充分辩论权</h3>
                  <p className="text-sm text-gray-600">
                    任何人不能垄断发言。规则规定，在所有人都有机会发表第一次意见之前，任何人都不能发表第二次意见。确保内向者与边缘个体的声音能够被听见。
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* 议事算法运行表 */}
          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                运行范式 / 经典动议流生命周期
              </h2>
              <p className="mb-6">
                罗伯特议事规则通过“动议（Motion）”来驱动事情的进展。一个动议从提出到落地，有着严密的编译流程：
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="p-3 font-semibold text-gray-700">步骤</th>
                      <th className="p-3 font-semibold text-gray-700">规则动作（工科属性）</th>
                      <th className="p-3 font-semibold text-gray-700">保障价值（文科属性）</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-600">
                    <tr>
                      <td className="p-3 font-medium text-gray-900">1. 提出主动议</td>
                      <td className="p-3">“我动议……” 明确陈述一件明确的事情</td>
                      <td className="p-3">拒绝模糊不清的抱怨，让讨论有靶子</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">2. 附议（Second）</td>
                      <td className="p-3">至少需要另外一人支持，动议才进入审议</td>
                      <td className="p-3">过滤个人无意义的倾销，节省群体时间成本</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">3. 主持人陈述</td>
                      <td className="p-3">主持人向全体宣布：“现在对该动议进行辩论”</td>
                      <td className="p-3">确立公共议题，使其脱离提议者个人，归属集体</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">4. 轮流辩论</td>
                      <td className="p-3">赞成与反对轮流发言，发言限时（通常 10 分钟）</td>
                      <td className="p-3">防止情绪性垄断，提供绝对理性的表达容器</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-gray-900">5. 表决与宣布</td>
                      <td className="p-3">进行点票（多数通过或 2/3 通过），主持人当场宣布</td>
                      <td className="p-3">形成可执行、可追溯的最终闭环，拒绝和稀泥</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </FadeIn>

          {/* 融会贯通：科技与人文视角 */}
          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                结语 / 十字路口的再思考
              </h2>
              <p className="mb-6">
                如果说代码和 AI 算法是我们在数字世界中调配算力、解决逻辑问题的工具；那么《罗伯特议事规则》就是人类在现实世界中调配群体智慧、解决价值冲突的算法。
              </p>
              
              <div className="my-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  文理交叉的视角：
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  它的结构是冰冷、繁琐、高度程序化的（极端的工科思维）；但它的初心，却是为了给个体尊严、自由表达、以及社会公正提供完美的庇护（深沉的文科情怀）。它向我们证明：只有当规则足够严谨时，自由才真正拥有温度。
                </p>
              </div>
            </section>
          </FadeIn>

        </div>
      </article>
    </main>
  )
}
