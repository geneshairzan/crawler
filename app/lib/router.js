import nc from "next-connect";

export default function base() {
  return nc({
    onError: (err, req, res, next) => {
      res.status(500).end(err.toString());
    },
    onNoMatch: (req, res) => {
      res.status(400).end("no route");
    },
  });
}
