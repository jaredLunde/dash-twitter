import "@testing-library/jest-dom/extend-expect";
import { matchers } from "@dash-ui/jest";

expect.extend(matchers);

/**
 * @see https://github.com/scottrippey/next-router-mock
 */
jest.mock("next/dist/client/router", () => require("next-router-mock"));

afterEach(() => {
  jest.clearAllMocks();
});
