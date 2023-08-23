import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "Component testing with jest",
    author: "Brian Lagranda",
  };

  const user = {
    username: "blagranda",
    name: "Brian Lagranda",
  };

  const { container } = render(<Blog key={blog.id} blog={blog} user={user} />);

  screen.debug(container);

  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Component testing with jest");
});
