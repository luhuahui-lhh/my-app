'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import Link from 'next/link'

// ==========================================
// 动画组件
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

// 扫雷格子类型
type Cell = { x: number; y: number; isMine: boolean; isRevealed: boolean; isFlagged: boolean; count: number }

export default function Home() {
  // 💡 状态机：控制当前页面展示主页、文章、扫雷还是数独
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

  // 初始化触发
  useEffect(() => { initMinesweeper(); initSudoku(); }, [])

  // ==========================================
  // 视图条件分支渲染
  // ==========================================

  // 渲染视角一：罗伯特议事规则文章
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
            <h1 className="text-4xl font-bold mb-4 leading-tight text-gray-900">议事的算法：罗伯特议事规则与群体决策的理性设计</h1>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">如何用工科的精密规则，保护文科的自由与人权？</p>
            <p className="text-gray-700 leading-relaxed text-lg">诞生于 19 世纪的《罗伯特议事规则》，本质上是一套用极其严密的数理逻辑与程序设计，来保障人性尊严、自由与公平的“社会协作代码”。</p>
          </FadeIn>
        </article>
      </main>
    )
  }

  // 渲染视角二：内嵌扫雷小游戏
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
            <p className="text-gray-400 text-sm mt-1">点击格子挖开，找出 10 颗雷。</p>
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

  // 渲染视角三：内嵌数独小游戏
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
            <p className="text-gray-400 text-sm mt-1">点击网格格选择，再点击下方数字输入。</p>
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

  // 默认渲染：标准主页
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-lg">HUAHUI</span>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#about" className="hover:text-black transition-colors">关于</a>
            <a href="#blog" className="hover:text-black transition-colors">文章</a>
            <a href="#projects" className="hover:text-black transition-colors">项目</a>
          </div>
        </div>
      </nav>

      <section id="about" className="max-w-5xl mx-auto px-6 pt-36 pb-12">
        <FadeIn>
          <p className="text-gray-400 mb-3">你好，我是</p>
          <h1 className="text-5xl font-bold mb-6">HUAHUI</h1>
          <p className="text-xl text-gray-500 max-w-xl leading-relaxed">关注 AI × 设计 × 人文的探索者，在数字与现实之间寻找意义。</p>
        </FadeIn>
      </section>

      {/* ✍️ 文章展示区（位于上方，2篇独立+1篇内嵌） */}
      <section id="blog" className="max-w-5xl mx-auto px-6 py-16">
        <FadeIn><h2 className="text-2xl font-bold mb-10">文章</h2></FadeIn>
        <div className="divide-y divide-gray-100">
          <FadeIn delay={0}>
            <Link href="/blog/wenzhang2" className="block py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">走出激情的盲区：从四面文明之镜看狭隘民族主义的自我封闭</h3>
                  <p className="text-gray-400 text-sm">放下偏见，真正坐下来凝视这四面“文明之镜”。</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </Link>
          </FadeIn>
          <FadeIn delay={50}>
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
          <FadeIn delay={100}>
            <div onClick={() => { setViewState('robert_article'); window.scrollTo(0,0); }} className="py-6 hover:bg-gray-50 -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">议事的算法：罗伯特议事规则与群体决策的理性设计</h3>
                  <p className="text-gray-400 text-sm">如何用工科的精密规则，保护文科的自由与人权？</p>
                </div>
                <span className="text-gray-300 text-sm ml-8 shrink-0">2026年6月</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🕹️ 独立项目区域（位于下方，点击完美原地展开小游戏，绝不404） */}
      <section id="projects" className="bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <FadeIn><h2 className="text-2xl font-bold mb-10">独立项目（交互解谜）</h2></FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={() => { setViewState('minesweeper'); window.scrollTo(0,0); }} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300 p-6 border border-gray-100">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">React / 算法</span>
              <h3 className="font-semibold text-xl mt-4 mb-2 group-hover:text-gray-600 transition-colors">Web 极简扫雷游戏 →</h3>
              <p className="text-gray-400 text-sm leading-relaxed">利用 React 状态自动漫水填充算法实现的经典解谜游戏。</p>
            </div>
            <div onClick={() => { setViewState('sudoku'); window.scrollTo(0,0); }} className="group block bg-white rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer transition-shadow duration-300 p-6 border border-gray-100">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">矩阵 / 逻辑设计</span>
              <h3 className="font-semibold text-xl mt-4 mb-2 group-hover:text-gray-600 transition-colors">禅意九宫格数独 →</h3>
              <p className="text-gray-400 text-sm leading-relaxed">高阶二维矩阵逻辑验证的交互式数独，提供清爽沉浸的数理推演体验。</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-300 text-sm">© 2025 HUAHUI</footer>
    </main>
  )
}
