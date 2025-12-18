const express = require('express');
const Validator = require('jsonschema').Validator;
const app = express();
const v = new Validator();

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(422).json({
      error: "Invalid JSON in request body",
      details: [{ message: "The request body contains invalid JSON." }]
    });
  }
  next();
});

const schema = {
  type: "object",
  properties: {
    isActive: { type: "boolean" },
    name: { type: "string", minLength: 3 },
    age: { type: "integer", minimum: 18 }
  },
  required: ["isActive", "name"]
};

app.post('/validate', (req, res) => {
  const validation = v.validate(req.body, schema);

  if (!validation.valid) {
    const errorDetails = validation.errors.map(e => ({
      field: e.property.replace('instance.', ''),
      message: e.stack
    }));
    return res.status(400).json({
      error: "Validation failed",
      details: errorDetails
    });
  }



  res.json({ message: "Success", data: req.body });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

module.exports = app;
