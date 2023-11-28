## Installation

```bash
  npm install wk-csv-json
```

## Usage

inputToJSON method
```typescript
// on your component.ts

import { inputToJSON } from 'wk-csv-json'

public csv

fileChange(event) {
  const file = event.target.files

  inputToJSON(file).then((data) => {
    this.csv = data
  })
}
```

```html
<!-- on your component.html -->

<input type="file" (change)="fileChange($event)" />
```

Sample CSV file

| id  | first name | last name | email                      |
| --- | ---------- | --------- | -------------------------- |
| 1   | Letizia    | Dominy    | Letizia.Dominy@yopmail.com |
| 2   | Wilma      | Therine   | Wilma.Therine@yopmail.com  |

Sample Output (Headers true)

```typescript
{
  data: [
    {
      "id": 1,
      "firstname": "Letizia",
      "lastname": "Dominy",
      "email": "Letizia.Dominy@yopmail.com"
    },
    {
      "id": 2,
      "firstname": "Wilma",
      "lastname": "Therine",
      "email": "Wilma.Therine@yopmail.com"
    }
  ],
  message: "Conversion complete"
}
```

Sample Output (Headers false)

```typescript
{
  data: [
    {
      "value": ["id", "first name", "last name", "email"]
    },
    {
      "value": [1, "Letizia", "Dominy", "Letizia.Dominy@yopmail.com"]
    },
    {
      "value": [2, "Wilma", "Therine", "Wilma.Therine@yopmail.com"]
    }
  ],
  message: "Conversion complete"
}
```

csvToJSON method
```typescript
// on your component.ts

import { csvToJSON } from 'wk-csv-json'

this.csv = csvToJSON(
  "id,name,email\n1,Letizia Dominy,Letizia.Dominy@yopmail.com"
);
```

Output (Headers true)

```typescript
{
  data: [
    {
      "id": 1,
      "name": "Letizia Dominy",
      "email": "Letizia.Dominy@yopmail.com"
    }
  ],
  message: "Conversion complete"
}
```

Output (Headers false)

```typescript
{
  data: [
    {
      "value": ["id", "name", "email"]
    },
    {
      "value": [1, "Letizia Dominy", "Letizia.Dominy@yopmail.com"]
    }
  ],
  message: "Conversion complete"
}
```

## inputToJSON(target, headers)

| Parameters | Type     | Default | Description                          |
| ---------- | -------- | ------- | ------------------------------------ |
| target     | FileList |         | The CSV file to be converted to JSON |
| headers    | Boolean  | true    | Use the header as key                |

## csvToJSON(target, headers)

| Parameters | Type    | Default | Description                            |
| ---------- | ------- | ------- | -------------------------------------- |
| target     | String  |         | The CSV string to be converted to JSON |
| headers    | Boolean | true    | Use the header as key                  |

if headers parameters

## Future

~~Convert plain CSV (Not from file) to JSON~~ - Added

Convert JSON to CSV
