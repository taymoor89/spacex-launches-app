import { render, screen } from "@testing-library/react";

import Pagination from "./Pagination";

const defaultProps = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: () => {},
};

const getButtonByAccessibleName = (name) =>
  screen.getByRole("button", { name });

describe("Pagination", () => {
  describe("renders", () => {
    test("current and total number of pages info", () => {
      render(<Pagination {...defaultProps} />);
      expect(screen.getByText("1/10")).toBeInTheDocument();
    });

    test("first page button", () => {
      render(<Pagination {...defaultProps} />);
      expect(getButtonByAccessibleName("first")).toBeInTheDocument();
    });

    test("previous page button", () => {
      render(<Pagination {...defaultProps} />);
      expect(getButtonByAccessibleName("previous")).toBeInTheDocument();
    });

    test("next page button", () => {
      render(<Pagination {...defaultProps} />);
      expect(getButtonByAccessibleName("next")).toBeInTheDocument();
    });

    test("last page button", () => {
      render(<Pagination {...defaultProps} />);
      expect(getButtonByAccessibleName("last")).toBeInTheDocument();
    });
  });

  describe("disables", () => {
    test("first and previous buttons when user is on first page", () => {
      render(<Pagination {...defaultProps} currentPage={1} />);
      expect(getButtonByAccessibleName("first")).toBeDisabled();
      expect(getButtonByAccessibleName("previous")).toBeDisabled();
    });

    test("next and last buttons when user is on last page", () => {
      render(<Pagination {...defaultProps} currentPage={10} />);
      expect(getButtonByAccessibleName("next")).toBeDisabled();
      expect(getButtonByAccessibleName("last")).toBeDisabled();
    });
  });

  describe("enables", () => {
    test("all buttons when user can go next or back", () => {
      render(<Pagination {...defaultProps} currentPage={2} />);
      expect(getButtonByAccessibleName("first")).toBeEnabled();
      expect(getButtonByAccessibleName("previous")).toBeEnabled();
      expect(getButtonByAccessibleName("next")).toBeEnabled();
      expect(getButtonByAccessibleName("last")).toBeEnabled();
    });
  });
});
