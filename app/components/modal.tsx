import styles from "@/styles/modules/modal.module.scss"

interface ModalProps {
  isOpen: boolean
  message: string
  onClose: () => void
  createAccount: (arg: boolean) => void
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onClose,
  createAccount,
}) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.modalActionButtons}>
          <button
            onClick={() => {
              createAccount(false)
              onClose()
            }}
          >
            Retry Password
          </button>
          <button
            onClick={() => {
              createAccount(true)
              onClose()
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
