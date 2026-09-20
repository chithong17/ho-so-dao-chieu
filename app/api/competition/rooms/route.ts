export const runtime = 'edge';
import {createRoom,handleApiError} from '../../../../lib/competition-server';
export async function POST(request:Request){try{return await createRoom(request);}catch(error){return handleApiError(error);}}
