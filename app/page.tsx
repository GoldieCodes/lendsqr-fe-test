"use client"
import login from "./login.module.scss"
import Image from "next/image"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useState } from "react"
import { auth } from "@/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { FirebaseError } from "firebase/app"
import Modal from "./components/modal"

//this function defines all the logic for the login page
export default function Login() {
  //modal variables
  const [isModalOpen, setModalOpen] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")
  const [createAccount, setCreateAccount] = useState(false)

  //this unit defines the show/hide password feature on the form
  const [hidePassword, setHidePassword] = useState(true)
  function showHiddenPassword(): void {
    setHidePassword(!hidePassword)
  }

  //this function logs a user into their account, using Firebase auth functions
  //in the event where the user is not successfully logged in, it runs a sub function with other options for the user: retry or create account
  function loginUser(
    email: string,
    password: string,
    setSubmitting: (arg: boolean) => void
  ): void {
    if (createAccount) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("New user created!")
        })
        .catch((error) => {
          fixErrorOrCreateUser(error)
        })
        .finally(() => setSubmitting(false))
    } else
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Logged in!")
        })
        .catch((error) => {
          //this is the sub function that introduces the modal with the options to retry logging in or consider creating an account
          fixErrorOrCreateUser(error)
        })
        .finally(() => setSubmitting(false))
  }

  //the modal function
  function fixErrorOrCreateUser(error: FirebaseError): void {
    console.log(error.code)
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
  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <header className={login.logo}>
        <Image src="/logo.svg" alt="Lendsqr logo" fill />
      </header>
      <main className={login.main}>
        <aside className={login.illustration}>
          <Image
            src="/pablo-login.svg"
            alt="colorful illustration person walking through door"
            fill
          />
        </aside>
        <section>
          <div className={login.title}>
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </div>
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
              loginUser(email, password, setSubmitting)
            }}
          >
            {({ isSubmitting }) => (
              <Form className={login.form}>
                <div className={login.emailInput}>
                  {/* This label does not show up in the design. It's strictly for accessibility. */}
                  <label htmlFor="email" className={login.srOnly}>
                    Email
                  </label>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    className=""
                  />
                  <span className={login.formError}>
                    <ErrorMessage name="email" />
                  </span>
                </div>
                <div className={login.passwordInput}>
                  {/* This label does not show up in the design. It's strictly for accessibility. */}
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

                <p className={login.passwordActions}>FORGOT PASSWORD?</p>

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
      {/* Render Modal */}
      <Modal
        isOpen={isModalOpen}
        message={statusMessage}
        onClose={closeModal}
        createAccount={setCreateAccount}
      />
    </>
  )
}
