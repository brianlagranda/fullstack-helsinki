import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Blog from "./Blog";

test("renders title and author before pressing View button", () => {
  const blog = {
    title: "Component testing with jest",
    author: "Brian Lagranda",
    url: "www.testing.com",
    likes: 5,
  };

  const { container } = render(<Blog blog={blog} />);


  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("Component testing with jest");
  expect(div).toHaveTextContent("Brian Lagranda");
  expect(div).not.toHaveTextContent("www.testing.com");
  expect(div).not.toHaveTextContent("5");
});
