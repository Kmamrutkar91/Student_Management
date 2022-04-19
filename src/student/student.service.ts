/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { promisify } from 'util';
import { StudentModule } from './student.module';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IStudent } from './interfaces/student.interface';
import { StudentDto } from './student.dto';
import { UpdateDto } from './update.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<IStudent>,
  ) {}
  async getStudents(): Promise<StudentDto[]> {
    const students = await this.studentModel.find().exec();
    if (!students || !students[0]) {
      throw new HttpException('Not Found', 404);
    }
    return students;
  }

  async getStudentById(stdid: number): Promise<StudentDto> {
    const student = await this.studentModel.findOne({ stdid }).exec();
    if (!student) {
      throw new HttpException('Not Found', 404);
    }
    return await student;
  }

  async postStudent(newStudent: StudentDto) {
    const student = await new this.studentModel(newStudent);
    return await student.save();
  }

  // async putStudentById(
  //   stdid: number,
  //   property_Name: string,
  //   property_Value: string,
  // ) {
  //   const students = await this.studentModel
  //     .findOneAndUpdate({ stdid }, { [property_Name]: property_Value })
  //     .exec();
  //   if (!students) {
  //     throw new HttpException('Not Found', 404);
  //   }
  //   return await students;
  // }

  async bodyPutStudentById(stdid: number, newStudent: UpdateDto) {
    const students = await this.studentModel
      .findOneAndUpdate({ stdid }, { $set: newStudent })
      .exec();
    return await 'Updated Successfully';
  }

  async deleteStudentById(stdid: number) {
    const students = await this.studentModel.deleteOne({ stdid }).exec();
    if (students.deletedCount === 0) {
      // throw new HttpException('Not Found', HttpStatus.FORBIDDEN);
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Record with given id is not present',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return 'Deleted Successfully';
  }
}
