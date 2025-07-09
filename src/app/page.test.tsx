import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home", () => {
  it("renders home and headings", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Candidate Matcher");
    const subheading = screen.getByText(
      "Paste a job description below to find relevant candidates."
    );
    expect(subheading).toBeInTheDocument();
  });

  it("renders textarea and button", () => {
    render(<Home />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    const button = screen.getByRole("button", { name: "Find Candidates" });
    expect(button).toBeInTheDocument();
  });
});
// Mock fetch globally
global.fetch = jest.fn();

describe("handleFindCandidates function", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("shows error when job description is empty", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: "Find Candidates" });

    await userEvent.click(button);

    expect(
      screen.getByPlaceholderText("Please paste a job description first!")
    ).toBeInTheDocument();
  });

  it("shows error when job description is only whitespace", async () => {
    render(<Home />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Find Candidates" });

    await userEvent.type(textarea, "   ");
    await userEvent.click(button);

    expect(
      screen.getByPlaceholderText("Please paste a job description first!")
    ).toBeInTheDocument();
  });

  it("handles successful API response", async () => {
    const mockCandidates = [
      {
        fileName: "john_doe.pdf",
        fileUrl: "http://example.com/john.pdf",
        score: "0.95",
      },
      {
        fileName: "jane_smith.pdf",
        fileUrl: "http://example.com/jane.pdf",
        score: "0.87",
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCandidates,
    });

    render(<Home />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Find Candidates" });

    await userEvent.type(textarea, "Software Engineer");
    await userEvent.click(button);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: "Software Engineer" }),
    });

    await screen.findByText("Matching Candidates");
  });

  it("handles API error response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<Home />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Find Candidates" });

    await userEvent.type(textarea, "Software Engineer");
    await userEvent.click(button);

    expect(
      screen.getByPlaceholderText(
        "Failed to fetch candidates. Please try again later."
      )
    ).toBeInTheDocument();
  });

  it("handles empty/null data response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });

    render(<Home />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Find Candidates" });

    await userEvent.type(textarea, "Software Engineer");
    await userEvent.click(button);

    expect(
      screen.getByPlaceholderText(
        "No candidates found for the given job description."
      )
    ).toBeInTheDocument();
  });

  it("clears error when user starts typing", async () => {
    render(<Home />);
    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: "Find Candidates" });

    // First trigger an error
    await userEvent.click(button);
    expect(
      screen.getByPlaceholderText("Please paste a job description first!")
    ).toBeInTheDocument();

    // Then start typing to clear the error
    await userEvent.type(textarea, "S");
    expect(screen.getByDisplayValue("S")).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("Please paste a job description first!")
    ).not.toBeInTheDocument();
  });
});
