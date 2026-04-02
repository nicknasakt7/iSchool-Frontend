'use server';


import { api } from "../../lib/api/client";

export const getGrade = async (): Promise<> => {
  try {
   const data=  api.get<>()
   console.log('dataaaaaaa',data)
   return data
  } catch (err){
    return err;
  }
  
};


