import { useEffect, useRef } from 'react'
import { ModalAction } from '../../types'
import './Modal.css'

interface Props {
  modalAction: ModalAction
  children: JSX.Element | JSX.Element[]
}

const Modal = (props: Props): JSX.Element => {
  const { modalAction, children } = props

  const modalRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (modalAction === 'open') modalRef.current?.showModal()
    if (modalAction === 'close') modalRef.current?.close()
  }, [modalAction])

  return (
    <dialog className='nes-container is-rounded modal' ref={modalRef}>{children}</dialog>
  )
}

export { Modal }
