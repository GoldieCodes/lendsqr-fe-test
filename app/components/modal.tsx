import styles from "@/styles/modules/modal.module.scss"

// DEFINING THE PROPS FOR THE MODAL COMPONENT
interface ModalProps {
  isOpen: boolean // INDICATES IF THE MODAL IS OPEN OR NOT
  message: string // MESSAGE TO BE DISPLAYED IN THE MODAL
  onClose: () => void // FUNCTION TO CLOSE THE MODAL
  createAccount: (arg: boolean) => void // FUNCTION TO HANDLE ACCOUNT CREATION LOGIC
}

// FUNCTIONAL COMPONENT FOR THE MODAL
const Modal: React.FC<ModalProps> = ({
  isOpen,
  message,
  onClose,
  createAccount,
}) => {
  // RETURN NULL IF MODAL IS NOT OPEN
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      {/* MODAL CONTAINER */}
      <div className={styles.modal}>
        <p>{message}</p> {/* DISPLAYING THE MESSAGE PASSED AS A PROP */}
        <div className={styles.modalActionButtons}>
          {/* BUTTON TO RETRY PASSWORD LOG IN */}
          <button
            onClick={() => {
              createAccount(false) // SET CREATE ACCOUNT TO FALSE
              onClose() // CLOSE THE MODAL
            }}
          >
            Retry Password
          </button>

          {/* BUTTON TO CREATE A NEW ACCOUNT */}
          <button
            onClick={() => {
              createAccount(true) // SET CREATE ACCOUNT TO TRUE
              onClose() // CLOSE THE MODAL
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
