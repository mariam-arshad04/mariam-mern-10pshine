import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });
});
