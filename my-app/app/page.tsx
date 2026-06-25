'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import Link from 'next/link'

// ==========================================
// 视差滚动渐入动画组件
// ==========================================
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

// 扫雷格子数据结构
type Cell = { x: number; y: number; isMine: boolean; isRevealed: boolean; isFlagged: boolean; count: number }

export default function Home() {
  // 核心状态机：控制当前页面展示主页、文章、扫雷还是数独
  const [viewState, setViewState] = useState<'home' | 'robert_article' | 'minesweeper' | 'sudoku'>('home')

  // ==========================================
  // 扫雷游戏核心逻辑状态
  // ==========================================
  const size = 9
  const mineCount = 10
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameOver, setGameOver] = useState(false)
  const [mineWin, setMineWin] = useState(false)

  const initMinesweeper = () => {
    let newBoard: Cell[][] = Array(size).fill(null).map((_, y) =>
      Array(size).fill(null).map((_, x) => ({ x, y, isMine: false, isRevealed: false, isFlagged: false, count: 0 }))
    )
    let planted = 0
    while (planted < mineCount) {
      const rx = Math.floor(Math.random() * size)
      const ry = Math.floor(Math.random() * size)
      if (!newBoard[ry][rx].isMine) { newBoard[ry][rx].isMine = true; planted++ }
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (newBoard[y][x].isMine) continue
        let count = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) { if (newBoard[y + dy]?.[x + dx]?.isMine) count++ }
        }
        newBoard[y][x].count = count
      }
    }
    setBoard(newBoard)
    setGameOver(false)
    setMineWin(false)
  }

  const revealCell = (x: number, y: number) => {
    if (gameOver || mineWin || board[y][x].isRevealed || board[y][x].isFlagged) return
    const newBoard = [...board.map(row => [...row])]
    if (newBoard[y][x].isMine) {
      setGameOver(true)
      newBoard.forEach(row => row.forEach(c => { if (c.isMine) c.isRevealed = true }))
      setBoard(newBoard)
      return
    }
    const floodFill = (cx: number, cy: number) => {
      if (cx < 0 || cx >= size || cy < 0 || cy >= size || newBoard[cy][cx].isRevealed) return
      newBoard[cy][cx].isRevealed = true
      if (newBoard[cy][cx].count === 0 && !newBoard[cy][cx].isMine) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) { floodFill(cx + dx, cy + dy) }
        }
      }
    }
    floodFill(x, y)
    setBoard(newBoard)
    if (newBoard.every(row => row.every(c => c.isMine || c.isRevealed))) setMineWin(true)
  }

  // ==========================================
  // 数独游戏核心逻辑状态
  // ==========================================
  const [sudokuGrid, setSudokuGrid] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)))
  const [sudokuInitial, setSudokuInitial] = useState<boolean[][]>(Array(9).fill(null).map(() => Array(9).fill(false)))
  const [sudokuSelected, setSudokuSelected] = useState<[number, number] | null>(null)

  const sudokuPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0], [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3], [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5], [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]

  const initSudoku = () => {
    setSudokuGrid(sudokuPuzzle.map(row => [...row]))
    setSudokuInitial(sudokuPuzzle.map(row => row.map(val => val !== 0)))
    setSudokuSelected(null)
  }

  const handleSudokuInput = (num: number) => {
    if (!sudokuSelected) return
    const [r, c] = sudokuSelected
    if (sudokuInitial[r][c]) return
    const newGrid = [...sudokuGrid.map(row => [...row])]
    newGrid[r][c] = num === newGrid[r][c] ? 0 : num
    setSudokuGrid(newGrid)
  }

  useEffect(() => { initMinesweeper(); initSudoku(); }, [])

  // ==========================================
  // 条件分支：内嵌页面独立渲染
  // ==========================================

  // 1. 罗伯特议事规则（完全还原最初版最惊艳的网格与对比表格结构）
  if (viewState === 'robert_article') {
    return (
      <main className="min-h-screen bg-white text-gray-900 pb-24">
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => { setViewState('home'); window.scrollTo(0,0); }} className="text-sm text-gray-500 hover:text-black transition-colors">← 返回主页</button>
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

            {/* 最初版的四大原则网格卡片 */}
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

            {/* 最初版的动议生命周期对比表格 */}
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

  // 2. 扫雷游戏原地渲染
  if (viewState === 'minesweeper') {
    return (
      <main className="min-h-screen bg-white text-gray-950 flex flex-col items-center pt-24 px-6">
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => setViewState('home')} className="text-sm text-gray-500 hover:text-black transition-colors">← 返回主页</button>
            <span className="font-semibold text-sm">MINESWEEPER</span>
          </div>
        </nav>
        <div className="max-w-md w-full text-center space-y-6 mt-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">高级感扫雷</h1>
            <p className="text-gray-400 text-sm mt-1">点击格子挖开，避开并找出 10 颗雷。</p>
          </div>
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            <span className="text-sm font-medium text-gray-600">{gameOver ? '💥 踩雷失败！' : mineWin ? '🎉 恭喜通关！' : '🕹️ 游戏中...'}</span>
            <button onClick={initMinesweeper} className="px-3 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800 transition-colors">重新开始</button>
          </div>
          <div className="grid grid-cols-9 gap-1 p-2 bg-gray-50 border border-gray-100 rounded-2xl aspect-square">
            {board.map((row, y) => row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                onClick={() => revealCell(x, y)}
                onContextMenu={(e) => { e.preventDefault(); if(!gameOver && !mineWin && !cell.isRevealed) { const nb = [...board.map(r=>[...r])]; nb[y][x].isFlagged = !nb[y][x].isFlagged; setBoard(nb); } }}
                className={`w-full aspect-square text-xs font-bold rounded-md flex items-center justify-center transition-all border select-none ${cell.isRevealed ? cell.isMine ? 'bg-red-500 text-white' : 'bg-white text-gray-800' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {cell.isRevealed ? (cell.isMine ? '💣' : cell.count > 0 ? cell.count : '') : cell.isFlagged ? '🚩' : ''}
              </button>
            )))}
          </div>
        </div>
      </main>
    )
  }

  // 3. 数独游戏原地渲染
  if (viewState === 'sudoku') {
    return (
      <main className="min-h-screen bg-white text-gray-950 flex flex-col items-center pt-24 px-6">
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => setViewState('home')} className="text-sm text-gray-500 hover:text-black transition-colors">← 返回主页</button>
            <span className="font-semibold text-sm">SUDOKU</span>
          </div>
        </nav>
        <div className="max-w-md w-full text-center space-y-6 mt-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">禅意数独</h1>
            <p className="text-gray-400 text-sm mt-1">点击网格格子选择，再点击下方数字填入。</p>
          </div>
          <div className="grid grid-cols-9 gap-px bg-gray-300 p-1 rounded-2xl border border-gray-200 overflow-hidden">
            {sudokuGrid.map((row, r) => row.map((val, c) => {
              const isSel = sudokuSelected && sudokuSelected[0] === r && sudokuSelected[1] === c
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => setSudokuSelected([r, c])}
                  className={`w-full aspect-square text-base font-medium flex items-center justify-center bg-white ${isSel ? 'bg-black text-white' : sudokuInitial[r][c] ? 'text-gray-950 font-bold bg-gray-50' : 'text-blue-600'}`}
                >
                  {val !== 0 ? val : ''}
                </button>
              )
            }))}
          </div>
          <div className="grid grid-cols-5 gap-2 bg-gray-50 p-3 rounded-2xl">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
              <button key={num} onClick={() => handleSudokuInput(num)} className="py-2 bg-white border rounded-xl font-bold text-sm shadow-sm">{num === 0 ? '清除' : num}</button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // ==========================================
  // 4. 默认主页渲染
  // ==========================================
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

      {/* ✍️ 文章展示区（位于上方，完备收纳 4 篇深度长文） */}
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

          {/* 文章 4（硬核大版罗伯特，无缝原地展开） */}
          <FadeIn delay={150}>
            <div onClick={() => { setViewState('robert_article'); window.scrollTo(0,0); }} className="py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
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

      {/* 🕹️ 独立项目区域（位于下方，点击无缝原生交互展开小游戏） */}
      <section id="projects" className="bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <FadeIn>
            <h2 className="text-2xl font-bold mb-10">独立项目（交互解谜）</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 项目一 */}
            <div onClick={() => { setViewState('minesweeper'); window.scrollTo(0,0); }} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300 p-6 border border-gray-100">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">React / 算法</span>
              <h3 className="font-semibold text-xl mt-4 mb-2 group-hover:text-gray-600 transition-colors">Web 极简扫雷游戏 →</h3>
              <p className="text-gray-400 text-sm leading-relaxed">利用 React 状态自动漫水填充（Flood Fill）算法实现的经典解谜游戏。</p>
            </div>

            {/* 项目二 */}
            <div onClick={() => { setViewState('sudoku'); window.scrollTo(0,0); }} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300 p-6 border border-gray-100">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">矩阵 / 逻辑设计</span>
              <h3 className="font-semibold text-xl mt-4 mb-2 group-hover:text-gray-600 transition-colors">禅意九宫格数独 →</h3>
              <p className="text-gray-400 text-sm leading-relaxed">高阶二维矩阵逻辑验证的交互式数独，提供清爽沉浸的数理推演体验。</p>
            </div>

          </div>
        </div>
      </section>

      {/* ✉️ 联系我与留言板区域 */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* 左侧引导文本 */}
          <FadeIn>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">联系我</h2>
              <p className="text-gray-500 leading-relaxed">
                有想法、合作需求、或者只是纯粹想聊聊科技与人文的未来，欢迎随时给我发邮件留言。
              </p>
              <div className="pt-4 flex gap-4">
                <a href="mailto:luhuahui@gmail.com" className="px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors shadow-sm">
                  发邮件
                </a>
                <a href="https://github.com/luhuahui-lhh" target="_blank" className="px-6 py-3 border border-gray-200 rounded-full text-sm hover:border-black text-gray-600 transition-colors">
                  GitHub 档案
                </a>
              </div>
            </div>
          </FadeIn>

          {/* 右侧极简交互式留言版表单 */}
          <FadeIn delay={100}>
            <form onSubmit={(e) => { e.preventDefault(); alert('留言功能已连通模拟！由于这是静态网站，留言需对接后台数据库。如需正式上线，建议配置 Formspree 或 Vercel KV 数据库。'); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">你的名字</label>
                <input type="text" required placeholder="Name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">电子邮箱</label>
                <input type="email" required placeholder="Email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">留言内容</label>
                <textarea rows={4} required placeholder="Message..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-gray-100 text-gray-900 font-medium rounded-xl text-sm hover:bg-black hover:text-white transition-all duration-300">
                提交留言
              </button>
            </form>
          </FadeIn>

        </div>
      </section>

      <footer className="text-center py-8 text-gray-300 text-sm border-t border-gray-100">
        © 2025 HUAHUI
      </footer>
    </main>
  )
}
