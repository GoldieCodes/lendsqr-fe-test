# Dashboard UI

This repository contains a front-end dashboard application built with **Next.js** (App Router), **React**, **TypeScript**, and **Sass**. The project utilizes dynamic routing, custom hooks, context, and advanced SCSS to create a highly functional, styled dashboard UI with responsive design.

The project structure follows Next.js’s `app` folder routing and leverages TypeScript for type safety, along with SCSS for styling flexibility and modularity.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Styling Details](#styling-details)
- [Example Code](#example-code)
- [Usage Notes](#usage-notes)

## Project Overview

The primary goal of this project is to provide a responsive, user-friendly dashboard UI for managing user data, to the tune of the exact Figma design file provided, which can be accessed here: https://www.google.com/url?q=https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/Frontend&sa=D&source=editors&ust=1730377588689660&usg=AOvVaw200PHt7RrGOa-p3VjsQAq7.

## Features

- **Login Authentication**: Implemented with Firebase Authentication and rendered using Formik and Yup libraries for easy state and validation management. Invalid login credentials submitted prompts a warning modal providing an option to create an account instead. (An account creation link could have been added directly to the page but this was not provided in the design and I followed the design strictly according to the assignment instructions.)
- **Dynamic Routing**: Uses Next.js’s folder routing structure for navigating between different pages.
- **Styled with SCSS**: Implements a modular SCSS structure, including mixins, variables, global and custom properties.
- **Responsive Design**: Ensures compatibility across devices with a responsive layout, implemented with media queries nested in mixins for easy resusability, and flexible CSS properties such as clamp and relative units.
- **Data Filtering and Searching**: Implements filters for the list of users and a search functionality to easily find users.
- **Custom Hooks & Context**: Manages state, data fetching, custom types and contextual data effectively by implementing reusable component functionality.
- **Reusable UI Components**: Includes components like icon wrappers, modals, filter and data fetching logic and data pagination.

## Technologies Used

- **Next.js** (v15.0.2)
- **React**
- **TypeScript**
- **SCSS** (with modular structure)
- **Context API** for state management

## Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/GoldieCodes/gold-onyinye-udeozo-lendsqr-fe-test.git
   cd gold-onyinye-udeozo-lendsqr-fe-test
   ```

2. Install the required dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This command starts a local development server and should be accessible at `http://localhost:3000`. Alternatively, you could view and interact with the deployment here: https://gold-onyinye-udeozo-lendsqr-fe-test.vercel.app/

## Folder Structure

Here’s a general overview of the project’s folder structure:

```
gold-onyinye-udeozo-lendsqr-fe-test/
├── app/
│   ├── components/
│   │   ├── DashboardSideMenu.tsx      # Component for the dashboard's side menu
│   │   ├── fetchData.tsx              # Utility function for fetching data
│   │   ├── FilterUserList.tsx         # Component for filtering the user list
│   │   ├── Icon.tsx                   # Icon component for displaying icons
│   │   ├── Modal.tsx                  # Modal component for dialogs
│   │   ├── Pagination.tsx             # Component for pagination controls
│   │   ├── TopNav.tsx                 # Top navigation bar component
│   │   ├── UserDetailsData.tsx        # Component to display user details
│   │   └── userDetailsInterface.tsx   # Interface definitions for user details
│   ├── dashboard/
│   │   ├── [user-detail]/             # Dynamic route for user details
│   │   │   └── page.tsx               # Page component for individual user detail
│   │   ├── page.tsx                   # Main dashboard page
│   │   └── layout.tsx                 # Layout for dashboard pages
│   ├── fonts/                         # Font files (if applicable)
│   └── page.tsx                       # Root page component
├── node_modules/                      # Node.js dependencies
├── public/                            # Public assets (images, etc.)
├── styles/
│   ├── modules/
│   │   ├── modal.module.scss           # Styles for modal components
│   │   └── login.module.scss            # Styles for the page component
│   ├── filterbox.scss                  # Styles for filter box
│   ├── globals.scss                    # Global SCSS styles
│   ├── mixins.scss                     # SCSS mixins for reusable styles
│   ├── nav.scss                        # Styles for navigation components
│   ├── sidemenu.scss                   # Styles for side menu
│   ├── userdetails.scss                # Styles for user details page
│   ├── userlist.scss                   # Styles for user list components
│   └── variables.scss                  # SCSS variables for consistent styling
├── .eslintrc.json                      # ESLint configuration
├── .gitignore                          # Git ignore file
├── README.md                           # Project README file
└── package.json                        # Project metadata and dependencies
```

### Key Files and Directories

- **app/page.tsx**: Main entry for the dashboard page.
- **app/dashboard/layout.tsx**: this is the default page for the dashboard homepage
- **app/dashboard/page.tsx**: this is the secondary default page, superseded by the layout page.
- **app/dashboard/[user-detail]**: this controls dynamic routing to the user details page per user
- **app/components/**: Contains the reusable UI components such as icons and data fetching logic.
- **styles/**: SCSS files organized into reusable mixins, variables, and a main stylesheet.

## Styling Details

The project employs SCSS with a focus on modularity and reuse. Key aspects include:

- **Mixins**: Custom mixins for layout (e.g., `flex`, `widthHeight`) and reusable color/background setups.
- **Variables**: Color and size variables are managed centrally in `variables.scss`, allowing easy theme updates.
- **Extendable SCSS Classes**: Includes classes for repeating styles such as box shadows and button hover state.

#### Example Code

Below is an example of how SCSS classes are organized and customized based on data attributes and mixins:

```scss
.dashboardContentBody {
  .overview {
    @include flex(space-between);
  }

  .itemBox {
    @extend %box-shadow2;
    @include widthHeight(240px, 160px);

    .icon {
      @include widthHeight(40px, 40px);
    }
  }
}

.statusPill {
  &.inactive {
    @include bgAndTextClr($body-text-clr);
  }
}
```

## Usage Notes

- **Dynamic Routes**: The dashboard uses dynamic routing for accessing detailed views from summary cards.
- **Error Handling**: Components are optimized for error-free rendering, ensuring SCSS selectors and attributes match throughout the codebase. -**Unit Tesing**: Positive and negative scenario testing have been implemented to ensure that the code meets requirements
