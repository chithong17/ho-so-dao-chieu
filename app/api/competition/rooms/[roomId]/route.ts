export const runtime = 'edge';
import {getRoom,handleApiError} from '../../../../../lib/competition-server';
export async function GET(request:Request,{params}:{params:Promise<{roomId:string}>}){try{return await getRoom(request,(await params).roomId);}catch(error){return handleApiError(error);}}
