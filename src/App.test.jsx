import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { times } from "lodash";

import App from "./App";

const getMockData = (numberOfEntries = 1) =>
  times(numberOfEntries, (index) => ({
    id: `${index + 1}`,
    name: `Falcon ${index + 1} `,
    date_local: "2006-03-24T22:30:00Z",
    success: false,
    details: "Engine failure at 33 seconds and loss of vehicle",
    links: {
      patch: {
        small: "https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png",
      },
      webcast: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
    },
  }));

const successResponseMock = (data) => () =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data ?? getMockData(20)),
  });

const errorResponseMock = () =>
  Promise.resolve({
    ok: false,
  });

describe("App", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("renders", () => {
    beforeEach(() => {
      jest.spyOn(global, "fetch").mockImplementation(successResponseMock());
    });

    test("list of launches", async () => {
      render(<App />);
      expect(await screen.findByText("Falcon 1")).toBeInTheDocument();
    });

    test("pagination", async () => {
      render(<App />);
      expect(await screen.findByText("1/2")).toBeInTheDocument();
    });

    test("search input", async () => {
      render(<App />);
      expect(
        await screen.findByRole("textbox", { name: "search" })
      ).toBeInTheDocument();
    });

    test("sort by name button", async () => {
      render(<App />);
      expect(
        await screen.findByRole("button", { name: "sortByName" })
      ).toBeInTheDocument();
    });

    test("loading indicator", async () => {
      render(<App />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("no data", async () => {
      jest.spyOn(global, "fetch").mockImplementation(successResponseMock([]));
      render(<App />);
      expect(await screen.findByText("No data.")).toBeInTheDocument();
    });

    test("error", async () => {
      jest.spyOn(global, "fetch").mockImplementation(errorResponseMock);
      render(<App />);
      expect(await screen.findByText("Resource not found")).toBeInTheDocument();
    });
  });

  it("should allow searching for a launch", async () => {
    const user = userEvent.setup();
    jest.spyOn(global, "fetch").mockImplementation(successResponseMock());
    render(<App />);
    const searchInput = await screen.findByRole("textbox", { name: "search" });
    await user.type(searchInput, "Falcon 1");
    expect(searchInput).toHaveValue("Falcon 1");
  });

  it("should allow sorting launches by name", async () => {
    const user = userEvent.setup();
    const mockData = getMockData(3);
    jest.spyOn(global, "fetch").mockImplementation(
      successResponseMock([
        { ...mockData[0], name: "beta" },
        { ...mockData[1], name: "alpha" },
        { ...mockData[2], name: "charlie" },
      ])
    );
    render(<App />);
    const sortButton = await screen.findByRole("button", {
      name: "sortByName",
    });
    // click to sort in ascending order
    await user.click(sortButton);
    const launchItems = await screen.findAllByTestId("launch-item");
    expect(within(launchItems[0]).getByText("alpha")).toBeInTheDocument(); // first launch should have name alpha
    // click again to sort in descending order
    await user.click(sortButton);
    const items = await screen.findAllByTestId("launch-item");
    expect(within(items[0]).getByText("charlie")).toBeInTheDocument(); // now first launch should have name charlie
  });

  describe("pagination", () => {
    const mockData = getMockData(30);

    beforeEach(() => {
      jest
        .spyOn(global, "fetch")
        .mockImplementation(successResponseMock(mockData));
    });

    it("should allow navigating between pages", async () => {
      const user = userEvent.setup();
      render(<App />);
      // go next
      const nextPageButton = await screen.findByRole("button", {
        name: "next",
      });
      await user.click(nextPageButton);
      expect(await screen.findByText("Falcon 12")).toBeInTheDocument();
      expect(screen.queryByText("Falcon 1")).not.toBeInTheDocument();
      // now go next
      const previousPageButton = await screen.findByRole("button", {
        name: "previous",
      });
      await user.click(previousPageButton);
      expect(await screen.findByText("Falcon 1")).toBeInTheDocument();
      expect(screen.queryByText("Falcon 12")).not.toBeInTheDocument();
    });

    it("should allow navigating to the first page", async () => {
      const user = userEvent.setup();
      render(<App />);
      // go to third page
      const nextPageButton = await screen.findByRole("button", {
        name: "next",
      });
      await user.click(nextPageButton);
      await user.click(nextPageButton);
      expect(await screen.findByText("Falcon 23")).toBeInTheDocument();
      // now go to first page
      const firstPageButton = await screen.findByRole("button", {
        name: "first",
      });
      await user.click(firstPageButton);
      expect(await screen.findByText("Falcon 1")).toBeInTheDocument();
      expect(screen.queryByText("Falcon 23")).not.toBeInTheDocument();
    });

    it("should allow navigating to the last page", async () => {
      const user = userEvent.setup();
      render(<App />);
      // first page renders by default
      expect(await screen.findByText("Falcon 1")).toBeInTheDocument();
      // go to last page
      const lastPageButton = await screen.findByRole("button", {
        name: "last",
      });
      await user.click(lastPageButton);
      expect(await screen.findByText("Falcon 23")).toBeInTheDocument();
      expect(screen.queryByText("Falcon 1")).not.toBeInTheDocument();
    });
  });
});
