import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../../../pages/home/Home";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App"

test("Submit Link loaded successfully", () => {
   render(<Home />, { wrapper: BrowserRouter });
   const submitElemet = screen.getByText(/submit a link/i);
   expect(submitElemet).toBeInTheDocument();  
});

test("Submit Link click event working successfully", () => {
    render(<App />);
    const submitElemet = screen.getByText(/submit a link/i);
    fireEvent.click(submitElemet);
    const returnToListElemet = screen.getByText(/return to list/i);
    expect(returnToListElemet).toBeInTheDocument();
 });
