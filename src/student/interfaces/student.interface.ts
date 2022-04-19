/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Schema, Types } from 'mongoose';

export interface IStudent {
  readonly stdid: number;
  readonly name: string;
  readonly age: number;
  readonly department: string;
  // Use `Types.ObjectId` in document interface...
  organization: Types.ObjectId;
}
