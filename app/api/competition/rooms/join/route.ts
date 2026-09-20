export const runtime = 'edge';
import {handleApiError,joinRoom} from '../../../../../lib/competition-server';
export async function POST(request:Request){try{return await joinRoom(request);}catch(error){return handleApiError(error);}}
