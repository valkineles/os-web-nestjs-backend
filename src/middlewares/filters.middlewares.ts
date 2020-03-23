import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class getFilters implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    try {
      req.query.filters = {};
      const filters = req.query.filters;
      if (!filters || filters.length <= 0) {
        next();
        return;
      }

      req.query.filters['$or'] = ['lua'];
      /*
      filters.forEach(e => {
        const filter = {};
        if (e.type === 'like') {
          filter[e.field] = new RegExp(e.value, 'i');
        } else {
          filter[e.field] = {};
          if (e.type === '>') {
            filter[e.field]['$gt'] = e.value;
          } else if (e.type === '=') {
            filter[e.field]['$eq'] = e.value;
          } else if (e.type === '>=') {
            filter[e.field]['$gte'] = e.value;
          } else if (e.type === '<') {
            filter[e.field]['$lt'] = e.value;
          } else if (e.type === '<=') {
            filter[e.field]['$lte'] = e.value;
          } else if (e.type === '!=') {
            filter[e.field]['$ne'] = e.value;
          }
        }
        req.query.filters['$or'].push(filter);
      });
      */
      req.query.filters['$or'].push('nome:' + 'like aaaaa');
      console.log(filters);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        errorCode: error.code,
        message: error.message,
      });
    }
  }
}
