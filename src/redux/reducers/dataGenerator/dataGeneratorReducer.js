import { Form, Company } from "brazil-mocker";

const initialState = [
  {
    label: "cpf",
    status: true,
    format: true,
    customValue: ""
  },
  {
    label: "cnpj",
    status: false,
    format: true,
    customValue: ""
  },
  {
    label: "phoneNumber",
    format: true,
    status: false,
    customValue: ""
  },
  {
    label: "email",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "uuid",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "companyName",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "firstName",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "lastName",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "fullName",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "base64Image",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "color",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "logo",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "country",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "state",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "city",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "ip",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "ipv6",
    status: false,
    format: false,
    customValue: ""
  },
  {
    label: "macAddress",
    status: false,
    format: false,
    customValue: ""
  },
];

export default function dataGeneratorReducer(state = initialState, action) {
  if (action.type === "SET_DATA_GENERATOR") {
    return action.payload;
  } else {
    return state;
  }
}
