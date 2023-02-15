const Score = (): JSX.Element => {
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
            <tr>
              <td>90%</td>
              <td>7</td>
              <td>1</td>
              <td>8</td>
              <td>
                <div className='lists'>
                  <ul className='nes-list is-disc'>
                    <li>Good morning.</li>
                    <li>Thou hast had a good night's sleep, I hope.</li>
                    <li>Thou hast had a good afternoon</li>
                    <li>Good night.</li>
                  </ul>
                </div>
              </td>
              <td>Hard</td>
              <td>7:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export { Score }