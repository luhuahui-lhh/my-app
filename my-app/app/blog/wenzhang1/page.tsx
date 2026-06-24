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

export default function ScienceArticle() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-24">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← 返回主页
          </Link>
          <span className="font-semibold text-sm">HUAHUI 的认知笔记</span>
        </div>
      </nav>

      {/* 文章主体 */}
      <article className="max-w-3xl mx-auto px-6 pt-32">
        <FadeIn>
          <div className="text-sm text-gray-400 mb-3">2026年6月 · 科学科普 / 思维大融通</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
            观察者的视界：从自然律令到社会算法
          </h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
            用理性的逻辑去解构未知，用严密的规则去容纳混沌。全面拆解自然科学与社会科学的底层纠缠。
          </p>
        </FadeIn>

        {/* 核心内容 */}
        <div className="space-y-16 text-gray-800 leading-relaxed text-lg">
          
          <FadeIn>
            <section>
              <p className="mb-6">
                人类历史上的每一次飞跃，都伴随着“观察世界的眼光”的改变。当远古的先民不再将雷电归咎于神明的愤怒，而是试图寻找云层与电荷的规律时，<strong>自然科学（Natural Science）</strong>诞生了；而当启蒙时代的思想家不再将秩序归咎于君权的绝对统治，而是试图用契约与统计去度量群体的行为时，<strong>社会科学（Social Science）</strong>走上了历史舞台。
              </p>
              <p className="mb-6">
                这两者，看似一个冰冷地凝视着没有生命的宇宙，一个温热地解析着充满欲望的人间，但它们的底层却共享着同一套理性的重型武器：<strong>用逻辑去解构未知，用规则去容纳混沌。</strong>
              </p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Part 1 / 自然科学：确定性的边界与造物的密码
              </h2>
              <p className="mb-6">
                自然科学是人类向外探索的极限。它建立在一个不可动摇的工科原点上：<strong>宇宙是可测量的，因果是可复现的。</strong>
              </p>
              <p className="mb-6">
                从牛顿的万有引力到爱因斯坦的相对论，自然科学的范式是极致的<strong>“还原论（Reductionism）”</strong>。它坚信：只要我们把一个复杂的系统拆得足够碎，就能通过精准的数理公式，推演出整个世界的未来。
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl my-6">
                <h4 className="font-bold text-gray-900 mb-3">自然科学的三大核心支柱</h4>
                <ul className="text-sm space-y-2 text-gray-600">
                  <li><strong>① 实验可重复性：</strong> 任何人在相同边界条件下做实验，必须得到相同的结果。</li>
                  <li><strong>② 数学演绎：</strong> 坚信数学是宇宙的底层通用语言，一切现象皆可被公式化。</li>
                  <li><strong>③ 证伪主义：</strong> 科学不是绝对的真理，而是“尚未被证伪的假设”。</li>
                </ul>
              </div>
              <p className="mb-6">
                然而，当自然科学走到量子力学的深水区时，却遭遇了海森堡不确定性原理。物理学家发现，在微观世界里，观察者的“观测”行为本身就会改变粒子的状态。宇宙在最深处，给人类的理性设置了一道无法逾越的“确定性边界”。
              </p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Part 2 / 社会科学：动态的系统与人性的算法
              </h2>
              <p className="mb-6">
                如果说自然科学面对的是“上帝不掷骰子”的物理世界，那么社会科学面对的，则是<strong>由无数个正在掷骰子的个体组成的混沌系统。</strong>
              </p>
              <p className="mb-6">
                经济学、政治学、社会学……这些学科构成了社会科学的矩阵。在这里，还原论失效了。整体往往大于部分之和，表现出强烈的<strong>“涌现性（Emergence）”</strong>。
              </p>
              <div className="border-l-2 border-black pl-4 my-6">
                <h4 className="font-semibold text-gray-950">致命的变量：反馈回路</h4>
                <p className="text-sm text-gray-600 mt-1">
                  自然科学中，电子不会因为读了《量子力学》而改变跳跃轨道；但社会科学中，股民却会因为读了《经济学预测》而改变买卖行为，从而让预测本身“自我实现”或“自我毁灭”。
                </p>
              </div>
              <p className="mb-6">
                因此，社会科学引入了“秩序系统”。例如《罗伯特议事规则》，它不是去消灭人的私欲或情绪，而是设计一套精密防洪闸（单线程议事、对事不对人），让冲突在规则的河道里安全地转化为群体的共识。这何尝不是一种最高级的社会工程学算法？
              </p>
            </section>
          </FadeIn>

          <FadeIn>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                Part 3 / 十字路口的相遇：AI 时代的学科大融通
              </h2>
              <p className="mb-6">
                大语言模型（LLM）的本质，是自然科学的产物；但它所表现出来的复杂涌现能力、语义理解，却成了一个不折不扣的社会科学研究样本。我们现在需要像观察人类一样，用行为心理学的方法去测试和驯化一个拥有几千亿参数的 AI。
              </p>
              <div className="my-8 p-6 bg-gray-950 text-gray-100 rounded-2xl">
                <h4 className="text-lg font-semibold mb-2 text-white">爱德华·威尔逊的“大融通”预言</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  “科学的终极疆域，是模糊自然与人文的边界。知其可行（依靠自然科学建立技术基石），更知其可贵（依靠社会科学与人文寻找价值锚点）。”
                </p>
              </div>
              <p className="text-center font-medium text-gray-900 mt-8">
                “自然科学给我们横渡星空的星舰，而社会科学则决定了星舰上的人类能否保持文明。”
              </p>
            </section>
          </FadeIn>

        </div>
      </article>
    </main>
  )
}