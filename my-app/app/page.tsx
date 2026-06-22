'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link' // 💡 补上了原本缺失的 Link 组件

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

const tags = ["全部", "Next", "Python", "AI", "设计"]

export default function Home() {
  const [activeTag, setActiveTag] = useState("全部")

  const filtered = activeTag === "全部"
    ? projects
    : projects.filter(p => p.tag === activeTag)

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
              {/* 分类筛选 */}
              <div className="flex gap-2">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                      activeTag === tag
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-500 hover:border-gray-400 border border-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* 网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <FadeIn key={p.title} delay={i * 80}>
                <a href={p.link} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* 图片区 */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* 悬停遮罩 */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-medium border border-white px-4 py-2 rounded-full">
                        查看详情 →
                      </span>
                    </div>
                  </div>
                  {/* 文字区 */}
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
          {[
            { 
              title: "罗伯特议事规则与群体决策的理性设计", 
              date: "2026年6月", 
              desc: "罗伯特议事规则与群体决策的理性设计。",
              path: "/blog" // 💡 完美契合你在 blog 下直建 page.tsx 的约定
            },
            { 
              title: "理性的严谨与感性的温度", 
              date: "2026年6月", 
              desc: "全面拆解工科思维与文科思维的认知框架、碰撞交融与跨界实践方案。",
              path: "/blog/rational-and-perceptual" 
            },
            { 
              title: "文章标题", 
              date: "2025年6月", 
              desc: "一两句话",
              path: "#" 
            }
          ].map((post, i) => (
            <FadeIn key={i} delay={i * 100}>
              <Link href={post.path} className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">{post.title}</h3>
                    <p className="text-gray-400 text-sm">{post.desc}</p>
                  </div>
                  <span className="text-gray-300 text-sm ml-8 shrink-0">{post.date}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
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
