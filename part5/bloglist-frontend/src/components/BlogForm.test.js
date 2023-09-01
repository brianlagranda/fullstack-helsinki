import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import BlogForm from "./BlogForm";


describe("<BlogForm />", () => {
  test("new blog form is created with the right details", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog}/>);

    const inputTitle = container.querySelector("#blogNewTitle");
    const inputAuthor =  container.querySelector("#blogNewAuthor");
    const inputUrl =  container.querySelector("#blogNewUrl");

    const sendButton = screen.getByText("Create");

    await user.type(inputTitle, "Testing a form...");
    await user.type(inputAuthor, "Brian Lagranda");
    await user.type(inputUrl, "www.testingaform.com");

    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("Testing a form...");
    expect(createBlog.mock.calls[0][0].author).toBe("Brian Lagranda");
    expect(createBlog.mock.calls[0][0].url).toBe("www.testingaform.com");
  });
});