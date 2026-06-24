'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
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

export default function Home() {
  const [showArticle, setShowArticle] = useState(false)

  // 罗伯特议事规则文章原地渲染
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
              议事的算法：罗伯特议事规则与群体决策的理性设计
            </h1>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
              如何用工科的精密规则，保护文科的自由与人权？拆解文字构建的“群体协作操作系统”。
            </p>
          </FadeIn>

          <div className="space-y-16 text-gray-800 leading-relaxed text-lg pt-8">
            <p className="mb-6">诞生于 19 世纪的《罗伯特议事规则》，本质上是一套用极其严密的数理逻辑与程序设计，来保障人性尊严、自由与公平的“社会协作代码”。</p>
          </div>
        </article>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* 导航栏 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-lg">HUAHUI</span>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-black transition-colors">关于</a>
            <a href="#blog" className="hover:text-black transition-colors">文章</a>
            <a href="#projects" className="hover:text-black transition-colors">项目</a>
            <a href="#contact" className="hover:text-black transition-colors">联系</a>
          </div>
        </div>
      </nav>

      {/* 个人介绍 */}
      <section id="about" className="max-w-5xl mx-auto px-6 pt-36 pb-12">
        <FadeIn>
          <p className="text-gray-400 mb-3">你好，我是</p>
          <h1 className="text-5xl font-bold mb-6">HUAHUI</h1>
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
            关注 AI × 设计 × 人文的探索者，在数字与现实之间寻找意义。
          </p>
        </FadeIn>
      </section>

      {/* ✍️ 1、文章展示区（已移至上方，保留全部 4 篇文章） */}
      <section id="blog" className="max-w-5xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-2xl font-bold mb-10">文章</h2>
        </FadeIn>
        <div className="divide-y divide-gray-100">
          
          {/* 文章 1 */}
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

          {/* 文章 2 */}
          <FadeIn delay={50}>
            <Link href="/blog/wenzhang1" className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">观察者视界：从自然律令到社会算法</h3>
                  <p className="text-gray-400 text-sm">用理性的逻辑去解构未知，用严密的规则去容纳混沌。全面拆解自然科学与社会科学的底层纠缠。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </Link>
          </FadeIn>
          
          {/* 文章 3 */}
          <FadeIn delay={100}>
            <Link href="/blog/rational-and-perceptual" className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">理性的严谨与感性的温度</h3>
                  <p className="text-gray-400 text-sm">全面拆解工科思维与文科思维的认知框架、碰撞交融与跨界实践方案。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </Link>
          </FadeIn>

          {/* 文章 4 */}
          <FadeIn delay={150}>
            <div onClick={() => { setShowArticle(true); window.scrollTo(0,0); }} className="py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">议事的算法：罗伯特议事规则与群体决策的理性设计</h3>
                  <p className="text-gray-400 text-sm">如何用工科的精密规则，保护文科的自由与人权？拆解文字构建的“群体协作操作系统”。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* 🕹️ 2、独立项目区域（已移至下方，路径修正为 xingmu1 和 xingmu2） */}
      <section id="projects" className="bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-10">独立项目（交互解谜）</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 项目一 */}
            <FadeIn delay={0}>
              <Link href="/project/xiangmu1" className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">React / 算法</span>
                <h3 className="font-semibold text-xl mt-4 mb-2 group-hover:text-gray-600 transition-colors">Web 极简扫雷游戏 →</h3>
                <p className="text-gray-400 text-sm leading-relaxed">利用 React 状态自动漫水填充（Flood Fill）算法实现的经典电脑解谜游戏。</p>
              </Link>
            </FadeIn>

            {/* 项目二 */}
            <FadeIn delay={100}>
              <Link href="/project/xiangmu2" className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">矩阵 / 逻辑设计</span>
                <h3 className="font-semibold text-xl mt-4 mb-2 group-hover:text-gray-600 transition-colors">禅意九宫格数独 →</h3>
                <p className="text-gray-400 text-sm leading-relaxed">高阶二维矩阵逻辑验证的交互式数独，提供清爽沉浸的数理推演体验。</p>
              </Link>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 联系 */}
      <section id="contact">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-4">联系我</h2>
            <div className="flex justify-center gap-4 mt-8">
              <a href="mailto:luhuahui@gmail.com" className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors">发邮件</a>
            </div>
          </FadeIn>
        </div>
      </section>
      <footer className="text-center py-8 text-gray-300 text-sm">© 2025 HUAHUI</footer>
    </main>
  )
}
