const mongoose = require('mongoose');
const {Gate} = require('../model/Info');

describe('Forgot pass functionality', () => {
  jest.setTimeout(50000);

  let gate = new Gate;

  beforeAll(async () => {
    const uri = 'mongodb+srv://rohanthota3:20020213@cluster1.tmeczdk.mongodb.net/car-scanner?retryWrites=true&w=majority';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return correct password for valid login id', async () => {
    const result = await gate.getUserPass("Rocky15")
    expect(result).toBe("123");
  });

  it('should return empty string for invalid login id', async () => {
    const result = await gate.getUserPass("Rocky");
    expect(result).toBe("");
  });
});