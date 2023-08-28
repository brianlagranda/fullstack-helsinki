import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Blog from "./Blog";

describe("<Blog />", () => {
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

  test("also renders likes and url after pressing View button", async () => {
    const blog = {
      title: "Component testing with jest",
      author: "Brian Lagranda",
      url: "www.testing.com",
      likes: 5,
    };

    const mockHandler = jest.fn();

    const { container } = render(<Blog blog={blog} toggleWhole={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    expect(container).not.toHaveTextContent("View");
    expect(container).toHaveTextContent("5");
    expect(container).toHaveTextContent("www.testing.com");
  });

  test("like button clicked twice", async () => {
    const blog = {
      title: "Component testing with jest",
      author: "Brian Lagranda",
      url: "www.testing.com",
      likes: 5,
    };

    const mockHandler = jest.fn();

    const { container } = render(<Blog blog={blog} toggleWhole={mockHandler} handleLikeClick={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(container).not.toHaveTextContent("View");
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});