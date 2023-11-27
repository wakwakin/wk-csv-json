## Installation
```bash
  npm install wk-csv-json
```

## Example
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
// on your component.html

<input type="file" (change)="fileChange($event)">
```

Sample CSV file

| id  | first name | last name | email |
| ------------- | ------------- | ------------- | ------------- |
| 1  | Letizia | Dominy | Letizia.Dominy@yopmail.com |
| 2  | Wilma | Therine | Wilma.Therine@yopmail.com |

Sample Output

```json
[
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
]
```

## inputToJSON(target, headers)
| Parameters  | Type | Default | Description |
| ------------- | ------------- | ------------- | ------------- |
| target  | FileList | | The CSV file to be converted to JSON |
| headers  | Boolean | true | Use the header as key |

## Future
Convert plain CSV (Not from file) to JSON

Convert JSON to CSV