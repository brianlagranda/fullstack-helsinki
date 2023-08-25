import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Blog from "./Blog";
import BlogForm from "./BlogForm";

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

describe("<BlogForm />", () => {
  test("new blog form is created with the right details", async () => {
    const addNewBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm addNewBlog={addNewBlog} />);

    const input = screen.getAllByRole("textbox");
    const sendButton = screen.getByText("Create");

    await user.type(input, "Testing a form...");
    //await user.type(inputs[1], "Brian Lagranda");
    //await user.type(inputs[2], "www.testingaform.com");
    await user.click(sendButton);

    expect(addNewBlog.mock.calls).toHaveLength(1);
    expect(addNewBlog.mock.calls[0][0].content).toBe("Testing a form...");
    //expect(addNewBlog.mock.calls[0][1].content).toBe("Brian Lagranda");
    //expect(addNewBlog.mock.calls[0][2].content).toBe("www.testingaform.com");
  });
});