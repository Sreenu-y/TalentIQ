import { useState } from "react";
import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to the Talent-IQ</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />
    </>
  );
}

export default App;
