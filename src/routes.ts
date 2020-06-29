import { Request, Response } from 'express';

import CreateUser from './services/CreateUser';

export const helloWorld = (req: Request, res: Response) => {
  
  const user = CreateUser(
    {
      email: 'a@a.com', 
      password: '123456', 
      name: 'Nome', 
      techs: [
        'ReactJS', 
        {experience: 100, tech: 'VueJS'}
      ] 
    }
  );
  

  return res.json({msg: 'Hello World'});
}