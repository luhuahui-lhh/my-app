'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import Image from 'next/image'

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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const projects = [
  {
    title: "项目名称一",
    desc: "简单描述这个项目做了什么，解决了什么问题。",
    tag: "Next.js",
    img: "https://picsum.photos/seed/proj1/600/400",
    link: "#",
  },
  {
    title: "项目名称二",
    desc: "简单描述这个项目做了什么，解决了什么问题。",
    tag: "Python",
    img: "https://picsum.photos/seed/proj2/600/400",
    link: "#",
  },
  {
    title: "项目名称三",
    desc: "简单描述这个项目做了什么，解决了什么问题。",
    tag: "AI",
    img: "https://picsum.photos/seed/proj3/600/400",
    link: "#",
  },
  {
    title: "项目名称四",
    desc: "简单描述这个项目做了什么，解决了什么问题。",
    tag: "设计",
    img: "https://picsum.photos/seed/proj4/600/400",
    link: "#",
  },
  {
    title: "项目名称五",
    desc: "简单描述这个项目做了什么，解决了什么问题。",
    tag: "Next.js",
    img: "https://picsum.photos/seed/proj5/600/400",
    link: "#",
  },
  {
    title: "项目名称六",
    desc: "简单描述这个项目做了什么，解决了什么问题。",
    tag: "设计",
    img: "https://picsum.photos/seed/proj6/600/400",
    link: "#",
  },
]

const tags = ["全部", "Next.js", "Python", "AI", "设计"]

