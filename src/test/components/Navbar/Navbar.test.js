import {render, screen } from "@testing-library/react"
import Navbar from "../../../components/Navbar/Navbar";


test("Texts should be screen", () => {
    render(<Navbar/>);
    
    const navbarText1 = screen.getByText(/hepsiburada.com/i);
    const navbarText2 = screen.getByText(/VOTE Challange/i);

    expect(navbarText1).toBeInTheDocument();
    expect(navbarText2).toBeInTheDocument();
})
