import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";


describe("<BlogForm />", () => {
  test("new blog form is created with the right details", () => {
    const createBlog = jest.fn();

    render(<BlogForm createBlog={createBlog} toggleVisibility={createBlog}/>);

    const inputTitle = screen.getByPlaceholderText("write the title of the blog");
    const inputAuthor = screen.getByPlaceholderText("name of the author");
    const inputUrl = screen.getByPlaceholderText("www.example.com");

    const sendButton = screen.getByText("Create");

    console.log(sendButton);

    userEvent.type(inputTitle, "Testing a form...");
    userEvent.type(inputAuthor, "Brian Lagranda");
    userEvent.type(inputUrl, "www.testingaform.com");

    userEvent.click(sendButton);

    console.log(createBlog.mock.calls);

    expect(createBlog.mock.calls).toHaveLength(3);
    expect(inputTitle).toBe("Testing a form...");
    expect(inputAuthor).toBe("Brian Lagranda");
    expect(inputUrl).toBe("www.testingaform.com");
  });
});