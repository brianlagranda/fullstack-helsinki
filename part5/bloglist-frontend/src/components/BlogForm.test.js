import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import BlogForm from "./BlogForm";

test("new blog form is created with the right details", () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog}/>);

  const inputTitle = screen.getByPlaceholderText("write the title of the blog");
  const inputAuthor = screen.getByPlaceholderText("name of the author");
  const inputUrl = screen.getByPlaceholderText("www.example.com");

  const sendButton = screen.getByText("Create");

  userEvent.type(inputTitle, "Testing a form...");
  userEvent.type(inputAuthor, "Brian Lagranda");
  userEvent.type(inputUrl, "www.testingaform.com");

  userEvent.click(sendButton);

  //expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].content).toBe("testing a form...");
  //expect(createBlog.mock.calls[0][1].content).toBe("Brian Lagranda");
  //expect(createBlog.mock.calls[0][2].content).toBe("www.testingaform.com");
});