import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import appStrings from "./app.strings";

test("displays header", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: appStrings.title })
  ).toBeInTheDocument();
});

test("displays open top sheet button", () => {
  render(<App />);
  expect(
    screen.getByRole("button", { name: appStrings.openTopSheet })
  ).toBeInTheDocument();
});

test("opens top sheet on clicking button", async () => {
  render(<App />);

  const openButton = screen.getByRole("button", {
    name: appStrings.openTopSheet,
  });

  userEvent.click(openButton);

  expect(
    await screen.findByRole("button", {
      name: appStrings.topSheet.cancelButton,
    })
  ).toBeInTheDocument();
});

test("minimises top sheet on clicking minimise button", async () => {
  render(<App />);

  const openButton = screen.getByRole("button", {
    name: appStrings.openTopSheet,
  });

  userEvent.click(openButton);

  const minimiseButton = await screen.findByRole("button", {
    name: appStrings.topSheet.minimiseButton,
  });

  userEvent.click(minimiseButton);

  // eslint-disable-next-line testing-library/no-node-access
  const topSheetContents = screen.getByRole("form").parentElement;

  expect(topSheetContents).toHaveClass("dropdownContentsHidden");
});

test("maximises top sheet on clicking maximise button", async () => {
  render(<App />);

  const openButton = screen.getByRole("button", {
    name: appStrings.openTopSheet,
  });

  userEvent.click(openButton);

  const minimiseButton = await screen.findByRole("button", {
    name: appStrings.topSheet.minimiseButton,
  });

  userEvent.click(minimiseButton);

  // eslint-disable-next-line testing-library/no-node-access
  const topSheetContents = screen.getByRole("form").parentElement;

  expect(topSheetContents).toHaveClass("dropdownContentsHidden");

  const maximiseButton = await screen.findByRole("button", {
    name: appStrings.topSheet.maximiseButton,
  });

  userEvent.click(maximiseButton);

  expect(topSheetContents).toHaveClass("dropdownContentsVisible");
});

test("closes top sheet on clicking close button", async () => {
  render(<App />);

  const openButton = screen.getByRole("button", {
    name: appStrings.openTopSheet,
  });

  userEvent.click(openButton);

  const closeButton = await screen.findByRole("button", { name: "X" });

  userEvent.click(closeButton);

  expect(
    screen.queryByRole("button", {
      name: appStrings.topSheet.cancelButton,
    })
  ).not.toBeInTheDocument();
});
