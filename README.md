# DevData Tools

Useful tools for technology cases, until now, generate use case descriptions, test case descriptions and save on your Google account, mock data and an emoji selector to get their unicode.

![Captura de Tela 2020-08-29 às 14 14 39](https://user-images.githubusercontent.com/44711197/91642483-14eafc80-ea02-11ea-8617-e8cf9024857a.png) 

![Captura de Tela 2020-08-29 às 14 14 50](https://user-images.githubusercontent.com/44711197/91642494-2a602680-ea02-11ea-96da-cbc7ca4fd160.png)
## Technologies

List of all the technologies utilized in the project.

#### Front-End

**React** is the library that I utilized for develop the front-end of this project, for state management I use **Redux** with their hooks, assuming all the application was created with functional components. I decided to create a module system for scalability in accord I add the new features, so you can see the modules in `src/components` folder.

#### User Data

The user data is stored on Firestore database, I decided to create a back-end application written in Go Language that's can be founded [here](https://github.com/jsdaniell/devdata-tools-api-golang).

#### CI - CD and Hosting

For CI and CD you can see the config file .yml on the `.github/workflows` folder, using the **Github Actions** for the build and deployment on **Firebase Hosting**.
