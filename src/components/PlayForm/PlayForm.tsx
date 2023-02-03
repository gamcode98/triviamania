import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { categories, difficulty } from '../../utils'
import { Checkbox } from '../Checkbox/Checkbox'
import { Select } from '../Select/Select'
import { Range } from '../Range/Range'
import { getQuestions } from '../../services'
import { ISettings } from '../../interfaces/ISettings'
import { AxiosProgressEvent } from 'axios'
import { useNavigate } from 'react-router-dom'
import './PlayForm.css'

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const schema = yup.object({
  categories: yup
    .array()
    .of(yup.string())
    .required()
    .min(1, 'Must select at least one category'),
  limit: yup
    .number()
    .required(),
  difficulty: yup
    .string()
    .required('Must select difficulty')
}).required()

const PlayForm = (props: Props): JSX.Element => {
  const { setIsLoading, setProgress } = props

  const navigate = useNavigate()

  const { handleSubmit, control, reset } = useForm<ISettings>({
    defaultValues: { categories: [], limit: 1, difficulty: '' },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<ISettings> = data => {
    setIsLoading(true)

    getQuestions(data,
      (progressEvent: AxiosProgressEvent) => {
        const { loaded, total } = progressEvent
        if (total !== undefined) {
          const percent = Math.round((loaded * 100) / total)
          setProgress(percent)
        }
      }
    )
      .then(({ data }) => {
        navigate('/playground', { state: data })
      })
      .catch(({ error }) => {
        console.log({ error })
      })
      .finally(() => {
        reset()
        setIsLoading(false)
      })
  }

  return (
    <div className='play-form-container'>
      <div className='nes-container is-rounded '>
        <form className='form-to-play' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='title'>"Trivia Game Settings"</h3>
          <div className='left-side'>
            <Checkbox
              control={(control as unknown) as Control<FieldValues>}
              name='categories'
              rules={{ required: true }}
              title='Categories'
              items={categories}
            />
          </div>
          <div className='right-side'>
            <Select
              control={(control as unknown) as Control<FieldValues>}
              name='difficulty'
              rules={{ required: true }}
              label='Difficulty'
              items={difficulty}
            />
            <Range
              control={(control as unknown) as Control<FieldValues>}
              name='limit'
              rules={{ required: true }}
              label='Select limit of questions'
              min={1} max={20} step={1}
            />
            <button className='nes-btn is-primary'>Get me the questions</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export { PlayForm }
