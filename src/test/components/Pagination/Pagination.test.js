import React from "react";
import {render, screen } from "@testing-library/react"
import Pagination from "../../../components/Pagination/Pagination";
import "@testing-library/jest-dom/extend-expect"

test("Page should be rendered successfully", () => {
  render(<Pagination linksPerPage={5} totalLinks={29} paginate={()=>3}/>);
  const element = screen.getByTestId("list-item");
  expect(element.childElementCount).toBe(6);
});
