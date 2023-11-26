import { ICSV } from "./interface";

export function inputToJSON(target: FileList, headers: boolean) {
  let json = promise(target, headers).then((value: any) => value);
  return json;
}

const promise = (target: FileList, headers: boolean = true) => {
  return new Promise((resolve, reject) => {
    const fileCount = target.length;
    let csvArray: ICSV = [];

    if (fileCount == 0) {
      return {
        data: [],
        message: "No CSV files to convert",
      };
    }

    const file = target[0];
    const csv = csvCheck(file);

    if (csv) {
      const fr = new FileReader();
      fr.onload = (d) => {
        if (d.target && d.target.result) {
          const data = d.target.result.toString().split("\r\n");
          let header = data[0].split(",");

          for (let j = 1; j < data.length; j++) {
            const ch = data[j].split(",");
            let csvData: { [k: string]: any } = {};
            for (let k = 0; k < header.length; k++) {
              csvData[headers ? header[k].replace(" ", "") : 'value'] = ch[k];
            }
            csvArray.push(csvData);
          }

          resolve({
            data: csvArray,
            message: "Conversion complete",
          });
        } else {
          resolve({
            data: [],
            message: `File ${file.name} not loaded`,
          });
        }
      };
      fr.onerror = (error) => {
        resolve({
          data: [],
          message: error,
        });
      };
      fr.readAsText(file);
    } else {
      resolve({
        data: [],
        message: `${file.name} is not a valid CSV file.`,
      });
    }
  });
};

function csvCheck(file: { type: string }) {
  return file.type == "text/csv";
}
