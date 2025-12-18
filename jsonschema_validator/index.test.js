const request = require('supertest');
const app = require('./index');

describe('POST /validate', () => {
  it('should accept valid payload', async () => {
    const res = await request(app)
      .post('/validate')
      .send({ isActive: true, name: "Jay", age: 25 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Success');
  });

  it('should reject invalid age', async () => {
      const res = await request(app)
        .post('/validate')
        .send({ isActive: true, name: "Jay", age: 10 });
      expect(res.statusCode).toEqual(400);
      expect(res.body.details[0].message).toContain('must be greater than or equal to 18');
  });

  it('should reject string "FALSE"', async () => {
    const res = await request(app)
      .post('/validate')
      .send({ isActive: "FALSE", name: "Jay" });
    expect(res.statusCode).toEqual(400);
  });

  it('should reject string "true"', async () => {
    const res = await request(app)
      .post('/validate')
      .send({ isActive: "true", name: "Jay" });
    expect(res.statusCode).toEqual(400);
  });

  it('should reject number 1', async () => {
    const res = await request(app)
      .post('/validate')
      .send({ isActive: 1, name: "Jay" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.details[0].field).toBe('isActive');
    expect(res.body.details[0].message).toContain('is not of a type(s) boolean');
  });

  it('should fail if required fields are missing', async () => {
    const res = await request(app)
      .post('/validate')
      .send({});
    expect(res.statusCode).toEqual(400);
    // Should complain about missing isActive and name
    expect(res.body.details.some(d => d.message.includes('requires property "isActive"'))).toBe(true);
    expect(res.body.details.some(d => d.message.includes('requires property "name"'))).toBe(true);
  });

  it('should reject malformed JSON', async () => {
    const res = await request(app)
      .post('/validate')
      .set('Content-Type', 'application/json')
      .send('{"isActive": FALSE}'); // Sending raw string with invalid JSON
    expect(res.statusCode).toEqual(422);
    expect(res.body.details[0].message).toEqual('The request body contains invalid JSON.');
  });

  it('should reject malformed JSON with multiple fields', async () => {
    const res = await request(app)
      .post('/validate')
      .set('Content-Type', 'application/json')
      .send('{"name": "Jay", "isActive": FALSE, "role": "admin"}'); 
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual('Invalid JSON in request body');
    expect(res.body.details[0].message).toEqual('The request body contains invalid JSON.');
  });
});
