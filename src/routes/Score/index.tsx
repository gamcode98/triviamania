/* eslint-disable react/jsx-indent */
import { useEffect, useState } from 'react'
import { LoaderDancing } from '../../components/LoaderDancing'
import { ResultsTable } from '../../components/TableResults'
import { Content, Data } from '../../dto/result.dto'
import { get } from '../../services/privateApiService'
import SeriousBmoImg from './../../assets/serious-bmo.png'
import './Score.css'

interface Url {
  previousUrl: null | string
  nextUrl: null | string
}

const Score = (): JSX.Element => {
  const [results, setResults] = useState<Content[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pagination, setPagination] = useState<Url>({
    previousUrl: null,
    nextUrl: null
  })

  useEffect(() => {
    getResults('/results/?limit=10&offset=0')
  }, [])

  const getResults = (url: string): void => {
    get<Data>(url)
      .then(({ data: { response } }) => {
        if (response.nextPage !== 'null') {
          setPagination(prev => ({ ...prev, nextUrl: response.nextPage }))
        } else {
          setPagination(prev => ({ ...prev, nextUrl: null }))
        }

        if (response.prevPage !== 'null') {
          setPagination(prev => ({ ...prev, previousUrl: response.prevPage }))
        } else {
          setPagination(prev => ({ ...prev, previousUrl: null }))
        }

        setResults(response.content)
      })
      .catch((error) => {
        console.log({ error })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handlePreviousResults = (): void => {
    setIsLoading(true)
    if (pagination.previousUrl !== null) {
      getResults(pagination.previousUrl)
    }
  }

  const handleNextResults = (): void => {
    setIsLoading(true)
    if (pagination.nextUrl !== null) {
      getResults(pagination.nextUrl)
    }
  }

  return (
    <div className='score-container wrapper'>
      <h2 className='title'>My history </h2>
      {isLoading
        ? <LoaderDancing />
        : <>
          {results?.length > 0
            ? <>
                <ResultsTable results={results} />
                <div className='btn-container'>
                  {pagination.previousUrl !== null &&
                    <button
                      type='button'
                      className='nes-btn is-primary'
                      onClick={handlePreviousResults}
                    >Previous
                    </button>}
                  {pagination.nextUrl !== null &&
                    <button
                      type='button'
                      className='nes-btn is-primary'
                      onClick={handleNextResults}
                    >Next
                    </button>}
                </div>
              </>
            : <div className='there-is-not-content-container'>
                <img src={SeriousBmoImg} className='serious-bmo-img' />
                <p className='paragraph'>There are not content yet</p>
              </div>}
          </>}

    </div>
  )
}

export { Score }
