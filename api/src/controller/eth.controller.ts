import express from 'express'
import { contract } from '../config';

const getTask = async(req: express.Request<{_id: string}>, res: express.Response)=>{
  try{
      const _id = req.params._id;
      const tasks = await contract.methods.viewTask(_id).call() 
      //@ts-ignore
      const {id, name, time} = tasks;
      res.status(200).json({
        id: Number(id),
        name: name,
        time: String(time)
      })
  }catch(err){
      res.status(404).json(err)
  }
}


const allTask = async(req: express.Request, res: express.Response)=>{
  try{
      const tasks = await contract.methods.allTask().call() 
      let taskList: Array<{id: number, name: string, time: number}>= [];
      //@ts-ignore
      tasks.map((item)=>{
        let {id, name, time} = item;
        id = Number(id)
        time = Number(id)
        taskList.push({id, name, time})
      })
      console.log(taskList)
      res.status(200).json({
        taskList
      })
  }catch(err){
      res.status(404).json(err)
  }
}

export {
  getTask,
  allTask
}
