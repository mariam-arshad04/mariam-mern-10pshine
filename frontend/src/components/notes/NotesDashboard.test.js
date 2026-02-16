import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotesDashboard from "./NotesDashboard";
import API from "../../services/api";

jest.mock("../../services/api");

describe("NotesDashboard", () => {

  test("shows no notes message", async () => {
    API.get.mockResolvedValue({ data: { notes: [] } });

    render(
      <MemoryRouter>
        <NotesDashboard />
      </MemoryRouter>
    );

    expect(await screen.findByText(/No notes yet/i))
      .toBeInTheDocument();
  });

});
