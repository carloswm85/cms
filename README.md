- [CMS PROJECT NOTES](#cms-project-notes)
  - [Weekly Development](#weekly-development)
    - [W06: Routing](#w06-routing)
  - [Additional Information](#additional-information)
- [ANGULAR NOTES](#angular-notes)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)

---


# CMS PROJECT NOTES

## Weekly Development

### W06: Routing

- A much simpler way of doing this is to use Angular routing. A route is defined for each of the three components. Each route maps a URL path to a component that is to be loaded. When the end user enters a URL path or selects an anchor tag that matches the URL path defined in one of the routes, it automatically loads and displays the corresponding component into the DOM.
  1. Define routes for each component to be loaded in a routing file.
  2. Add a <router-outlet> tag to the component where the selected components are to be loaded.
  3. Add the [routerLink] directive to each HTML anchor tag that is responsible for loading a component when it is selected by the end user.
- The `<router-outlet>` tag indicates the location where each of the main components defined in the `app-routing.module.ts` file will be loaded and displayed.

## Additional Information

By Aaron: https://github.com/hexaF6-NinjaMC/cms/blob/main/src/app/messages/message-item/message-item.component.ts

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

# ANGULAR NOTES

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
