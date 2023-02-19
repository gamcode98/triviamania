import { useEffect, useState } from 'react'
import { Content, Data } from '../../dto/result.dto'
import { get } from '../../services/privateApiService'

const Score = (): JSX.Element => {
  const [nextUrl, setNextUrl] = useState<null | string>(null)
  const [results, setResults] = useState<Content[] | null>(null)

  useEffect(() => {
    get<Data>('/results/?limit=10&offset=0')
      .then(({ data: { response } }) => {
        console.log({ response })
        // response.content
        setResults(response.content)
      })
      .catch((error) => {
        console.log({ error })
      })
  }, [])

  return (
    <div className='wrapper'>
      <div className='nes-table-responsive'>
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
    </div>
  )
}

export { Score }
