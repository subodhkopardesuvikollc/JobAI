import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CandidateTable from "./CandidateTable";
import { formatFileName } from "@/utils/tableFunctions";

const mockCandidates = [
  {
    fileName: "john_doe_resume.pdf",
    fileUrl: "http://example.com/john_doe_resume.pdf",
    score: "0.85",
  },
  {
    fileName: "jane_smith_resume.pdf",
    fileUrl: "http://example.com/jane_smith_resume.pdf",
    score: "0.90",
  },
];
describe("CandidateTable with candidates", () => {
  it("renders a heading", () => {
    render(<CandidateTable candidates={mockCandidates} />);

    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent("Matching Candidates");
  });

  it("renders a table with the correct headers", () => {
    render(<CandidateTable candidates={mockCandidates} />);

    const table = screen.getByRole("table");
    const headers = screen.getAllByRole("columnheader");

    expect(table).toBeInTheDocument();
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent("Candidate");
    expect(headers[1]).toHaveTextContent("Resume");
    expect(headers[2]).toHaveTextContent("Score");
  });

  it("renders rows for each candidate", () => {
    render(<CandidateTable candidates={mockCandidates} />);

    const candidateRows = screen.getAllByRole("row");

    expect(candidateRows).toHaveLength(mockCandidates.length + 1);
  });

  it("renders candidate file names and links and scores", () => {
    render(<CandidateTable candidates={mockCandidates} />);

    mockCandidates.forEach((candidate, index) => {
      const formattedFileName = formatFileName(candidate.fileName);
      const name = screen.getByText(formattedFileName);

      expect(name).toBeInTheDocument();

      const link = screen.getAllByRole("link");

      const score = screen.getByText(candidate.score);

      expect(link).toHaveLength(mockCandidates.length);
      expect(link[index]).toHaveAttribute("href", candidate.fileUrl);

      expect(score).toBeInTheDocument();
      expect(score).toHaveTextContent(candidate.score);
    });
  });
});

describe("CandidateTable with no candidates", () => {
  it("renders a message when no candidates are provided", () => {
    render(<CandidateTable candidates={null} />);

    const pTag = screen.getByRole("paragraph");
    expect(pTag).toBeInTheDocument();
    expect(pTag).toHaveTextContent("No candidates found.");
  });
});
