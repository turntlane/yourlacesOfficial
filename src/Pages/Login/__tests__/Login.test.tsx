// Login.test.js

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../Store/Auth/authApiSlice";
import Login from "../Login";

// Mocking the dependencies
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../authApiSlice", () => ({
  useLoginMutation: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn()); // Reset mock function before each test
    useNavigate.mockReturnValue(jest.fn());
    useLoginMutation.mockReturnValue([
      jest.fn(), // login function
      { isLoading: false }, // mutation state
    ]);
  });

  it("renders the login form", () => {
    const { getByText, getByLabelText } = render(<Login />);
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  it("submits the form and calls login function on submit", async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const { getByLabelText, getByText } = render(<Login />);
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    // Assuming login is an asynchronous function
    await waitFor(() => {
      expect(useLoginMutation.mock.calls[0][0]).toEqual({
        email: "test@example.com",
        password: "testpassword",
      });
      expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
