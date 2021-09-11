import "@testing-library/jest-dom/extend-expect";
import { matchers } from "@dash-ui/jest";

// Adds custom matchers for Dash
expect.extend(matchers);

// Adds mock for Next.js router before each test
// @see https://github.com/scottrippey/next-router-mock
beforeEach(() => {
  jest.mock("next/dist/client/router", () => require("next-router-mock"));
});

// Clears all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
