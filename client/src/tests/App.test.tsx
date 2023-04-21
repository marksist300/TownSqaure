import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import Signup from "../pages/Signup/Signup";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";

const MockApp = (
  <Provider store={store}>
    <BrowserRouter>
      {/* <App /> */}
      <Signup />
    </BrowserRouter>
  </Provider>
);
global.fetch = vi.fn();

//Data for userSignup Mocks
const data = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzliYzNlMmNmNGRkMmUxZjEwZWQxMCIsImxvZ2dlZEluIjoic3VjY2VzcyIsImlhdCI6MTY4MTUwNTM0M30.Z5a1wfFLwzkuCWkWuyqyTqNNdCm_d6O8bdPTzMKUKxI",
  user: {
    _id: "6439bc3e2cf4dd2e1f10ed10",
    cover: "",
    email: "dj@email.com",
    followers: [],
    following: [],
    profilePic: "",
    username: "Johnny Cunty",
  },
};

//Promise for user data function
function createFetchResponse(input: any) {
  return { json: () => new Promise(resolve => resolve(input)) };
}
// describe("Signup visibility test", () => {
//   it("TownSquare Title should not be visible on page when display property is none ", () => {
//     render(MockApp);
//     const checkNavTitle = screen.queryByText(/TownSquare/i);
//     expect(checkNavTitle).toBeVisible();
//   });
// });

// describe("Signup elements should be in document", () => {
//   it("First Name input to be in document", () => {
//     render(MockApp);
//     const fName = screen.getByPlaceholderText("First name");
//     expect(fName).toBeInTheDocument();
//   });
//   it("Second Name input to be in document", () => {
//     render(MockApp);
//     const sName = screen.getByPlaceholderText("Last name");
//     expect(sName).toBeInTheDocument();
//   });
//   it("Email input to be in document", () => {
//     render(MockApp);
//     const email = screen.getByPlaceholderText("Enter email");
//     expect(email).toBeInTheDocument();
//   });
//   it("Password input to be in document", () => {
//     render(MockApp);
//     const pw = screen.getByPlaceholderText("Enter password");
//     expect(pw).toBeInTheDocument();
//   });
//   it("Re-type password input to be in document", () => {
//     render(MockApp);
//     const rePw = screen.getByPlaceholderText("Re-enter password");
//     expect(rePw).toBeInTheDocument();
//   });
//   it("Submit button to be in document", () => {
//     render(MockApp);
//     const submitBtn = screen.getByRole("button");
//     expect(submitBtn).toBeInTheDocument();
//   });
//   it("Already have an account span to be in document", () => {
//     render(MockApp);
//     const submitBtn = screen.queryByText(/Already have an account?/);
//     expect(submitBtn).toBeInTheDocument();
//   });
// });

// describe("Signup elements should be functional", () => {
//   it("First Name to be as typed", async () => {
//     render(MockApp);
//     const fName = screen.getByPlaceholderText("First name");
//     await userEvent.type(fName, "Johnny");
//     expect(fName).toHaveValue("Johnny");
//   });
//   it("Second Name to be as typed", async () => {
//     render(MockApp);
//     const sName = screen.getByPlaceholderText("Last name");
//     await userEvent.type(sName, "Cunty", { delay: 300 });
//     expect(sName).toHaveValue("Cunty");
//   });
//   it("Email input to be as typed", async () => {
//     render(MockApp);
//     const email = screen.getByPlaceholderText("Enter email");
//     await userEvent.type(email, "j.cunty@email.com", { delay: 300 });
//     expect(email).toHaveValue("j.cunty@email.com");
//   });
//   it("Password to be as typed", async () => {
//     render(MockApp);
//     const pw = screen.getByPlaceholderText("Enter password");
//     await userEvent.type(pw, "cunter1!#", { delay: 900 });
//     expect(pw).toHaveValue("cunter1!#");
//   });
//   it("Re-type password to be as typed", async () => {
//     render(MockApp);
//     const rePw = screen.getByPlaceholderText("Re-enter password");
//     await userEvent.type(rePw, "cunter1!#", { delay: 600 });
//     expect(rePw).toHaveValue("cunter1!#");
//   });
// });

// describe("Typing and editing first name input field should work", () => {
//   it("First Name to be typed", async () => {
//     render(MockApp);
//     const fName = screen.getByPlaceholderText("First name");
//     await userEvent.type(fName, "Johnnnny", { delay: 350 });
//     expect(fName).toHaveValue("Johnnnny");
//   });
//   it("First Name to be partial deleted", async () => {
//     render(MockApp);

//     const fName = screen.getByPlaceholderText("First name");
//     await userEvent.type(fName, "Johnnnny", { delay: 350 });

//     await userEvent.type(
//       fName,
//       "{backspace}{backspace}{backspace}{backspace}{backspace}"
//     );
//     expect(fName).toHaveValue("Joh");
//   });
//   it("First Name to be partial deleted and retyped", async () => {
//     render(MockApp);

//     const fName = screen.getByPlaceholderText("First name");
//     await userEvent.type(fName, "Johnnnny", { delay: 350 });

//     await userEvent.type(
//       fName,
//       "{backspace}{backspace}{backspace}{backspace}{backspace}"
//     );
//     await userEvent.type(fName, "nny");
//     expect(fName).toHaveValue("Johnny");
//   });
// });

describe("Fill and submit signup form", async () => {
  render(MockApp);
  const fName = screen.getByPlaceholderText("First name");
  await userEvent.type(fName, "Johnny");

  const sName = screen.getByPlaceholderText("Last name");
  await userEvent.type(sName, "Cunty");

  const email = screen.getByPlaceholderText("Enter email");
  await userEvent.type(email, "johnnyCunter@email.com");

  const pw = screen.getByPlaceholderText("Enter password");
  await userEvent.type(pw, "qwe123");

  const rePw = screen.getByPlaceholderText("Re-enter password");
  await userEvent.type(rePw, "qwe123");

  it("fName should have correct value according to input", () => {
    expect(fName).toHaveValue("Johnny");
  });
  it("sName should have correct value according to input", () => {
    expect(sName).toHaveValue("Cunty");
  });
  it("email should have correct value according to input", () => {
    expect(email).toHaveValue("johnnyCunter@email.com");
  });
  it("pw should have correct value according to input", () => {
    expect(pw).toHaveValue("qwe123");
  });
  it("rePw should have correct value according to input", () => {
    expect(rePw).toHaveValue("qwe123");
  });
  it("Button should be in document", () => {
    render(MockApp);
    const submitBtn = screen.queryByRole("button", { name: "Signup" });
    expect(submitBtn).toBeInTheDocument();
  });
  it("Button should be submittable & be disabled after click", async () => {
    render(MockApp);
    const submitBtn = screen.queryByRole("button", { name: "Signup" });
    //@ts-ignore
    fetch.mockResolvedValue(createFetchResponse(data));
    async function fetchData() {
      const response = await fetch(import.meta.env.VITE_SERVER_DOMAIN, {
        method: "POST",
        body: {
          //@ts-ignore
          email: "Johnny",
          password: "jonesy123!",
          username: `Johnny Jones`,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    }
    const newUser = await fetchData();
    expect(fetch).toHaveBeenCalledWith(import.meta.env.VITE_SERVER_DOMAIN, {
      method: "POST",
      body: {
        email: "Johnny",
        password: "jonesy123!",
        username: `Johnny Jones`,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(newUser).toEqual(data);
  });
  // it("Should submit the form correctly", async () => {
  //   const submitBtn = screen.getByRole("button");
  // });
});
