const express = require('express');
const Validator = require('jsonschema').Validator;
const app = express();
const v = new Validator();

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // parse error message to extract context
    // Node.js errors look like: 
    // "Unexpected token 'F', ..."sActive": FALSE" is not valid JSON"
    // or "Unexpected token 'F', "{"isActive": FALSE}" is not valid JSON"
    
    let snippet = "";
    // Try to extract content between "Unexpected token ..., " and " is not valid JSON"
    // This part usually contains the invalid JSON part being parsed.
    const complexMatch = err.message.match(/Unexpected token.*?,\s*(.*)\s*is not valid JSON/s);
    if (complexMatch && complexMatch[1]) {
        snippet = complexMatch[1];
    } else {
        // Fallback: try to just grab usage of quotes at the end if the above fails
        const quoteMatch = err.message.match(/(".*?")\s*is not valid JSON/);
        if (quoteMatch) snippet = quoteMatch[1];
    }

    // Clean up snippet (remove surrounding quotes if it looks like the whole body)
    if (snippet.startsWith('"') && snippet.endsWith('"') && snippet.length > 2) {
         snippet = snippet.slice(1, -1);
    }
    
    // Clean up escaped characters for display
    snippet = snippet.replace(/\\"/g, '"').replace(/\\n/g, ' ').trim();
    
    // If we have a snippet, use it. Otherwise generic message.
    let message = "The request body contains invalid JSON. Please check for syntax errors.";
    if (snippet) {
         message = `The request body contains invalid JSON (near: '${snippet}'). Please check for syntax errors.`;
    } else {
         // Last resort fallback
         const cleanMessage = err.message.replace(/\n/g, '').replace(' is not valid JSON', '');
         message = `The request body contains invalid JSON. ${cleanMessage}`;
    }
    
    return res.status(422).json({
      error: "Invalid JSON",
      details: [{ message: message }]
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
