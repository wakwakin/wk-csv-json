import { ICSV } from "./interface";

export function inputToJSON(target: FileList, headers: boolean = true) {
  let json = promise(target, headers).then((value: any) => value);
  return json;
}

export function csvToJSON(csv: string, headers: boolean = true) {
  let csvArray: ICSV = [];
  conversion(csv, headers, csvArray, false);
  return {
    data: csvArray,
    message: "Conversion complete",
  };
}

const promise = (target: FileList, headers: boolean) => {
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
          conversion(d.target.result, headers, csvArray, true);

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

function conversion(
  csv: string | ArrayBuffer,
  headers: boolean,
  arrayHolder: any,
  isInput: boolean
) {
  const data = isInput
    ? csv.toString().split("\r\n")
    : csv.toString().split("\n");

  if (headers) {
    let header = data[0].split(",");
    for (let j = 1; j < data.length; j++) {
      const ch = data[j].split(",");
      let csvData: { [k: string]: any } = {};
      for (let k = 0; k < header.length; k++) {
        csvData[header[k].replace(" ", "")] = ch[k];
      }
      arrayHolder.push(csvData);
    }
  } else {
    for (let j = 0; j < data.length; j++) {
      const ch = data[j].split(",");
      let csvData: { [k: string]: any } = {};
      csvData.value = ch;
      arrayHolder.push(csvData);
    }
  }
}

function csvCheck(file: { type: string }) {
  return file.type == "text/csv";
}