export default function Home() {
  const [activeTag, setActiveTag] = useState("全部")
  // 💡 新增一个状态，控制是否在主页直接展开阅读《罗伯特议事规则》
  const [showArticle, setShowArticle] = useState(false)

  const filtered = activeTag === "全部"
    ? projects
    : projects.filter(p => p.tag === activeTag)

  // 💡 如果用户点击了阅读，直接在当前页面极其优雅地展开文章，完全不需要路由跳转，彻底杜绝404！
  if (showArticle) {
    return (
      <main className="min-h-screen bg-white text-gray-900 pb-24">
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => { setShowArticle(false); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-black transition-colors">
              ← 返回主页
            </button>
            <span className="font-semibold text-sm">HUAHUI 的文章</span>
          </div>
        </nav>

        <article className="max-w-3xl mx-auto px-6 pt-32">
          <FadeIn>
            <div className="text-sm text-gray-400 mb-3">2026年6月 · 社会政治学 / 组织设计</div>
            <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
              罗伯特议事规则与群体决策的理性设计
            </h1>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
              如何用工科的精密规则，保护文科的自由与人权？拆解文字构建的“群体协作操作系统”。
            </p>
          </FadeIn>

          <div className="space-y-16 text-gray-800 leading-relaxed text-lg">
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

            <FadeIn>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                  核心原则 / 规则底层的平衡哲学
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-2">① 多数人原则与少数人保护</h3>
                    <p className="text-sm text-gray-600">
                      虽然最终决策听从多数人，但必须在充分听取少数人意见的前提下进行。剥夺少数人的发言权，等同于破坏了多数人决策的合法性。
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-2">② 一时一件（One thing at a time）</h3>
                    <p className="text-sm text-gray-600">
                      在任意给定时间内，会议只能审议和辩论一个动议。这类似于计算机系统中的“单线程”处理，防止思绪发散，确保闭环。
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-2">③ 对事不对人</h3>
                    <p className="text-sm text-gray-600">
                      辩论的目标是动议的可行性与价值，严禁攻击发言者的动机或人品。所有发言面向主持人，切断个体间直接的情绪冲突。
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-2">④ 充分辩论权</h3>
                    <p className="text-sm text-gray-600">
                      任何人不能垄断发言。在所有人都有机会发表第一次意见之前，任何人都不能发表第二次意见。确保内向者的声音被听见。
                    </p>
                  </div>
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                  运行范式 / 经典动议流生命周期
                </h2>
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
                        <td className="p-3">“我动议……” 明确陈述一件具体的事情</td>
                        <td className="p-3">拒绝模糊不清的抱怨，让讨论有靶子</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-900">2. 附议（Second）</td>
                        <td className="p-3">至少需要另外一人支持，动议才进入审议</td>
                        <td className="p-3">过滤个人无意义的倾销，节省群体时间成本</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-900">3. 主持人陈述</td>
                        <td className="p-3">主持人宣布：“现在对该动议进行辩论”</td>
                        <td className="p-3">确立公共议题，使其脱离提议者个人，归属集体</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-900">4. 轮流辩论</td>
                        <td className="p-3">赞成与反对轮流发言，发言严格限时</td>
                        <td className="p-3">防止情绪性垄断，提供绝对理性的表达容器</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-gray-900">5. 表决与宣布</td>
                        <td className="p-3">进行点票表决，主持人当场宣布结果</td>
                        <td className="p-3">形成可执行、可追溯的最终闭环，拒绝和稀泥</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                  结语 / 十字路口的再思考
                </h2>
                <p className="mb-6">
                  如果说代码和 AI 算法是我们在数字世界中调配算力、解决逻辑问题的工具；那么《罗伯特议事规则》就是人类在现实世界中调配群体智慧、解决价值冲突的算法。
                </p>
                <div className="my-8 p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <p className="text-sm font-medium text-gray-900 mb-2">文理交叉的视角：</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    它的结构是冰冷、高度程序化的（极端的工科思维）；但它的初心，却是为了给个体尊严、自由表达提供完美的庇护（深沉的文科情怀）。它向我们证明：只有当规则足够严谨时，自由才真正拥有温度。
                  </p>
                </div>
              </section>
            </FadeIn>
          </div>
        </article>
      </main>
    )
  }

  // 💡 下面是正常状态下的主页显示
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-lg">HUAHUI</span>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-black transition-colors">关于</a>
            <a href="#projects" className="hover:text-black transition-colors">项目</a>
            <a href="#blog" className="hover:text-black transition-colors">文章</a>
            <a href="#contact" className="hover:text-black transition-colors">联系</a>
          </div>
        </div>
      </nav>

      {/* 个人介绍 */}
      <section id="about" className="max-w-5xl mx-auto px-6 pt-36 pb-24">
        <FadeIn>
          <p className="text-gray-400 mb-3">你好，我是</p>
          <h1 className="text-5xl font-bold mb-6">HUAHUI</h1>
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
            关注 AI × 设计 × 人文的探索者，在数字与现实之间寻找意义。
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#contact" className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">联系我</a>
            <a href="#projects" className="px-6 py-3 border border-gray-300 rounded-full text-sm hover:border-gray-500 transition-colors">查看项目</a>
          </div>
        </FadeIn>
      </section>

      {/* 项目网格 */}
      <section id="projects" className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <FadeIn>
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-2xl font-bold">项目</h2>
              <div className="flex gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                      activeTag === tag ? 'bg-black text-white' : 'bg-white text-gray-500 hover:border-gray-400 border border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <FadeIn key={p.title} delay={i * 80}>
                <a href={p.link} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative overflow-hidden h-48">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium border border-white px-4 py-2 rounded-full">查看详情 →</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{p.tag}</span>
                    <h3 className="font-semibold text-base mt-3 mb-1 group-hover:text-gray-600 transition-colors">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 文章 */}
      <section id="blog" className="max-w-5xl mx-auto px-6 py-24">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-10">文章</h2>
        </FadeIn>
        <div className="divide-y divide-gray-100">
          
          {/* 💡 点击直接触发无缝状态切换，绝不 404 */}
          <FadeIn delay={0}>
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

          <FadeIn delay={100}>
            <a href="/blog/rational-and-perceptual" className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">理性的严谨与感性的温度</h3>
                  <p className="text-gray-400 text-sm">全面拆解工科思维与文科思维的认知框架、碰撞交融与跨界实践方案。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </a>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1">文章标题一</h3>
                  <p className="text-gray-400 text-sm">一两句话说明这篇文章讲了什么。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2025年6月</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* 联系 */}
      <section id="contact" className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">联系我</h2>
            <p className="text-gray-400 mb-8">有想法、合作或只是聊聊，欢迎随时联系。</p>
            <div className="flex justify-center gap-4">
              <a href="mailto:luhuahui@gmail.com" className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">发邮件</a>
              <a href="https://github.com/luhuahui-lhh" target="_blank" className="px-6 py-3 border border-gray-300 rounded-full text-sm hover:border-gray-500 transition-colors">GitHub</a>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-300 text-sm">
        © 2025 HUAHUI
      </footer>

    </main>
  )
}
