import { faker } from "@faker-js/faker";
import { SignupData } from "../types/SignUpData";

export function createSignupData(): SignupData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: "1995-05-10",
    country: "IN",
    postalCode: "600001",
    houseNumber: "42",
    street: "Main Street",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: faker.string.numeric(10),
    email: faker.internet.email(),
    password: "So.qvEwYu_8i1r=y",
  };
}