const mongoose = require('mongoose');
const {Gate} = require('../model/Info');
const {Infodb} = require('../model/Info');

describe('Add Functionality', () => {
  jest.setTimeout(50000);

  let connection;
  let db;

  let gate = new Gate;

  beforeAll(async () => {
    connection = await mongoose.connect('mongodb+srv://rohanthota3:20020213@cluster1.tmeczdk.mongodb.net/car-scanner?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should add a new user to the database', async () => {
    await gate.Addentry1("TP 36 TP 1234","Temp","1234567890","tp@iith.ac.in", "2023-3-21", "16:05");

    const vehicle_Details = await Infodb.find({vehicleNumber: "TP 36 TP 1234"});
    
    expect(vehicle_Details[0].vehicleNumber).toBe('TP 36 TP 1234');
    expect(vehicle_Details[0].personName).toBe('Temp');
    expect(vehicle_Details[0].phoneNumber).toBe('1234567890');
    expect(vehicle_Details[0].emailId).toBe('tp@iith.ac.in');
    expect(vehicle_Details[0].entryDate).toBe('2023-3-21');
    expect(vehicle_Details[0].entryTime).toBe('16:05');
  });
});