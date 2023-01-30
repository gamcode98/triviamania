import { useRef, useState } from 'react'
import { Select } from '../../components/Select/Select'
import { categories, difficulty } from '../../utils'
import './Playground.css'

const Playground = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const [range, setRange] = useState<number>(1)

  const changeRange = (e?: any): void => {
    setRange(Number(e.target.value))
    if (inputRef.current !== null && badgeRef.current !== null) {
      const w = parseInt(window.getComputedStyle(inputRef?.current, null).getPropertyValue('width'))
      const pixels = w / 30
      badgeRef.current.style.left = ((Number(inputRef.current.value) * pixels) + 10 + 'px')
    }
  }

  return (
    <main className='playground wrapper'>
      <div className='options-container'>
        <Select label='Categories' items={categories} />
        <Select label='Difficulty' items={difficulty} />
        <div className='input-range-container'>
          <label className='label-text' htmlFor='limit-of-questions'>Select limit of questions</label>
          <div ref={badgeRef} className='badge-container'>
            <div className='nes-badge badge-size'>
              <span className='is-success'>{range}</span>
            </div>
          </div>
          <input
            ref={inputRef}
            type='range'
            name='limit-of-questions'
            id='limit-of-questions'
            min={1} max={20} step={1}
            value={range}
            onChange={(e) => changeRange(e)}
          />
        </div>
      </div>

    </main>
  )
}

export { Playground }
