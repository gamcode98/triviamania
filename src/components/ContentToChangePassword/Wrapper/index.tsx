import React from 'react'
import { ChangePasswordNavigation } from '../../../types'

interface Props {
  children: JSX.Element | JSX.Element[]
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setOptionsNavigation: React.Dispatch<React.SetStateAction<ChangePasswordNavigation>>
}

const Wrapper = (props: Props): JSX.Element => {
  const { children, isLoading, setIsLoading, setOptionsNavigation } = props

  return (
    <>
      {React.Children
        .toArray(children)
        .map((child: any) => React.cloneElement(child, { isLoading, setIsLoading, setOptionsNavigation }))}
    </>
  )
}

export { Wrapper }
