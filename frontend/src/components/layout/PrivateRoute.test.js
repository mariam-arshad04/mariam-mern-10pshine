import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

describe("PrivateRoute", () => {

  test("redirects when no token", () => {
    localStorage.removeItem("token");

    const { container } = render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(container.innerHTML).not.toContain("Protected");
  });

  test("renders children when token exists", () => {
    localStorage.setItem("token", "fake");

    const { getByText } = render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(getByText("Protected")).toBeInTheDocument();
  });

});
