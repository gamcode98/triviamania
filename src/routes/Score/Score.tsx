/* eslint-disable react/jsx-indent */
import { useEffect, useState } from 'react'
import { LoaderDancing } from '../../components/LoaderDancing'
import { Content, Data } from '../../dto/result.dto'
import { get } from '../../services/privateApiService'
import './Score.css'

interface Url {
  previousUrl: null | string
  nextUrl: null | string
}

const Score = (): JSX.Element => {
  const [results, setResults] = useState<Content[] | null>(null)
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
          <div className='nes-table-responsive score-table'>
            <table className='nes-table is-bordered is-centered'>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Correct answers</th>
                  <th>Incorrect answers</th>
                  <th>Number of questions</th>
                  <th>Categories</th>
                  <th>Difficulty</th>
                  <th>Reponse time</th>
                </tr>
              </thead>
              <tbody>
                {results?.map(result => (
                  <tr key={result._id}>
                    <td>{result.score}</td>
                    <td>{result.correctAnswers}</td>
                    <td>{result.incorrectAnswers}</td>
                    <td>{result.numberOfQuestions}</td>
                    <td>
                      <div className='lists'>
                        <ul className='nes-list is-disc'>
                          {result.categories.map((category, index) => (
                            <li key={index}>{category}</li>
                          ))}
                        </ul>
                      </div>
                    </td>
                    <td>{result.difficulty}</td>
                    <td>{result.responseTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          </>}

    </div>
  )
}

export { Score }
