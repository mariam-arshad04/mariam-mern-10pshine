import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "./Signup";

describe("Signup Component", () => {

  test("renders signup form", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /Signup/i })).toBeInTheDocument();


  });

});
