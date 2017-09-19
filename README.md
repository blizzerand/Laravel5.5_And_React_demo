# Build a React application with Laravel Backend

This project is a basic demo for running Laravel and React together. You can read the tutorial over at [Tutsplus.com](http://code.tutsplus.com/tutorials/build-a-react-app-with-laravel-restful-backend-part-1-laravel-5-api--cms-29442)

## Setting up the Demo


You need to have all the laravel dependencies and npm/yarn to use this demo. First clone the repo or download it as a zip. 
Next, make sure that you're on the right branch. If you're here just for the Laravel API, you should be looking at `laravelapi`. If you're here for Laravel + React code, `master` branch is all you need.

### Laravel Back end
Setup you DB, .env file, take care of migration and seeding. If you're in doubt, the reading the tutorial should get you in the right track. Once you are done with that, run `php artisan serve`. The api is accessible at `http://localhost:8000/api/products`

### React front-end

To make React work, run `npm install && npm run dev`. Alternatively you can use yarn over npm too. Now, head over to `http://localhost:8000/`