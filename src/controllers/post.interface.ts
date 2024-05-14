import { Request, Response } from 'express';

abstract class HttpInterface {


    abstract post(req:Request, res:Response): Promise<any>;
    
    abstract get(req:Request, res:Response): Promise<any>;
   
    abstract put(req:Request, res:Response): Promise<any>;
    
    abstract delete (req:Request, res:Response, data: any): Promise<any>;
   

}

export default HttpInterface;