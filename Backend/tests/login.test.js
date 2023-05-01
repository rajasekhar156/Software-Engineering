const mongoose = require('mongoose');
const {Gate} = require('../model/Info');

describe('Login functionality', () => {
  jest.setTimeout(50000);

  let gate = new Gate;

  beforeAll(async () => {
    const uri = 'mongodb+srv://rohanthota3:20020213@cluster1.tmeczdk.mongodb.net/car-scanner?retryWrites=true&w=majority';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return true for valid login credentials', async () => {
    const result = await gate.isValidLogin("Rocky15","123")
    expect(result).toBe(true);
  });

  it('should return false for invalid login password', async () => {
    const result = await gate.isValidLogin("Rocky15","12");
    expect(result).toBe(false);
  });

  it('should return false for invalid login id', async() => {
    const result = await gate.isValidLogin("Rocky","123");
    expect(result).toBe(false);
  })

  it('should return false for invalid login id and password', async() => {
    const result = await gate.isValidLogin("Rocky1","1");
    expect(result).toBe(false);
  })
});
