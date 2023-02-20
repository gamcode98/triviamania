import React from 'react'
import { IAlert } from '../../../interfaces'
import { AuthenticationNavigation, ModalAction } from '../../../types'

interface Props {
  children: JSX.Element | JSX.Element[]
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setAuthNavigation: React.Dispatch<React.SetStateAction<AuthenticationNavigation>>
  setHideLoginWithGoogle: React.Dispatch<React.SetStateAction<boolean>>
  setAlert?: React.Dispatch<React.SetStateAction<IAlert>>
  setModalAction?: React.Dispatch<React.SetStateAction<ModalAction>>
}

const Wrapper = (props: Props): JSX.Element => {
  const { children, isLoading, setIsLoading, setAuthNavigation, setHideLoginWithGoogle, setAlert, setModalAction } = props

  return (
    <>
      {React.Children
        .toArray(children)
        .map((child: any) => React.cloneElement(child, { isLoading, setIsLoading, setAuthNavigation, setHideLoginWithGoogle, setAlert, setModalAction }))}
    </>
  )
}

export { Wrapper }
