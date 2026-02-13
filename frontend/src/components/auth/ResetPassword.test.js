import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResetPassword from "./ResetPassword";

describe("ResetPassword Component", () => {

  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );
  });

});
