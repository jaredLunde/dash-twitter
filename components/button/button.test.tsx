import { screen } from "@testing-library/react";
import * as React from "react";
import { render } from "@/test/utils";

describe("<Button>", () => {
  it("should be the worst test ever", () => {
    render(<button>Hello</button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
