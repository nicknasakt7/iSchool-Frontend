'use server';

import { api } from "../api/api-server";
import { apiClient } from "../api/client";
import { Grade } from "../api/grade/grade.type";



export const getGrade = async (): Promise<Grade> => {
  try {
   const data=  api.get<>()
   console.log('dataaaaaaa',data)
   return data
  } catch (err){
    return err;
  }

};
