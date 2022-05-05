import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateLink from "../../../pages/createLink/CreateLink";
import App from "../../../App"

test("link name input should be rendered", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });
  const linkNameElement = screen.getByPlaceholderText(/e.g. Alphabet/i);
  expect(linkNameElement).toBeInTheDocument();
});

test("link url input should be rendered", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });
  const linkUrlElement = screen.getByPlaceholderText("e.g. http://abc.xyz");
  expect(linkUrlElement).toBeInTheDocument();
});

test("link button input should be rendered", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });
  const linkButtonElement = screen.getByRole("button");
  expect(linkButtonElement).toBeInTheDocument();
});

test("link name input should change", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });
  const linkNameInputElement = screen.getByPlaceholderText(/e.g. Alphabet/i);
  const testValue = "Hepsiburada";

  fireEvent.change(linkNameInputElement, { target: { value: testValue } });
  expect(linkNameInputElement.value).toBe(testValue);
});

test("link url input should change", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });
  const linkUrlInputElement = screen.getByPlaceholderText(
    "e.g. http://abc.xyz"
  );
  const testValue = "https://hepsiburada.com";

  fireEvent.change(linkUrlInputElement, { target: { value: testValue } });
  expect(linkUrlInputElement.value).toBe(testValue);
});

test("button click should run", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });
  const linkButtonElement = screen.getByRole("button");
  const linkNameElement = screen.getByPlaceholderText(/e.g. Alphabet/i);
  const linkUrlElement = screen.getByPlaceholderText("e.g. http://abc.xyz");
  
  const testValue = "test";

  fireEvent.change(linkNameElement, { target: { value: testValue } });
  fireEvent.change(linkUrlElement, { target: { value: testValue } });
  fireEvent.click(linkButtonElement);

  expect(linkNameElement.value).toBe("");
  expect(linkUrlElement.value).toBe("");
});

test("localStorageData should have data because of previous testing", ()=>{
  let localeData = localStorage.getItem("LinkVote");
  localeData = JSON.parse(localeData);
  expect(localeData).toHaveLength(1);
})

test("localStorageData should be include correct data", () => {
  render(<CreateLink />, { wrapper: BrowserRouter });  
  const testValue = "test";
  let localeData = localStorage.getItem("LinkVote");
  localeData = JSON.parse(localeData);
  expect(localeData[0].title).toBe(testValue);
  expect(localeData[0].url).toBe(testValue)
});

test("return to list button is running", () => {
    render(<App/>);
    render(<CreateLink />, { wrapper: BrowserRouter });
    const returnElement = screen.getByText(/Return to List/i);
    
    fireEvent.click(returnElement);
    const submitElemet = screen.getByText(/submit a link/i)
    expect(submitElemet).toBeInTheDocument();
});


