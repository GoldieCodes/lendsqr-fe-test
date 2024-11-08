"use client"
import login from "@/styles/modules/login.module.scss"
import Image from "next/image"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react"
import { auth } from "@/firebase"
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { FirebaseError } from "firebase/app"
import Modal from "@/app/components/Modal"
import { useRouter } from "next/navigation"

// MAIN FUNCTION COMPONENT DEFINING ALL LOGIC FOR THE LOGIN PAGE
export default function Login() {
  // STATES FOR MANAGING MODAL VISIBILITY AND STATUS MESSAGE
  const [isModalOpen, setModalOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [createAccount, setCreateAccount] = useState(false)
  const router = useRouter()

  // STATE AND FUNCTION TO TOGGLE PASSWORD VISIBILITY IN FORM
  const [hidePassword, setHidePassword] = useState(true)
  function showHiddenPassword(): void {
    setHidePassword(!hidePassword)
  }

  // FUNCTION TO HANDLE USER AUTHENTICATION WITH FIREBASE
  const handleAuth = (
    authFunction: (
      auth: Auth,
      email: string,
      password: string
    ) => Promise<UserCredential>,
    email: string,
    password: string,
    setSubmitting: (arg: boolean) => void
  ) => {
    authFunction(auth, email, password)
      .then(() => {
        // REDIRECT USER TO DASHBOARD ON SUCCESSFUL LOGIN
        router.push("/dashboard")
      })
      .catch((error) => {
        // HANDLE AUTHENTICATION ERRORS
        fixErrorOrCreateUser(error)
      })
      .finally(() => setSubmitting(false))
  }

  // FUNCTION TO HANDLE AND DISPLAY SPECIFIC ERROR MESSAGES IN A MODAL
  function fixErrorOrCreateUser(error: FirebaseError): void {
    setModalOpen(true)
    if (error.code === "auth/invalid-credential") {
      setStatusMessage(
        "You have entered an invalid email or password. Create an account or enter your password correctly."
      )
    } else if (error.code === "auth/email-already-in-use") {
      setStatusMessage(
        "This email is already in use. Reset your password if you have forgotten it, or create an account with a different email address."
      )
    } else {
      setStatusMessage(error.code)
    }
  }

  // FUNCTION TO CLOSE THE MODAL
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      {/* HEADER SECTION WITH LENDSQR LOGO */}
      <header className={`logo ${login.logo}`}>
        <Image src="/logo.svg" alt="Lendsqr logo" fill />
      </header>

      {/* MAIN CONTENT AREA FOR THE LOGIN FORM */}
      <main className={login.main}>
        <aside className={login.illustration}>
          {/* ILLUSTRATION ON THE SIDE OF THE LOGIN FORM */}
          <Image
            src="/pablo-login.svg"
            alt="colorful illustration person walking through door"
            fill
          />
        </aside>

        <section>
          <div className={login.title}>
            {/* WELCOME MESSAGE AND FORM HEADER */}
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </div>

          {/* LOGIN FORM WITH FORMIK AND YUP VALIDATION */}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Please enter a valid email address")
                .required("This field is required"),
              password: Yup.string()
                .required("Please enter a password")
                .min(6, "Password should be at least 6 characters"),
            })}
            onSubmit={({ email, password }, { setSubmitting }) => {
              const values: [string, string, (arg: boolean) => void] = [
                email,
                password,
                setSubmitting,
              ]
              if (createAccount) {
                // HANDLE ACCOUNT CREATION
                handleAuth(createUserWithEmailAndPassword, ...values)
              } else {
                // HANDLE LOGIN AUTHENTICATION
                handleAuth(signInWithEmailAndPassword, ...values)
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className={login.form}>
                {/* EMAIL INPUT FIELD WITH LABEL FOR ACCESSIBILITY */}
                <div className={login.emailInput}>
                  <label htmlFor="email" className={login.srOnly}>
                    Email
                  </label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                  <span className={login.formError}>
                    <ErrorMessage name="email" />
                  </span>
                </div>

                {/* PASSWORD INPUT FIELD WITH TOGGLE FOR SHOW/HIDE PASSWORD */}
                <div className={login.passwordInput}>
                  <label htmlFor="password" className={login.srOnly}>
                    Password
                  </label>
                  <div className={login.passwordField}>
                    <Field
                      name="password"
                      id="password"
                      type={hidePassword ? "password" : "text"}
                      placeholder="Password"
                    />
                    <span
                      className={login.passwordActions}
                      onClick={() => showHiddenPassword()}
                    >
                      {hidePassword ? "SHOW" : "HIDE"}
                    </span>
                  </div>
                  <span className={login.formError}>
                    <ErrorMessage name="password" />
                  </span>
                </div>

                {/* FORGOT PASSWORD LINK */}
                <p className={login.passwordActions}>FORGOT PASSWORD?</p>

                {/* SUBMIT BUTTON WHICH SHOWS DIFFERENT TEXT BASED ON FORM STATE */}
                <button type="submit">
                  {isSubmitting
                    ? "Submitting..."
                    : createAccount
                    ? "CREATE ACCOUNT"
                    : "LOG IN"}
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </main>

      {/* MODAL COMPONENT FOR DISPLAYING ERROR MESSAGES */}
      <Modal
        isOpen={isModalOpen}
        message={statusMessage}
        onClose={closeModal}
        createAccount={setCreateAccount}
      />
    </>
  )
}
