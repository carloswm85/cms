- [CMS PROJECT NOTES](#cms-project-notes)
  - [Tutorials](#tutorials)
  - [Additional Information](#additional-information)
  - [Explanations](#explanations)
    - [Pipe Use in Template Files](#pipe-use-in-template-files)
- [ANGULAR NOTES](#angular-notes)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)

---

# CMS PROJECT NOTES

## Tutorials

- Drag and drop: https://material.angular.io/cdk/drag-drop/overview
  - Angular Material CDK — Drag and Drop between Lists [Mid-level, 2021] [🔗](https://youtu.be/O489gFEoj-o)
  - Course original instructions using old *Drag and Drop Angular 2 Module* [🔗](https://byui.instructure.com/courses/294156/pages/w08-assignment-instructions#Install-the-Drag-and-Drop-Angular-2-Module)

## Additional Information

By Aaron: https://github.com/hexaF6-NinjaMC/cms/blob/main/src/app/messages/message-item/message-item.component.ts

## Explanations

### Pipe Use in Template Files

```ts
*ngFor="let contactItem of contacts | contactsFilter : term : 'contactItem.name' "
```

- `contactsFilter` - `ContactsFilterPipe` name for template binding in `contact-list.component.html`
- `term` - Property string value in `contact-list.component.ts`
- `'contactItem.name'` - Value from looped item to pass to the pipe.

---

*(Generated Text)*

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
