import { model, Schema } from "mongoose";

interface IBooking {
	userId : Schema.Types.ObjectId ;
  itemId : Schema.Types.ObjectId ;                                      //* packageId or propertyId
  itemType : Schema.Types.ObjectId ;                                    //* 'package' | 'property'
  status : 'initiated' | 'reserved' | 'paid' | 'cancelled' ;            //* 'initiated' | 'reserved' | 'paid' | 'cancelled'
  startDate : string ;
  endDate : string ;
  totalPrice : number ;
  paymentId : Schema.Types.ObjectId ;
  createdAt : string ;
  updatedAt : string ;
}
const BookingSchema = new Schema<IBooking>({
  userId : { type: Schema.Types.ObjectId , requires : true } ,
  itemId : { type: Schema.Types.ObjectId , requires : true } ,                                      
  itemType : { type: Schema.Types.ObjectId , enum : ['package' , 'property'] , requires : true } ,                                   
  status : { type: String , enum : ['initiated' , 'reserved' , 'paid' , 'cancelled'] , requires : true } , 
  startDate : { type: String , requires : true } ,
  endDate : { type: String , requires : true } ,
  totalPrice : { type: Number , requires : true } ,
  paymentId : { type: Schema.Types.ObjectId , requires : true } ,
  createdAt : { type: String , requires : true } ,
  updatedAt : { type: String , requires : true } ,
})

export const BookingModel = model<IBooking>('Booking' , BookingSchema) ;