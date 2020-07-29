import { Company, Form } from "brazil-mocker";
import Faker from "faker";
import generateRG from "./generateRg";

export default function generateByLabel(label, lang) {
  switch (label) {
    case "cpf":
      return Form.cpf.generate();
    case "cnpj":
      return Form.cnpj.generate();
    case "phoneNumber":
      return lang === "en"
        ? Faker.phone.phoneNumber()
        : Form.contact.phoneNumber.generate();
    case "email":
      return lang === "en"
        ? Faker.internet.email()
        : Form.contact.email.generate();
    case "companyName":
      return lang === "en"
        ? Faker.company.companyName()
        : Company.name.generate();
    case "firstName":
      return lang === "en"
        ? Faker.name.firstName()
        : Form.names.firstName.generate();
    case "lastName":
      return lang === "en"
        ? Faker.name.lastName()
        : Form.names.lastName.generate();
    case "fullName":
      return Form.names.fullName.generate();
    case "uuid":
      return Form.uuid.generate();
    case "base64Image":
      return Form.image.generate();
    case "logo":
      return Company.logo.generate();
    case "color":
      return Company.color.generate();
    case "country":
      return Faker.address.country();
    case "state":
      return Faker.address.state();
    case "city":
      return Faker.address.city();
    case "ip":
      return Faker.internet.ip();
    case "ipv6":
      return Faker.internet.ipv6();
    case "macAddress":
      return Faker.internet.mac();
    case "RG":
      return generateRG();
    default:
      return;
  }
}
