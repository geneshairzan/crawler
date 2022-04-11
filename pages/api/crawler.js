import {
  prisma,
  responseFilter,
  reqFilter,
  objectparse,
} from "app/lib/prismaHelper";
import base from "app/lib/router";
import { getHTML, dataparsing } from "app/lib/crawler";

const model = "Crawler";

export default base()
  .get(async (req, res) => {
    try {
      let result;
      if (req.query.id) {
        result = await prisma[model].findUnique({
          where: {
            id: req.query.id,
          },
          include: {
            result: true,
          },
        });
      } else {
        result = await prisma[model].findMany({
          where: {
            deleted_at: null,
          },
          include: {
            result: true,
          },
        });
      }
      res.status(200).json(responseFilter(result));
    } catch (err) {
      throw new Error(err);
    }
  })
  .post(async (req, res) => {
    try {
      //   req.body.child = JSON.stringify(req.body.child);
      let rawHTML = await getHTML(req.body);
      req.body.result = await dataparsing(rawHTML, req.body);

      let parse = objectparse(req.body);
      parse.child = JSON.stringify(parse.child);

      const result = await prisma[model].upsert({
        where: { id: req.body.id ? req.body.id : "noid" },
        update: parse,
        create: parse,
        include: {
          result: true,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      throw new Error(err);
    }
  })
  .delete(async (req, res) => {
    try {
      res.status(200).json("delete");
    } catch (err) {
      throw new Error(err);
    }
  });
