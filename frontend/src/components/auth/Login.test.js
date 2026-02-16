import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import API from "../../services/api";

jest.mock("../../services/api");

describe("Login Component", () => {

  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test("calls API on valid submit", async () => {
    API.post.mockResolvedValue({
      data: { token: "fake", name: "Test" }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "test@test.com" }
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "123456" }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(API.post).toHaveBeenCalled();
  });

});
