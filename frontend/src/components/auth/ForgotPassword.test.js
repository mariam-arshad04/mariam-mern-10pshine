import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

describe("ForgotPassword Component", () => {

  test("renders forgot password form", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Your email/i)).toBeInTheDocument();
  });

  test("renders send otp button", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
  
    expect(screen.getByRole("button", { name: /Send OTP/i })).toBeInTheDocument();

  });
  

});
