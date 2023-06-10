import db from '../util/db.js';
import helper from '../util/helper.js';

class scheduleController {

  static async getAll(_req, res, _next){
    const record = db.data;
    res.send(record)
  }

  static async getLineOrByDeparture(req, res, _next){
    const line = helper.formatLine(req.params.line);
    let { departure } = req.query;
    const isValidDeparture = helper.validateDeparture(departure);

    let record = db.data.filter(r => r.line == line)
    if(!record.length){
      // line not found
      res.sendStatus(404);
    }else if(!departure){
      // no departure param
      res.send(record);
    }else if(!isValidDeparture){
      res.sendStatus(400);
    }else{
      departure = helper.convertTo24h(departure);
      record = record.filter(r => r.departure == departure);
      res.send(record)
    }
  }


}

export default scheduleController;