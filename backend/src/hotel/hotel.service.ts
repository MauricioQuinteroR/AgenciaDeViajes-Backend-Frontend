import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>) {}

  async create(createHotelDto: CreateHotelInput): Promise<Hotel> {
    const newHotel = new this.hotelModel(createHotelDto);
    return newHotel.save();
  }

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async findOneById(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel con ID "${id}" no encontrado`);
    }
    return hotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelInput): Promise<Hotel> {
    const updatedHotel = await this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();
    if (!updatedHotel) {
      throw new NotFoundException(`Hotel con ID "${id}" no encontrado`);
    }
    return updatedHotel;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.hotelModel.findByIdAndDelete(id);
    if (!result) {
      return { deleted: false, message: 'Hotel no encontrado' };
    }
    return { deleted: true };
  }

  async updateActive(id: string, active: boolean): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException('Hotel no encontrado');
    }
    hotel.active = active;
    return hotel.save();
  }

}
