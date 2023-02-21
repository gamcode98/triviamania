import { Content } from '../../dto/result.dto'
import { categories } from '../../utils'

interface Props {
  results: Content[]
}

const ResultsTable = (props: Props): JSX.Element => {
  const { results } = props

  const getCategory = (value: string): string | undefined => {
    const foundCategory = categories.find(category => category.value === value)
    return foundCategory?.label
  }

  return (
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
                      <li key={index}>{getCategory(category)}</li>
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
  )
}

export { ResultsTable }
