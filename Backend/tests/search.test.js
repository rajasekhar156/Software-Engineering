const mongoose = require('mongoose');
const {Gate} = require('../model/Info');

describe('Search functionality', () => {
  jest.setTimeout(50000);

  let gate = new Gate;

  beforeAll(async () => {
    const uri = 'mongodb+srv://rohanthota3:20020213@cluster1.tmeczdk.mongodb.net/car-scanner?retryWrites=true&w=majority';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should return a valid document for a valid vehicle number', async () => {
    const result = await gate.vehicleDetails("MH01AV8886")
    const number = result[0].vehicleNumber;
    expect(number).toBe("MH01AV8886");
  });

  it('should return a document containing NA as vehicle number for a valid number', async () => {
    const result = await gate.vehicleDetails("MH01AV8880")
    const number = result.vehicleNumber;
    expect(number).toBe("NA");
  });
});