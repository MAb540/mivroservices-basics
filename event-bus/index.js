import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

const events = [];

app.post('/events',(req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events',event);
    axios.post('http://localhost:4001/events',event);
    axios.post('http://localhost:4002/events',event);

    try{
        axios.post('http://localhost:4003/events',event);
    }catch(e){
        console.log('error occurred: ',e);
    }
    
    res.send({status: 'Ok'})

})

app.get('/events',(req, res) => {

    res.send(events);

})


const port = 4005;
app.listen(port,()=>console.log('listen on port: ',port));

