# Angular NgRx Users Manager

Angular application with NgRx state management for user and order management.

## Features

- User management with CRUD operations
- NgRx Entity State Management
- API call cancellation with RxJS
- Responsive design

## Tech Stack

- Angular 20+
- NgRx (Store, Effects, Entity)
- RxJS
- TypeScript

## Installation
```bash
npm install
```

## Running the App
```bash
ng serve
```

Navigate to `http://localhost:4200`

## Project Structure
```
src/app/
├── components/        # UI components
├── models/           # TypeScript interfaces
├── services/         # API services
└── store/            # NgRx (actions, effects, reducers, selectors)
```

## Key Features

- **Entity Adapter**: Efficient CRUD operations
- **Smart Selectors**: Memoized data access
- **API Cancellation**: Prevents race conditions
- **Duplicate Prevention**: Auto-update existing users

## License

MIT