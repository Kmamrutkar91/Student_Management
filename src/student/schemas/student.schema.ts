import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  stdid: Number,
  name: String,
  age: Number,
  department: String
});
