import connection from "../connection.js";
import CustomError from "../classes/CustomError.js";
import { response } from "express";

function index(req, res) {
  const sql = "SELECT `movies`.*, AVG(`reviews`.`vote`) AS `average_vote` FROM `movies` JOIN `reviews` ON`movies`.`id` = `reviews`.`movie_id` GROUP BY`reviews`.`movie_id`";
  connection.query(sql, (err, results) => {
    if (err) res.status(500).json({ error: "errore del server" });
    // console.log(results);
    const response = {
      count: results.length,
      items: results,
    }
    res.json(response);
  })
}


function show(req, res) {
  const id = parseInt(req.params.id);
  const sql = "SELECT `movies`.*, AVG(`reviews`.`vote`) AS `average_vote` FROM `movies` JOIN `reviews` ON`movies`.`id` = `reviews`.`movie_id` WHERE `movies`.`id` = ? GROUP BY`reviews`.`movie_id`";
  connection.query(sql, [id], (err, results) => {
    if (err) res.status(500).json({ error: "errore del server" });
    // console.log(results[0]);
    const item = results[0];
    if (!item) res.status(404).json({ error: "404", message: "not found" });
    const reviewSql = "SELECT `reviews`.* FROM `reviews` WHERE `movie_id` = ?"
    connection.query(reviewSql, [id], (err, reviews) => {
      if (err) res.status(500).json({ error: "errore del server" });
      item.reviews = reviews;
      res.json(item);
    });
  })
}


function destroy(req, res) {
  const id = parseInt(req.params.id);
  const sql = "DELETE * FROM `movies` WHERE `id` = ?";
  connection.query(sql, [id], (err, results) => {
    res.sendStatus(204);
  })
}

export { index, show, destroy };
