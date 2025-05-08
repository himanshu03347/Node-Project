const express = require('express');

const { serverConfig, Logger } = require('./config');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(serverConfig.PORT, async ()=>{
    console.log(`Successfully start the server on PORT: ${serverConfig.PORT}`);
    Logger.info("Succesfully started the server", "root", {});

    //bad code alert
    // const { City, Airport } = require('./models')
    // const Mumbai = await City.findByPk(17);
    // console.log(Mumbai);
    // // const MumAirport = await Mumbai.createAirport({name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM'});
    // // console.log(MumAirport);

    // // const airportBOM = await Mumbai.getAirports();
    // // console.log(airportBOM);

    // // const MumAirport = await Mumbai.createAirport({name: 'Dr. Babasaheb Ambedkar International Airport', code: 'NAG'});
    // // console.log(MumAirport);

    // // const airportBOM = await Mumbai.getAirports();
    // // console.log(airportBOM); 

    // // const hbairport = await Airport.findByPk(2);
    // // console.log(hbairport);
    // await Mumbai.destroy({
    //     where:{
    //         id: 2
    //     }
    // });
    
});