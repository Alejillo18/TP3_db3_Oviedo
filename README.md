## Entregable Trabajo Practico N3 Base de Datos 3


_Aggregations_

```
  [
  {
    '$match': {
      'precio': {
        '$gt': 0
      }
    }
  }, {
    '$project': {
      'categoria': 1,
      'cantidad': 1,
      'recaudacionVenta': {
        '$multiply': [
          '$cantidad', '$precio'
        ]
      }
    }
  }, {
    '$group': {
      '_id': '$categoria',
      'totalRecaudado': {
        '$sum': '$recaudacionVenta'
      },
      'cantidadItems': {
        '$sum': '$cantidad'
      },
      'ventaPromedio': {
        '$avg': '$recaudacionVenta'
      }
    }
  }, {
    '$match': {
      'totalRecaudado': {
        '$gt': 315
      }
    }
  }, {
    '$sort': {
      'totalRecaudado': -1
    }
  }
]
```