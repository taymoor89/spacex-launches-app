import { renderHook } from "@testing-library/react";
import useSortedData from "./useSortedData";

const data = [{ name: "Beta" }, { name: "Alpha" }, { name: "Charlie" }];

describe("useSortedData", () => {
  it("should sort data when sort order changes", async () => {
    const { result, rerender } = renderHook(useSortedData, {
      initialProps: {
        data,
        sortOrder: "",
      },
    });
    expect(result.current).toEqual(data);
    rerender({ data, sortOrder: "ASC" });
    expect(result.current).toEqual([
      { name: "Alpha" },
      { name: "Beta" },
      { name: "Charlie" },
    ]);
    rerender({ data, sortOrder: "DESC" });
    expect(result.current).toEqual([
      { name: "Charlie" },
      { name: "Beta" },
      { name: "Alpha" },
    ]);
  });
});
