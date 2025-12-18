# JSON Schema Validator Example

This project demonstrates a simple Node.js Express API with JSON schema validation and custom error handling.

## Error Handling Explanation

Here is how the invalid JSON error is handled in the code:

1.  **Parsing Middleware**
    The line `app.use(express.json());` tries to parse every incoming request body as JSON. If the JSON is malformed (e.g., missing quotes, trailing commas), this middleware throws a specific error automatically.

2.  **Error Handling Middleware**
    We define a custom error handling middleware function using the signature `(err, req, res, next)`. Express identifies this as an error handler because it takes 4 arguments.

3.  **The Check**
    To ensure we only catch JSON parsing errors (and not other random errors), we check three things inside the middleware:

    ```javascript
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
    ```

    - `err instanceof SyntaxError`: JSON parse failures are always syntax errors.
    - `err.status === 400`: The `express.json()` middleware sets the HTTP status to 400 by default for these errors.
    - `'body' in err`: This property confirms the error happened while parsing the request body.

4.  **The Response**
    If it is indeed a JSON parsing error, we intercept it and send back a custom 422 response instead of letting Express send the default HTML or 400 error.

    ```javascript
    return res.status(422).json({
      error: "Invalid JSON in request body",
      details: [{ message: "The request body contains invalid JSON." }],
    });
    ```

5.  **Passing Through**
    The `next()` function is called if the error was _not_ a JSON parsing error, passing it along to any other error handlers you might define later.
