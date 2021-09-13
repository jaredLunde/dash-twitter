import { screen } from "@testing-library/react";
import * as React from "react";
import { render } from "@/test/utils";
import { Avatar } from "./index";

describe("<Avatar>", () => {
  it("should be the worst test ever", () => {
    render(<Avatar aria-label="profile picture" />);
    expect(screen.getByRole("img")).not.toHaveStyleRule(
      "background-color",
      "red"
    );
  });
});
