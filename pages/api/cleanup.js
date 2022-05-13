import {
  prisma,
  responseFilter,
  reqFilter,
  objectparse,
} from "app/lib/prismaHelper";
import base from "app/lib/router";
import { getHTML, dataparsing } from "app/lib/crawler";

const model = "Crawler";

export default base().get(async (req, res) => {
  await prisma[model].deleteMany({});
  res.status(200).json("ok");
});
