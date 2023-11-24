import { useState } from "react";
import Modal from "../components/Modal.jsx";

function Home() {
  const [showModalType, setShowModalType] = useState( null )
  const isAuth = false

  const userEmail = 'rus@mail.com'

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
    >
      {isAuth && (
        <>
          <h2>You are logged!</h2>
          <h3>User email: {userEmail}</h3>
        </>
      )}

      <div
        className="flex justify-center gap-4 mt-10"
      >
        {isAuth ? (
          <button
            className="btn"
            type="button"
            onClick={() => console.log( 'logout' )}
          >Logout
          </button>
        ) : (
          <>
            <button
              className="btn"
              type="button"
              onClick={() => setShowModalType( 'login' )}
            >Log In
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => setShowModalType( 'register' )}
            >Register
            </button>
          </>)}

        {showModalType && (
          showModalType === 'login' ?
            <Modal handleModalClose={() => setShowModalType( null )}>
              <p>Login Form</p>
            </Modal>
            :
            <Modal handleModalClose={() => setShowModalType( null )}>
              <p>Register Form</p>
            </Modal>)}
      </div>

    </div>
  )
}

export default Home;