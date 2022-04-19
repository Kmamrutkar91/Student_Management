/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDto } from './student.dto';
import { UpdateDto } from './update.dto';
import { query } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logger.interceptor';

@Controller('student')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  public async getStudents() {
    return await this.studentService.getStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id', ParseIntPipe) stdid: number) {
    return await this.studentService.getStudentById(stdid);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  // @SetMetadata('department', ['CSE', 'IT'])
  async postStudent(@Body() student: StudentDto) {
    return await this.studentService.postStudent(student);
  }

  // @Put(':stdid')
  // @UsePipes(new ValidationPipe())
  // async putStudentById(
  //   @Param('stdid', ParseIntPipe) stdid: number,
  //   @Query() query,
  // ) {
  //   const propertyName = query.property_Name;
  //   const propertyValue = query.property_Value;
  //   return await this.studentService.putStudentById(
  //     stdid,
  //     propertyName,
  //     propertyValue,
  //   );
  // }

  @Put(':stdid')
  @UsePipes(new ValidationPipe())
  async bodyPutStudentById(
    @Param('stdid', ParseIntPipe) stdid: number,
    @Body() student: UpdateDto,
  ) {
    return await this.studentService.bodyPutStudentById(stdid, student);
  }

  @Delete(':id')
  async deleteStudentById(@Param('id', ParseIntPipe) stdid: number) {
    return await this.studentService.deleteStudentById(stdid);
  }
}
