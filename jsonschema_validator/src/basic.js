const { Validator } = require('jsonschema');
const v = new Validator();

// Schema for boolean field
const schema = {
  type: 'object',
  properties: {
    isActive: {
      type: 'boolean'
    }
  },
  required: ['isActive']
};

// Valid data
const validData = { isActive: true };
const result1 = v.validate(validData, schema);
console.log(result1.valid); // true

// Invalid data (string instead of boolean)
const invalidData = { isActive: FALSE };
const result2 = v.validate(invalidData, schema);
console.log(result2.valid); // false
console.log(result2.errors); // Shows validation errors