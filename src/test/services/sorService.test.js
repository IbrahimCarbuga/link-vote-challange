import { render } from "@testing-library/react";
import App from "../../App";
import { sortLoop } from "../../services/sortService";

const mockData = [
  {
    id: 1,
    title: "Hepsiburada",
    url: "www.hepsiburada.com",
    counter: 3,
    date: new Date("2022-05-05T17:45:05.416Z"),
  },
  {
    id: 2,
    title: "Hackerank",
    url: "www.hackerank.com",
    counter: 7,
    date: new Date("2022-05-05T17:46:05.416Z"),
  },
  {
    id: 3,
    title: "Github",
    url: "www.github.com",
    counter: 13,
    date: new Date("2022-05-05T17:45:05.416Z"),
  },
  {
    id: 4,
    title: "Stackoverflow",
    url: "www.stackoverflow.com",
    counter: 2,
    date: new Date("2022-05-05T17:43:05.416Z"),
  },
  {
    id: 5,
    title: "Heroku",
    url: "www.heroku.com",
    counter: 2,
    date: new Date("2022-05-05T17:43:50.416Z"),
  },
  {
    id: 6,
    title: "BTK",
    url: "www.btk.com",
    counter: 12,
    date: new Date("2022-05-05T17:45:05.416Z"),
  },
];

test("datas should be sort correctly", () => {
  render(<App />);
  const counterDesc = Array.from(mockData).sort(sortLoop('counter','desc'));
  const counterAsc = Array.from(mockData).sort(sortLoop('counter','asc'));
  const dateDesc = Array.from(mockData).sort(sortLoop('date','desc'));
  const dateAsc = Array.from(mockData).sort(sortLoop('date','asc'));

  expect(counterDesc[0].id).toBe(3);
  expect(counterAsc[0].id).toBe(5);
  expect(dateDesc[0].id).toBe(2);
  expect(dateAsc[0].id).toBe(4);
});

test('The sorting of the data in the same point should be according to the most recent date.', () => {
    const counterAsc = Array.from(mockData).sort(sortLoop('counter','asc'));

    expect(counterAsc[0].id).toBe(5);
    expect(counterAsc[1].id).toBe(4);
});

test('Data on the same date should be ranked according to the highest point.', () => {
    const dateDesc = Array.from(mockData).sort(sortLoop('date','desc'));

    expect(dateDesc[0].id).toBe(2);
    expect(dateDesc[1].id).toBe(3);
    expect(dateDesc[2].id).toBe(6);
    expect(dateDesc[3].id).toBe(1);
});

