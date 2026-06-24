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

export default function ArticleTwo() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-24">
      {/* 顶部导航 */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors">
            ← 返回主页
          </Link>
          <span className="font-semibold text-sm">HUAHUI 的人文观察</span>
        </div>
      </nav>

      {/* 文章主体 */}
      <article className="max-w-3xl mx-auto px-6 pt-32">
        <FadeIn>
          <div className="text-sm text-gray-400 mb-3">2026年6月 · 人文反思 / 社会心理</div>
          <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">
            走出激情的盲区：从四面文明之镜看狭隘民族主义的自我封闭
          </h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">
            放下偏见，真正坐下来凝视这四面“文明之镜”，它们恰恰能照出极端情绪下的虚妄与盲目。
          </p>
        </FadeIn>

        {/* 核心内容 */}
        <div className="space-y-16 text-gray-800 leading-relaxed text-lg">
          
          {/* 经典语录引入 */}
          <FadeIn>
            <section className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100">
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                陈丹青 · 引言
              </div>
              <p className="text-gray-700 italic leading-relaxed text-base md:text-lg">
                “大陆青年人至少要去以下四个地方逛逛：一是去朝鲜，看看中国曾经的样子，恐怕就不想再回到过去了。二是去纽约，看看世界金融中心是如何运转的，了解一下世界的高度。三是去台湾，看看中国另外一个样子。四是去日本，看看我们曾经的敌人，现在变成了什么样子。去过这四个地方后，许多争吵的问题就会有了明确的答案。”
              </p>
            </section>
          </FadeIn>

          {/* 承上启下 */}
          <FadeIn>
            <section>
              <p className="mb-6">
                这段话之所以充满力量，是因为它用具体的物理位移，去打破了意识形态构筑的思维牢牢。在互联网的舆论场上，狭隘的民族主义者习惯于在信息茧房中构筑“非我族类，其心必异”的宏大叙事，用非黑即白的标签去覆盖复杂而具体的现实。
              </p>
              <p className="mb-6">
                然而，如果能放下偏见，真正坐下来凝视这四面“文明之镜”，它们恰恰能照出极端情绪下的虚妄与盲目。
              </p>
            </section>
          </FadeIn>

          {/* 四面镜子网格卡片 */}
          <FadeIn>
            <section className="space-y-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                理性的坐标 / 四面文明之镜的解构
              </h2>

              {/* 镜一：日本 */}
              <div className="border-l-2 border-black pl-5">
                <h3 className="font-bold text-xl text-gray-950 mb-2">第一面镜：日本 —— 被污名化的“小礼”与真正的现代常识</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  在提及日本时，舆论场上最常见的一种诋毁便是：“日本国民知小礼而无大义”。一些人以此为由，将日本社会展现出的高公共素质、极端的垃圾分类、极致的公共秩序与职场敬业精神，轻蔑地归结为“伪善”或“表面功夫”。
                </p>
                <p className="text-gray-600 text-base leading-relaxed mt-2">
                  现代文明社会的根基，恰恰是由无数个“小礼”构成的：是对公共空间的尊重，是对他人权益的边界感，是对规则的敬畏。将这些日常高素质视作“无大义”的伪善，不仅无法让自己变得更崇高，反而遮蔽了我们向优秀治理经验学习的眼睛。去看看曾经的敌人变成什么样，才能明白什么叫真正的<strong>“知耻而后勇”</strong>。
                </p>
              </div>

              {/* 镜二：朝鲜 */}
              <div className="border-l-2 border-gray-300 pl-5">
                <h3 className="font-bold text-xl text-gray-950 mb-2">第二面镜：朝鲜 —— 民族主义极端纯化后的活化石</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  去朝鲜，是对极端排外、盲目复古的民族主义者最棒的清醒剂。在这个将民族纯洁性和某种思想推向极致的封闭社会里，外界能看到高度的激情与奉献，但也同样能看到信息隔绝下的滞后与个体生活的逼仄。它是一面反面教材，清晰地昭示着：当一个社会陷入彻底的排外和自我感动时，会付出怎样沉重的现代化代价。看看它，恐怕没有人想再回到过去。
                </p>
              </div>

              {/* 镜三：台湾 */}
              <div className="border-l-2 border-gray-300 pl-5">
                <h3 className="font-bold text-xl text-gray-950 mb-2">第三面镜：台湾 —— 同根同源的另一种可能</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  踏上台湾的土地，看到那里保留完整的传统文化血脉、井然的工作秩序与温良的市井人情。它是血脉相连却在历史风雨中走出现代化延伸的样本。它让我们在两岸的对照中看到，同根同源的文化在另一种社会土壤里，是如何安顿人的尊严、保留社会的韧性。它提供了一种不一样的视野，让我们看到历史与现代融合的另一种可能。
                </p>
              </div>

              {/* 镜四：纽约 */}
              <div className="border-l-2 border-gray-300 pl-5">
                <h3 className="font-bold text-xl text-gray-950 mb-2">第四面镜：纽约 —— 世界财富与规则的权力之巅</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  纽约则是现代世界的另一极。作为全球的金融与文化中心，它用冰冷而高效的资本逻辑、极具包容性的多元文化和顶级的创新能力，定义了现代文明的发展高度。不去纽约看看全球化机器的核心是如何运转的，不了解世界的高度，就很容易陷入“老子天下第一”的井底之蛙式自嗨，误把夜郎自大当成民族自信。
                </p>
              </div>
            </section>
          </FadeIn>

          {/* 总结部分 */}
          <FadeIn>
            <section className="pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                结语 / 理性，是一个民族真正的脊梁
              </h2>
              <p className="mb-6">
                睁眼看世界，不等于丧失立场；承认他者的优秀，更不是背叛历史。正如陈丹青所言，去过这四个地方，网络上许多无谓的争吵就会有了明确的答案。一个真正自信的民族，应当具备海纳百川的胸襟和直面差距的勇气。
              </p>
              <p className="mb-6">
                走出狭隘激情的盲区，将这四个极具复杂历史和现实意义的地域作为观察的窗口。我们需要的不是口号堆砌的虚幻优越感，而是在理性的坐标系中看清世界，找准自身走向未来的真正方向。
              </p>
              <div className="mt-12 p-6 bg-gray-900 text-gray-300 rounded-2xl text-center text-sm">
                “海纳百川，方见真理之广博。”
              </div>
            </section>
          </FadeIn>

        </div>
      </article>
    </main>
  )
}