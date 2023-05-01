import { screen,render, cleanup, getByTestId , configure} from "@testing-library/react";
// import { Router } from "@mui/icons-material";
import { waitFor } from "@testing-library/react";
//import Profile from "../components/Profile";
// import { BrowserRouter, Routes, useLocation } from "react-router-dom";
import userEvent from "@testing-library/user-event"
import { Login } from "../src/Pages/LoginPage/Login.jsx";
    
    const onSubmit = jest.fn()
    
     beforeEach(()=>{
      render(<Login onSubmitForTest={onSubmit} />)
    })
    
    test('Login form parameters', async () => {
      const eMail = screen.getByTestId('text-input-element')
      const password = screen.getByTestId('password-input-element')
      userEvent.type(eMail, "Rocky15")
      userEvent.type(password, "123")
    
      userEvent.click(screen.getByTestId('login-button-element'))
    
      await waitFor(()=>{
        expect(onSubmit).toHaveBeenCalledTimes(1)
  })
});