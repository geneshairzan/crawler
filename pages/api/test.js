import {
  prisma,
  responseFilter,
  reqFilter,
  objectparse,
} from "app/lib/prismaHelper";
import base from "app/lib/router";

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
      req.body.userId = req.auth.id;
      req.body.detail = reqFilter(req.body.detail, [
        "name",
        "desc",
        "id",
        "material",
        "finishing",
      ]);

      let parse = objectparse(req.body);

      const result = await prisma[model].upsert({
        where: { id: req.body.id ? req.body.id : "noid" },
        update: parse,
        create: parse,
        include: {
          detail: {
            include: {
              addon: true,
            },
          },
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
