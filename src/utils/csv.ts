import fs from "fs";
import csv from "csv-parser";

export class CSVUTIL {
  static async parseCSV(path: string) {
    let results: unknown[] = [];

    try {
      return new Promise((resolve, reject) => {
        fs.createReadStream(path)
          .pipe(csv())
          .on("data", (data) => results.push(data))
          .on("end", () => resolve(results))
          .on("error", (error) => reject(error));
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
